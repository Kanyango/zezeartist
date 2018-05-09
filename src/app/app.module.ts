import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SuiModule} from 'ng2-semantic-ui';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
//import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { AssetsComponent } from './assets/assets';
import { EditReleaseComponent } from './release/edit';
import { ReactiveFormsModule } from '@angular/forms';
import {
    FormsModule,
    FormGroup,
    FormControl
} from '@angular/forms';
import { AppRoutingModule }   from './app-routing.module';
import { ReleaseComponent } from './release/release';
import { DetailsComponent } from './release/details';
import { NavbarComponent } from './navbar/nav';
import { NewReleaseComponent } from './release/new_release';
import { EditAssetsComponent } from './assets/edit';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { AuthGuard } from './guards/auth.guards';
import { AuthenticationService } from './helpers/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ReleaseComponent,
    DetailsComponent,
    NavbarComponent,
    NewReleaseComponent,
    //FileSelectDirective,
    AssetsComponent,
    EditReleaseComponent,
    EditAssetsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    SuiModule,
    RouterModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
        AuthGuard,
        AuthenticationService,
    ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
