import type { ActionConfig, CustomButtonConfig, HomeAssistant } from '../types';
import { resolveTemplateValue } from './template';

export function fireHassEvent(
  node: HTMLElement,
  type: string,
  detail?: Record<string, unknown>,
): void {
  node.dispatchEvent(
    new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail,
    }),
  );
}

export async function sendRemoteCommand(
  hass: HomeAssistant,
  remoteEntity: string,
  command: string,
  holdSecs?: number,
): Promise<void> {
  if (!remoteEntity) return;
  const data: Record<string, unknown> = { command };
  if (holdSecs !== undefined && holdSecs > 0) {
    data.hold_secs = holdSecs;
  }
  await hass.callService(
    'remote',
    'send_command',
    data,
    { entity_id: remoteEntity },
  );
}

export async function launchRemoteActivity(
  hass: HomeAssistant,
  remoteEntity: string,
  activity: string,
): Promise<void> {
  if (!remoteEntity) return;
  await hass.callService(
    'remote',
    'turn_on',
    { activity },
    { entity_id: remoteEntity },
  );
}

export function normalizeCustomButtonAction(
  btn: CustomButtonConfig,
  kind: 'tap' | 'hold' | 'double_tap',
): ActionConfig | undefined {
  if (kind === 'tap' && btn.tap_action) return btn.tap_action;
  if (kind === 'hold' && btn.hold_action) return btn.hold_action;
  if (kind === 'double_tap' && btn.double_tap_action) return btn.double_tap_action;

  // Legacy shorthand fallback for tap: action / target / data on CustomButtonConfig
  if (kind === 'tap' && btn.action) {
    return {
      action: 'perform-action',
      perform_action: btn.action,
      target: btn.target,
      data: btn.data,
    };
  }
  return undefined;
}

export async function executeAction(
  node: HTMLElement,
  hass: HomeAssistant,
  actionConfig: ActionConfig | undefined,
  contextEntities: {
    remoteEntity?: string;
    entity?: string;
    volumeEntity?: string;
  },
): Promise<void> {
  if (!actionConfig || actionConfig.action === 'none') return;

  const defaultEntity = contextEntities.entity || contextEntities.remoteEntity;
  const templateVars = {
    remote_entity: contextEntities.remoteEntity,
    entity: contextEntities.entity,
    volume_entity: contextEntities.volumeEntity || contextEntities.entity,
  };

  switch (actionConfig.action) {
    case 'perform-action':
    case 'call-service': {
      const fullService = actionConfig.perform_action || actionConfig.service;
      if (!fullService || !fullService.includes('.')) return;
      const [domain, service] = fullService.split('.', 2);

      const rawData = actionConfig.data ?? actionConfig.service_data;
      const resolvedData = rawData
        ? ((await resolveTemplateValue(hass, rawData, templateVars)) as Record<string, unknown>)
        : undefined;

      const resolvedTarget = actionConfig.target
        ? ((await resolveTemplateValue(hass, actionConfig.target, templateVars)) as {
            entity_id?: string | string[];
          })
        : undefined;

      await hass.callService(domain, service, resolvedData, resolvedTarget);
      break;
    }

    case 'more-info': {
      const entityId = actionConfig.entity || defaultEntity;
      if (entityId) {
        fireHassEvent(node, 'hass-more-info', { entityId });
      }
      break;
    }

    case 'toggle': {
      const entityId = actionConfig.entity || defaultEntity;
      if (entityId) {
        await hass.callService('homeassistant', 'toggle', undefined, {
          entity_id: entityId,
        });
      }
      break;
    }

    case 'navigate': {
      if (actionConfig.navigation_path) {
        history.pushState(null, '', actionConfig.navigation_path);
        fireHassEvent(window as unknown as HTMLElement, 'location-changed', {
          replace: false,
        });
      }
      break;
    }

    case 'url': {
      if (actionConfig.url_path) {
        window.open(actionConfig.url_path, '_blank', 'noopener,noreferrer');
      }
      break;
    }
  }
}
