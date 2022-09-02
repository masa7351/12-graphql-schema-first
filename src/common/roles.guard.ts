import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log("RolesGuard start");
    return true;
  }
}
