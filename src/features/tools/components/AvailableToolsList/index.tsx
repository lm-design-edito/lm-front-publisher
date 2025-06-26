import { useCallback } from 'react';
import { AdminUserToolsInfo } from '../../../admin-users/config/admin-users-tools-info';
import { ImageToolsInfos } from '../../../images/config/image-tools-infos';
import { AccountToolsInfo } from '../../../account/config/account-tools-info';

import { useAvailableToolList } from '../../api/use-available-tool-list';
import Tool from '../Tool';
import './style.css';

type AvailableToolsListProps = {
  className?: string;
};

type Tool = {
  name: string;
  url: string;
  icon?: string;
  description?: string;
  disabled?: boolean; // Optional prop to disable the link
  badge?: string; // Optional role for admin tools
};

const tools: Tool[] = [...ImageToolsInfos];

const adminTools: Tool[] = [...AdminUserToolsInfo];

const otherTools: Tool[] = [...AccountToolsInfo];

const getToolBadges = (tools: Tool[]): string[] => {
  return [
    ...new Set(
      tools
        .map(tool =>
          'badge' in tool && typeof tool.badge === 'string' ? tool.badge : '',
        )
        .filter((badge): badge is string => badge.trim().length > 0),
    ),
  ];
};

const toolsBadges = getToolBadges(tools);
const adminToolsBadges = getToolBadges(adminTools);
const otherToolsBadges = getToolBadges(otherTools);

const AvailableToolsList = ({ className = '' }: AvailableToolsListProps) => {
  const availableTools = useAvailableToolList(toolsBadges);
  const availableAdminTools = useAvailableToolList(adminToolsBadges);
  const availableOtherTools = useAvailableToolList(otherToolsBadges);

  const listTools = useCallback((badgesList: string[], toolsList: Tool[]) => {
    return badgesList.map(toolName => {
      const toolDatas = toolsList.filter(
        t => 'badge' in t && t.badge === toolName,
      );
      if (!toolDatas.length) {
        return null;
      }
      return toolDatas.map(toolData => (
        <Tool
          key={'url' in toolData ? toolData.url : toolName}
          name={toolData.name}
          description={'description' in toolData ? toolData.description : ''}
          url={toolData.url}
          disabled={toolData.disabled || false}
        />
      ));
    });
  }, []);

  return (
    <>
      {availableTools.length > 0 && (
        <div className={`available-services-list ${className}`}>
          <div className="available-services-list__header">
            <h2>Outils</h2>
          </div>
          <div className="available-services-list__elements">
            {listTools(availableTools, tools)}
          </div>
        </div>
      )}
      {availableAdminTools.length > 0 && (
        <div className={`available-services-list ${className}`}>
          <div className="available-services-list__header">
            <h2>Admin</h2>
            <p>Outils disponibles pour les administrateurs ou ROOT</p>
          </div>
          <div className="available-services-list__elements">
            {listTools(availableAdminTools, adminTools)}
          </div>
        </div>
      )}
      {availableOtherTools.length > 0 && (
        <div className={`available-services-list ${className}`}>
          <div className="available-services-list__header">
            <h2>Autre</h2>
            <p>Outils disponibles pour tous les utilisateurs</p>
          </div>
          <div className="available-services-list__elements">
            {listTools(availableOtherTools, otherTools)}
          </div>
        </div>
      )}
    </>
  );
};
export default AvailableToolsList;
