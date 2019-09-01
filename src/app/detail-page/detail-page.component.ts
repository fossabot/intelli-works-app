import {Component, OnInit} from '@angular/core';
import {ShareService} from '../service/share.service';
import {IonButton, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {NoteService} from '../service/note.service';
import {isUndefined} from 'util';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPage implements OnInit {
  constructor(
      public shareService: ShareService,
      private navController: NavController,
      private storage: Storage,
      private noteService: NoteService,
      public clipboard: Clipboard
  ) { }

  ngOnInit() {
  }

  showRecord(btn: IonButton) {
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

  createRecord() {
    this.navController.navigateForward(['/createrecord']);
  }

  copy(text: string) {
    this.clipboard.copy(text).then((x) => {
      this.shareService.showToast('已复制到剪切板');
    });
  }

  copyAll() {// TODO finish this
    this.copy('年级：' + this.shareService.currentStudent.grade + '\n' +
        '班级：' + this.shareService.currentStudent.cls + '\n' +
        '学号：' + this.shareService.currentStudent.sno + '\n' +
        '姓名：' + this.shareService.currentStudent.name + '\n' +
        '生源地：' + this.shareService.currentStudent.area + '\n' +
        '民族：' + this.shareService.currentStudent.nation + '\n' +
        '性质：' + this.shareService.currentStudent.quality + '\n' +
        '国助生：' + this.shareService.currentStudent.nation_help + '\n' +
        '绩点：' + this.shareService.currentStudent.gpa + '\n' +
        '政治面貌：' + this.shareService.currentStudent.political + '\n' +
        '手机号：' + this.shareService.currentStudent.phone + '\n' +
        '父母手机号：' + this.shareService.currentStudent.parent_phone + '\n' +
        '宿舍楼：' + this.shareService.currentStudent.dorm + '\n' +
        '宿舍：' + this.shareService.currentStudent.dorm_num + '\n' +
        '身份证号：' + this.shareService.currentStudent.uid + '\n' +
        '家庭住址：' + this.shareService.currentStudent.home);
  }
}
