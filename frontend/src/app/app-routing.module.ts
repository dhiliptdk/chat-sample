import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: "home", children: [
      { path: 'chat/:user', component: ChatComponent }
    ]
  },
  {
    path: '*', pathMatch: "full", redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
