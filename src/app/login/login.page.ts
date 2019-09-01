import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {isNull, isUndefined} from 'util';
import {Storage} from '@ionic/storage';
import {LoginService} from '../service/login.service';
import {ShareService} from '../service/share.service';
import {ValidateResponse} from '../models/Share';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  codeInput = new FormControl('');
  working = true;
  constructor(
      private shareService: ShareService,
      private loginService: LoginService,
      private storage: Storage,
      private navController: NavController
  ) { }

  ngOnInit() {
    this.storage.get('token').then((token) => {
      if (isUndefined(token) || isNull(token) || token === 'error') {
        console.log('token not found');
        this.working = false;
      } else {
        this.shareService.showToast('正在验证邀请码...');
        this.loginService.checkToken(token).subscribe((rsp) => {
          this.handleValidateResponse(rsp);
          this.working = false;
        });
      }
    });
  }

  doLogin() {
    if (this.codeInput.value !== '') {
      this.loginService.doLogin(this.codeInput.value).subscribe((rsp) => {
        if (isUndefined(rsp) || rsp === 'error') {
          this.shareService.showToast('邀请码无效');
          this.working = false;
        } else {
          this.shareService.showToast('验证成功！');
          this.storage.remove('token');
          this.storage.set('token', rsp);
          this.navController.navigateRoot(['/tabs']);
        }
      });
    } else {
      this.storage.get('token').then((token) => {
        if (isUndefined(token) || isNull(token) || token === 'error') {
          this.shareService.showToast('请输入邀请码');
          this.working = false;
        } else {
          this.loginService.checkToken(token).subscribe((rsp) => {
            this.handleValidateResponse(rsp);
          });
        }
      });
    }
  }

  handleValidateResponse(rsp: ValidateResponse) {
    if (isUndefined(rsp) || isUndefined(rsp.teacherName)) {
      this.shareService.showToast('邀请码已过期，请联系管理员处理');
      this.working = false;
    } else {
      this.shareService.showToast('欢迎您，' + rsp.teacherName + '老师！');
      this.shareService.unread = rsp.unread;
      this.navController.navigateRoot(['/tabs']);
    }
  }
}
