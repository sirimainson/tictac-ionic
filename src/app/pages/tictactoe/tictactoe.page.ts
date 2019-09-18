import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.page.html',
  styleUrls: ['./tictactoe.page.scss'],
})
export class TictactoePage implements OnInit {
  public inputValue = "";
  public currentPlayer = "";
  public count = 1;
  public player = false;
  public msg = "";
  public playerOneScore = 0;
  public playerTwoScore = 0;
  public wins = [7, 56, 448, 73, 146, 292, 273, 84];

  constructor(private navCtrl: NavController, public alertController: AlertController) { }

  ngOnInit() {
  }

  async checkWin(score) {
    for (var i = 0; i < this.wins.length; i++) {
      if ((this.wins[i] & score) === this.wins[i]) {
        if (this.currentPlayer == "Player One") {
          this.newGame();
          const alert = await this.alertController.create({
            header: 'Player 1 Wins',
            message: 'Press OK to continue to the next round.',
            buttons: ['OK']
          });

          await alert.present();
        } else {
          this.newGame();
          const alert = await this.alertController.create({
            header: 'Player 2 Wins',
            message: 'Press OK to continue to the next round.',
            buttons: ['OK']
          });

          await alert.present();
        }
      }
    }
    if (this.count == 10) {
      const alert = await this.alertController.create({
        header: 'TIE',
        message: 'Press OK to continue to the next round.',
        buttons: ['OK']
      });

      await alert.present();
      this.newGame();
    }
  }


  placeTile(param) {
    this.count += 1;
    if (this.count % 2 == 0) {
      this.currentPlayer = "Player One";
      var tile = <HTMLInputElement>document.getElementById(param);
      tile.disabled = true;
      document.getElementById(param).textContent = "X";
      document.getElementById(param).style.color = "#ff6b35";
      this.playerOneScore += Number(param);
      this.checkWin(this.playerOneScore);
    }
    else if (this.count % 2 != 0) {
      this.currentPlayer = "Player Two";
      this.msg = "O";
      var tile = <HTMLInputElement>document.getElementById(param);
      tile.disabled = true;
      this.playerTwoScore += Number(param);
      document.getElementById(param).textContent = "O";
      document.getElementById(param).style.color = "#56ff79";
      this.checkWin(this.playerTwoScore);
    }
  }

  newGame() {
    for (var i = 1; i < 512; i * 2) {
      var tile = <HTMLInputElement>document.getElementById(i.toString());
      if (tile != null || tile != undefined) {
        tile.textContent = "";
        tile.disabled = false;
        i += i;
      }
    }
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
    this.count = 1;
  }

}
