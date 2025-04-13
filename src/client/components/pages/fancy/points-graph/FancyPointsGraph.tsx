'use client';

import React, { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import styles from './FancyPointsGraph.module.scss';

// Define the shape of comparison scores that comes from the GraphQL query
type ComparisonScoreType = {
    __typename?: string;
    gameweek: number;
    playerId: string;
    pointDifference: number;
    comparisonGameSummary?: {
        __typename?: string;
        points: number;
    } | null;
} | null;

type FancyPointsGraphProps = {
    comparisonScores: readonly ComparisonScoreType[];
};

/**
 * Graph showing the point difference over time
 */
const FancyPointsGraph: React.FC<FancyPointsGraphProps> = ({ comparisonScores }) => {
    if (!comparisonScores || comparisonScores.length === 0) {
        return null;
    }
    
    // Sort by gameweek ascending for the graph
    const sortedData = useMemo(() => {
        const data = [...comparisonScores]
            .filter(score => score !== null)
            .sort((a, b) => (a!.gameweek - b!.gameweek))
            .map(score => ({
                gameweek: score!.gameweek,
                pointDifference: score!.pointDifference,
                // Calculate cumulative points as we go
                cumulativePointDifference: 0, // Will be calculated next
            }));
        
        // Calculate the running total of point differences
        let runningTotal = 0;
        data.forEach(item => {
            runningTotal += item.pointDifference;
            item.cumulativePointDifference = runningTotal;
        });
        
        return data;
    }, [comparisonScores]);

    // Get the final cumulative point difference to determine overall color
    const finalPointDifference = sortedData.length > 0 
        ? sortedData[sortedData.length - 1].cumulativePointDifference
        : 0;

    // Custom gradient for the area fill
    const gradientId = 'pointDifferenceGradient';

    // Define positive and negative colors from app variables
    const positiveColor = 'rgb(5, 250, 135)';
    const negativeColor = 'rgb(252, 44, 128)';
    const neutralColor = 'rgb(122, 122, 122)';

    // Determine chart colors based on final point difference
    const strokeColor = finalPointDifference > 0 ? positiveColor : finalPointDifference < 0 ? negativeColor : neutralColor;

    return (
        <div className={styles.graphContainer}>
            <h3 className={styles.graphTitle}>Point Difference Over Time</h3>
            <div className={styles.graphWrapper}>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                        data={sortedData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop 
                                    offset="5%" 
                                    stopColor={strokeColor} 
                                    stopOpacity={0.8}
                                />
                                <stop 
                                    offset="95%" 
                                    stopColor={strokeColor}
                                    stopOpacity={0.2}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="gameweek" 
                            label={{ value: 'Gameweek', position: 'insideBottomRight', offset: -10 }} 
                        />
                        <YAxis 
                            label={{ value: 'Points', angle: -90, position: 'insideLeft' }} 
                        />
                        <Tooltip 
                            formatter={(value: number) => [`${value} points`, 'Cumulative Difference']}
                            labelFormatter={(gameweek) => `Gameweek ${gameweek}`} 
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: `1px solid ${strokeColor}`,
                            }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="cumulativePointDifference" 
                            stroke={strokeColor} 
                            fill={`url(#${gradientId})`}
                            fillOpacity={0.6}
                            isAnimationActive={true}
                            dot={{ 
                                stroke: strokeColor, 
                                strokeWidth: 2, 
                                r: 4,
                                fill: '#fff' 
                            }}
                            activeDot={{ 
                                stroke: strokeColor, 
                                strokeWidth: 2, 
                                r: 6,
                                fill: '#fff' 
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className={styles.graphExplanation}>
                This graph shows your cumulative point difference over time compared to always captaining the selected player.
                {finalPointDifference > 0 ? (
                    <span className={styles.positiveNote}> You're ahead by {finalPointDifference} points!</span>
                ) : finalPointDifference < 0 ? (
                    <span className={styles.negativeNote}> You're behind by {Math.abs(finalPointDifference)} points.</span>
                ) : (
                    <span className={styles.neutralNote}> You're exactly even.</span>
                )}
            </div>
        </div>
    );
};

export { FancyPointsGraph };