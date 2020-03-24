import { FunctionalComponent, h } from 'preact';
import { useEffect, useContext } from 'preact/hooks';

import { WorkspaceCard } from 'components/Cards/workspace';
import { SearchBar } from 'components/SearchBar';
import { workspaces } from 'data';

import { fetchUserInfo } from 'services/api/auth';
import { AuthStoreContext } from 'stores';

const Home: FunctionalComponent = () => {
    const authStore = useContext(AuthStoreContext);

    const handleOnKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
            console.log('Enter selected');
        }
    };

    const handleOnInput = (e: any): void => console.log((e.target as HTMLSelectElement).value);

    useEffect(() => {
        fetchUserInfo().then((response) => authStore.setCurrentUser(response));
        localStorage.setItem('activeListItem', String(0));
    }, [authStore]);

    return (
        <div class="mt-16 flex justify-center bg-blue-100">
            <div class="mx-3 flex justify-center flex-col w-3/4">
                <div class="create-bar">
                    <h1 class="page-heading">Your Workspaces</h1>
                    <button class="btn-create my-auto">New Workspace</button>
                </div>
                <SearchBar
                    placeholder="Search by name"
                    handleOnInput={handleOnInput}
                    handleOnKeyDown={handleOnKeyDown}
                />
                <div class="rounded bg-white overflow-hidden shadow-lg">
                    {workspaces.map((workspace, index) => {
                        return (
                            <WorkspaceCard
                                key={index}
                                id={workspace.id}
                                name={workspace.name}
                                description={workspace.description}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
