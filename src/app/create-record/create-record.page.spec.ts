import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecordPage } from './create-record.page';

describe('CreateRecordPage', () => {
  let component: CreateRecordPage;
  let fixture: ComponentFixture<CreateRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRecordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
