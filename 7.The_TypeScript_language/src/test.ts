import { Action } from './Action';
import { Meeting, move } from './Meeting';
import { Timetable } from './Timetable';
import { expect } from 'chai';

describe('The move() function', () => {
    it('Action.DAY_EARLIER should return one day before', () => {
        const meeting: Meeting = { title: 'M1', date: new Date(2022, 11, 24, 12), duration: 2 };
        expect(move(meeting, Action.DAY_EARLIER).date.getDate()).to.be.equal(23);
    });
    it('Action.HOUR_EARLIER should return one hour later', () => {
        const meeting: Meeting = { title: 'M2', date: new Date(2022, 11, 26, 12), duration: 2 };
        expect(move(meeting, Action.HOUR_EARLIER).date.getHours()).to.be.equal(11);
    });
    it('Action.HOUR_LATER at 20:00 should raise an error', () => {
        const meeting: Meeting = { title: 'M3', date: new Date(2022, 11, 26, 21), duration: 2 };
        expect(() => move(meeting, Action.HOUR_LATER)).to.throw('Meetings can only be held between 08:00 and 20:00!');
    });
});

describe('The Timetable class', () => {
    it('timetable.put adds a meeting', () => {
        const timetable: Timetable = new Timetable();
        timetable.put({ title: 'M1', date: new Date(2022, 11, 26, 12), duration: 2 });
        expect(timetable.getMeetingsLength()).to.be.equal(1);
    });
    it('timetable.put on a taken timeslot returns false', () => {
        const timetable: Timetable = new Timetable();
        timetable.put({ title: 'M1', date: new Date(2022, 11, 26, 12), duration: 2 });
        expect(timetable.put({ title: 'M2', date: new Date(2022, 11, 26, 13), duration: 2 })).to.be.false;
    });
    it('timetable.get gets an added meeting', () => {
        const timetable: Timetable = new Timetable();
        const date: Date = new Date(2022, 11, 26, 12);
        timetable.put({ title: 'M3', date: date, duration: 2 });
        expect(timetable.get(date).title).to.be.equal('M3');
    });
    it('timetable.get returns null on an empty timeslot', () => {
        const timetable: Timetable = new Timetable();
        const date: Date = new Date(2022, 11, 26, 12);
        expect(timetable.get(date)).to.be.null;
    });
    it('timetable.busy returns true if two meetings share the same date', () => {
        const timetable: Timetable = new Timetable();
        timetable.put({ title: 'M', date: new Date(2022, 11, 26, 12), duration: 2 });
        expect(timetable.busy(new Date(2022, 11, 26, 18))).to.be.true;
    });
    it('timetable.canBeTransferredTo returns true on an empty timetable', () => {
        const timetable: Timetable = new Timetable();
        expect(timetable.canBeTransferredTo(new Date(2022, 11, 26, 12))).to.be.true;
    });
    it('timetable.canBeTransferredTo returns false on a taken timeslot', () => {
        const timetable: Timetable = new Timetable();
        timetable.put({ title: 'M1', date: new Date(2022, 11, 26, 12), duration: 2 });
        expect(timetable.canBeTransferredTo(new Date(2022, 11, 26, 13))).to.be.false;
    });
    it("timetable.perform alters timetable's meetings", () => {
        const timetable: Timetable = new Timetable();
        timetable.put({ title: 'M1', date: new Date(2022, 11, 26, 12), duration: 2 });
        timetable.put({ title: 'M2', date: new Date(2022, 11, 26, 17), duration: 2 });
        const actions: Array<Action> = [
            Action.DAY_EARLIER,
            Action.HOUR_LATER
        ];
        timetable.perform(actions);
        expect(timetable.get(new Date(2022, 11, 25, 12)).title).to.be.equal('M1');
        expect(timetable.get(new Date(2022, 11, 26, 18)).title).to.be.equal('M2');
    });
});
