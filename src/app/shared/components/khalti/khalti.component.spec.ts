/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KhaltiComponent } from './khalti.component';

describe('KhaltiComponent', () => {
  let component: KhaltiComponent;
  let fixture: ComponentFixture<KhaltiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhaltiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhaltiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
