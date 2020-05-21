import { User } from './user';
import { Entity } from './entity';

export class Board extends Entity {
    title: String;
    description?: String;
    owner: User;
    members: Set<User>;
}