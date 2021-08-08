import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavComponent} from './components/nav/nav.component';
import {HomeComponent} from './components/home/home.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'indicadores/:countryCode', component: IndicadoresComponent}
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
