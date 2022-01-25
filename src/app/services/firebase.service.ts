import { Injectable } from '@angular/core';
/*
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { promise } from 'selenium-webdriver';
import {map,take} from 'rxjs/operators'
import { Profile } from '../profile';
*/
import { Firestore, collectionData, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { collection, doc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Profile } from '../profile';
import { Register } from '../register';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

collectionName = 'noteApp';
/*
private profiles:Observable<Profile[]>;
private profileCollection:AngularFirestoreCollection<Profile>;
*/
  constructor(private firestore:Firestore) {
/*
    this.profileCollection=this.firestore.collection<Profile>('profiles');
    this.profiles=this.profileCollection.snapshotChanges().pipe(
      map(Action=>{
        return Action.map(a=>{
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
          return{ id, ...data};
        });
      })
    );
*/
   }

   getprofiles():Observable<Profile[]>{
     const loadprofiles=collection(this.firestore,'profiles');
     return collectionData(loadprofiles,{idField:'id'}) as Observable<Profile[]>;
   }


   getprofileById(id):Observable<Profile[]>{
    const loadprofileID=doc(this.firestore,`profiles/${id}`);
    return docData(loadprofileID,{idField:'id'}) as Observable<Profile[]>;
  }

  
  addprofiles(profile:Profile){
    const addprofile=collection(this.firestore,'profiles');
    return addDoc(addprofile,profile);
  }

  deleteprofiles(profile:Profile){
    const deleteprofile=doc(this.firestore,`profiles/${profile.id}`);
    return deleteDoc(deleteprofile);
  }

  updateprofiles(profile:Profile){
    const updateprofile=doc(this.firestore,`profiles/${profile.id}`);
    return updateDoc(updateprofile,{fname:profile.fname,
      address:profile.address,
      blood:profile.blood,
      city:profile.city,
      regid:profile.regid});
  }

//---------- register--------------


getregisters():Observable<Register[]>{
  const loadRegisters=collection(this.firestore,'registers');
  return collectionData(loadRegisters,{idField:'id'}) as Observable<Register[]>;
}
getregisterById(id):Observable<Register[]>{
  const loadregisterID=doc(this.firestore,`registers/${id}`);
  return docData(loadregisterID,{idField:'id'}) as Observable<Register[]>;
}

addregisters(register:Register){
  const addregister=collection(this.firestore,'registers');
  return addDoc(addregister,register);
}

getregisterBynamePassword(email):Observable<Register[]>{
  console.log("server"); 
  console.log(email); 
  //console.log(password); 
  const loadregisterID=doc(this.firestore,`registers/${email}`);
  console.log(loadregisterID); 
  return docData(loadregisterID,{idField:'email'}) as Observable<Register[]>;
}

/*
getprofiles():Observable<Profile[]>{
  return this.profiles
}


getprofile(id: string):Observable<Profile>{
  return this.profileCollection.doc<Profile>(id).valueChanges().pipe(
    take(1),
    map( profile => {
      profile.id=id;
      return profile;
    })
  );
}

addprofile(profile:Profile):Promise<DocumentReference>{
  console.log("this.prod");
  console.log(profile);
  return this.profileCollection.add(profile);
}

Updateprofile(profile:Profile):Promise<void>{
  return this.profileCollection.doc(profile.id).update({fname:profile.fname,address:profile.address,blood:profile.blood,city:profile.city});

}

delectProfile(id: string):Promise<void>{
  return this.profileCollection.doc(id).delete();
}


  // get_profile(){
  //   return this.firestore.collection(this.collectionName).snapshotChanges();
  // }
  */
}
