export interface HassEntityAttributes {
  friendly_name?: string;
  icon?: string;
  entity_picture?: string;
  supported_features?: number;
  volume_level?: number;
  is_volume_muted?: boolean;
  source?: string;
  source_list?: string[];
  app_name?: string;
  app_id?: string;
  media_title?: string;
  media_artist?: string;
  media_series_title?: string;
  activity?: string;
  [key: string]: unknown;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributes;
  last_changed: string;
  last_updated: string;
}

export interface HassConnection {
  subscribeMessage<T = unknown>(
    callback: (msg: T) => void,
    subscribeMessage: Record<string, unknown>,
  ): Promise<() => Promise<void> | void>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity | undefined>;
  connection: HassConnection;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[] },
  ): Promise<void>;
  localize?(key: string, ...args: unknown[]): string;
}

export type VerticalAlign = 'top' | 'center' | 'bottom';

export interface ActionTarget {
  entity_id?: string | string[];
  device_id?: string | string[];
  area_id?: string | string[];
}

export interface ActionConfig {
  action: 'perform-action' | 'call-service' | 'more-info' | 'navigate' | 'url' | 'toggle' | 'none';
  perform_action?: string;
  service?: string;
  target?: ActionTarget;
  data?: Record<string, unknown>;
  service_data?: Record<string, unknown>;
  navigation_path?: string;
  url_path?: string;
  entity?: string;
}

export interface CustomButtonConfig {
  id: string;
  friendly_name?: string;
  icon?: string;
  color?: string;
  background?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  /** Legacy shorthand support */
  action?: string;
  target?: ActionTarget;
  data?: Record<string, unknown>;
}

export interface ElementConfig {
  id: string;
  columns?: number;
  color?: string;
  background?: string;
}

export interface AndroidTvGridRemoteConfig {
  type: string;
  remote_entity: string;
  entity?: string;
  volume_entity?: string;
  columns?: number;
  align?: VerticalAlign;
  color?: string;
  background?: string;
  elements?: ElementConfig[];
  custom_buttons?: CustomButtonConfig[];
}

export type BuiltInElementKind = 'widget' | 'button' | 'spacer' | 'app';

export interface BuiltInElementMeta {
  id: string;
  label: string;
  kind: BuiltInElementKind;
  defaultColumns: number;
  /** Horizontal bars have fixed 1-unit height regardless of column span. */
  isHorizontalBar: boolean;
  icon?: string;
  remoteCommand?: string;
  appActivity?: string;
  defaultColor?: string;
  defaultBackground?: string;
}

export interface LayoutItem {
  config: ElementConfig;
  colSpan: number;
  /** Height in grid cell units (1 for horizontal bars, colSpan for square/circular elements). */
  rowUnits: number;
  isHorizontalBar: boolean;
}

export interface LayoutRow {
  items: LayoutItem[];
  maxRowUnits: number;
}
