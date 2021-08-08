import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogConfirmacaoData {
  titulo: string;
  pergunta: string;
  acao: () => void;
}

@Component({
  selector: 'app-dialog-confirmacao',
  templateUrl: './dialog-confirmacao.component.html',
  styleUrls: ['./dialog-confirmacao.component.scss']
})
export class DialogConfirmacaoComponent {


  constructor(
    public dialogRef: MatDialogRef<DialogConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmacaoData) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar() {
    this.data.acao();
    this.dialogRef.close();
  }

}
