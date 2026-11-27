# Android TV Grid Remote (`custom:android-tv-grid-remote`)

A modular, grid-based Android TV & universal remote card for Home Assistant Lovelace.

## Features

- **Grid Row-Packing Layout**: Configure `columns` (e.g., `4`) and arrange elements freely. Button-like elements & `touch_pad` automatically maintain `height = width` (square/circular), while horizontal bars (`volume`, `media_controls`, `now_playing`) stay a compact 1-unit height.
- **Row Vertical Alignment**: `align: top | center | bottom` when mixing `2x2` and `1x1` elements in the same row.
- **Touch Pad (`touch_pad`)**: Circular 5-zone D-Pad with click, full-area swipe gestures (`touch-action: none`), and hold-to-repeat.
- **Smart Volume Bar (`volume`)**: Uses `volume_entity` (falls back to `entity`), auto-hides mute button if `is_volume_muted` is unsupported, and auto-falls back to `Mute / - / +` buttons when absolute `volume_level` is unsupported.
- **Multi-Format Icons**: Supports `mdi:` (and HA icon packs), image URLs, Base64 data URIs, and inline `<svg>` (sanitized with `currentColor` inheritance).
- **Custom Buttons + On-Demand Jinja2**: Standard HA `tap_action` / `hold_action` / `double_tap_action`, with on-demand one-shot Jinja2 rendering inside `data` (zero lingering WebSocket subscriptions).
- **Visual UI Editor**: Configure entities, layout order (drag & drop or arrows), column spans, color overrides, and custom buttons directly from the Lovelace UI.

## Configuration Example

```yaml
type: custom:android-tv-grid-remote
remote_entity: remote.living_room_tv
entity: media_player.living_room_tv
volume_entity: media_player.sonos_beam
columns: 4
align: top
elements:
  - id: now_playing
    columns: 4
  - id: touch_pad
    columns: 2
  - id: power
    columns: 1
    color: "#ff5252"
  - id: home
    columns: 1
  - id: back
    columns: 1
  - id: keyboard
    columns: 1
  - id: volume
    columns: 4
  - id: media_controls
    columns: 4
  - id: my_netflix
    columns: 1
    background: "#e50914"
custom_buttons:
  - id: my_netflix
    friendly_name: Netflix
    icon: mdi:netflix
    color: "#ffffff"
    tap_action:
      action: perform-action
      perform_action: media_player.select_source
      target:
        entity_id: media_player.living_room_tv
      data:
        source: "{{ 'Netflix' }}"
```

## Build

```bash
npm install
npm run build
```

The compiled bundle is output to `dist/android-tv-grid-remote.js`.
