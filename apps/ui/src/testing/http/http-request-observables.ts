import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestScheduler } from 'jasmine-marbles';
import { connectable, Observable, ReplaySubject } from 'rxjs';

export type SimpleResponseObjTypes = boolean | string | number | object | null;
export type ResponseObjTypes =
  | ArrayBuffer
  | Blob
  | SimpleResponseObjTypes
  | SimpleResponseObjTypes[];

export function executeObservableWithHttpRequest<T, TRequest>(
  src: Observable<T>,
  expectedUrl: string,
  responseObj: ResponseObjTypes,
  responseHeaders?: HttpHeaders,
  extraPredicate?: (req: HttpRequest<TRequest>) => boolean
) {
  const httpTestingController: HttpTestingController =
    TestBed.inject<HttpTestingController>(
      HttpTestingController as Type<HttpTestingController>
    );

  const obs = connectable(src, {
    connector: () => new ReplaySubject(),
    resetOnDisconnect: false,
  });

  obs.connect();
  getTestScheduler().flush();

  httpTestingController
    .expectOne(
      (req) =>
        req.url === expectedUrl && (!extraPredicate || extraPredicate(req))
    )
    .flush(responseObj, { headers: responseHeaders });

  return obs;
}

export function executeObservableWithHttpRequestWithError<T>(
  src: Observable<T>,
  expectedUrl: string,
  response: ResponseObjTypes = new ErrorEvent('fail'),
  statusCode = 500
) {
  const httpTestingController: HttpTestingController =
    TestBed.inject<HttpTestingController>(
      HttpTestingController as Type<HttpTestingController>
    );

  const obs = connectable(src, {
    connector: () => new ReplaySubject(),
    resetOnDisconnect: false,
  });
  obs.connect();

  getTestScheduler().flush();

  httpTestingController
    .expectOne((req) => req.url === expectedUrl)
    .flush(response, {
      status: statusCode,
      statusText: '',
    });

  return obs;
}
