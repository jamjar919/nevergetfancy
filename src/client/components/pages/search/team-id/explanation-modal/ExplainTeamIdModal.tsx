import React from 'react';
import ReactModal from 'react-modal';

import styles from './ExplainTeamIdModal.module.scss';

type ExplainTeamIdModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};

const ExplainTeamIdModal: React.FC<ExplainTeamIdModalProps> = (props) => {
    const { isOpen, onRequestClose } = props;

    ReactModal.setAppElement('body');

    return (
        // @ts-ignore
        <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modal}>
            <h1 className={styles.title}>
                How can I find my Team ID?{' '}
                <button className={styles.close} onClick={() => onRequestClose()}>
                    Close
                </button>
            </h1>
            <p>
                Your Team ID is the unique identifier for your team. You can find it in the URL of
                your team's page.
            </p>
            <ol>
                <li>
                    Go to your team's gameweek history page. You can find it from the{' '}
                    <a target="_blank" href={'https://fantasy.premierleague.com/my-team'}>
                        Pick Team
                    </a>{' '}
                    screen, then by selecting the "Gameweek History" link on the right hand side
                </li>
                <li>
                    Look at the URL in your browser's address bar. It will have a number in it - eg
                    https://fantasy.premierleague.com/entry/
                    <strong>2458154</strong>/history
                </li>
                <li>Copy that number, and paste it into the "Team ID" field.</li>
            </ol>
            <p>
                Tip: if you want to look at your friends' teams, you don't have to find their ids in
                the same way. Just navigate to your leagues page on NeverGetFancy and you'll be able
                to search for them.
            </p>
        </ReactModal>
    );
};

export { ExplainTeamIdModal };
