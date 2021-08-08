import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import {Router} from "@angular/router";
import {SnackBarService} from "./snackbar.service";
import { HttpClient } from '@angular/common/http';


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

  public getCountries(): Promise<any[]> {
    return this.wrapInSpinner(
      this.httpClient.get('http://localhost:8080/countries').toPromise().then((response: any) =>{
        console.log(response)
        return response.json();
      })
    );
  }

  public getCountryIndicators(countryCode: string): Promise<any>{
    return this.wrapInSpinner(
      this.httpClient.get('http://localhost:8080/countries/${countryCode}/indicators').toPromise().then((response: any) =>{
        console.log(response)
        return response.json();
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
