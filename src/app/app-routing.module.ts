import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleaseComponent } from './release/release';
import { DetailsComponent } from './release/details';
import { NewReleaseComponent } from './release/new_release';
import { AssetsComponent } from './assets/assets';
import { EditReleaseComponent } from './release/edit';
import { EditAssetsComponent } from './assets/edit';

const routes: Routes = [
        //{ path: '', redirectTo: 'home', pathMatch: 'full'},
        { path: 'release', component: ReleaseComponent},
        { path: 'details/:id', component: DetailsComponent},
        { path: 'new_release', component: NewReleaseComponent},
        { path: 'assets/:id', component: AssetsComponent},
        { path: 'edit/:id', component: EditReleaseComponent},
        { path: 'asset_edit/:id', component: EditAssetsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
