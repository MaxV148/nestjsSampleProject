import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
//Guards werden VOR Interceptor ausgeführt! Current User besser als Middleware als Interceptor
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      return false;
    }
    return request.currentUser.admin;
  }
}
