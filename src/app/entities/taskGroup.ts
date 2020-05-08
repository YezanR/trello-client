import { Task } from './task';
import { Entity } from './entity';

export class TaskGroup extends Entity {
    title: String;
    tasks?: Array<Task>;
    boardId: Number;

    public constructor(title: String = "") {
        super();
        this.title = title;
    }
}