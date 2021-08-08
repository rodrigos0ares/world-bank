import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ApplicationContextService {

  static applicationTitleEmitter = new EventEmitter<string>(true);

  setApplicationTitle(title: string) {
    ApplicationContextService.applicationTitleEmitter.emit(title);
  }
}