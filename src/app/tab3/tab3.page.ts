import {Component, OnInit, ViewChild} from '@angular/core';
import {Message} from '../models/Share';
import {isUndefined} from 'util';
import {Storage} from '@ionic/storage';
import {ShareService} from '../service/share.service';
import {MessageService} from '../service/message.service';
import {IonContent, NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;

  messageList: Message[];

  constructor(
      private messageService: MessageService,
      public shareService: ShareService,
      private navController: NavController,
      private storage: Storage
  ) {}

  ngOnInit(): void {
    // this.shareService.showToast('正在获取留言...', 700);
    this.storage.get('token').then((token) => {
      this.messageService.getMessageList(token).subscribe((rsp) => {
        if (isUndefined(rsp)) {
          this.shareService.showToast('获取留言失败');
        } else {
          this.messageList = rsp;
          this.countUnread();
          this.shareService.showToast('已获取最新留言列表', 700);
        }
      });
    });
  }

  showBrief(msg: string) {
    if (msg.length > 18) {
      return '「' + msg.substring(0, 14) + '......';
    } else {
      return '「' + msg + '」';
    }
  }

  showMessage(message: Message) {
    this.shareService.currentMessage = message;
    this.navController.navigateForward(['/tabs/tab3/message']);
  }

  countUnread() {
    this.shareService.unread = 0;
    this.messageList.forEach((value) => {
      if (value.status) {
        this.shareService.unread++;
      }
    });
  }

  doRefresh(event) {
    this.storage.get('token').then((token) => {
      this.messageService.getMessageList(token).subscribe((rsp) => {
        if (isUndefined(rsp)) {
          this.shareService.showToast('获取留言失败');
        } else {
          this.messageList = rsp;
          this.countUnread();
        }
        event.target.complete();
      });
    });
  }

  scrollToTop() {
    this.content.scrollToTop(1000);
  }
}
