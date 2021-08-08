import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavComponent} from './components/nav/nav.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: 'home', component: HomeComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
