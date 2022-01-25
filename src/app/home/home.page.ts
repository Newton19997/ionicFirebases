import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ApiService } from 'src/app/api.service';
// import { IonicSelectableComponent } from 'ionic-selectable';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

export class addlogin {
  email: string;  
  password: string;
  }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



  export class HomePage implements OnInit {
  prod: any;
prods:any;
companyError=true;
login:any;
  registers: any;
  constructor(public firebaseService:FirebaseService,private route: ActivatedRoute,public router:Router,public toastController: ToastController) {
    this.prod = new addlogin();
  }


ngOnInit() { 
  this.loadprofiles();
}

loadprofiles(){ 
  this.registers = this.firebaseService.getregisters().subscribe(res=>{
    //  console.log("registers");
    //  console.log(res);
    this.registers=res; 
  });
}
// async ChackLogin(){
//   console.log(this.prod.email); 
//   console.log(this.prod.password); 
//   this.firebaseService.getregisterBynamePassword(this.prod.email).subscribe(res=>{
//       this.prods = res;
//       console.log(this.prods); 
//      })   
// }


async success(massage:any){
  const toast = await this.toastController.create({
    message: massage,
    duration: 2000,
    animated:false, 
    position:'middle', 
    //color:'secondary',
    });  
  toast.present();
  toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
  });
}

async ChackLogin() {
  if(!this.prod.email){
    this.success('Please enter email');
    return;
  }
  if(!this.prod.password){
    this.success('Please enter password');
    return;
  }
  // console.log("item")
  // console.log(this.prod.email)
  // console.log(this.prod.password)

  var item = this.registers.find(item => item.email == this.prod.email && item.password==this.prod.password);
  // console.log(item)
  if(item){ 
            localStorage.setItem('uid',item.id);
            localStorage.setItem('eml',item.email);           
            localStorage.setItem('mob',item.mobile);
            localStorage.setItem('umane',item.fname);
            localStorage.setItem('type',item.type);
            this.reset();
             this.router.navigateByUrl('/profile');
          } 
            else {
              localStorage.removeItem('umane')
              localStorage.removeItem('uid');             
              localStorage.removeItem('pas');
              localStorage.removeItem('type');
              localStorage.removeItem('eml');
              this.success('Email Passward Not match');
            this.reset()   
            // localStorage.getItem('use'))   

           }


  }

  reset(){
    this.prod.email=null;
    this.prod.password=null;
  }
}


// dataOnEdit(id: string) {
//   this.items = [];
//   this.collapse = false; 
//   console.log(this.collapse)  
//  this.firebaseService.getprofileById(id).subscribe(res=>{
//   this.prod = res;
//   console.log(this.prod)   
//  })   
   
 
// }