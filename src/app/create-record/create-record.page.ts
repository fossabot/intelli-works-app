import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ShareService} from '../service/share.service';
import {IonButton, IonSelect, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {NoteService} from '../service/note.service';
import {isUndefined} from 'util';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.page.html',
  styleUrls: ['./create-record.page.scss'],
})
export class CreateRecordPage implements OnInit {
  needLevel = false;

  recordForm = new FormGroup({
    category: new FormControl('常规辅导'),
    level: new FormControl('一般'),
    note: new FormControl(''),
    comment: new FormControl('常规处理')
  });

  constructor(
      public shareService: ShareService,
      private storage: Storage,
      private recordService: NoteService,
      private navController: NavController
  ) { }

  ngOnInit() {
  }

  ifNeedLevel(cat: IonSelect) {
    this.needLevel = cat.value.toString().endsWith('问题');
    if (!this.needLevel) {
      this.recordForm.setValue({
        category: this.recordForm.value.category,
        level: '一般',
        note: this.recordForm.value.note,
        comment: this.recordForm.value.comment
      });
    }
  }

  onSubmit(submitBtn: IonButton) {
    this.storage.get('token').then((tk) => {
      this.recordService.createNote({
        sno: this.shareService.currentStudent.sno,
        category: this.recordForm.value.category,
        level: this.recordForm.value.level,
        note: this.recordForm.value.note,
        comment: this.recordForm.value.comment,
        token: tk
      }).subscribe((rsp) => {
        if (isUndefined(rsp) || rsp !== 'ok') {
          this.shareService.showToast('创建辅导记录失败');
        } else {
          this.shareService.showToast('创建成功！');
          this.navController.back();
          submitBtn.disabled = false;
        }
      });
    });
  }
}
