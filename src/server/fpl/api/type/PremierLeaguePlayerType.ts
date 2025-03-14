enum PremierLeaguePlayerType {
    Goalkeeper = 'GKP',
    Defender = 'DEF',
    Midfielder = 'MID',
    Forward = 'FWD',
    Manager = 'MNG',
}

const convertToPlayerType = (playerType: number): PremierLeaguePlayerType => {
    switch (playerType) {
        case 1:
            return PremierLeaguePlayerType.Goalkeeper;
        case 2:
            return PremierLeaguePlayerType.Defender;
        case 3:
            return PremierLeaguePlayerType.Midfielder;
        case 4:
            return PremierLeaguePlayerType.Forward;
        case 5:
            return PremierLeaguePlayerType.Manager;
        default:
            throw new Error(`Unknown player type: ${playerType}`);
    }
}

export { PremierLeaguePlayerType, convertToPlayerType }