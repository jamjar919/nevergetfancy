import React from "react";
import {Badge} from "../../framework/badge/Badge";
import {SearchIcon} from "../../icon/SearchIcon";
import {PersonIcon} from "../../icon/PersonIcon";

import styles from "./LeagueLinks.module.scss";

type LeagueLinksProps = {
    teamId: string;
}

const LeagueLinks: React.FC<LeagueLinksProps> = ({ teamId }) => {
    return (
        <div className={styles.links}>
            <div className={styles.link}>
                <Badge href={`/`} Icon={SearchIcon}>
                    Search
                </Badge>
            </div>
            <div className={styles.link}>
                <Badge href={`/team/${teamId}/`} Icon={PersonIcon}>
                    Team
                </Badge>
            </div>
        </div>
    )
}

export { LeagueLinks }