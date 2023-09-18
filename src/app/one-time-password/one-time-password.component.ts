import {Component} from '@angular/core';
import {TotpService} from "../service/totp.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'one-time-password',
  templateUrl: './one-time-password.component.html',
  styleUrls: ['./one-time-password.component.css']
})
export class OneTimePasswordComponent {
  message: string | undefined;
  isTOTPGenerated: boolean = false;
  errorMessage: string | undefined;
  messageFromServer: string | undefined;
  timerIsUp: boolean = false;

  digitsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private totpService: TotpService) {
    this.digitsForm = this.formBuilder.group({
      digit1: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
      digit2: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
      digit3: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
      digit4: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
      digit5: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
      digit6: ['', [Validators.required, Validators.min(0), Validators.max(9)]]
    });
  }

  getTOTPNumber() {
    this.totpService.getTOTP()
      .subscribe({
        next: mess => {
          this.message = mess.otp;
          this.isTOTPGenerated = true;
        },
        error: err => {
          console.log('err', err);
        }
      });
  }

  verifyTOTPNumber(otp: string) {
    this.totpService.sendTOTP(otp).subscribe({
      next: mes => {
        if(mes.message == 'success') {
          this.messageFromServer = "You entered correct TOTP!";
        } else {
          this.messageFromServer = "You entered incorrect TOTP!";
          this.errorMessage = this.messageFromServer;
        }
      },
      error: err => {
        console.log('err', err);
      }
    });
  }

  onSubmit() {
    if (this.digitsForm.valid) {
      let result = '';
      result += this.digitsForm.get('digit1')?.value;
      result += this.digitsForm.get('digit2')?.value;
      result += this.digitsForm.get('digit3')?.value;
      result += this.digitsForm.get('digit4')?.value;
      result += this.digitsForm.get('digit5')?.value;
      result += this.digitsForm.get('digit6')?.value;

      this.verifyTOTPNumber(result);
    } else {
      alert("Enter 6 digits that you receive!");
    }
  }

  handleTimerUp() {
    this.timerIsUp = true;
  }
}

