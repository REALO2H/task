export class Post {
  constructor(
    private id: number,
    private content: string,
    private author: string
  ) {}

  public displayPost(): void {
    console.log(`Post ID: ${this.id}, Author: ${this.author}, Content: ${this.content}`);
  }

  public getId(): number {
    return this.id;
  }

  public getContent(): string {
    return this.content;
  }

  public getAuthor(): string {
    return this.author;
  }
}
