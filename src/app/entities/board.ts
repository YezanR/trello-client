import { User } from './user';

export class Board {
    id: Number;
    title: String;
    description?: String;
    owner: User;
}