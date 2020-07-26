import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  serverResourceUrl() {
    return environment.resourceUrl;
  }
}
