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
import { Country } from 'src/app/model/country.model';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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

  countries: Country[] = []
  selectedCountry: string;

  form = this._fb.group({
    countryCode: ['', [Validators.required]],
  });

  constructor(private _fb: FormBuilder,
    private countryService: CountryService,
    private snackBarService: SnackBarService,
    private router: Router) {
  }

  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this.form.get('countryCode').valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.countryService.getCountries().then((response)=>{
      this.countries = response;
    }).catch((e)=>{
      console.error(e)
      this.snackBarService.erro('Não foi possível carregar os países')
    })
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (event.option.viewValue) {
      this.selectedCountry = (event.option.viewValue)
    }
  }

  consultar(){
    const {iso2Code} = this.countries.find(c => c.name === this.selectedCountry)
    this.router.navigate(['indicadores', iso2Code])
  }

  private _filter(value: string): string[] {
    this.selectedCountry = null;
    const filterValue = value.toLowerCase();
    return this.countries
    .filter(c => c.name.toLowerCase().includes(filterValue))
    .map(c=> c.name);
  }

}
