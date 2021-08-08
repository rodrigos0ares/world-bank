import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class HomeComponent implements OnInit{

  countries: any[] = [{name: 'China', code: 'CN'}]

  form = this._fb.group({
    countryCode: ['', [Validators.required]],
  });

  constructor(private _fb: FormBuilder,
    private countryService: CountryService,
    private snackBarService: SnackBarService,
    private router: Router) {
  }

  ngOnInit(): void {
    // this.countryService.getCountries().then((response)=>{
    //   this.countries = response;
    // }).catch((e)=>{
    //   console.error(e)
    //   this.snackBarService.erro('Não foi possível carregar os países')
    // })
  }

  consultar(){
    const {countryCode} = this.form.getRawValue()
    this.router.navigate(['indicators'])
  }

}
