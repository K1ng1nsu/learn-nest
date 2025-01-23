import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
// NestInterceptor 를 상속 받아서 인터셉터를 구현
// Observable 를 리턴하는 형태
// ExecutionContext 받는 arg1 현재 요청에 대한 실행 컨텍스트를 나타내며, 요청의 세부정보를 가져올 수 있습니다.
// CallHandler 받는 arg2  요청이 컨트롤러로 전달된 후 실행되는 핸들러입니다.
//

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // request가 처리되기전에 해야할 로직 => 컨트롤러가 요청을 받기전전
    console.log(`I'm running before the handler`, context);
    //

    return handler.handle().pipe(
      map((data: any) => {
        //
        // Run somthing before the response is sent out
        // data => 나가는 응답으로 다시 보내는 데이터 => 컨트롤러가 응답을 리턴하고 나서
        console.log("I'm running before response is sent out ", data);
        //

        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

// 로그에 찍힌 context 내용
// {
//     args: [
//       IncomingMessage {
//         _events: [Object],
//         _readableState: [ReadableState],
//         _maxListeners: undefined,
//         socket: [Socket],
//         httpVersionMajor: 1,
//         httpVersionMinor: 1,
//         httpVersion: '1.1',
//         complete: true,
//         rawHeaders: [Array],
//         rawTrailers: [],
//         joinDuplicateHeaders: null,
//         aborted: false,
//         upgrade: false,
//         url: '/auth/2',
//         method: 'GET',
//         statusCode: null,
//         statusMessage: null,
//         client: [Socket],
//         _consuming: false,
//         _dumped: false,
//         next: [Function: next],
//         baseUrl: '',
//         originalUrl: '/auth/2',
//         _parsedUrl: [Url],
//         params: [Object],
//         query: {},
//         res: [ServerResponse],
//         body: {},
//         route: [Route],
//         [Symbol(shapeMode)]: true,
//         [Symbol(kCapture)]: false,
//         [Symbol(kHeaders)]: [Object],
//         [Symbol(kHeadersCount)]: 8,
//         [Symbol(kTrailers)]: null,
//         [Symbol(kTrailersCount)]: 0
//       },
//       ServerResponse {
//         _events: [Object: null prototype],
//         _eventsCount: 1,
//         _maxListeners: undefined,
//         outputData: [],
//         outputSize: 0,
//         writable: true,
//         destroyed: false,
//         _last: false,
//         chunkedEncoding: false,
//         shouldKeepAlive: false,
//         maxRequestsOnConnectionReached: false,
//         _defaultKeepAlive: true,
//         useChunkedEncodingByDefault: true,
//         sendDate: true,
//         _removedConnection: false,
//         _removedContLen: false,
//         _removedTE: false,
//         strictContentLength: false,
//         _contentLength: null,
//         _hasBody: true,
//         _trailer: '',
//         finished: false,
//         _headerSent: false,
//         _closed: false,
//         socket: [Socket],
//         _header: null,
//         _keepAliveTimeout: 5000,
//         _onPendingData: [Function: bound updateOutgoingData],
//         req: [IncomingMessage],
//         _sent100: false,
//         _expect_continue: false,
//         _maxRequestsPerSocket: 0,
//         locals: [Object: null prototype] {},
//         statusCode: 200,
//         [Symbol(shapeMode)]: false,
//         [Symbol(kCapture)]: false,
//         [Symbol(kBytesWritten)]: 0,
//         [Symbol(kNeedDrain)]: false,
//         [Symbol(corked)]: 0,
//         [Symbol(kOutHeaders)]: [Object: null prototype],
//         [Symbol(errored)]: null,
//         [Symbol(kHighWaterMark)]: 16384,
//         [Symbol(kRejectNonStandardBodyWrites)]: false,
//         [Symbol(kUniqueHeaders)]: null
//       },
//       [Function: next]
//     ],
//     constructorRef: [class UsersController],
//     handler: [AsyncFunction: findUser],
//     contextType: 'http'
//   }

// 로그에 찍힌 data 내용

// User { id: 2, email: 'test@test.com', password: '123123' }
