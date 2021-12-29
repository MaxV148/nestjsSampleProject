import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  //ExecutionContext kann alles sein HTTP, gRPC, Socket... (incoming request)
  //data -> params des decorators

  //params decorators exists outside the DI systems -> can't get an instance of UserService
  //deshalb interceptor -> können  zum DI hinzugefügt werden
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
