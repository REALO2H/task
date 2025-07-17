import { Generator } from "./Generator";

// The ID generator class is used to generate unique IDs for posts and user, but it's not static anymore.

export class IdGenerator extends Generator<number> {
  private currentId: number;
  private usedIds: Set<number>;

  constructor(start: number = 1) {
    super();
    this.currentId = start;
    this.usedIds = new Set<number>();
  }

  public generate(): number {
    while (this.usedIds.has(this.currentId)) {
      this.currentId++;
    }
    const newId = this.currentId;
    this.usedIds.add(newId);
    return newId;
  }

  public reset(): void {
    this.currentId = 1;
    this.usedIds.clear();
  }
}
