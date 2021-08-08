import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSpinner } from '@angular/material/progress-spinner';
import { SpinnerService } from './services/spinner.service';

@NgModule({
  declarations: [
    MatSpinner,
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [SpinnerService],
  entryComponents: [MatSpinner]
})
export class AppTestModule { }
