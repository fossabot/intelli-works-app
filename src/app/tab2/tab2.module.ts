import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Tab2Page} from './tab2.page';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{path: '', component: Tab2Page}]),
    ReactiveFormsModule,
  ],
  declarations: [
      Tab2Page
  ]
})
export class Tab2PageModule {}
