import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MEDIA_PLAYER_FEATURES } from '../constants';
import type { HassEntity, HomeAssistant } from '../types';

@customElement('atgr-volume-bar')
export class AtgrVolumeBar extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: String }) entityId = '';

  @state() private draggingValue: number | null = null;

  private lastThrottleTs = 0;

  private get entityState(): HassEntity | undefined {
    if (!this.hass || !this.entityId) return undefined;
    return this.hass.states[this.entityId];
  }

  private get supportsMute(): boolean {
    const entity = this.entityState;
    if (!entity) return false;
    const features = entity.attributes.supported_features ?? 0;
    return (
      entity.attributes.is_volume_muted !== undefined ||
      (features & MEDIA_PLAYER_FEATURES.VOLUME_MUTE) !== 0
    );
  }

  private get supportsVolumeSet(): boolean {
    const entity = this.entityState;
    if (!entity) return false;
    const features = entity.attributes.supported_features ?? 0;
    return (
      typeof entity.attributes.volume_level === 'number' ||
      (features & MEDIA_PLAYER_FEATURES.VOLUME_SET) !== 0
    );
  }

  private get isMuted(): boolean {
    return Boolean(this.entityState?.attributes.is_volume_muted);
  }

  private get currentPercent(): number {
    if (this.draggingValue !== null) {
      return this.draggingValue;
    }
    const level = this.entityState?.attributes.volume_level;
    if (typeof level !== 'number' || Number.isNaN(level)) return 0;
    return Math.round(Math.max(0, Math.min(1, level)) * 100);
  }

  private toggleMute(): void {
    if (!this.hass || !this.entityId) return;
    this.hass.callService(
      'media_player',
      'volume_mute',
      { is_volume_muted: !this.isMuted },
      { entity_id: this.entityId },
    );
  }

  private stepVolume(direction: 'up' | 'down'): void {
    if (!this.hass || !this.entityId) return;
    this.hass.callService(
      'media_player',
      direction === 'up' ? 'volume_up' : 'volume_down',
      undefined,
      { entity_id: this.entityId },
    );
  }

  private setVolumePercent(percent: number): void {
    if (!this.hass || !this.entityId) return;
    const clamped = Math.max(0, Math.min(100, percent));
    this.hass.callService(
      'media_player',
      'volume_set',
      { volume_level: Number((clamped / 100).toFixed(2)) },
      { entity_id: this.entityId },
    );
  }

  private onSliderInput = (e: Event): void => {
    const val = Number((e.target as HTMLInputElement).value);
    this.draggingValue = val;

    const now = Date.now();
    if (now - this.lastThrottleTs >= 80) {
      this.lastThrottleTs = now;
      this.setVolumePercent(val);
    }
  };

  private onSliderChange = (e: Event): void => {
    const val = Number((e.target as HTMLInputElement).value);
    this.draggingValue = null;
    this.setVolumePercent(val);
  };

  render() {
    const hasEntity = Boolean(this.entityId && this.entityState);
    const percent = this.currentPercent;
    const muteIcon = this.isMuted ? 'mdi:volume-off' : 'mdi:volume-high';

    if (!hasEntity) {
      return html`
        <div class="volume-bar disabled">
          <ha-icon icon="mdi:volume-off"></ha-icon>
          <span class="empty-label">No volume entity</span>
        </div>
      `;
    }

    if (!this.supportsVolumeSet) {
      return html`
        <div class="volume-bar fallback">
          ${this.supportsMute
            ? html`
                <button
                  type="button"
                  class="icon-btn ${this.isMuted ? 'muted' : ''}"
                  aria-label="Toggle Mute"
                  @click=${() => this.toggleMute()}
                >
                  <ha-icon .icon=${muteIcon}></ha-icon>
                </button>
              `
            : nothing}
          <div class="step-controls">
            <button
              type="button"
              class="step-btn"
              aria-label="Volume Down"
              @click=${() => this.stepVolume('down')}
            >
              <ha-icon icon="mdi:volume-minus"></ha-icon>
            </button>
            <button
              type="button"
              class="step-btn"
              aria-label="Volume Up"
              @click=${() => this.stepVolume('up')}
            >
              <ha-icon icon="mdi:volume-plus"></ha-icon>
            </button>
          </div>
        </div>
      `;
    }

    // Dynamic gradient color: lighter cyan at low volume -> deeper blue/indigo at high volume
    const thumbColor =
      percent > 75 ? '#1d4ed8' : percent > 40 ? '#0284c7' : '#06b6d4';

    return html`
      <div class="volume-bar">
        ${this.supportsMute
          ? html`
              <button
                type="button"
                class="icon-btn ${this.isMuted ? 'muted' : ''}"
                aria-label="Toggle Mute"
                @click=${() => this.toggleMute()}
              >
                <ha-icon .icon=${muteIcon}></ha-icon>
              </button>
            `
          : nothing}

        <div class="slider-wrap" style="--vol-pct: ${percent}%; --thumb-color: ${thumbColor};">
          <div class="slider-track">
            <div class="slider-fill"></div>
          </div>
          <input
            type="range"
            class="slider-input"
            min="0"
            max="100"
            step="1"
            .value=${String(percent)}
            aria-label="Volume"
            @input=${this.onSliderInput}
            @change=${this.onSliderChange}
          />
          <div class="slider-thumb" aria-hidden="true"></div>
        </div>

        <span class="volume-value">${percent}</span>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .volume-bar {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 14px;
      box-sizing: border-box;
      border-radius: 18px;
      background: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      color: var(--atgr-el-color, var(--primary-text-color, #ffffff));
      user-select: none;
      -webkit-user-select: none;
    }

    .volume-bar.disabled {
      opacity: 0.55;
      justify-content: center;
    }

    .empty-label {
      font-size: 13px;
    }

    .icon-btn {
      appearance: none;
      border: none;
      background: transparent;
      color: inherit;
      padding: 6px;
      margin: -6px;
      border-radius: 50%;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background-color 0.15s ease, transform 0.1s ease;
      -webkit-tap-highlight-color: transparent;
    }

    .icon-btn:hover {
      background: rgba(128, 128, 128, 0.16);
    }

    .icon-btn:active {
      transform: scale(0.92);
    }

    .icon-btn.muted {
      opacity: 0.65;
    }

    .slider-wrap {
      position: relative;
      flex: 1;
      height: 28px;
      display: flex;
      align-items: center;
    }

    .slider-track {
      position: relative;
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: rgba(128, 128, 128, 0.28);
      overflow: hidden;
    }

    .slider-fill {
      height: 100%;
      width: var(--vol-pct, 0%);
      border-radius: 999px;
      background: linear-gradient(90deg, #22d3ee 0%, #0284c7 60%, #1d4ed8 100%);
      transition: width 0.05s linear;
    }

    .slider-thumb {
      position: absolute;
      left: var(--vol-pct, 0%);
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--thumb-color, #0284c7);
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
      transform: translateX(-50%);
      pointer-events: none;
      transition: transform 0.1s ease, background-color 0.15s ease;
    }

    .slider-input {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
      cursor: pointer;
      touch-action: pan-y;
    }

    .slider-input:active + .slider-thumb {
      transform: translateX(-50%) scale(1.18);
    }

    .volume-value {
      min-width: 26px;
      text-align: right;
      font-size: 14px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: inherit;
      flex-shrink: 0;
    }

    .volume-bar.fallback {
      justify-content: space-between;
    }

    .step-controls {
      display: flex;
      flex: 1;
      gap: 10px;
      justify-content: flex-end;
    }

    .step-btn {
      appearance: none;
      border: none;
      border-radius: 12px;
      background: rgba(128, 128, 128, 0.16);
      color: inherit;
      height: 36px;
      min-width: 48px;
      flex: 1;
      max-width: 96px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.15s ease, transform 0.1s ease;
    }

    .step-btn:hover {
      background: rgba(128, 128, 128, 0.26);
    }

    .step-btn:active {
      transform: scale(0.95);
    }
  `;
}
