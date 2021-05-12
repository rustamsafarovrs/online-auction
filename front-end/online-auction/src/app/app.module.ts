import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LotsComponent} from './lots/lots.component';
import {LotComponent} from './lot/lot.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {CountdownComponent} from './countdown/countdown.component';
import {FormatTimePipe} from './_pipe/format-time.pipe';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ErrorHandler} from './_shared/error-handler';
import {GalleryModule} from 'ng-gallery';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LotsComponent,
    LotComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CountdownComponent,
    FormatTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    GalleryModule,
    BrowserAnimationsModule
  ],
  providers: [authInterceptorProviders, ErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule {
}
