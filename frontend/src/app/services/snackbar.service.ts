import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ComponentType} from "@angular/cdk/overlay";

const TIMEOUT_STACKBAR = 7000;

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public sucesso(mensagem: string){
    this.mostrarSnackbar(mensagem, 'success');
  }

  public erro(mensagem: string){
    this.mostrarSnackbar(mensagem, 'failure');
  }

  public erroSistema(mensagem: string, error: any){
    console.log(error);
    this.mostrarSnackbar(mensagem, 'failure');
  }

  public aviso(mensagem: string){
    this.mostrarSnackbar(mensagem, 'warning');
  }

  public sucessoCustomizado(component: ComponentType<any>, data: any = null){
    this.snackBar.openFromComponent(component,  {panelClass: ['success-snackbar'], data: data})
  }

  public erroCustomizado(component: ComponentType<any>, data: any = null){
    this.snackBar.openFromComponent(component,  {panelClass: ['failure-snackbar'], data: data})
  }

  private mostrarSnackbar(mensagem: string, tipo: string){
    this.snackBar.open( mensagem, 'Fechar', {panelClass: [`${tipo}-snackbar`], duration: TIMEOUT_STACKBAR});
  }
}
