import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type PadZone = 'up' | 'down' | 'left' | 'right' | 'center';

const ZONE_COMMANDS: Record<PadZone, string> = {
  up: 'DPAD_UP',
  down: 'DPAD_DOWN',
  left: 'DPAD_LEFT',
  right: 'DPAD_RIGHT',
  center: 'DPAD_CENTER',
};

const SWIPE_THRESHOLD_PX = 24;
const HOLD_DELAY_MS = 400;
const HOLD_INTERVAL_MS = 150;

@customElement('atgr-touch-pad')
export class AtgrTouchPad extends LitElement {
  @property({ type: Boolean }) disabled = false;

  @state() private activeZone: PadZone | null = null;

  private pointerId: number | null = null;
  private startX = 0;
  private startY = 0;
  private pressedZone: PadZone | null = null;
  private swiped = false;
  private holdRepeated = false;
  private holdDelayTimer: number | null = null;
  private holdRepeatTimer: number | null = null;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearTimers();
  }

  private clearTimers(): void {
    if (this.holdDelayTimer !== null) {
      window.clearTimeout(this.holdDelayTimer);
      this.holdDelayTimer = null;
    }
    if (this.holdRepeatTimer !== null) {
      window.clearInterval(this.holdRepeatTimer);
      this.holdRepeatTimer = null;
    }
  }

  private emitCommand(zone: PadZone): void {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('atgr-command', {
        bubbles: true,
        composed: true,
        detail: { command: ZONE_COMMANDS[zone] },
      }),
    );
  }

  private detectZoneFromEvent(e: PointerEvent): PadZone {
    const target = e.target as HTMLElement | null;
    const zoneAttr = target?.closest('[data-zone]')?.getAttribute('data-zone') as PadZone | null;
    if (zoneAttr && zoneAttr in ZONE_COMMANDS) {
      return zoneAttr;
    }
    return 'center';
  }

  private onPointerDown = (e: PointerEvent): void => {
    if (this.disabled || (e.pointerType === 'mouse' && e.button !== 0)) return;
    this.clearTimers();

    const container = e.currentTarget as HTMLElement;
    container.setPointerCapture?.(e.pointerId);

    this.pointerId = e.pointerId;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.swiped = false;
    this.holdRepeated = false;
    this.pressedZone = this.detectZoneFromEvent(e);
    this.activeZone = this.pressedZone;

    // Enable hold-to-repeat for directional zones
    if (this.pressedZone !== 'center') {
      const zone = this.pressedZone;
      this.holdDelayTimer = window.setTimeout(() => {
        if (this.swiped) return;
        this.holdRepeated = true;
        this.emitCommand(zone);
        this.holdRepeatTimer = window.setInterval(() => {
          this.emitCommand(zone);
        }, HOLD_INTERVAL_MS);
      }, HOLD_DELAY_MS);
    }
  };

  private onPointerMove = (e: PointerEvent): void => {
    if (this.pointerId !== e.pointerId || this.swiped) return;
    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;
    const dist = Math.hypot(dx, dy);

    if (dist >= SWIPE_THRESHOLD_PX) {
      this.swiped = true;
      this.clearTimers();

      const dir: PadZone =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? 'right'
            : 'left'
          : dy > 0
            ? 'down'
            : 'up';

      this.activeZone = dir;
      this.emitCommand(dir);
    }
  };

  private releaseCapture(e: PointerEvent): void {
    const container = e.currentTarget as HTMLElement | null;
    if (container?.hasPointerCapture?.(e.pointerId)) {
      container.releasePointerCapture(e.pointerId);
    }
  }

  private onPointerUp = (e: PointerEvent): void => {
    if (this.pointerId !== e.pointerId) return;
    this.clearTimers();
    this.releaseCapture(e);

    if (!this.swiped && !this.holdRepeated && this.pressedZone) {
      this.emitCommand(this.pressedZone);
    }

    this.resetPointerState();
  };

  private onPointerCancel = (e: PointerEvent): void => {
    if (this.pointerId !== e.pointerId) return;
    this.clearTimers();
    this.releaseCapture(e);
    this.resetPointerState();
  };

  private resetPointerState(): void {
    this.pointerId = null;
    this.pressedZone = null;
    this.swiped = false;
    this.holdRepeated = false;
    this.activeZone = null;
  }

  render() {
    return html`
      <div
        class="pad-root"
        role="group"
        aria-label="Directional Touch Pad"
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerCancel}
        @lostpointercapture=${this.onPointerCancel}
      >
        <svg class="pad-ring" viewBox="0 0 200 200" aria-hidden="true">
          <!-- Outer base circle -->
          <circle class="ring-bg" cx="100" cy="100" r="96" />

          <!-- Up sector (-135deg to -45deg) -->
          <path
            data-zone="up"
            class="sector ${this.activeZone === 'up' ? 'active' : ''}"
            d="M 100 100 L 32.12 32.12 A 96 96 0 0 1 167.88 32.12 Z"
          />
          <!-- Right sector (-45deg to 45deg) -->
          <path
            data-zone="right"
            class="sector ${this.activeZone === 'right' ? 'active' : ''}"
            d="M 100 100 L 167.88 32.12 A 96 96 0 0 1 167.88 167.88 Z"
          />
          <!-- Down sector (45deg to 135deg) -->
          <path
            data-zone="down"
            class="sector ${this.activeZone === 'down' ? 'active' : ''}"
            d="M 100 100 L 167.88 167.88 A 96 96 0 0 1 32.12 167.88 Z"
          />
          <!-- Left sector (135deg to 225deg) -->
          <path
            data-zone="left"
            class="sector ${this.activeZone === 'left' ? 'active' : ''}"
            d="M 100 100 L 32.12 167.88 A 96 96 0 0 1 32.12 32.12 Z"
          />

          <!-- Diagonal divider lines -->
          <line class="divider" x1="32.12" y1="32.12" x2="167.88" y2="167.88" />
          <line class="divider" x1="167.88" y1="32.12" x2="32.12" y2="167.88" />

          <!-- Subtle directional chevrons -->
          <polyline class="chevron" points="93,30 100,23 107,30" />
          <polyline class="chevron" points="170,93 177,100 170,107" />
          <polyline class="chevron" points="93,170 100,177 107,170" />
          <polyline class="chevron" points="30,93 23,100 30,107" />
        </svg>

        <button
          type="button"
          class="center-btn ${this.activeZone === 'center' ? 'active' : ''}"
          data-zone="center"
          aria-label="OK"
          tabindex="0"
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.emitCommand('center');
            }
          }}
        ></button>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      user-select: none;
      -webkit-user-select: none;
    }

    .pad-root {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      touch-action: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.22),
        inset 0 1px 1px rgba(255, 255, 255, 0.08);
      overflow: hidden;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .pad-ring {
      width: 100%;
      height: 100%;
      display: block;
    }

    .ring-bg {
      fill: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      stroke: rgba(128, 128, 128, 0.25);
      stroke-width: 1.5;
    }

    .sector {
      fill: transparent;
      transition: fill 0.12s ease;
    }

    @media (hover: hover) {
      .sector:hover {
        fill: rgba(128, 128, 128, 0.12);
      }

      .center-btn:hover {
        filter: brightness(1.08);
      }
    }

    .sector.active {
      fill: rgba(128, 128, 128, 0.28);
    }

    .divider {
      stroke: rgba(128, 128, 128, 0.22);
      stroke-width: 1.5;
      pointer-events: none;
    }

    .chevron {
      fill: none;
      stroke: var(--atgr-el-color, var(--primary-text-color, #ffffff));
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: 0.45;
      pointer-events: none;
    }

    .center-btn {
      position: absolute;
      width: 36%;
      height: 36%;
      border-radius: 50%;
      border: 1px solid rgba(128, 128, 128, 0.28);
      background: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      box-shadow:
        0 2px 8px rgba(0, 0, 0, 0.28),
        inset 0 2px 4px rgba(255, 255, 255, 0.08);
      cursor: pointer;
      padding: 0;
      outline: none;
      transition: transform 0.1s ease, filter 0.12s ease, box-shadow 0.12s ease;
      -webkit-tap-highlight-color: transparent;
    }

    .center-btn.active {
      transform: scale(0.94);
      box-shadow:
        inset 0 2px 6px rgba(0, 0, 0, 0.35);
    }
  `;
}
