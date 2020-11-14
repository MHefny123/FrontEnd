import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { user } from 'src/app/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// const apiUrl = "http://localhost:3000/api/v1/users";


// Back to Original Version 

const apiUrl = "https://localhost:5001/api/User";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getusers(): Observable<user[]> {
    return this.http.get<user[]>(apiUrl)
      .pipe(
        tap(users => console.log('Fetch users')),
        catchError(this.handleError('getusers', []))
      );
  }

  getuser(id: number): Observable<user> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<user>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<user>(`getuser id=${id}`))
    );
  }

  adduser(user): Observable<user> {
    return this.http.post<user>(apiUrl, user, httpOptions).pipe(
      tap((user: user) => console.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<user>('adduser'))
    );
  }

  updateuser(id, user): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => console.log(`updated user id=${id}`)),
      catchError(this.handleError<any>('updateuser'))
    );
  }

  deleteuser(id): Observable<user> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<user>(url, httpOptions).pipe(
      tap(id => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<user>('deleteuser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
