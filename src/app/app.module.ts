import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCZF-NX9fIM3HBNyBivNmQ2VHLizUkZzP8",
  authDomain: "techhubconnect-3f5d5.firebaseapp.com",
  projectId: "techhubconnect-3f5d5",
  storageBucket: "techhubconnect-3f5d5.appspot.com",
  messagingSenderId: "602418122326",
  appId: "1:602418122326:web:a5d423f13eaf55f12ff5f7"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth(getApp())),
    provideFirestore(() => getFirestore(getApp())),
    provideStorage(() => getStorage(getApp())),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
