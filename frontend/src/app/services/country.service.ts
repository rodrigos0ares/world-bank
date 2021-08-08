import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import {Router} from "@angular/router";
import {SnackBarService} from "./snackbar.service";
import { HttpClient } from '@angular/common/http';
import { Country } from '../model/country.model';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(
    private spinnerService: SpinnerService,
    private httpClient: HttpClient,
    private router: Router,
    private snackbarService: SnackBarService
  ) { }

  public getCountries(): Promise<Country[]> {
    return this.wrapInSpinner(
      this.httpClient.get('http://localhost:8080/countries').toPromise().then((response: Country[]) =>{
        return response;
      })
    );
  }

  public getCountryIndicators(countryCode: string): Promise<any>{
    return this.wrapInSpinner(
      this.httpClient.get(`http://localhost:8080/countries/${countryCode}/indicators`).toPromise().then((response: any) =>{
        return response;
      })
    );
  }

  wrapInSpinner<T>(promise: Promise<T>): Promise<T> {
    this.spinnerService.showSpinner();
    return promise
      .then(r => {
        this.spinnerService.stopSpinner();
        return r;
      })
      .catch(e => {
        this.spinnerService.stopSpinner();
        throw e;
      });
  }
}
