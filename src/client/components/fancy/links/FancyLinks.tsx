import React from "react";
import {Badge} from "../../framework/badge/Badge";
import {OpenExternalIcon} from "../../icon/OpenExternalIcon";
import {GroupsIcon} from "../../icon/GroupsIcon";

import styles from "./FancyLinks.module.scss";
import {SearchIcon} from "../../icon/SearchIcon";

type FancyLinksProps = {
    teamId: string;
    currentEvent: number;
}

const FancyLinks: React.FC<FancyLinksProps> = ({ teamId, currentEvent }) => {
    return (
        <div className={styles.links}>
            <div className={styles.link}>
                <Badge href={`/`} Icon={SearchIcon}>
                    Search
                </Badge>
            </div>
            <div className={styles.link}>
                <Badge href={`/team/${teamId}/leagues/`} Icon={GroupsIcon}>
                    Leagues
                </Badge>
            </div>
            <div className={styles.link}>
                <Badge
                    href={`https://fantasy.premierleague.com/entry/${teamId}/event/${currentEvent}`}
                    target="_blank"
                    Icon={OpenExternalIcon}
                >
                    Open in FPL
                </Badge>
            </div>
        </div>
    )
}

export { FancyLinks }