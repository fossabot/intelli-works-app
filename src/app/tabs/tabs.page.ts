import {Component} from '@angular/core';
import {ShareService} from '../service/share.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
      public shareService: ShareService
  ) {}

}
