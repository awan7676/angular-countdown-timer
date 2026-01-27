import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DeadlineResponse } from '../models/deadline';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {
  private readonly API_URL = '/api/deadline';

  constructor(private http: HttpClient) {}
  
  getDeadline(): Observable<DeadlineResponse> {
    return this.http.get<DeadlineResponse>(this.API_URL).pipe(
      map(response => {
        if (response.secondsLeft == null || typeof response.secondsLeft !== 'number') {
          throw new Error('Invalid response: Seconds left is missing or not a number');
        }

        if (response.secondsLeft < 0) {
          throw new Error('Invalid response: Seconds left cannot be negative');
        }
        
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse | Error): Observable<never> {
    let errorMessage = 'An error occurred while fetching the deadline.';
    
    if (error instanceof HttpErrorResponse) {
      console.error('Deadline API Error:', error);
    } else {
      errorMessage = error.message;
      console.error('Deadline Validation Error:', error);
    }
    
    return throwError(() => new Error(errorMessage));
  }
}