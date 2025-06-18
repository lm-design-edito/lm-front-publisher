import { useCallback } from 'react';
import { AdminUserTools } from '../../../admin-users/config/admin-users-tools';
import { ImageTools } from '../../../images/config/image-tools';

import { useAvailableToolList } from '../../api/use-available-tool-list';
import Tool from '../Tool';
import './style.css';

type AvailableToolsListProps = {
    className?: string;
}

type Tool = {
    name: string;
    url: string;
    icon?: string;
    description?: string;
    role?: string; // Optional role for admin tools
};

const tools: Tool[] = [
    ...ImageTools
]

const adminTools: Tool[] = [  
    ...AdminUserTools
];

const getRoles = (tools: Tool[]) => {
    return tools.map(tool => 'role' in tool ? tool.role : '').filter(role => role !== undefined && role !== null);
}

const toolsRoles = getRoles(tools);
const adminToolsRoles = getRoles(adminTools);

const AvailableToolsList = ({ className }: AvailableToolsListProps) => {
    const availableTools = useAvailableToolList(toolsRoles); 
    const availableAdminTools = useAvailableToolList(adminToolsRoles);
    
    const listTools = useCallback((rolesList: string[], toolsList: Tool[]) => {
        return rolesList.map(toolName => {
            const toolData = toolsList.find(t => 'role' in t && t.role === toolName);
            if (!toolData) {
                return null;
            }
            return <Tool
                key={'role' in toolData ? toolData.role : toolName}
                name={toolData.name}
                description={'description' in toolData ? toolData.description : ''}
                url={toolData.url}
            />
        });
    }, []);

    return (
        <>
            {availableTools.length > 0 && 
                <div className={`available-services-list ${className || ''}`}>
                    <h2>Outils</h2>
                    <div className="available-services-list__elements">
                        {listTools(availableTools, tools)}
                    </div>
                </div>
            }
            {availableAdminTools.length > 0 && 
                <div className={`available-services-list ${className || ''}`}>
                    <h2>Admin</h2>
                    <div className="available-services-list__elements">
                        {listTools(availableAdminTools, adminTools)}
                    </div>
                </div>
            }
        </>
    );
}
export default AvailableToolsList;