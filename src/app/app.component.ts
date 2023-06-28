import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { AvatarService } from './services/avatar.service';

interface UserProfile {
  imageUrl?: string;
  // otras propiedades del perfil
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userLoggedIn: boolean;
  public appPages = [
    { title: 'Home', url: '/folder', icon: 'home' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Categorias', url: '/categorias', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'About', url: '/about', icon: 'information' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
 
  
  profile: UserProfile;
  imageUrl: string;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController

  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
      this.imageUrl = this.profile?.imageUrl;
      console.log('Profile:', this.profile);
      console.log('Image URL:', this.imageUrl);
    });

  }

  getCacheBustingValue() {
    return Date.now(); // Genera un valor único basado en la fecha actual
  }
  
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
  
    console.log(image);
  
    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();
  
      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();
  
      if (!result) {
        const alert = await this.alertController.create({
          header: 'Subida Fallida',
          message: 'Hubo un problema subiendo tu Avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      } 
    }
  }
  
}
