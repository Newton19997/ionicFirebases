import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { environment } from '../environments/environment';
import { provideFirebaseApp , initializeApp } from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//import {AngularFirestoreModule,FirestoreSettingsToken } from '@angular/fire/firestore';
// import { initializeApp } from '@firebase/app';
// //import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; 
// import { AngularFireModule } from '@angular/fire/compat';

//AngularFireDatabaseModule


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),AppRoutingModule,
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    provideFirestore(()=> getFirestore()),
    NgbModule,
  
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule,
    // //AngularFireDatabaseModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   // { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
