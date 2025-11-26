import { useCallback } from 'react';
import { AdminUserInfos } from '@features/admin-users';
import { ImageToolsInfos } from '@features/image-tools';
import { AccountInfo } from '@features/account';

import { useAvailableServiceList } from '../../api/use-available-service-list';

import { ServiceItem } from '../service-item';

import './style.css';

export type ServiceInfo = {
  name: string;
  url: string;
  icon?: string;
  version?: string;
  description?: string;
  disabled?: boolean; // Optional prop to disable the link
  badge?: string; // Optional role for admin tools
};

const toolsServices: ServiceInfo[] = [...ImageToolsInfos];

const adminServices: ServiceInfo[] = [...AdminUserInfos];

const otherServices: ServiceInfo[] = [...AccountInfo];

const getServicesBadges = (servicesInfos: ServiceInfo[]): string[] => {
  return [
    ...new Set(
      servicesInfos
        .map(tool =>
          'badge' in tool && typeof tool.badge === 'string' ? tool.badge : '',
        )
        .filter((badge): badge is string => badge.trim().length > 0),
    ),
  ];
};

const toolsServicesBadges = getServicesBadges(toolsServices);
const adminServicesBadges = getServicesBadges(adminServices);
const otherServicesBadges = getServicesBadges(otherServices);

export type ServiceListProps = {
  className?: string;
};

export const ServiceList = ({ className = '' }: ServiceListProps) => {
  const availableToolServices = useAvailableServiceList(toolsServicesBadges);
  const avaialableAdminServices = useAvailableServiceList(adminServicesBadges);
  const availableOtherServices = useAvailableServiceList(otherServicesBadges);

  const listTools = useCallback(
    (badgesList: string[], serviceInfoList: ServiceInfo[]) => {
      return badgesList.map(toolName => {
        const servicesData = serviceInfoList.filter(
          t => 'badge' in t && t.badge === toolName,
        );
        if (!servicesData.length) {
          return null;
        }
        return servicesData.map(toolData => (
          <ServiceItem
            key={'url' in toolData ? toolData.url : toolName}
            name={toolData.name}
            version={'version' in toolData ? toolData.version : ''}
            description={'description' in toolData ? toolData.description : ''}
            url={toolData.url}
            disabled={toolData.disabled || false}
          />
        ));
      });
    },
    [],
  );

  return (
    <>
      {availableToolServices.length > 0 && (
        <div className={`available-service-list ${className}`}>
          <div className="available-service-list__header">
            <h2>Outils</h2>
          </div>
          <div className="available-service-list__elements">
            {listTools(availableToolServices, toolsServices)}
          </div>
        </div>
      )}
      {avaialableAdminServices.length > 0 && (
        <div className={`available-service-list ${className}`}>
          <div className="available-service-list__header">
            <h2>Admin</h2>
            <p>Outils disponibles pour les administrateurs ou ROOT</p>
          </div>
          <div className="available-service-list__elements">
            {listTools(avaialableAdminServices, adminServices)}
          </div>
        </div>
      )}
      {availableOtherServices.length > 0 && (
        <div className={`available-service-list ${className}`}>
          <div className="available-service-list__header">
            <h2>Autre</h2>
            <p>Outils disponibles pour tous les utilisateurs</p>
          </div>
          <div className="available-service-list__elements">
            {listTools(availableOtherServices, otherServices)}
          </div>
        </div>
      )}
    </>
  );
};
