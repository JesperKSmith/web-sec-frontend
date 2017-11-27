import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// AUTH GUARD SERVICE
import { AuthGuard } from './services/auth-guard.service';

// COMPONENTS
import { LandingComponent } from './components/landing/landing.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PrivateComponent } from './components/private-component/private-component.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

//ROUTES
export const routes: Routes = [

    // ANONYMOUS ROUTES
   { path: '', component: LandingComponent },
   { path: 'landing', component: LandingComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },      
   { path: 'home', component: MainComponent},
   { path: 'create-post', component: CreatePostComponent},
   { path: 'private', component: PrivateComponent, canActivate: [AuthGuard] },
   { path: '**', component: PageNotFoundComponent }
];

export const Router: ModuleWithProviders = RouterModule.forRoot(routes);