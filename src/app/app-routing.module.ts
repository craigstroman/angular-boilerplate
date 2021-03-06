import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './shared/utils/can-activate/can-activate.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [CanActivateGuard]},
  {path: 'posts', component: PostsComponent, pathMatch: 'full', canActivate: [CanActivateGuard]},
  {path: 'post/:id', component: PostComponent, pathMatch: 'full', canActivate: [CanActivateGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
