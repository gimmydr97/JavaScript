import { Action } from './Action';
import { Meeting, move } from './Meeting';
import { parse } from './Parse';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let meetings: Array<Meeting> = [
    { title: 'M1', date: new Date(2022, 11, 26, 13), duration: 3 },
    { title: 'M2', date: new Date(2022, 11, 23, 14), duration: 1 },
    { title: 'M3', date: new Date(2022, 11, 21, 17), duration: 3 }
];

for (let meeting of meetings)
    console.log(meeting);
console.log();

rl.question('Actions? ', text => {
    const actions: Array<Action> = parse(text.split(' '));

    for (let action of actions)
        for (let meetingId in meetings)
            meetings[meetingId] = move(meetings[meetingId], action);

    for (let meeting of meetings)
        console.log(meeting);

    rl.close();
});
