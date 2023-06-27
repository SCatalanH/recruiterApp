import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from 'recruiterApp/node_modules/@angular/forms';
import { Router } from 'recruiterApp/node_modules/@angular/router';
import { AlertController, LoadingController } from 'recruiterApp/node_modules/@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormGroup } from 'recruiterApp/node_modules/@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router

  ) { }

  get email() {
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (user){
      this.router.navigateByUrl('/folder', {replaceUrl: true});
    } else {
      this.showAlert('Registration Failed', 'Please try Again!');
    }
  }
  
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (user){
      this.router.navigateByUrl('/folder', {replaceUrl: true});
    } else {
      this.showAlert('Login Failed', 'Please try Again!');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
