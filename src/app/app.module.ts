import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//==============================================================================
// [ COMPONENTS START ]
//==============================================================================
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PrivateComponent } from './components/private-component/private-component.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostComponent } from './components/post/post.component';
//==============================================================================
// [ COMPONENTS END ]
//==============================================================================

//==============================================================================
// [ SERVICES START ]
//==============================================================================
import { Router } from './app.routing';
import { RequestService } from './services/request.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { LandingComponent } from './components/landing/landing.component';
//==============================================================================
// [ SERVICES END ]
//==============================================================================

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    PageNotFoundComponent,
    PrivateComponent,
    CreatePostComponent,
    PostComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Router
  ],
  providers: [
    RequestService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
