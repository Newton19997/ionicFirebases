import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EditprofilePage } from './editprofiles/editprofile/editprofile.page';
import { ProfilePage } from './profiles/profile/profile.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./registers/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profiles/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {path: 'profile/:id' , component: ProfilePage},
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofiles/editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {path: 'editprofile/:id' , component: EditprofilePage},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
