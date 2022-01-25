import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Profile } from 'src/app/profile';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  companyError=true;
  prod:any;
  prods:any;
  response: any;
  master:any;
  today: number;
  check:any;
  company:any;
  Bloodgroup:any;
  searchcom:any;
  login:any;

  page = 1;
  pageSize =50;
  items = [];
  profiles: any;
  editId: any;
  checkORnot: any;
  collapse: boolean;

  //private profiles:Observable<Profile[]>;

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
    this.items = [];
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
  ngOnInit() {
    this.items = [];
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
  
  edit(){
    console.log("newton")
    console.log(this.prod)  
    this.items = [];
  this.checkORnot.fname=this.prod.fname;
  this.checkORnot.address=this.prod.address;
  this.checkORnot.blood=this.prod.blood;
  this.checkORnot.city=this.prod.city;

   let updatprofiles= this.firebaseService.updateprofiles(this.prod);
   if(!updatprofiles) {
    this.success('edit not successfull');
    
   } else{
    this.success('edit successfull');
    this.router.navigateByUrl('/profile');
   }
  }
  
  delete(){
    this.items = [];
    let deleteprofiles= this.firebaseService.deleteprofiles(this.prod);
    if(!deleteprofiles) {
      this.success('delete not successfull');
     
     } else{
      this.success('delete successfull');
      this.router.navigateByUrl('/profile');
     }
  }

}
