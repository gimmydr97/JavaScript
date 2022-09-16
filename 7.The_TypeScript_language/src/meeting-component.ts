import { Action } from './Action';
import { Meeting, move } from './Meeting';
import { parse } from './Parse';

class MeetingComponent extends HTMLElement {

    private meetings: Array<Meeting> = [
        { title: 'M1', date: new Date(2022, 11, 26, 12), duration: 2 },
        { title: 'M2', date: new Date(2022, 11, 24, 14), duration: 1 },
        { title: 'M3', date: new Date(2022, 11, 22, 16), duration: 2 }
    ];

    private display(): void {
        this.innerHTML = '';
        for (let meeting of this.meetings) {
            this.innerHTML += `<b>Title:</b> ${meeting.title} <b>Date:</b> ${meeting.date} <b>Duration:</b> ${meeting.duration} <br/>`;
        }
    }

    public perform(text: String): void {
        const actions: Array<Action> = parse(text.split(' '));

        for (let action of actions)
            for (let meetingId in this.meetings)
                this.meetings[meetingId] = move(this.meetings[meetingId], action);

        this.display();
    }

    public connectedCallback() {
        this.display();
    }
  
}
  
customElements.define('meeting-component', MeetingComponent);
