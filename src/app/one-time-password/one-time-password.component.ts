import { Component, OnInit } from '@angular/core';
import {TotpService} from "../service/totp.service";

@Component({
  selector: 'one-time-password',
  templateUrl: './one-time-password.component.html',
  styleUrls: ['./one-time-password.component.css']
})
export class OneTimePasswordComponent implements OnInit {
  message: string | null = null;
  enteredNumber: number | undefined;

  constructor(private totpService: TotpService) { }

  ngOnInit(): void {
    console.log('In TOTP component');
    this.totpService.establishCommunication()
      .subscribe({
        next: mess => {
          console.log('mess', mess);
          this.message = mess.otp;
        },
        error: err => {
          console.log('err', err);
        }
      });
  }

  showNumber() {
    if (this.enteredNumber) {
      this.totpService.sendTotp(this.enteredNumber.toString()).subscribe({
        next: mes => {
          console.log('success', mes);
        },
        error: err => {
          console.log('err', err);
        }
      });
    } else {
      alert('Please enter a number.');
    }
  }
}

