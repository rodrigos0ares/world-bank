import { Component, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss'],
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
export class IndicadoresComponent implements OnInit{

  indicadores: any[] = []

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = ['date', 'value'];

  constructor(
    private countryService: CountryService,
    private snackBarService: SnackBarService,
    public route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.countryCode){
        this.countryService.getCountryIndicators(params.countryCode).then((response)=>{
          this.indicadores = response;
          this.dataSource = new MatTableDataSource(this.indicadores);
          this.dataSource.paginator = this.paginator;
        }).catch((e)=>{
          console.error(e)
          this.snackBarService.erro(`Não foi possível carregar os indicadores para o país de código: ${params.countryCode}`)
        })
      }
    }
  );
  }
}
