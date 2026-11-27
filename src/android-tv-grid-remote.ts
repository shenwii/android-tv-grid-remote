import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  BUILT_IN_ELEMENTS,
  CARD_TAG,
  DEFAULT_CONFIG,
  EDITOR_TAG,
} from './constants';
import type {
  AndroidTvGridRemoteConfig,
  CustomButtonConfig,
  HomeAssistant,
  LayoutItem,
  LayoutRow,
  VerticalAlign,
} from './types';
import {
  executeAction,
  launchRemoteActivity,
  normalizeCustomButtonAction,
  sendRemoteCommand,
} from './utils/actions';
import { renderIcon } from './utils/icon';
import { packElementsIntoRows } from './utils/layout';

import './components/touch-pad';
import './components/volume-bar';
import './components/media-controls';
import './components/now-playing';
import './components/dialogs';

const GRID_GAP_PX = 10;

@customElement(CARD_TAG)
export class AndroidTvGridRemote extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: AndroidTvGridRemoteConfig;
  @state() private cellSize = 64;
  @state() private keyboardOpen = false;
  @state() private sourceOpen = false;

  private resizeObserver?: ResizeObserver;
  private holdTimer: number | null = null;
  private holdTriggered = false;
  private lastTapTs = 0;
  private tapTimer: number | null = null;

  static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TAG);
  }

  static getStubConfig(hass?: HomeAssistant): Partial<AndroidTvGridRemoteConfig> {
    const states = hass?.states ? Object.keys(hass.states) : [];
    const remoteEntity = states.find((id) => id.startsWith('remote.')) ?? 'remote.living_room_tv';
    const mediaEntity =
      states.find((id) => id.startsWith('media_player.')) ?? 'media_player.living_room_tv';

    return {
      remote_entity: remoteEntity,
      entity: mediaEntity,
      columns: DEFAULT_CONFIG.columns,
      align: DEFAULT_CONFIG.align,
      elements: DEFAULT_CONFIG.elements,
    };
  }

  setConfig(config: AndroidTvGridRemoteConfig): void {
    if (!config.remote_entity || !config.remote_entity.trim()) {
      throw new Error('Please configure a required "remote_entity" (e.g. remote.living_room_tv).');
    }

    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      columns: Math.max(1, Math.round(config.columns ?? DEFAULT_CONFIG.columns ?? 4)),
      align: config.align ?? DEFAULT_CONFIG.align ?? 'top',
      elements: config.elements ?? DEFAULT_CONFIG.elements ?? [],
      custom_buttons: config.custom_buttons ?? [],
    };
  }

  getCardSize(): number {
    if (!this.config) return 4;
    const rows = packElementsIntoRows(
      this.config.elements ?? [],
      this.config.columns ?? 4,
    );
    return Math.max(2, rows.reduce((sum, r) => sum + r.maxRowUnits, 0));
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setupResizeObserver();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.clearActionTimers();
  }

  protected firstUpdated(): void {
    this.setupResizeObserver();
  }

  private setupResizeObserver(): void {
    const container = this.renderRoot?.querySelector('.grid-root') as HTMLElement | null;
    if (!container) return;

    this.resizeObserver?.disconnect();
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          const cols = this.config?.columns ?? 4;
          const computed = (width - GRID_GAP_PX * (cols - 1)) / cols;
          if (computed > 0 && Math.abs(computed - this.cellSize) > 0.5) {
            this.cellSize = computed;
          }
        }
      }
    });
    this.resizeObserver.observe(container);
  }

  private clearActionTimers(): void {
    if (this.holdTimer !== null) {
      window.clearTimeout(this.holdTimer);
      this.holdTimer = null;
    }
    if (this.tapTimer !== null) {
      window.clearTimeout(this.tapTimer);
      this.tapTimer = null;
    }
  }

  private get customButtonsMap(): Map<string, CustomButtonConfig> {
    const map = new Map<string, CustomButtonConfig>();
    for (const btn of this.config?.custom_buttons ?? []) {
      if (btn.id) map.set(btn.id, btn);
    }
    return map;
  }

  private handleBuiltInButtonClick(id: string): void {
    if (!this.hass || !this.config) return;
    const meta = BUILT_IN_ELEMENTS[id];
    if (!meta) return;

    if (id === 'keyboard') {
      this.keyboardOpen = true;
      return;
    }
    if (id === 'source_select') {
      this.sourceOpen = true;
      return;
    }
    if (meta.remoteCommand) {
      sendRemoteCommand(this.hass, this.config.remote_entity, meta.remoteCommand);
      return;
    }
    if (meta.appActivity) {
      launchRemoteActivity(this.hass, this.config.remote_entity, meta.appActivity);
    }
  }

  private handleCustomButtonPointerDown(btn: CustomButtonConfig): void {
    this.holdTriggered = false;
    if (this.holdTimer !== null) {
      window.clearTimeout(this.holdTimer);
    }
    const holdAction = normalizeCustomButtonAction(btn, 'hold');
    if (holdAction) {
      this.holdTimer = window.setTimeout(() => {
        this.holdTriggered = true;
        if (this.hass && this.config) {
          executeAction(this, this.hass, holdAction, {
            remoteEntity: this.config.remote_entity,
            entity: this.config.entity,
            volumeEntity: this.config.volume_entity,
          });
        }
      }, 450);
    }
  }

  private handleCustomButtonPointerUp(btn: CustomButtonConfig): void {
    if (this.holdTimer !== null) {
      window.clearTimeout(this.holdTimer);
      this.holdTimer = null;
    }
    if (this.holdTriggered || !this.hass || !this.config) return;

    const doubleTapAction = normalizeCustomButtonAction(btn, 'double_tap');
    const tapAction = normalizeCustomButtonAction(btn, 'tap');
    const ctx = {
      remoteEntity: this.config.remote_entity,
      entity: this.config.entity,
      volumeEntity: this.config.volume_entity,
    };

    if (doubleTapAction) {
      const now = Date.now();
      if (now - this.lastTapTs < 260) {
        if (this.tapTimer !== null) {
          window.clearTimeout(this.tapTimer);
          this.tapTimer = null;
        }
        this.lastTapTs = 0;
        executeAction(this, this.hass, doubleTapAction, ctx);
        return;
      }
      this.lastTapTs = now;
      this.tapTimer = window.setTimeout(() => {
        this.tapTimer = null;
        if (this.hass && tapAction) {
          executeAction(this, this.hass, tapAction, ctx);
        }
      }, 260);
      return;
    }

    if (tapAction) {
      executeAction(this, this.hass, tapAction, ctx);
    }
  }

  private renderElementItem(
    item: LayoutItem,
    customMap: Map<string, CustomButtonConfig>,
  ): TemplateResult {
    const { config: el, colSpan, rowUnits } = item;
    const builtIn = BUILT_IN_ELEMENTS[el.id];
    const customBtn = customMap.get(el.id);

    const elColor =
      el.color ??
      customBtn?.color ??
      builtIn?.defaultColor ??
      this.config?.color ??
      'var(--primary-text-color, #ffffff)';
    const elBg =
      el.background ??
      customBtn?.background ??
      builtIn?.defaultBackground ??
      this.config?.background ??
      'var(--secondary-background-color, #2a2a2a)';

    const itemStyle = `
      grid-column: span ${colSpan};
      height: calc(${this.cellSize}px * ${rowUnits} + ${GRID_GAP_PX}px * ${rowUnits - 1});
      --atgr-el-color: ${elColor};
      --atgr-el-bg: ${elBg};
    `;

    // 1. Transparent Spacer
    if (el.id === 'spacer') {
      return html`<div class="grid-item spacer" style=${itemStyle} aria-hidden="true"></div>`;
    }

    // 2. Specialized Widgets
    if (el.id === 'touch_pad') {
      return html`
        <div class="grid-item" style=${itemStyle}>
          <atgr-touch-pad
            @atgr-command=${(e: CustomEvent<{ command: string }>) => {
              if (this.hass && this.config) {
                sendRemoteCommand(this.hass, this.config.remote_entity, e.detail.command);
              }
            }}
          ></atgr-touch-pad>
        </div>
      `;
    }

    if (el.id === 'volume') {
      const volEntity = this.config?.volume_entity || this.config?.entity || '';
      return html`
        <div class="grid-item" style=${itemStyle}>
          <atgr-volume-bar .hass=${this.hass} .entityId=${volEntity}></atgr-volume-bar>
        </div>
      `;
    }

    if (el.id === 'media_controls') {
      return html`
        <div class="grid-item" style=${itemStyle}>
          <atgr-media-controls
            .hass=${this.hass}
            .entityId=${this.config?.entity ?? ''}
            .remoteEntity=${this.config?.remote_entity ?? ''}
          ></atgr-media-controls>
        </div>
      `;
    }

    if (el.id === 'now_playing') {
      return html`
        <div class="grid-item" style=${itemStyle}>
          <atgr-now-playing
            .hass=${this.hass}
            .entityId=${this.config?.entity ?? ''}
            .remoteEntity=${this.config?.remote_entity ?? ''}
          ></atgr-now-playing>
        </div>
      `;
    }

    // 3. Custom Button
    if (customBtn) {
      const iconContent = renderIcon(customBtn.icon);
      return html`
        <div class="grid-item" style=${itemStyle}>
          <button
            type="button"
            class="circle-btn"
            title=${customBtn.friendly_name || customBtn.id}
            aria-label=${customBtn.friendly_name || customBtn.id}
            @pointerdown=${() => this.handleCustomButtonPointerDown(customBtn)}
            @pointerup=${() => this.handleCustomButtonPointerUp(customBtn)}
            @pointercancel=${() => this.clearActionTimers()}
          >
            ${iconContent !== nothing
              ? iconContent
              : html`<span class="btn-label">${customBtn.friendly_name || customBtn.id}</span>`}
          </button>
        </div>
      `;
    }

    // 4. Built-in Button or App Preset
    if (builtIn) {
      return html`
        <div class="grid-item" style=${itemStyle}>
          <button
            type="button"
            class="circle-btn"
            title=${builtIn.label}
            aria-label=${builtIn.label}
            @click=${() => this.handleBuiltInButtonClick(el.id)}
          >
            ${renderIcon(builtIn.icon)}
          </button>
        </div>
      `;
    }

    // 5. Unknown element ID fallback
    return html`
      <div class="grid-item" style=${itemStyle}>
        <div class="unknown-btn" title="Unknown element: ${el.id}">?</div>
      </div>
    `;
  }

  private mapAlign(align?: VerticalAlign): string {
    switch (align) {
      case 'center':
        return 'center';
      case 'bottom':
        return 'end';
      case 'top':
      default:
        return 'start';
    }
  }

  render() {
    if (!this.config) return nothing;

    const maxCols = this.config.columns ?? 4;
    const rows: LayoutRow[] = packElementsIntoRows(this.config.elements ?? [], maxCols);
    const customMap = this.customButtonsMap;
    const alignCss = this.mapAlign(this.config.align);

    const cardStyle = `
      --atgr-cols: ${maxCols};
      --atgr-cell-size: ${this.cellSize}px;
      --atgr-gap: ${GRID_GAP_PX}px;
      --atgr-align: ${alignCss};
      ${this.config.color ? `color: ${this.config.color};` : ''}
    `;

    return html`
      <ha-card style=${cardStyle}>
        <div class="grid-root">
          ${rows.map(
            (row) => html`
              <div class="grid-row">
                ${row.items.map((item) => this.renderElementItem(item, customMap))}
              </div>
            `,
          )}
        </div>
      </ha-card>

      <atgr-keyboard-dialog
        .hass=${this.hass}
        .remoteEntity=${this.config.remote_entity}
        .open=${this.keyboardOpen}
        @atgr-close=${() => {
          this.keyboardOpen = false;
        }}
      ></atgr-keyboard-dialog>

      <atgr-source-dialog
        .hass=${this.hass}
        .entityId=${this.config.entity ?? ''}
        .open=${this.sourceOpen}
        @atgr-close=${() => {
          this.sourceOpen = false;
        }}
      ></atgr-source-dialog>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      padding: 16px;
      border-radius: var(--ha-card-border-radius, 22px);
      background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
      overflow: hidden;
      box-sizing: border-box;
    }

    .grid-root {
      display: flex;
      flex-direction: column;
      gap: var(--atgr-gap, 10px);
      width: 100%;
    }

    .grid-row {
      display: grid;
      grid-template-columns: repeat(var(--atgr-cols, 4), minmax(0, 1fr));
      gap: var(--atgr-gap, 10px);
      align-items: var(--atgr-align, start);
      width: 100%;
    }

    .grid-item {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .grid-item.spacer {
      background: transparent;
      pointer-events: none;
    }

    .circle-btn {
      appearance: none;
      border: none;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      color: var(--atgr-el-color, var(--primary-text-color, #ffffff));
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      box-shadow:
        0 2px 8px rgba(0, 0, 0, 0.2),
        inset 0 1px 1px rgba(255, 255, 255, 0.06);
      transition: transform 0.1s ease, filter 0.15s ease;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
    }

    .circle-btn:hover {
      filter: brightness(1.08);
    }

    .circle-btn:active {
      transform: scale(0.92);
    }

    .circle-btn ha-icon {
      --mdc-icon-size: 42%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .atgr-img-icon {
      width: 54%;
      height: 54%;
      object-fit: contain;
      pointer-events: none;
    }

    .atgr-svg-icon {
      width: 48%;
      height: 48%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-label {
      font-size: 12px;
      font-weight: 600;
      padding: 0 6px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 90%;
    }

    .unknown-btn {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px dashed rgba(128, 128, 128, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      font-weight: 600;
    }
  `;
}

// Register card in Home Assistant's card picker
declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: 'Android TV Grid Remote',
  description: 'Modular grid-based Android TV & universal remote card with touch pad, volume slider, and custom buttons.',
  preview: true,
});
