import { Action } from './Action';

export interface Meeting {
    title: string;
    date: Date;
    duration: number;
    participants?: Array<String>;
};
/*
let meeting:Array<Meeting> = 
    [
      {title: "firstM",
       date: new Date(),
       duration: 100,
       participants: ["angel","gimmy"]
       },
      {title:"secondM",
       date: new Date(),
       duration: 10,
      },
     {title: "thirdM",
      date: new Date(),
      duration: 25,
      participants: ["1","2","3"]
     }];  

let action:Array<Action> = [Action.DAY_EARLIER, Action.DAY_LATER, Action.HOUR_EARLIER]; 
*/
type MeetingActionFunction = (meeting: Meeting, action: Action) => Meeting;

export const move: MeetingActionFunction = (meeting, action) => {
    const newDate: Date = new Date(meeting.date.getTime());
    
    switch(action) {
        case Action.DAY_EARLIER:
            newDate.setDate(newDate.getDate() - 1);
            break;
        case Action.DAY_LATER:
            newDate.setDate(newDate.getDate() + 1);
            break;
        case Action.HOUR_EARLIER:
            newDate.setHours(newDate.getHours() - 1);
            break;
        case Action.HOUR_LATER:
            newDate.setHours(newDate.getHours() + 1);
            break;
    }

    if (newDate.getHours() < 8 || newDate.getHours() + meeting.duration > 20) {
        throw new Error('Meetings can only be held between 08:00 and 20:00!');
    }
    
    return { ...meeting, date: newDate };
};
/*
for (let m of meeting){
    for(let a of action){
        console.log(move(m,a));
    }
    }*/