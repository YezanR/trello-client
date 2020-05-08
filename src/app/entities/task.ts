import { Entity } from './entity';

export class Task extends Entity {
    title: String;
    groupId: Number;

    public constructor(title: String = "") {
        super();
        this.title = title;
    }
}