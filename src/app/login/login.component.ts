import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  pattern = /^.{8,16}$/gm;
  regExpEmail = /^[a-z0-9\-\.]{1,}@gmail\.com|net\.us|org\.ua$/i;
  isDisabled: boolean = true;
  isVisible: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.buildFormMaterial();
  }
  buildFormMaterial(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(this.regExpEmail)]],
      pass: ['', [Validators.required, Validators.min(8), Validators.max(16), Validators.pattern(this.pattern)]],
    });
    this.form.valueChanges.subscribe(res => {
      if (this.form.valid) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    })
    this.form.controls.pass.valueChanges.subscribe(res => {
      if (res) {
        res.match(this.pattern)
      }
      if (this.form.valid) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    })
  }
  ChangeType(): void {
    this.isVisible = !this.isVisible
  }
  signIN(): void {
    if (this.form.valid) {
      this.authService.signIn(this.form.get('username').value, this.form.get('pass').value)
      // this.authService.signUp(this.form.get('username').value, this.form.get('pass').value, 'Albert Flores', 'https://firebasestorage.googleapis.com/v0/b/skillcheckers-ac855.appspot.com/o/userImg%2Fuser12.png?alt=media&token=10805ccc-1c2c-402f-a44b-bb7c254ac069')
      this.resetForm();

    }
    else {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.form.reset();
  }
}
