import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../types';
import { launchRemoteActivity, sendRemoteCommand } from '../utils/actions';

@customElement('atgr-keyboard-dialog')
export class AtgrKeyboardDialog extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: String }) remoteEntity = '';
  @property({ type: Boolean }) open = false;

  @state() private text = '';
  @state() private mode: 'activity' | 'command' = 'activity';

  private close(): void {
    this.dispatchEvent(new CustomEvent('atgr-close', { bubbles: true, composed: true }));
  }

  private async submit(e?: Event): Promise<void> {
    e?.preventDefault();
    const val = this.text.trim();
    if (!val || !this.hass || !this.remoteEntity) return;

    if (this.mode === 'activity') {
      await launchRemoteActivity(this.hass, this.remoteEntity, val);
    } else {
      await sendRemoteCommand(this.hass, this.remoteEntity, val);
    }
    this.text = '';
    this.close();
  }

  render() {
    if (!this.open) return nothing;

    return html`
      <div class="backdrop" @click=${this.close}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="header">
            <span>Remote Input / Activity</span>
            <button type="button" class="close-btn" @click=${this.close}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <form @submit=${this.submit}>
            <div class="mode-tabs">
              <button
                type="button"
                class="tab ${this.mode === 'activity' ? 'active' : ''}"
                @click=${() => (this.mode = 'activity')}
              >
                Activity / URI
              </button>
              <button
                type="button"
                class="tab ${this.mode === 'command' ? 'active' : ''}"
                @click=${() => (this.mode = 'command')}
              >
                Command
              </button>
            </div>

            <input
              type="text"
              class="text-input"
              .value=${this.text}
              placeholder=${this.mode === 'activity'
                ? 'e.g. https://www.youtube.com or app package'
                : 'e.g. HOME, DPAD_CENTER'}
              @input=${(e: Event) => {
                this.text = (e.target as HTMLInputElement).value;
              }}
            />

            <div class="actions">
              <button type="button" class="btn secondary" @click=${this.close}>
                Cancel
              </button>
              <button type="submit" class="btn primary" ?disabled=${!this.text.trim()}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  static styles = css`
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: rgba(0, 0, 0, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .dialog {
      width: 100%;
      max-width: 380px;
      border-radius: 18px;
      padding: 18px;
      background: var(--card-background-color, #1e1e1e);
      color: var(--primary-text-color, #ffffff);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
      box-sizing: border-box;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 14px;
    }

    .close-btn {
      appearance: none;
      border: none;
      background: transparent;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
    }

    .mode-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }

    .tab {
      flex: 1;
      padding: 6px 10px;
      border-radius: 10px;
      border: 1px solid rgba(128, 128, 128, 0.3);
      background: transparent;
      color: inherit;
      font-size: 13px;
      cursor: pointer;
    }

    .tab.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .text-input {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid rgba(128, 128, 128, 0.35);
      background: var(--secondary-background-color, #2a2a2a);
      color: inherit;
      font-size: 14px;
      outline: none;
      margin-bottom: 14px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    .btn {
      padding: 8px 16px;
      border-radius: 10px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }

    .btn.secondary {
      background: rgba(128, 128, 128, 0.2);
      color: inherit;
    }

    .btn.primary {
      background: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  `;
}

@customElement('atgr-source-dialog')
export class AtgrSourceDialog extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: String }) entityId = '';
  @property({ type: Boolean }) open = false;

  private close(): void {
    this.dispatchEvent(new CustomEvent('atgr-close', { bubbles: true, composed: true }));
  }

  private async selectSource(source: string): Promise<void> {
    if (!this.hass || !this.entityId) return;
    await this.hass.callService(
      'media_player',
      'select_source',
      { source },
      { entity_id: this.entityId },
    );
    this.close();
  }

  render() {
    if (!this.open) return nothing;
    const entity = this.hass && this.entityId ? this.hass.states[this.entityId] : undefined;
    const sources = entity?.attributes.source_list ?? [];
    const current = entity?.attributes.source;

    return html`
      <div class="backdrop" @click=${this.close}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="header">
            <span>Select Source / App</span>
            <button type="button" class="close-btn" @click=${this.close}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <div class="list">
            ${sources.length === 0
              ? html`<div class="empty">No sources available on ${this.entityId || 'entity'}</div>`
              : sources.map(
                  (src) => html`
                    <button
                      type="button"
                      class="source-item ${src === current ? 'active' : ''}"
                      @click=${() => this.selectSource(src)}
                    >
                      <span>${src}</span>
                      ${src === current
                        ? html`<ha-icon icon="mdi:check"></ha-icon>`
                        : nothing}
                    </button>
                  `,
                )}
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: rgba(0, 0, 0, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .dialog {
      width: 100%;
      max-width: 360px;
      max-height: 75vh;
      display: flex;
      flex-direction: column;
      border-radius: 18px;
      padding: 18px;
      background: var(--card-background-color, #1e1e1e);
      color: var(--primary-text-color, #ffffff);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
      box-sizing: border-box;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .close-btn {
      appearance: none;
      border: none;
      background: transparent;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
    }

    .list {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .source-item {
      appearance: none;
      border: none;
      border-radius: 12px;
      padding: 10px 14px;
      background: var(--secondary-background-color, #2a2a2a);
      color: inherit;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      text-align: left;
    }

    .source-item.active {
      background: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .empty {
      padding: 20px 0;
      text-align: center;
      opacity: 0.65;
      font-size: 14px;
    }
  `;
}
