
export class Task {
    id: Number;
    title: String;
    groupId: Number;

    public constructor(title: String = "") {
        this.title = title;
    }
}