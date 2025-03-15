enum PremierLeaguePlayerTypeDto {
    Defender = 'DEFENDER',
    Forward = 'FORWARD',
    Goalkeeper = 'GOALKEEPER',
    Manager = 'MANAGER',
    Midfielder = 'MIDFIELDER'
}

const convertToPlayerType = (playerType: number): PremierLeaguePlayerTypeDto => {
    switch (playerType) {
        case 1:
            return PremierLeaguePlayerTypeDto.Goalkeeper;
        case 2:
            return PremierLeaguePlayerTypeDto.Defender;
        case 3:
            return PremierLeaguePlayerTypeDto.Midfielder;
        case 4:
            return PremierLeaguePlayerTypeDto.Forward;
        case 5:
            return PremierLeaguePlayerTypeDto.Manager;
        default:
            throw new Error(`Unknown player type: ${playerType}`);
    }
}

export { PremierLeaguePlayerTypeDto, convertToPlayerType }