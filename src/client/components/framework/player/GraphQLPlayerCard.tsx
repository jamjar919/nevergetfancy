import React from 'react';

import { PremierLeaguePlayerId } from '../../../../graphql/Reference';
import { usePlayerCardQuery } from '../../../../graphql/generated/Client';
import { CaptainStatus, PlayerCard } from './PlayerCard';

type GraphQLPlayerCardProps = {
    playerId: PremierLeaguePlayerId;
    captainStatus?: CaptainStatus;
};

const GraphQLPlayerCard: React.FC<GraphQLPlayerCardProps> = ({ playerId, captainStatus }) => {
    const { data } = usePlayerCardQuery({
        variables: {
            playerId,
        },
    });

    if (!data?.premierLeaguePlayer) {
        return null;
    }

    return <PlayerCard player={data.premierLeaguePlayer} captainStatus={captainStatus} />;
};

export { GraphQLPlayerCard };
