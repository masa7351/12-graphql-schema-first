import { Injectable } from "@nestjs/common";

@Injectable()
export class RolesService {
  helloWorld(): string {
    const message = "hello world";
    return message;
  }
}
