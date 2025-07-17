import { PostViewer } from "../tools/post_viewr";
import { EmailValidator } from "../utilities/EmailValidator";




export abstract class AbstractUser  {
  
  protected name  : string;
  protected password: string;
  protected email: string;


  public constructor(name: string, password: string, email: string) {
    this.name = name;
    this.password = password;
    const emailValidator = new EmailValidator();
    if (emailValidator.isValid(email)){
      this.email = email;
    }  else{
      throw new Error("Invalid email format");


    }
  }


  public viewPost(csvPath: string): void {
    const postViewer = new PostViewer();
    postViewer.viewPost(csvPath);
  }
}


