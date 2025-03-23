import React from "react";
import {Badge} from "../../../framework/badge/Badge";
import {SearchIcon} from "../../../framework/icon/SearchIcon";
import {PersonIcon} from "../../../framework/icon/PersonIcon";

import styles from "./LeagueLinks.module.scss";

type LeagueLinksProps = {
    teamId: string;
}

const LeagueLinks: React.FC<LeagueLinksProps> = ({ teamId }) => {
    return (
        <div className={styles.links}>
            <div className={styles.link}>
                <Badge href={`/`} Icon={SearchIcon}>
                    Search all
                </Badge>
            </div>
            <div className={styles.link}>
                <Badge href={`/team/${teamId}/`} Icon={PersonIcon}>
                    Back to team
                </Badge>
            </div>
        </div>
    )
}

export { LeagueLinks }