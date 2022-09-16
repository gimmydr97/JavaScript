import { Action } from './Action';
import { Meeting, move } from './Meeting';
import { parse } from './Parse';

let meetings: Array<Meeting> = [
    { title: 'M1', date: new Date(2022, 11, 26, 12), duration: 3 },
    { title: 'M2', date: new Date(2022, 11, 24, 14), duration: 1 },
    { title: 'M3', date: new Date(2022, 11, 22, 16), duration: 3 }
];

let actions: Array<Action> = [
    Action.DAY_EARLIER,
    Action.HOUR_EARLIER,
    Action.DAY_LATER
];

// Tests
for (let meeting of meetings) {
    console.log(meeting);
}
console.log('\n');
for (let action of actions) {
    for (let meeting of meetings) {
        console.log(move(meeting, action));
    }
    console.log('');
}
console.log(parse(['d-','d+','h-','h+']));
