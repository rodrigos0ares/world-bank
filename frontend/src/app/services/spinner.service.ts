import {map, scan} from 'rxjs/operators';
import {Overlay} from '@angular/cdk/overlay';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {MatSpinner} from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {

  private spinnerTopRef = this.cdkSpinnerCreate();
  private key = null;

  spin$: Subject<boolean> = new Subject();

  constructor(
    private overlay: Overlay,
  ) {

    this.spin$
      .asObservable()
      .pipe(
        map(val => val ? 1 : -1),
        scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0)
      )
      .subscribe(
        (res) => {
          if (res === 1) {
            this.showSpinner();
          } else if (res == 0 && this.spinnerTopRef.hasAttached()) {
            this.stopSpinner();
          }
        }
      );
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }

  public showSpinner(key?: string) {
    if(!this.key){
      this.key = key;
    }
    if (!this.spinnerTopRef.hasAttached()) {
      this.spinnerTopRef.attach(new ComponentPortal(MatSpinner));
    }

  }

  public stopSpinner(key?: string) {
    if (this.spinnerTopRef.hasAttached()) {
      if(!this.key || key === this.key){
        this.spinnerTopRef.detach();
        this.key = null;
      }else if(this.key && key !== this.key){
        console.log("Tentativa de parar um spinner trancado com a chave "+ this.key+ " passando a chave "+ key);
      }
    }
  }
}
