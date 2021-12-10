import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestService {
  private serverErrorMessage = 'Server Error';

  constructor(private httpClient: Http) {}

  public get(url): Observable<any[]> {
    const headerOption = {'Accept': 'application/json'}
    const options = new RequestOptions({headers: new Headers(headerOption)});

    return this.httpClient.get(url, options)
      .map(this.reqBodyMap)
      .catch((error, caught) => {
        console.error(error)
        return null
      });
  }

  public post(url, body): Observable<any[]> {
    // const headerOption = {'Accept': 'application/json'}
    // const options = new RequestOptions({headers: new Headers(headerOption)});

    return this.httpClient.post(url, body)
      .map(this.reqBodyMap)
      .catch((error, caught) => {
        console.error(error)
        return null
      });
  }

  reqBodyMap(res: Response) {
    if (res.text() !== '') {
      return res.json();
    } else {
      return {};
    }
  }

}