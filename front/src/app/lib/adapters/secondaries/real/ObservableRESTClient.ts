import RESTClient from './RESTClient'
import { Observable } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { catchError, map } from 'rxjs/operators'

export class ObservableRESTClient implements RESTClient {

    get<R>(endpoint: string, token:string): Observable<R> {
        return ajax.getJSON<R>(endpoint, { 'Authorization': 'Bearer ' + token }).pipe(
            catchError((err) => {
                throw new Error(err.response.error);
            })
        )
    }
    
    post<R>(endpoint: string, token:string, body:any, contentType: string | null = 'application/json'): Observable<R> {
        let headers = { 'Authorization': 'Bearer ' + token };
        
        if (contentType) {
            headers['Content-Type'] = contentType;
        }
        
        return ajax.post(endpoint, body, headers).pipe(
            map(res => {
                return res.response
            }),
            catchError((err) => {
                throw new Error(err.response.error);
            })
        );
    }
    
    put<R>(endpoint: string, token:string, body:any, contentType: string | null = 'application/json'): Observable<R> {
        let headers = { 'Authorization': 'Bearer ' + token };
        
        if (contentType) {
            headers['Content-Type'] = contentType;
        }

        return ajax.put(endpoint, body, headers).pipe(
            map(res => {
                return res.response
            }),
            catchError((err) => {
                throw new Error(err.response.error);
            })
        );
    }
}