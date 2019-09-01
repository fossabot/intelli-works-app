import {Component, OnInit, ViewChild} from '@angular/core';
import {isUndefined} from 'util';
import {IonContent, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {ShareService} from '../service/share.service';
import {NoteService} from '../service/note.service';
import {Note} from '../models/Share';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;

  historyList: Note[];

  constructor(
      private storage: Storage,
      private shareService: ShareService,
      private noteService: NoteService,
      private navController: NavController
  ) { }

  ngOnInit() {
    // this.shareService.showToast('正在获取辅导历史...', 700);
    this.storage.get('token').then((token) => {
      this.noteService.getHistory(token).subscribe((rsp) => {
        if (isUndefined(rsp)) {
          this.shareService.showToast('获取辅导历史失败');
        } else {
          this.historyList = rsp;
          this.shareService.showToast('已获取最新辅导历史', 700);
        }
      });
    });
  }

  doRefresh(event) {
    this.storage.get('token').then((token) => {
      this.noteService.getHistory(token).subscribe((rsp) => {
        if (isUndefined(rsp)) {
          this.shareService.showToast('获取辅导历史失败');
        } else {
          this.historyList = rsp;
        }
        event.target.complete();
      });
    });
  }

  scrollToTop() {
    this.content.scrollToTop(1000);
  }

  showNote(note: Note) {
    this.shareService.currentNote = note;
    this.shareService.fromHistory = true;
    this.navController.navigateForward(['/notedetail']);
  }
}
