import PromptSync from "prompt-sync";
const prompt = PromptSync();  
import * as fs from 'fs';
import * as path from 'path';


import { IdGenerator } from "./utilities/Idgenerator";
import { PostWriter } from "./tools/post_writer";
import { Post } from "./entities/Post";
import promptSync from "prompt-sync";
import { AbstractUser } from "./entities/AbstractUser";
import { EmailValidator } from "./utilities/EmailValidator";
import { Validator } from './utilities/validator';
import { Generator } from "./utilities/Generator";
import { AuthenticatedUser } from "./entities/AuthinticatedUser";
import { GuestUser } from "./entities/Guest_User";
import { PostViewer } from "./tools/post_viewr";



const csvPath = 'posts.csv';


function main() {
  let userType = prompt("Are you a guest or an authenticated user? (guest====1/auth====2): ").trim().toLowerCase();

  let user;
  const name = prompt("Enter your name: ");
    let email = prompt("Enter your email: ");
    const emailValidator = new EmailValidator();
    while (!emailValidator.isValid(email)) {
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