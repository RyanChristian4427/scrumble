import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getCurrentUrl } from 'preact-router';

import { BreadCrumbs } from 'components/BreadCrumbs';
import { SideBar } from 'components/Core/SideBar';
import { workspaces } from 'data';
import WorkspaceEdit from './edit';
import WorkspaceMetrics from './metrics';
import { sideNavItems } from './util';
import BacklogPlanning from './backlogPlanning';
import SprintPlanning from './sprintPlannning';

interface IProps {
    workspaceId: number;
}

const Workspace: FunctionalComponent<IProps> = (props: IProps) => {
    const [workspaceName, setWorkspaceName] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<string>('');
    const [form, setForm] = useState<ComponentChild>(null);

    const currentUrl = getCurrentUrl();

    useEffect(() => {
        for (const workspace of workspaces) {
            if (workspace.id == props.workspaceId) {
                setWorkspaceName(workspace.name);
            }
        }
        if (currentUrl.includes('metrics')) {
            setCurrentPage('Metrics');
            setForm(<WorkspaceMetrics />);
        } else if (currentUrl.includes('edit')) {
            setCurrentPage('Edit');
            setForm(<WorkspaceEdit />);
        } else if (currentUrl.includes('sprintPlanning')) {
            setCurrentPage('Sprint Planning');
            setForm(<SprintPlanning />);
        } else {
            setCurrentPage('Backlog Planning');
            setForm(<BacklogPlanning />);
        }
    }, [props.workspaceId, currentUrl]);

    return (
        <div class="page">
            <div class="flex">
                <SideBar items={sideNavItems} />
                <div class="main-content">
                    <BreadCrumbs
                        workspaceId={props.workspaceId}
                        workspaceName={workspaceName}
                        currentPage={currentPage}
                    />
                    {form}
                </div>
            </div>
        </div>
    );
};

export default Workspace;
