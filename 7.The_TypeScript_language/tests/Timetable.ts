import { Action } from './Action';
import { Meeting, move } from './Meeting';

export interface ITimetable {
    canBeTransferredTo(date: Date): boolean;
    busy(date: Date): boolean;
    put(meeting: Meeting): boolean;
    get(date: Date): Meeting;
    perform(actions: Array<Action>): void;
}

export class Timetable implements ITimetable {
    private meetings: Array<Meeting>;
    constructor() {
        this.meetings = [];
    }
    getMeetingsLength(): Number {
        return this.meetings.length;
    }
    canBeTransferredTo(date: Date): boolean {
        if (date.getHours() < 8 || date.getHours() > 20)
            return false;
        for (let meeting of this.meetings)
            if (date.getDate() === meeting.date.getDate() && (date.getHours() >= meeting.date.getHours() && date.getHours() <= meeting.date.getHours() + meeting.duration))
                return false;
        return true;
    }
    busy(date: Date): boolean {
        for (let meeting of this.meetings)
            if (date.getDate() === meeting.date.getDate())
                return true;
        return false;
    }
    put(meeting: Meeting): boolean {
        if (!this.canBeTransferredTo(meeting.date))
            return false;
        this.meetings.push(meeting);
        return true;
    }
    get(date: Date): Meeting {
        for (let meeting of this.meetings)
            if (date.getTime() === meeting.date.getTime())
                return meeting;
        return null;
    }
    perform(actions: Action[]): void {
        for (let actionId in actions)
            if (this.meetings[actionId])
                this.meetings[actionId] = move(this.meetings[actionId], actions[actionId]);
    }
}
