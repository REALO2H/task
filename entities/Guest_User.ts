import { IdGenerator } from "../utilities/Idgenerator";
import { PostWriter } from "../tools/post_writer";
import { Post } from "./Post";
import promptSync from "prompt-sync";
import { AbstractUser } from "./AbstractUser";


export class GuestUser extends AbstractUser {
  public constructor(name: string, password: string , email: string) {
    super(name, password,email);
  }
}