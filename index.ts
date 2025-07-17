// Since Js deosn't support interfaces or absract classes, I will use typescript for this code.

import PromptSync from "prompt-sync";
const prompt = PromptSync();  
import * as fs from 'fs';
import * as path from 'path';


// I am using a simle csv file as a database, since I don't need to use a real database for this task.
const csvPath = 'posts.csv';
const dir = path.dirname(csvPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

//helper id random numebr generator class:
class IdGenerator {
  private static currentId = 1;
  private static usedIds = new Set<number>();

  public static generate(): number {
    while (this.usedIds.has(this.currentId)) {
      this.currentId++;
    }
    const newId = this.currentId;
    this.usedIds.add(newId);
    return newId;
  }
}

//helper id validation class (regex email validation):
class EmailValidator {
  public static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

//post class:
class post {
  private id: number;
  private content: string;
  private author: string;

  public constructor(id: number, content: string, author: string) {
    this.id = id;
    this.content = content;
    this.author = author;
  }

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
  public setContent(content: string): void {
    this.content = content;
  }
  public setAuthor(author: string): void {
    this.author = author;
  }
  public setId(id: number): void {
    this.id = id;
  }
}

//Users Classes


abstract class AbstractUser  {
  
  protected name  : string;
  protected password: string;
  protected email: string;


  public constructor(name: string, password: string, email: string) {
    this.name = name;
    this.password = password;
    if (EmailValidator.isValid(email)){
      this.email = email;
    }  else{
      throw new Error("Invalid email format");


    }
  }

  public viewPost(csvPath: string): void {
    const data = fs.readFileSync(csvPath, 'utf-8').trim();
    const lines = data.split('\n').slice(1); // skip header
    if (lines.length === 0) {
      console.log("No posts to show.");
      return;
    }
    console.log("\n==== All Posts ====");
    lines.forEach(line => {
      const [id, author, content] = line.split(',');
      console.log(`Post ID: ${id}, Author: ${author}, Content: ${content}`);
    });
    console.log("===================");


  }
  public setName(name: string): void {
    this.name = name;
  }
  public getName(): string {
    return this.name;
  }
  public setPassword(password: string): void {
    this.password = password;
  }
  public getPassword(): string {
    return this.password;
  }
}



class AuthenticatedUser extends AbstractUser {
  public constructor(name: string, password: string, email: string) {
    super(name, password, email);
  }
  public createPost():void { 
    const input = prompt("Enter the post :");
    if (input) {
      const Post = new post(IdGenerator.generate(), input, this.name);
      console.log(`Post created by ${this.name}: ${input}`);
      console.log(Post.getId())

      // Save the post to the csv file:
        const row = `${Post.getId()}, ${Post.getAuthor()} ,${Post.getContent() .replace(/[\r\n]/g, ' ')}\n`;
        if (!fs.existsSync(csvPath)) {
           fs.writeFileSync(csvPath, 'ID,Author,Content\n');
        }

     // Append the new post
     fs.appendFileSync(csvPath, row, 'utf-8');

  }

}
}


class GuestUser extends AbstractUser {
  public constructor(name: string, password: string , email: string) {
    super(name, password,email);
  }
}



// const User1 = new AuthenticatedUser("JohnDoe", "password123","omar-pepsi@hotmail.com");
// User1.createPost();
// User1.viewPost(csvPath);

function main() {
  let userType = prompt("Are you a guest or an authenticated user? (guest====1/auth====2): ").trim().toLowerCase();

  let user;
  const name = prompt("Enter your name: ");
    let email = prompt("Enter your email: ");
    while (!EmailValidator.isValid(email)) {
      console.log("Invalid email format. Please try again.");
      email = prompt("Enter your email: ");
    }
    const password = prompt("Enter your password: ");
  if (userType === "2" ) {
    user = new AuthenticatedUser(name, password, email);
  } else {
    user = new GuestUser(name, password, email);
  }

  let running = true;
  while (running) {
    console.log("\nMenu:");
    console.log("1. Show All Posts");
    if (user instanceof AuthenticatedUser) {
      console.log("2. Create Post");
      console.log("3. Exit");
    } else {
      console.log("2. Exit");
    }
    const choice = prompt("Choose an option: ").trim();

    if (user instanceof AuthenticatedUser) {
      switch (choice) {
        case '1':
          user.viewPost(csvPath);
          break;
        case '2':
          user.createPost();
          break;
        case '3':
          running = false;
          console.log("Goodbye!");
          break;
        default:
          console.log("Invalid option. Please try again.");
      }
    } else {
      switch (choice) {
        case '1':
          user.viewPost(csvPath);
          break;
        case '2':
          running = false;
          console.log("Goodbye!");
          break;
        default:
          console.log("Invalid option. Please try again.");
      }
    }
  }
}



// I know that there is a bit of redundancy in the code, but I wanted to keep it simple and easy to understand.
main();







