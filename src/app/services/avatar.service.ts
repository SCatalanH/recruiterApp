import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { getDownloadURL } from '@firebase/storage';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage

  ) { }

  getUserProfile(): Observable<any> {
    const user = this.auth.currentUser;
    if (user) {
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      return docData(userDocRef);
    } else {
      // Devolver un observable que emita un objeto vacío
      return of({});
    }
  }


  async uploadImage(cameraFile: Photo) {

    const user = this.auth.currentUser; 
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        imageUrl,
      });

      return true;

    } catch (e) {

      return null;

    }

  }
}
