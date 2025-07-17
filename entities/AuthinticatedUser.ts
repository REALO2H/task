import { IdGenerator } from "../utilities/Idgenerator";
import { PostWriter } from "../tools/post_writer";
import { Post } from "./Post";
import promptSync from "prompt-sync";
import { AbstractUser } from "./AbstractUser";

const prompt = promptSync();

export class AuthenticatedUser extends AbstractUser {
  public createPost(): void {
    const input = prompt("Enter the post: ");
    if (input) {
      const idGenerator= new IdGenerator();
      const post = new Post(idGenerator.generate(), input, this.name);
      console.log(`Post created by ${this.name}: ${input}`);
      const postWriter = new PostWriter();
      postWriter.createpost("posts.csv", post.getId(), post.getAuthor(), post.getContent());

    }
  }
}
