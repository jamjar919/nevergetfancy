import React from 'react';

import { PremierLeaguePlayerId } from '../../../../graphql/Reference';
import { usePlayerCardQuery } from '../../../../graphql/generated/Client';
import { PlayerCard } from './PlayerCard';

type GraphQLPlayerCardProps = {
    playerId: PremierLeaguePlayerId;
};

const GraphQLPlayerCard: React.FC<GraphQLPlayerCardProps> = ({ playerId }) => {
    const { data } = usePlayerCardQuery({
        variables: {
            playerId,
        },
    });

    if (!data?.premierLeaguePlayer) {
        return null;
    }

    return <PlayerCard player={data.premierLeaguePlayer} />;
};

export { GraphQLPlayerCard };
