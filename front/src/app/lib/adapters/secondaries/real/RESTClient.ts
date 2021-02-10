import { Observable } from 'rxjs';

export default interface RESTClient {

    get<R>(endpoint: string, token:string | null): Observable<R>
    post<R>(endpoint: string, token:string | null, body:any, contentType?: string | null): Observable<R>
    put<R>(endpoint: string, token:string | null, body:any, contentType?: string | null): Observable<R>

}
