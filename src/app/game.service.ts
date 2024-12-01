import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://localhost:7014/api/game';

  constructor(private http: HttpClient) { }

  startGame(includeJokers: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/start`, includeJokers);
  }

  makeGuess(guess: string): Observable<any> {
    // Sending the guess as JSON
    return this.http.post(`${this.apiUrl}/guess`, { guess }, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' // To handle a plain text response
    });
  }

  getGameState(): Observable<any> {
    return this.http.get(`${this.apiUrl}/state`);
  }
}
