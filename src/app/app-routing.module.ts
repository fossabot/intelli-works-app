import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'detail', loadChildren: './detail-page/detail-page.module#DetailPagePageModule' },
  { path: 'recordlist', loadChildren: './record-list/record.module#RecordPageModule' },
  { path: 'createrecord', loadChildren: './create-record/create-record.module#CreateRecordPageModule' },
  { path: 'notedetail', loadChildren: './record-list/note-detail/note-detail.module#NoteDetailPageModule' },
  { path: '**', loadChildren: './login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
