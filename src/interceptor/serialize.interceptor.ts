import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';

//decorator
export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
/*
  Verändert den Response bevor er versand wird nach dem DTO
 */
export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<T> | Promise<Observable<T>> {
    return next.handle().pipe(
      map((data: T) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, //nur props mit @Expose()
        });
      }),
    );
  }
  ////////////////////////////////////////////////////////////////////////////
  /*intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //Run something before a request is handled
    //by the request handler
    console.log('Im running befor the handler', context);
    return next.handle().pipe(
      map((data: any) => {
        //Run something before the response is sent out
        console.log('Im running before the response is sent out', data);
      }),
    );
  }*/
}
