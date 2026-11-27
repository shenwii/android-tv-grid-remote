import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HassEntity, HomeAssistant } from '../types';
import { fireHassEvent } from '../utils/actions';

@customElement('atgr-now-playing')
export class AtgrNowPlaying extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: String }) entityId = '';
  @property({ type: String }) remoteEntity = '';

  private get targetEntity(): HassEntity | undefined {
    if (!this.hass) return undefined;
    if (this.entityId && this.hass.states[this.entityId]) {
      return this.hass.states[this.entityId];
    }
    if (this.remoteEntity && this.hass.states[this.remoteEntity]) {
      return this.hass.states[this.remoteEntity];
    }
    return undefined;
  }

  private openMoreInfo(): void {
    const entity = this.targetEntity;
    if (entity) {
      fireHassEvent(this, 'hass-more-info', { entityId: entity.entity_id });
    }
  }

  render() {
    const entity = this.targetEntity;
    const attrs = entity?.attributes ?? {};
    const title =
      attrs.media_title ||
      attrs.app_name ||
      attrs.source ||
      attrs.activity ||
      attrs.friendly_name ||
      'Android TV';
    const subtitle =
      attrs.media_title && (attrs.app_name || attrs.source)
        ? `${attrs.app_name || attrs.source} · ${entity?.state ?? ''}`
        : entity?.state ?? 'unavailable';
    const picture = attrs.entity_picture;

    return html`
      <button
        type="button"
        class="now-playing"
        @click=${() => this.openMoreInfo()}
      >
        <div class="thumb">
          ${picture
            ? html`<img src=${picture} alt="" draggable="false" />`
            : html`<ha-icon icon="mdi:television"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${title}</div>
          <div class="subtitle">${subtitle}</div>
        </div>
        <div class="state-dot ${entity?.state === 'playing' || entity?.state === 'on' ? 'active' : ''}"></div>
      </button>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .now-playing {
      appearance: none;
      border: none;
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
      text-align: left;
      cursor: pointer;
      transition: filter 0.15s ease;
      -webkit-tap-highlight-color: transparent;
    }

    .now-playing:hover {
      filter: brightness(1.06);
    }

    .thumb {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      overflow: hidden;
      background: rgba(128, 128, 128, 0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .meta {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .subtitle {
      font-size: 12px;
      opacity: 0.7;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: capitalize;
    }

    .state-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(128, 128, 128, 0.45);
      flex-shrink: 0;
    }

    .state-dot.active {
      background: #22c55e;
      box-shadow: 0 0 8px rgba(34, 197, 94, 0.65);
    }
  `;
}
