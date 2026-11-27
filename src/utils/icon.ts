import { html, nothing, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const FORBIDDEN_SVG_TAGS = new Set([
  'script',
  'foreignobject',
  'iframe',
  'object',
  'embed',
  'audio',
  'video',
]);

function sanitizeSvg(rawSvg: string): string | null {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawSvg.trim(), 'image/svg+xml');
    const parseError = doc.querySelector('parsererror');
    if (parseError) return null;

    const svg = doc.documentElement;
    if (!svg || svg.tagName.toLowerCase() !== 'svg') return null;

    const walk = (el: Element) => {
      const children = Array.from(el.children);
      for (const child of children) {
        if (FORBIDDEN_SVG_TAGS.has(child.tagName.toLowerCase())) {
          child.remove();
          continue;
        }
        walk(child);
      }

      for (const attr of Array.from(el.attributes)) {
        const name = attr.name.toLowerCase();
        const val = attr.value.trim().toLowerCase();
        if (
          name.startsWith('on') ||
          ((name === 'href' || name === 'xlink:href') && val.startsWith('javascript:'))
        ) {
          el.removeAttribute(attr.name);
        }
      }
    };

    walk(svg);

    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    if (!svg.hasAttribute('fill')) {
      svg.setAttribute('fill', 'currentColor');
    }

    return new XMLSerializer().serializeToString(svg);
  } catch {
    return null;
  }
}

export function renderIcon(icon?: string): TemplateResult | typeof nothing {
  if (!icon) return nothing;
  const trimmed = icon.trim();
  if (!trimmed) return nothing;

  // 1. Inline <svg>
  if (trimmed.toLowerCase().startsWith('<svg')) {
    const cleanSvg = sanitizeSvg(trimmed);
    if (!cleanSvg) return nothing;
    return html`<span class="atgr-svg-icon">${unsafeHTML(cleanSvg)}</span>`;
  }

  // 2. Image URL or Base64 data URI
  if (
    trimmed.startsWith('data:image/') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/local/') ||
    trimmed.startsWith('/api/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('../')
  ) {
    return html`<img class="atgr-img-icon" src=${trimmed} draggable="false" alt="" />`;
  }

  // 3. Home Assistant icon (mdi:*, phu:*, si:*, etc.)
  return html`<ha-icon .icon=${trimmed}></ha-icon>`;
}
