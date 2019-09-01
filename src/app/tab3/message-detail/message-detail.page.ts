import {Component, OnInit} from '@angular/core';
import {ShareService} from '../../service/share.service';
import {Message} from '../../models/Share';
import {Storage} from '@ionic/storage';
import {isUndefined} from 'util';
import {MessageService} from '../../service/message.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.page.html',
  styleUrls: ['./message-detail.page.scss'],
})
export class MessageDetailPage implements OnInit {
  currentMessage: Message;

  constructor(
      public shareService: ShareService,
      private messageService: MessageService,
      private storage: Storage,
      private navController: NavController
  ) { }

  ngOnInit() {
    this.currentMessage = this.shareService.currentMessage;
  }

  setRead() {// false means read, true for unread
    this.storage.get('token').then((token) => {
      if (isUndefined(token)) {
        return;
      }
      this.messageService.updateMessage(this.currentMessage.msgId, false, token).subscribe(() => {
        this.currentMessage.status = false;
        this.shareService.unread--;
        this.navController.back();
      });
    });
  }

  showStudent(id: number) {
    this.storage.get('token').then((token) => {
      if (isUndefined(token)) {
        return;
      }
      this.shareService.fetchStudent(id.toString(), token).subscribe((rsp) => {
        if (isUndefined(rsp)) {
          this.shareService.showToast('获取学生详情失败');
          return;
        }
        this.shareService.currentStudent = rsp;
        this.navController.navigateForward(['detail']);
      });
    });
  }
}
