import {Component, OnInit, ViewChild} from '@angular/core';
import {isUndefined} from 'util';
import {IonContent, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {NoteService} from '../service/note.service';
import {ShareService} from '../service/share.service';
import {Note} from '../models/Share';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;

  constructor(
      private storage: Storage,
      public recordService: NoteService,
      private shareService: ShareService,
      private navController: NavController
  ) { }

  ngOnInit() {
  }

  doRefresh(event) {
    this.storage.get('token').then((token) => {
      this.recordService.fetchNote(this.shareService.currentStudent.sno, token).subscribe((rsp) => {
        if (isUndefined(rsp)) {
          this.shareService.showToast('获取辅导记录失败');
        } else {
          this.recordService.fetchResult = rsp;
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
    this.shareService.fromHistory = false;
    this.navController.navigateForward(['/notedetail']);
  }
}
