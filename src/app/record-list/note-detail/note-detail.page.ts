import { Component, OnInit } from '@angular/core';
import {ShareService} from '../../service/share.service';
import {Storage} from '@ionic/storage';
import {isUndefined} from 'util';
import {IonButton, NavController} from '@ionic/angular';
import {NoteService} from '../../service/note.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {

  constructor(
      public shareService: ShareService,
      private storage: Storage,
      private navController: NavController,
      private noteService: NoteService
  ) { }

  ngOnInit() {
    if (this.shareService.fromHistory) {
      this.storage.get('token').then((token) => {
        this.shareService.fetchStudent(this.shareService.currentNote.sno, token).subscribe((rsp) => {
          if (isUndefined(rsp)) {
            this.shareService.showToast('获取学生信息失败');
            this.shareService.fromHistory = false;
          } else {
            this.shareService.currentStudent = rsp;
          }
        });
      });
    }
  }

  createNote() {
    this.navController.navigateForward(['/createrecord']);
  }

  showStudent() {
    this.navController.navigateForward(['detail']);
  }

  showHistory(btn: IonButton) {
    this.storage.get('token').then((token) => {
      this.noteService.fetchNote(this.shareService.currentStudent.sno, token).subscribe((rsp) => {
        if (isUndefined(rsp) || rsp.length === 0) {
          this.shareService.showToast('未找到有关记录');
          btn.disabled = false;
        } else {
          this.noteService.fetchResult = rsp;
          this.navController.navigateForward(['/recordlist']);
          btn.disabled = false;
        }
      });
    });
  }
}
