import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IonButton, NavController, ToastController} from '@ionic/angular';
import {isUndefined} from 'util';
import {Router} from '@angular/router';
import {ShareService} from '../service/share.service';
import {Storage} from '@ionic/storage';
import {SearchService} from '../service/search.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  searchForm = new FormGroup({
    gender: new FormControl('any'),
    politic: new FormControl('any'),
    grade: new FormControl('any'),
    class: new FormControl('any'),
    dorm: new FormControl('any'),
    nationHelp: new FormControl('any'),
    other: new FormControl('')
  });

  sexList: string[];
  politicList: string[];
  gradeList: string[];
  classList: string[];
  buildingList: string[];
  nationHelpList: string[];

  working: boolean;

  constructor(
      private searchService: SearchService,
      private shareService: ShareService,
      private toastController: ToastController,
      private loginService: ShareService,
      private storage: Storage,
      private navController: NavController
  ) { }

  ngOnInit() {
    this.searchService.getSexList().subscribe((list) => this.sexList = list);
    this.searchService.getPoliticList().subscribe((list) => this.politicList = list);
    this.searchService.getNationHelpList().subscribe((list) => this.nationHelpList = list);
    this.searchService.getGradeList().subscribe((list) => this.gradeList = list);
    this.searchService.getClassList().subscribe((list) => this.classList = list);
    this.searchService.getBuildingList().subscribe((list) => this.buildingList = list);
  }

  onSearch(btn: IonButton) {
    if (
        this.searchForm.value.gender === 'any' &&
        this.searchForm.value.politic === 'any' &&
        this.searchForm.value.grade === 'any' &&
        this.searchForm.value.class === 'any' &&
        this.searchForm.value.dorm === 'any' &&
        this.searchForm.value.nationHelp === 'any' &&
        this.searchForm.value.other === ''
    ) {
      this.shareService.showToast('请至少选择一个条件');
      btn.disabled = false;
      return;
    }

    this.searchService.searchResult = undefined;

    this.storage.get('token').then((tokenRead) => {
      this.searchService.doSearch({
        gender: this.searchForm.value.gender,
        politic: this.searchForm.value.politic,
        grade: this.searchForm.value.grade,
        cls: this.searchForm.value.class,
        dorm: this.searchForm.value.dorm,
        nationHelp: this.searchForm.value.nationHelp,
        other: this.searchForm.value.other,
        token: tokenRead
      }).subscribe((rsp) => {
        this.searchService.searchResult = rsp;
        btn.disabled = false;
        if (isUndefined(rsp)) {
          this.shareService.showToast('查询失败');
        } else if (rsp.length === 0) {
          this.shareService.showToast('未找到有关记录');
        } else {
          this.navController.navigateForward(['/tabs/tab2/result']);
        }
      });
    });
  }

  clearSearchForm() {
    this.searchForm.setValue({
      gender: 'any',
      politic: 'any',
      grade: 'any',
      class: 'any',
      dorm: 'any',
      nationHelp: 'any',
      other: ''
    });
  }
}
