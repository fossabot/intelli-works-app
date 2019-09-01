import {Component, OnInit, ViewChild} from '@angular/core';
import {Record} from '../models/Share';
import {ShareService} from '../service/share.service';
import {Storage} from '@ionic/storage';
import {isUndefined} from 'util';
import {IonContent, NavController} from '@ionic/angular';
import {VisitService} from '../service/visit.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;

  visitList: Record[];
  working = false;

  constructor(
      private shareService: ShareService,
      private visitService: VisitService,
      private storage: Storage,
      private navController: NavController
  ) {}

  ngOnInit() {
    // this.shareService.showToast('正在获取来访记录...', 700);
    this.storage.get('token').then((token) => {
      this.visitService.getRecords(token).subscribe((rsp) => {
        if (isUndefined(rsp)) {
          this.shareService.showToast('获取来访记录失败');
        } else {
          this.visitList = rsp;
          this.shareService.showToast('已获取最新来访记录', 700);
        }
        this.working = false;
      });
    });
  }

  showStudent(sno: string) {
    if (this.working) {
      return;
    } else {
      this.working = true;
    }

    this.storage.get('token').then((token) => {
      this.shareService.fetchStudent(sno, token).subscribe((rsp) => {
        if (isUndefined(rsp)) {
          this.shareService.showToast('获取学生详情失败');
          this.working = false;
          return;
        }
        this.shareService.currentStudent = rsp;
        this.navController.navigateForward(['detail']);
        this.working = false;
      });
    });
  }


  doRefresh(event) {
    this.storage.get('token').then((token) => {
      this.visitService.getRecords(token).subscribe((rsp) => {
        if (isUndefined(rsp)) {
          this.shareService.showToast('获取来访记录失败');
        } else {
          this.visitList = rsp;
        }
        event.target.complete();
      });
    });
  }

  scrollToTop() {
    this.content.scrollToTop(1000);
  }

}
