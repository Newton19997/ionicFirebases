import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
// import { ApiService } from 'src/app/api.service';
// import { IonicSelectableComponent } from 'ionic-selectable';
import { Register } from '../../register';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  companyError=true;
  prod:any;
  prods:any;
  response: any;
  master:any;
  today: number;
  check:any;
  company:any;

  login:any;
  checkORnot: any;
  registers: any;
  constructor(public firebaseService:FirebaseService,private route: ActivatedRoute,public router:Router,public toastController: ToastController ) {
    this.prod = new Register();
    this.today = Date.now()+6*3600*1000;
    this.master = {StartDate: this.today,statusID:0};
    this.checkORnot={};
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
  
  Save(){  
    var item = this.registers.find(item => item.email == this.prod.email || item.mobile==this.prod.mobile);
    // console.log(item)
    if(item){ 
      this.success('This '+this.prod.email+' already engaged');  
      return;   
    }else{
      
      console.log("newton")
      console.log(this.prod)
    
      this.checkORnot.fname=this.prod.fname;
      this.checkORnot.lname=this.prod.lname;
      this.checkORnot.address=this.prod.address;
      this.checkORnot.city=this.prod.city;
      this.checkORnot.mobile=this.prod.mobile;
      this.checkORnot.email=this.prod.email;
      this.checkORnot.password=this.prod.password;
      this.checkORnot.type='0';
      console.log(this.checkORnot)
     let addregister= this.firebaseService.addregisters(this.checkORnot)
     if(!addregister) {
      this.success('Save not successfull');     
     } else{
      this.success('Save successfull');
      this.reset();
      this.router.navigateByUrl('/home');
     }
    }

  
  }
 reset(){
this.prod.fname=null;
this.prod.address=null;
this.prod.blood=null;
this.prod.mobile=null;
this.prod.email=null;
this.prod.password=null;
this.prod.lname=null;
 
 }

}
