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
  gameOver: boolean = false;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    this.gameService.startGame().subscribe(
      (data) => {
        this.gameState = data;
        this.resultMessage = '';
        this.gameOver = false;
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
          
          if (this.resultMessage === 'Incorrect!' && this.gameState?.score === 0) {
            this.gameOver = true;  // Set the game over flag
          }
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

        // Check if the game is over (score is 0, no current card)
        if (state.score === 0 && !state.currentCard) {
          this.gameOver = true;  // Game is over
        }
      },
      (error) => {
        console.error('Error fetching game state', error);
      }
    );
  }

}


