"use client";

import React, {useState} from "react";
import {Badge} from "../../../framework/badge/Badge";

type FancyShareProps = {
    points: number;
}

const getMessage = (points: number) => {
    if (points < 0) {
        return `I got fancy too often and lost ${Math.abs(points)} points not captaining Salah every game.`;
    }

    return `I scored ${points} extra points by not captaining Salah every game.`;
}

const FancyShare: React.FC<FancyShareProps> = (props) => {
    const { points } = props;

    const [isCopied, setIsCopied] = useState(false);

    const handleClick = () => {
        const message = getMessage(points);

        navigator.clipboard.writeText(`${message} - View my team at ${window.location.href}`);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 7500);

        if (navigator.share) {
            navigator.share({
                title: message,
                text: "View my team at",
                url: window.location.href
            }).catch(console.error);
        }
    }

    const content = isCopied ? "Copied to clipboard!" : "Share your score 🔗";

    return (
        <Badge onClick={handleClick}>{content}</Badge>
    )
}

export { FancyShare }