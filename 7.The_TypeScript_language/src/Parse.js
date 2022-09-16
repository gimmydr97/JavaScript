import { Action } from './Action';

export const parse = strings => {
    let actions = [];
    for (let string of strings) {
        switch(string) {
            case 'd-':
                actions.push(Action.DAY_EARLIER);
                break;
            case 'd+':
                actions.push(Action.DAY_LATER);
                break;
            case 'h-':
                actions.push(Action.HOUR_EARLIER);
                break;
            case 'h+':
                actions.push(Action.HOUR_LATER);
                break;
        }
    }
    return actions;
}
