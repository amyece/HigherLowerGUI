import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  gameState: any = {};
  guess: string = '';
  resultMessage: string = '';
  currentCard: { rank: string, suit: string } = { rank: '', suit: '' };

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    this.gameService.startGame().subscribe(
      (data) => {
        this.gameState = data;
        this.resultMessage = '';
      },
      (error) => {
        console.error('Error starting game', error);
      }
    );
  }

  makeGuess(guess: string): void {
    if (guess) {
      this.gameService.makeGuess(guess).subscribe(
        (message) => {
          this.resultMessage = message;  // Display the result message
          this.getGameState();            // Fetch the updated game state
        },
        (error) => {
          console.error('Error making guess', error);
        }
      );
    }
  }

  getGameState(): void {
    this.gameService.getGameState().subscribe(
      (state) => {
        this.gameState = state;
      },
      (error) => {
        console.error('Error fetching game state', error);
      }
    );
  }

}


