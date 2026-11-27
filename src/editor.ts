import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BUILT_IN_ELEMENTS, EDITOR_TAG } from './constants';
import type {
  ActionConfig,
  AndroidTvGridRemoteConfig,
  CustomButtonConfig,
  ElementConfig,
  HomeAssistant,
  VerticalAlign,
  VolumeMode,
} from './types';

@customElement(EDITOR_TAG)
export class AndroidTvGridRemoteEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: AndroidTvGridRemoteConfig;
  @state() private activeTab: 'general' | 'elements' | 'custom_buttons' = 'general';
  @state() private dragIndex: number | null = null;
  @state() private jsonErrorByBtn: Record<number, string> = {};

  setConfig(config: AndroidTvGridRemoteConfig): void {
    this.config = {
      ...config,
      columns: config.columns ?? 3,
      align: config.align ?? 'top',
      volume_mode: config.volume_mode ?? 'auto',
      elements: config.elements ?? [],
      custom_buttons: config.custom_buttons ?? [],
    };
  }

  private emitConfig(updated: AndroidTvGridRemoteConfig): void {
    this.config = updated;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        bubbles: true,
        composed: true,
        detail: { config: updated },
      }),
    );
  }

  private updateRootField<K extends keyof AndroidTvGridRemoteConfig>(
    key: K,
    value: AndroidTvGridRemoteConfig[K],
  ): void {
    if (!this.config) return;
    const next = { ...this.config };
    if (value === '' || value === undefined) {
      delete next[key];
    } else {
      next[key] = value;
    }
    this.emitConfig(next);
  }

  private getEntitiesByDomain(domain: string): string[] {
    if (!this.hass?.states) return [];
    return Object.keys(this.hass.states)
      .filter((id) => id.startsWith(`${domain}.`))
      .sort();
  }

  private get mergedElementOptions(): Array<{ id: string; label: string }> {
    const builtIn = Object.values(BUILT_IN_ELEMENTS).map((el) => ({
      id: el.id,
      label: `${el.label} [${el.id}]`,
    }));

    const custom = (this.config?.custom_buttons ?? [])
      .filter((b) => Boolean(b.id))
      .map((b) => ({
        id: b.id,
        label: `Custom: ${b.friendly_name || b.id} [${b.id}]`,
      }));

    return [...builtIn, ...custom];
  }

  // --- Elements CRUD & Reorder ---

  private updateElement(index: number, patch: Partial<ElementConfig>): void {
    if (!this.config) return;
    const elements = [...(this.config.elements ?? [])];
    const updated = { ...elements[index], ...patch };
    if (updated.color === '') delete updated.color;
    if (updated.background === '') delete updated.background;
    elements[index] = updated;
    this.emitConfig({ ...this.config, elements });
  }

  private addElement(id = 'home'): void {
    if (!this.config) return;
    const meta = BUILT_IN_ELEMENTS[id];
    const elements = [
      ...(this.config.elements ?? []),
      { id, columns: meta?.defaultColumns ?? 1 },
    ];
    this.emitConfig({ ...this.config, elements });
  }

  private removeElement(index: number): void {
    if (!this.config) return;
    const elements = (this.config.elements ?? []).filter((_, i) => i !== index);
    this.emitConfig({ ...this.config, elements });
  }

  private moveElement(from: number, to: number): void {
    if (!this.config) return;
    const elements = [...(this.config.elements ?? [])];
    if (to < 0 || to >= elements.length || from === to) return;
    const [moved] = elements.splice(from, 1);
    elements.splice(to, 0, moved);
    this.emitConfig({ ...this.config, elements });
  }

  // --- Custom Buttons CRUD ---

  private addCustomButton(): void {
    if (!this.config) return;
    const existing = this.config.custom_buttons ?? [];
    const newId = `custom_btn_${existing.length + 1}`;
    const nextBtn: CustomButtonConfig = {
      id: newId,
      friendly_name: `Button ${existing.length + 1}`,
      icon: 'mdi:star',
      tap_action: {
        action: 'perform-action',
        perform_action: 'remote.send_command',
        target: { entity_id: this.config.remote_entity },
        data: { command: 'HOME' },
      },
    };
    this.emitConfig({
      ...this.config,
      custom_buttons: [...existing, nextBtn],
    });
  }

  private updateCustomButton(index: number, patch: Partial<CustomButtonConfig>): void {
    if (!this.config) return;
    const list = [...(this.config.custom_buttons ?? [])];
    const updated = { ...list[index], ...patch };
    if (updated.color === '') delete updated.color;
    if (updated.background === '') delete updated.background;
    list[index] = updated;
    this.emitConfig({ ...this.config, custom_buttons: list });
  }

  private updateCustomButtonAction(index: number, patch: Partial<ActionConfig>): void {
    if (!this.config) return;
    const list = [...(this.config.custom_buttons ?? [])];
    const prevAction: ActionConfig = list[index].tap_action ?? {
      action: 'perform-action',
    };
    list[index] = {
      ...list[index],
      tap_action: { ...prevAction, ...patch },
    };
    this.emitConfig({ ...this.config, custom_buttons: list });
  }

  private removeCustomButton(index: number): void {
    if (!this.config) return;
    const list = (this.config.custom_buttons ?? []).filter((_, i) => i !== index);
    this.emitConfig({ ...this.config, custom_buttons: list });
  }

  private renderGeneralTab() {
    if (!this.config) return nothing;
    const remoteList = this.getEntitiesByDomain('remote');
    const mediaList = this.getEntitiesByDomain('media_player');

    return html`
      <div class="section">
        <div class="field">
          <label>Remote Entity (Required)*</label>
          <input
            type="text"
            list="atgr-remote-list"
            .value=${this.config.remote_entity ?? ''}
            placeholder="remote.living_room_tv"
            @input=${(e: Event) =>
              this.updateRootField('remote_entity', (e.target as HTMLInputElement).value)}
          />
          <datalist id="atgr-remote-list">
            ${remoteList.map((id) => html`<option value=${id}></option>`)}
          </datalist>
        </div>

        <div class="field">
          <label>Media Player Entity (Optional)</label>
          <input
            type="text"
            list="atgr-media-list"
            .value=${this.config.entity ?? ''}
            placeholder="media_player.living_room_tv"
            @input=${(e: Event) =>
              this.updateRootField('entity', (e.target as HTMLInputElement).value)}
          />
          <datalist id="atgr-media-list">
            ${mediaList.map((id) => html`<option value=${id}></option>`)}
          </datalist>
        </div>

        <div class="field">
          <label>Volume Entity (Optional, falls back to Entity)</label>
          <input
            type="text"
            list="atgr-media-list"
            .value=${this.config.volume_entity ?? ''}
            placeholder="media_player.sonos_beam"
            @input=${(e: Event) =>
              this.updateRootField('volume_entity', (e.target as HTMLInputElement).value)}
          />
        </div>

        <div class="row-2">
          <div class="field">
            <label>Columns (Max columns per row)</label>
            <input
              type="number"
              min="1"
              max="8"
              .value=${String(this.config.columns ?? 4)}
              @input=${(e: Event) =>
                this.updateRootField(
                  'columns',
                  Math.max(1, Number((e.target as HTMLInputElement).value) || 4),
                )}
            />
          </div>

          <div class="field">
            <label>Row Align (Vertical alignment)</label>
            <select
              .value=${this.config.align ?? 'top'}
              @change=${(e: Event) =>
                this.updateRootField(
                  'align',
                  (e.target as HTMLSelectElement).value as VerticalAlign,
                )}
            >
              <option value="top">Top</option>
              <option value="center">Center</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label>Volume Control Mode</label>
          <select
            .value=${this.config.volume_mode ?? 'auto'}
            @change=${(e: Event) =>
              this.updateRootField(
                'volume_mode',
                (e.target as HTMLSelectElement).value as VolumeMode,
              )}
          >
            <option value="auto">Auto (Slider if supported, else Buttons)</option>
            <option value="slider">Slider (Force)</option>
            <option value="buttons">Buttons (Force - / +)</option>
          </select>
        </div>

        <div class="row-2">
          <div class="field">
            <label>Default Color</label>
            <input
              type="text"
              .value=${this.config.color ?? ''}
              placeholder="#ffffff (or leave empty for theme)"
              @input=${(e: Event) =>
                this.updateRootField('color', (e.target as HTMLInputElement).value)}
            />
          </div>

          <div class="field">
            <label>Default Background</label>
            <input
              type="text"
              .value=${this.config.background ?? ''}
              placeholder="#2a2a2a (or leave empty for theme)"
              @input=${(e: Event) =>
                this.updateRootField('background', (e.target as HTMLInputElement).value)}
            />
          </div>
        </div>
      </div>
    `;
  }

  private renderElementsTab() {
    if (!this.config) return nothing;
    const elements = this.config.elements ?? [];
    const options = this.mergedElementOptions;

    return html`
      <div class="section">
        <div class="toolbar">
          <button type="button" class="btn primary" @click=${() => this.addElement('home')}>
            + Add Element
          </button>
          <button type="button" class="btn secondary" @click=${() => this.addElement('spacer')}>
            + Add Spacer
          </button>
        </div>

        <div class="item-list">
          ${elements.map(
            (el, idx) => html`
              <div
                class="item-card"
                draggable="true"
                @dragstart=${() => {
                  this.dragIndex = idx;
                }}
                @dragover=${(e: DragEvent) => e.preventDefault()}
                @drop=${(e: DragEvent) => {
                  e.preventDefault();
                  if (this.dragIndex !== null) {
                    this.moveElement(this.dragIndex, idx);
                    this.dragIndex = null;
                  }
                }}
              >
                <div class="item-header">
                  <span class="drag-handle" title="Drag to reorder">⋮⋮ #${idx + 1}</span>
                  <div class="item-actions">
                    <button
                      type="button"
                      class="mini-btn"
                      ?disabled=${idx === 0}
                      @click=${() => this.moveElement(idx, idx - 1)}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      class="mini-btn"
                      ?disabled=${idx === elements.length - 1}
                      @click=${() => this.moveElement(idx, idx + 1)}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      class="mini-btn danger"
                      @click=${() => this.removeElement(idx)}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div class="row-2">
                  <div class="field">
                    <label>Element ID</label>
                    <select
                      .value=${el.id}
                      @change=${(e: Event) =>
                        this.updateElement(idx, {
                          id: (e.target as HTMLSelectElement).value,
                        })}
                    >
                      ${options.map(
                        (opt) => html`
                          <option value=${opt.id} ?selected=${opt.id === el.id}>
                            ${opt.label}
                          </option>
                        `,
                      )}
                      ${!options.some((o) => o.id === el.id)
                        ? html`<option value=${el.id} selected>${el.id}</option>`
                        : nothing}
                    </select>
                  </div>

                  <div class="field">
                    <label>Columns</label>
                    <input
                      type="number"
                      min="1"
                      max=${this.config?.columns ?? 4}
                      .value=${String(
                        el.columns ?? BUILT_IN_ELEMENTS[el.id]?.defaultColumns ?? 1,
                      )}
                      @input=${(e: Event) =>
                        this.updateElement(idx, {
                          columns: Math.max(
                            1,
                            Number((e.target as HTMLInputElement).value) || 1,
                          ),
                        })}
                    />
                  </div>
                </div>

                <div class="row-2">
                  <div class="field">
                    <label>Color Override</label>
                    <input
                      type="text"
                      .value=${el.color ?? ''}
                      placeholder="Inherit default"
                      @input=${(e: Event) =>
                        this.updateElement(idx, {
                          color: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </div>

                  <div class="field">
                    <label>Background Override</label>
                    <input
                      type="text"
                      .value=${el.background ?? ''}
                      placeholder="Inherit default"
                      @input=${(e: Event) =>
                        this.updateElement(idx, {
                          background: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </div>
                </div>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }

  private renderCustomButtonsTab() {
    if (!this.config) return nothing;
    const buttons = this.config.custom_buttons ?? [];

    return html`
      <div class="section">
        <div class="toolbar">
          <button type="button" class="btn primary" @click=${() => this.addCustomButton()}>
            + Add Custom Button
          </button>
        </div>

        ${buttons.length === 0
          ? html`<div class="empty-hint">No custom buttons yet. Add one above to select it in Elements.</div>`
          : nothing}

        <div class="item-list">
          ${buttons.map((btn, idx) => {
            const tapAction = btn.tap_action ?? { action: 'perform-action' };
            const dataJson = tapAction.data ? JSON.stringify(tapAction.data, null, 2) : '';
            const targetEntity =
              typeof tapAction.target?.entity_id === 'string'
                ? tapAction.target.entity_id
                : '';

            return html`
              <div class="item-card">
                <div class="item-header">
                  <strong>${btn.friendly_name || btn.id}</strong>
                  <button
                    type="button"
                    class="mini-btn danger"
                    @click=${() => this.removeCustomButton(idx)}
                  >
                    ✕
                  </button>
                </div>

                <div class="row-2">
                  <div class="field">
                    <label>ID (Unique)</label>
                    <input
                      type="text"
                      .value=${btn.id}
                      @input=${(e: Event) =>
                        this.updateCustomButton(idx, {
                          id: (e.target as HTMLInputElement).value.trim(),
                        })}
                    />
                  </div>

                  <div class="field">
                    <label>Friendly Name</label>
                    <input
                      type="text"
                      .value=${btn.friendly_name ?? ''}
                      @input=${(e: Event) =>
                        this.updateCustomButton(idx, {
                          friendly_name: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </div>
                </div>

                <div class="field">
                  <label>Icon (mdi: / Image URL / Base64 / &lt;svg&gt;)</label>
                  <input
                    type="text"
                    .value=${btn.icon ?? ''}
                    placeholder="mdi:netflix, https://..., or <svg>..."
                    @input=${(e: Event) =>
                      this.updateCustomButton(idx, {
                        icon: (e.target as HTMLInputElement).value,
                      })}
                  />
                </div>

                <div class="row-2">
                  <div class="field">
                    <label>Color</label>
                    <input
                      type="text"
                      .value=${btn.color ?? ''}
                      placeholder="Inherit default"
                      @input=${(e: Event) =>
                        this.updateCustomButton(idx, {
                          color: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </div>

                  <div class="field">
                    <label>Background</label>
                    <input
                      type="text"
                      .value=${btn.background ?? ''}
                      placeholder="Inherit default"
                      @input=${(e: Event) =>
                        this.updateCustomButton(idx, {
                          background: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </div>
                </div>

                <div class="row-2">
                  <div class="field">
                    <label>Tap Action (Service)</label>
                    <input
                      type="text"
                      .value=${tapAction.perform_action ?? tapAction.service ?? ''}
                      placeholder="remote.send_command"
                      @input=${(e: Event) =>
                        this.updateCustomButtonAction(idx, {
                          action: 'perform-action',
                          perform_action: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </div>

                  <div class="field">
                    <label>Target Entity ID</label>
                    <input
                      type="text"
                      .value=${targetEntity}
                      placeholder="remote.living_room_tv"
                      @input=${(e: Event) => {
                        const val = (e.target as HTMLInputElement).value.trim();
                        this.updateCustomButtonAction(idx, {
                          target: val ? { entity_id: val } : undefined,
                        });
                      }}
                    />
                  </div>
                </div>

                <div class="field">
                  <label>Action Data (JSON, supports Jinja2 templates)</label>
                  <textarea
                    rows="3"
                    .value=${dataJson}
                    placeholder='{"command": "HOME"}'
                    @change=${(e: Event) => {
                      const raw = (e.target as HTMLTextAreaElement).value.trim();
                      if (!raw) {
                        this.jsonErrorByBtn = { ...this.jsonErrorByBtn, [idx]: '' };
                        this.updateCustomButtonAction(idx, { data: undefined });
                        return;
                      }
                      try {
                        const parsed = JSON.parse(raw);
                        this.jsonErrorByBtn = { ...this.jsonErrorByBtn, [idx]: '' };
                        this.updateCustomButtonAction(idx, { data: parsed });
                      } catch {
                        this.jsonErrorByBtn = {
                          ...this.jsonErrorByBtn,
                          [idx]: 'Invalid JSON format. Please check quotes and braces.',
                        };
                      }
                    }}
                  ></textarea>
                  ${this.jsonErrorByBtn[idx]
                    ? html`<span class="error-text">${this.jsonErrorByBtn[idx]}</span>`
                    : nothing}
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="editor-root">
        <div class="tabs">
          <button
            type="button"
            class="tab ${this.activeTab === 'general' ? 'active' : ''}"
            @click=${() => (this.activeTab = 'general')}
          >
            Entities & Style
          </button>
          <button
            type="button"
            class="tab ${this.activeTab === 'elements' ? 'active' : ''}"
            @click=${() => (this.activeTab = 'elements')}
          >
            Elements
          </button>
          <button
            type="button"
            class="tab ${this.activeTab === 'custom_buttons' ? 'active' : ''}"
            @click=${() => (this.activeTab = 'custom_buttons')}
          >
            Custom Buttons
          </button>
        </div>

        ${this.activeTab === 'general'
          ? this.renderGeneralTab()
          : this.activeTab === 'elements'
            ? this.renderElementsTab()
            : this.renderCustomButtonsTab()}
      </div>
    `;
  }

  static styles = css`
    .editor-root {
      display: flex;
      flex-direction: column;
      gap: 14px;
      color: var(--primary-text-color);
    }

    .tabs {
      display: flex;
      gap: 6px;
      border-bottom: 1px solid rgba(128, 128, 128, 0.25);
      padding-bottom: 8px;
    }

    .tab {
      flex: 1;
      padding: 8px 10px;
      border-radius: 8px;
      border: none;
      background: rgba(128, 128, 128, 0.12);
      color: inherit;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
    }

    .tab.active {
      background: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .field label {
      font-size: 12px;
      opacity: 0.8;
    }

    .field input,
    .field select,
    .field textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid rgba(128, 128, 128, 0.35);
      background: var(--secondary-background-color, rgba(128, 128, 128, 0.1));
      color: inherit;
      font-size: 13px;
      font-family: inherit;
    }

    .row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .toolbar {
      display: flex;
      gap: 8px;
    }

    .btn {
      padding: 8px 12px;
      border-radius: 8px;
      border: none;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
    }

    .btn.primary {
      background: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .btn.secondary {
      background: rgba(128, 128, 128, 0.2);
      color: inherit;
    }

    .item-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .item-card {
      padding: 12px;
      border-radius: 10px;
      border: 1px solid rgba(128, 128, 128, 0.25);
      background: rgba(128, 128, 128, 0.06);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .drag-handle {
      cursor: grab;
      font-size: 12px;
      font-weight: 600;
      opacity: 0.75;
    }

    .item-actions {
      display: flex;
      gap: 4px;
    }

    .mini-btn {
      padding: 3px 8px;
      border-radius: 6px;
      border: none;
      background: rgba(128, 128, 128, 0.2);
      color: inherit;
      cursor: pointer;
      font-size: 12px;
    }

    .mini-btn.danger {
      background: rgba(239, 68, 68, 0.22);
      color: #ef4444;
    }

    .mini-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .empty-hint {
      font-size: 13px;
      opacity: 0.65;
      padding: 12px 0;
      text-align: center;
    }

    .error-text {
      font-size: 12px;
      color: #ef4444;
    }
  `;
}
