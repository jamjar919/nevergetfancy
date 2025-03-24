#!/usr/bin/env node
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {indexTeams} from "../fpl/index/core/indexTeams";

type Args = {
    start: number;
    end: number;
    batchSize: number;
}

yargs<Args>(hideBin(process.argv))
    .command('index [start] [end] [batchSize]', 'Start indexing FPL teams from the', (yargs) => {
        return yargs
            .positional('start', {
                describe: 'Index to start with',
                default: 0
            })
            .positional('end', {
                describe: 'Index to end with',
                default: 1_000_000
            })
            .positional('batchSize', {
                describe: 'Number of requests to make at once',
                default: 10,
            })
    }, (argv) => {
        const {
            start,
            end,
            batchSize
        } = argv;

        // Validate arguments make sense
        if (start >= end) {
            throw new Error("Start must be less than end")
        }

        indexTeams(start, end, batchSize)
    })
