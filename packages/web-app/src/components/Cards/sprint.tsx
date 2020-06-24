import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { getCurrentUrl, route } from 'preact-router';
import { MoreVertical } from 'preact-feather';
import { useDispatch } from 'react-redux';

import { Modal } from 'components/Modal';
import { Sprint } from 'models/Sprint';
import { setCurrentSprint } from 'stores/userLocationStore';
import { useLtsWarning } from 'services/notification/hooks';

interface IProps {
    sprint: Sprint;
    closed: boolean;
    updateSprint: (sprint: Sprint) => void;
}

export const SprintCard: FunctionalComponent<IProps> = (props: IProps) => {
    const dispatch = useDispatch();

    const [showClosureModal, setShowClosureModal] = useState(false);
    const [showOpeningModal, setShowOpeningModal] = useState(false);

    const linkTo = (): void => {
        route(`${getUrlSubstringAndFix()}/sprint/${props.sprint.id}/`);
        dispatch(setCurrentSprint(props.sprint));
    };

    const closureModalContent = <div>Are you sure you want to close this sprint?</div>;
    const openingModalContent = <div>Are you sure you want to open this sprint?</div>;

    return (
        <Fragment>
            {showClosureModal ? (
                <Modal
                    title="Close Sprint?"
                    content={closureModalContent}
                    submit={useLtsWarning}
                    close={(): void => setShowClosureModal(false)}
                />
            ) : showOpeningModal ? (
                <Modal
                    title="Open Sprint?"
                    content={openingModalContent}
                    submit={useLtsWarning}
                    close={(): void => setShowOpeningModal(false)}
                />
            ) : null}

            <div class="lst-itm-container" onClick={linkTo}>
                <div class="px-4 py-2 flex min-w-0 justify-between">
                    <div class="truncate">
                        {props.sprint.title} - {props.sprint.description}
                    </div>
                    <MoreVertical
                        class="hover:text-orange-600"
                        onClick={(e: MouseEvent): void => {
                            e.stopPropagation();
                            if (!props.closed) setShowClosureModal(true);
                            else setShowOpeningModal(true);
                        }}
                    />
                </div>
                <div class="px-4 py-2 flex min-w-0 justify-between">
                    <p class="itm-description">
                        {`${new Date(props.sprint.startDate).toLocaleDateString('en-GB')} 
                        - ${new Date(props.sprint.dueDate).toLocaleDateString('en-GB')}`}
                    </p>
                    <div>
                        <span class="num-issues tooltip">
                            {props.sprint.totalNumberOfIssues ? props.sprint.totalNumberOfIssues : 0}
                            <span class="tooltip-text">Total Number of Issues Assigned to Sprint</span>
                        </span>
                        <span class="story-pnt tooltip">
                            {props.sprint.totalStoryPoint ? props.sprint.totalStoryPoint : 0}
                            <span class="tooltip-text">Total Number of Story Points Assigned to Sprint</span>
                        </span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const getUrlSubstringAndFix = (): string => {
    const currentUrl = getCurrentUrl().replace(/\D+$/g, '');
    if (currentUrl.substring(currentUrl.length - 1) == '/') return currentUrl.substring(0, currentUrl.length - 1);
    return currentUrl;
};
