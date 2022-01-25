import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Profile } from '../../profile';
// import { ApiService } from 'src/app/api.service';
// import { IonicSelectableComponent } from 'ionic-selectable';

// export class profile {
//   uid: any;
//   fname:any;
//   address: any;
//   blood: any; 
//   city: any;  
//   }
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  companyError=true;
  prod:any;
  prods:any;
  response: any;
  master:any;
  today: number;
  check:any;
  company:any;
  Bloodgroup:string=null;
  searchcom:string=null;
  Mobileno:string=null;
  login:any;

  page = 1;
  pageSize =50;
  items = [];
  profiles: any;
  editId: any;
  checkORnot: any;
  collapse: boolean;
  call : boolean=false;
  //private profiles:Observable<Profile[]>;
  ck:any;
  k:any = 1;
  chec: any;
  constructor(public firebaseService:FirebaseService,private route: ActivatedRoute,public router:Router,public toastController: ToastController ) { 
    this.prod = new Profile();
    this.today = Date.now()+6*3600*1000;
    this.master = {StartDate: this.today,statusID:0};
this.route.params.subscribe(params => {
  if (params.id) {
    this.editId = params.id;
  this.dataOnEdit(this.editId);
  }
});
this.checkORnot={};
this.ck=1;
// this.k=1;
//this.collapse = true; 
  }

  ionViewWillEnter()
  {     
   // this.loadprofiles();   
    if(!this.call)
     {
      console.log("it will ent")
      this.k=1;
      this.items = [];
      for (let i = 0; i < this.ck; i++) 
      {
        if(this.k == 1)
        { 
     // this.loadprofiles();
    }
    this.k++;
    console.log("this.k")
    console.log(this.k)
     }
     }
    
   
  }

  ionViewDidLeave()
  {
    console.log("it will leave")
    this.call=false;
    this.items = [];
    this.k=1;
    console.log(this.k)
    console.log(this.items )
  }



  dataOnEdit(id: string) {
    this.items = [];
    this.collapse = false; 
    console.log(this.collapse)  
   this.firebaseService.getprofileById(id).subscribe(res=>{
    this.prod = res;
    console.log(this.prod)   
   })   
     
   
  }

  ngOnInit():void
  {
    this.call= true
    this.collapse = true; 
    this.items = [];  

     this.loadprofiles();
 
  }
loadprofiles(){
  this.items = [];  
  this.profiles = this.firebaseService.getprofiles().subscribe(res=>{
    console.log(res); 
    this.company=res; 
    
    console.log(this.company.length)    
    // setTimeout(() => {
    //   this.company.forEach(item => {      
    //     this.items.push(item);         
    //   });
    // }, 300); 

    for (let i = this.company.length; i <=this.company.length; i++) 
    {
 setTimeout(() => {
  this.load();
    }, 300); 
    }
});
}     

load(){
  this.items = [];
  this.company.forEach(item => {      
        this.items.push(item);         
      });
}

// this.api.patchdata('comp', this.prod).subscribe( async res => {
//   this.response = res;
//   this.get();
// //for massage
//    if(this.response) 
//     {

Save(){
  var item = this.items.find(item => item.mobile==localStorage.getItem('mob'));
  // console.log(item)
  if(item){ 
    this.success('This '+ localStorage.getItem('mob') +' already engaged');  
    return;   
  }else{
    
  console.log("newton")
  console.log(this.prod)

  this.checkORnot.fname=this.prod.fname;
  this.checkORnot.address=this.prod.address;
  this.checkORnot.blood=this.prod.blood;
  this.checkORnot.city=this.prod.city;
  this.checkORnot.regid=localStorage.getItem('uid');
  this.checkORnot.mobile=localStorage.getItem('mob'); 

 let addprofiles= this.firebaseService.addprofiles(this.checkORnot)
 if(!addprofiles) {
  this.success('Save not successfull');
 } else{
  this.success('Save successfull');
 }
}
}

edit(){
  console.log("newton")
  console.log(this.prod)

  // this.checkORnot.fname=this.prod.fname;
  // this.checkORnot.address=this.prod.address;
  // this.checkORnot.blood=this.prod.blood;
  // this.checkORnot.city=this.prod.city;

 let updatprofiles= this.firebaseService.updateprofiles(this.prod);
 if(!updatprofiles) {
  this.success('edit not successfull');
  
 } else{
  this.success('edit successfull');
 }
}

delete(){
  let deleteprofiles= this.firebaseService.deleteprofiles(this.prod);
  if(!deleteprofiles) {
    this.success('delete not successfull');
   
   } else{
    this.success('delete successfull');
   }
}

//   patch(){
//     console.log(this.prod);

//     this.firebaseService.addprofile(this.prod).then(()=>{
// this.router.navigateByUrl('/profile');
//     });
//   }

//this.success('Delete one item after add item');
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

editnext(com,id){
  console.log(com);
  console.log(id);
  console.log(localStorage.getItem('type')); 
  console.log(localStorage.getItem('uid'));
  this.items = [];

 // this.chec.type = parseInt(localStorage.getItem('type')); 
  if(localStorage.getItem('type') == '1'){
  this.router.navigateByUrl('/editprofile/'+com.id);
}else{
  if(localStorage.getItem('uid') == com.regid){
    this.router.navigateByUrl('/editprofile/'+com.id);
  }else{
    this.success('Access denied......');
    this.loadprofiles();
  } 

}

}

  //newton add
  SearchSamplecatagory(searchStr: string = null){
    console.log(searchStr) 
    console.log(this.Mobileno)  
     console.log(this.Bloodgroup)     
    this.items = [];
if(!searchStr ){
 
 if(this.Mobileno || this.Bloodgroup){
  this.items = this.company.filter(item => item.city.toLowerCase().indexOf(searchStr) > -1 && item.mobile.toLowerCase().indexOf(this.Mobileno) > -1  &&   item.blood.toLowerCase().indexOf(this.Bloodgroup) > -1);

 }
 else{ this.loadprofiles();}
 
}else{
  //var item = myArray.find(item => item.id == id && item.name==na);
  //let b = sampleProducts.filter(item => item.color.toLowerCase().indexOf(term) > -1 &&  item.value.toLowerCase().indexOf(valu) > -1);


  this.items = this.company.filter(item => item.city.toLowerCase().indexOf(searchStr) > -1 &&  item.mobile.toLowerCase().indexOf(this.Mobileno) > -1 &&  item.blood.toLowerCase().indexOf(this.Bloodgroup) > -1);
    console.log( this.items); 
    
  }
  }

  SearchSamplecatagorymobile(searchStr: string = null){
    console.log(searchStr)   
    this.items = [];
if(!searchStr ){
 if(this.searchcom || this.Bloodgroup){
  this.items = this.company.filter(item => item.city.toLowerCase().indexOf(this.searchcom) > -1 &&  item.mobile.toLowerCase().indexOf(searchStr) > -1  &&   item.blood.toLowerCase().indexOf(this.Bloodgroup) > -1);

 }
 else{ this.loadprofiles();}
}else{
  //var item = myArray.find(item => item.id == id && item.name==na);
  //let b = sampleProducts.filter(item => item.color.toLowerCase().indexOf(term) > -1 &&  item.value.toLowerCase().indexOf(valu) > -1);
  this.items = this.company.filter(item => item.city.toLowerCase().indexOf(this.searchcom) > -1 &&  item.mobile.toLowerCase().indexOf(searchStr) > -1  &&   item.blood.toLowerCase().indexOf(this.Bloodgroup) > -1);
    console.log( this.items); 
    
  }
  }
  SearchSamplecatagoryblood(searchStr: string = null){
    console.log(searchStr)   
    this.items = [];
if(!searchStr ){

 if(this.searchcom || this.Mobileno){
  this.items = this.company.filter(item => item.city.toLowerCase().indexOf(this.searchcom) > -1  &&  item.mobile.toLowerCase().indexOf(this.Mobileno) > -1  &&   item.blood.toLowerCase().indexOf(searchStr) > -1);
 
 }
 else{ this.loadprofiles();}
}else{
  //var item = myArray.find(item => item.id == id && item.name==na);
  //let b = sampleProducts.filter(item => item.color.toLowerCase().indexOf(term) > -1 &&  item.value.toLowerCase().indexOf(valu) > -1);
  this.items = this.company.filter(item => item.city.toLowerCase().indexOf(this.searchcom) > -1  &&  item.mobile.toLowerCase().indexOf(this.Mobileno) > -1  &&   item.blood.toLowerCase().indexOf(searchStr) > -1);
    console.log( this.items); 
    
  }
  }

}
