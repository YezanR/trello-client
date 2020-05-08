import { Task } from './task';

export class TaskGroup {
    id: Number;
    title: String;
    tasks?: Array<Task>;
    boardId: Number;

    public constructor(title: String = "") {
        this.title = title;
    }
}