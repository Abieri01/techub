import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCsSCtKp3YjQbFBJSEP9UQ7WzawlsLIOU8",
  authDomain: "pretocheiroso-f7634.firebaseapp.com",
  projectId: "pretocheiroso-f7634",
  storageBucket: "pretocheiroso-f7634.appspot.com",
  messagingSenderId: "275058441324",
  appId: "1:275058441324:web:b4fab7d4e40da99367ac49"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}