import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ApplicationContextService} from 'src/app/services/application.context.service';
import {Location} from '@angular/common';
import {environment} from 'src/environments/environment';

interface HeaderLimit{
  cssClass: string,
  current: number,
  maximum: number,
  description: string
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [ApplicationContextService]
})
export class NavComponent implements OnInit {
  title: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _location: Location,
    ) {
  }

    backClicked() {
      this._location.back();
    }

  ngOnInit(): void {
    ApplicationContextService.applicationTitleEmitter.subscribe(newTitle => {
      this.title = newTitle;
    });
  }
}
