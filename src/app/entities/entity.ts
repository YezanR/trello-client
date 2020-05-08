
export abstract class Entity {
    id: Number;
    
    public equals(other: Entity): boolean {
        if (!other) {
            return false;
        }

        return this.id == other.id;
    }
}