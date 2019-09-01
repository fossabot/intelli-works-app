import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultPagePage} from './result-page.page';

describe('ResultPagePage', () => {
  let component: ResultPagePage;
  let fixture: ComponentFixture<ResultPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
