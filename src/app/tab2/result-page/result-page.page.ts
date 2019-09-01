import {Component, OnInit, ViewChild} from '@angular/core';
import {Student} from '../../models/Share';
import {Router} from '@angular/router';
import {ShareService} from '../../service/share.service';
import {SearchService} from '../../service/search.service';
import {IonContent, NavController} from '@ionic/angular';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.page.html',
  styleUrls: ['./result-page.page.scss'],
})
export class ResultPagePage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;
  studentResults: Student[];
  working: boolean;

  constructor(
      private searchService: SearchService,
      private shareService: ShareService,
      private navController: NavController
  ) { }

  ngOnInit() {
    this.studentResults = this.searchService.searchResult;
  }

  gotoDetail(student: Student) {
    if (this.working) {
      return;
    }
    this.working = true;
    this.shareService.currentStudent = student;
    this.working = false;
    this.navController.navigateForward(['detail']);
  }

  scrollToTop() {
    this.content.scrollToTop(1000);
  }
}
