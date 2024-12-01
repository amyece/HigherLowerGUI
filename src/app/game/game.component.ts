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
  includeJokers: boolean = false;

    // A map for face card conversions
    rankMap: { [key: number]: string } = {
      1: 'A',
      11: 'J',
      12: 'Q',
      13: 'K'
    };

    isJoker(card: any): boolean {
      return card.suit === 'Joker';
    }  

  constructor(private gameService: GameService) { }

toggleJokers() {
this.includeJokers = !this.includeJokers;
 this.startNewGame();
 }

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    this.gameService.startGame(this.includeJokers).subscribe(
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

    // Convert rank to string using the rank map, or fallback to the number if it's not a face card
    convertRank(rank: number): string {
      // If the rank is in the map (11, 12, 13), return the corresponding string
      return this.rankMap[rank] || rank.toString();
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

          // Hide the result message after 2 seconds
          if(this.resultMessage === 'Correct!'){
            setTimeout(() => {
              this.resultMessage = '';
            }, 1500);  // 2000ms = 2 seconds
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
        if (state.score === 0) {
          this.gameOver = true;  // Game is over
        }
      },
      (error) => {
        console.error('Error fetching game state', error);
      }
    );
  }
  
}