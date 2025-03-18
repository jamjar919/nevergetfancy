// Salah has 306 points currently so that's the maximum you could have lost out on
const getSummaryOfPerformance = (points: number): string => {
    if (points < -300) {
        return "👑 Congratulations! You lost over 300 points due to your obsession with getting fancy. " +
            "Here's a crown for your troubles. Shame about your rank though.";
    }

    if (points < -200) {
        return "💎 You lost over 200 points due to your fancy ways. " +
            "That's a lot of points you could have had in the bank. Shame.";
    }

    if (points < -100) {
        return "💍 You lost over 100 points. " +
            "Getting fancy on occasion is fine, but you're taking it too far. " +
            "I'm sure your Mini League rivals are enjoying it.";
    }

    if (points < -75) {
        return "🍾 You lost over 75 points. " +
            "Guessing you're not a Liverpool fan. Glass of champagne for the fancy lad?";
    }

    if (points < -50) {
        return "🙅 You lost more than 50 points. " +
            "Couple of bad decisions? Palmer (c) in GW19?";
    }

    if (points < -25) {
        return "🤦 You lost over 25 points. " +
            "A couple of hits and misses, but unfortunately for you, they were mostly misses.";
    }

    if (points === -14) {
        return "🤦 You lost 14 points. " +
            "That's how many points Salah scored in his first game.";
    }

    if (points === -10) {
        return "🤦 You lost 10 points. " +
            "That's how many points Salah scored in his second game.";
    }

    if (points < -10) {
        return "🍺 You lost over 10 points. " +
            "You're not such a fan of getting fancy. Have a pint of bitter - you're down to earth.";
    }

    if (points < 0) {
        return "☕ You lost under 10 points! " +
            "You don't like to get fancy. We respect that here.";
    }

    if (points === 0) {
        return "Nothing ventured, nothing gained. Permacap?";
    }

    if (points < 10) {
        return "🎉 You gained points! " +
            "Couple of lucky picks? Had Haaland at the start?";
    }

    if (points < 25) {
        return "🎉 You gained points! " +
            "You made a couple of changes and it paid off. Good work!";
    }

    if (points < 50) {
        return "🎉 You gained points! " +
            "You made a couple of changes and it paid off big time. Good work!";
    }

    if (points < 100) {
        return "👑 You gained over 100 points! " +
            "Somehow you're fancy and you're making it work. Keep it up!";
    }

    if (points < 200) {
        return "👑 You gained over 200 points! " +
            "This guy, man. How do you do it?";
    }
}

export { getSummaryOfPerformance }