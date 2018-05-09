import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleaseComponent } from './release/release';
import { DetailsComponent } from './release/details';
import { NewReleaseComponent } from './release/new_release';
import { AssetsComponent } from './assets/assets';
import { EditReleaseComponent } from './release/edit';
import { EditAssetsComponent } from './assets/edit';
import { LoginComponent } from './login/login';
import { AuthGuard } from './guards/auth.guards';
import { RegisterComponent } from './register/register';

const routes: Routes = [
        //{ path: '', redirectTo: 'home', pathMatch: 'full'},
        { path: '', component: ReleaseComponent, canActivate: [AuthGuard]},
        { path: 'login', component: LoginComponent},
        { path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard]},
        { path: 'new_release', component: NewReleaseComponent},
        { path: 'assets/:id', component: AssetsComponent, canActivate: [AuthGuard]},
        { path: 'edit/:id', component: EditReleaseComponent, canActivate: [AuthGuard]},
        { path: 'asset_edit/:id', component: EditAssetsComponent, canActivate: [AuthGuard]},
        { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
