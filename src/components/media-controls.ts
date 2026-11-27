import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from '../types';
import { sendRemoteCommand } from '../utils/actions';

@customElement('atgr-media-controls')
export class AtgrMediaControls extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: String }) entityId = '';
  @property({ type: String }) remoteEntity = '';

  private get isPlaying(): boolean {
    if (!this.hass || !this.entityId) return false;
    return this.hass.states[this.entityId]?.state === 'playing';
  }

  private async triggerControl(
    mediaService: string,
    remoteCmd: string,
  ): Promise<void> {
    if (!this.hass) return;
    if (this.entityId && this.hass.states[this.entityId]) {
      await this.hass.callService(
        'media_player',
        mediaService,
        undefined,
        { entity_id: this.entityId },
      );
      return;
    }
    if (this.remoteEntity) {
      await sendRemoteCommand(this.hass, this.remoteEntity, remoteCmd);
    }
  }

  render() {
    const playPauseIcon = this.isPlaying ? 'mdi:pause' : 'mdi:play';

    return html`
      <div class="media-bar" role="group" aria-label="Media Controls">
        <button
          type="button"
          class="ctrl-btn"
          aria-label="Previous / Rewind"
          @click=${() => this.triggerControl('media_previous_track', 'MEDIA_REWIND')}
        >
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>

        <button
          type="button"
          class="ctrl-btn primary"
          aria-label="Play / Pause"
          @click=${() => this.triggerControl('media_play_pause', 'MEDIA_PLAY_PAUSE')}
        >
          <ha-icon .icon=${playPauseIcon}></ha-icon>
        </button>

        <button
          type="button"
          class="ctrl-btn"
          aria-label="Next / Fast Forward"
          @click=${() => this.triggerControl('media_next_track', 'MEDIA_FAST_FORWARD')}
        >
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
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

    .media-bar {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 8px;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 18px;
      background: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      color: var(--atgr-el-color, var(--primary-text-color, #ffffff));
    }

    .ctrl-btn {
      appearance: none;
      border: none;
      background: transparent;
      color: inherit;
      flex: 1;
      height: 76%;
      border-radius: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.15s ease, transform 0.1s ease;
      -webkit-tap-highlight-color: transparent;
    }

    .ctrl-btn:hover {
      background: rgba(128, 128, 128, 0.16);
    }

    .ctrl-btn:active {
      transform: scale(0.92);
    }

    .ctrl-btn.primary {
      background: rgba(128, 128, 128, 0.14);
    }

    .ctrl-btn.primary:hover {
      background: rgba(128, 128, 128, 0.24);
    }
  `;
}
