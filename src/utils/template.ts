import type { HomeAssistant } from '../types';

const JINJA_PATTERN = /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/;

export function hasJinjaTemplate(value: unknown): value is string {
  return typeof value === 'string' && JINJA_PATTERN.test(value);
}

interface RenderTemplateMessage {
  result?: unknown;
  error?: string;
}

/**
 * Renders a Jinja2 template on-demand using Home Assistant's WebSocket API
 * and immediately unsubscribes after receiving the first result to prevent
 * lingering subscriptions or memory leaks.
 */
export async function renderJinjaTemplateOnce(
  hass: HomeAssistant,
  template: string,
  variables?: Record<string, unknown>,
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let settled = false;
    let unsubFn: (() => Promise<void> | void) | undefined;

    const cleanup = () => {
      if (unsubFn) {
        const fn = unsubFn;
        unsubFn = undefined;
        Promise.resolve(fn()).catch(() => {});
      }
    };

    const timer = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        cleanup();
        reject(new Error(`Template render timed out: ${template}`));
      }
    }, 5000);

    hass.connection
      .subscribeMessage<RenderTemplateMessage>(
        (msg) => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timer);
          cleanup();
          if (msg.error) {
            reject(new Error(msg.error));
          } else {
            resolve(msg.result);
          }
        },
        {
          type: 'render_template',
          template,
          ...(variables ? { variables } : {}),
        },
      )
      .then((unsub) => {
        if (settled) {
          Promise.resolve(unsub()).catch(() => {});
        } else {
          unsubFn = unsub;
        }
      })
      .catch((err) => {
        if (!settled) {
          settled = true;
          window.clearTimeout(timer);
          reject(err);
        }
      });
  });
}

/**
 * Recursively resolves any Jinja2 template strings inside an action's data payload.
 */
export async function resolveTemplateValue(
  hass: HomeAssistant,
  value: unknown,
  variables?: Record<string, unknown>,
): Promise<unknown> {
  if (hasJinjaTemplate(value)) {
    return renderJinjaTemplateOnce(hass, value, variables);
  }
  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => resolveTemplateValue(hass, item, variables)));
  }
  if (value !== null && typeof value === 'object') {
    const entries = await Promise.all(
      Object.entries(value as Record<string, unknown>).map(async ([k, v]) => [
        k,
        await resolveTemplateValue(hass, v, variables),
      ]),
    );
    return Object.fromEntries(entries);
  }
  return value;
}
