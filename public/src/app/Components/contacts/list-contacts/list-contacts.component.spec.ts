import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpModule} from '@angular/http';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import {ListContactsComponent} from './list-contacts.component';
import {ContactsService} from '../../../services/contacts.service';
import {Contact} from '../contact';
import configs from '../../../config/contacts';
import {By} from "@angular/platform-browser";

let MockContactesArray: Array<Contact> = configs.contacts

describe('ListContactsComponent', () => {
  let component: ListContactsComponent;
  let fixture: ComponentFixture<ListContactsComponent>;
  let debugElement:DebugElement;
  let htmlElement:HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ListContactsComponent],
      providers: [ContactsService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be load contact',()=>{
    //TODO:: detectChanges move to begoreEach
    let oneContact:Contact =  MockContactesArray[0]
    component.contacts = [oneContact];
    fixture.detectChanges();
    debugElement =  fixture.debugElement.query(By.css('md-list md-list-item'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain(oneContact.first_name);
  });

  it('should be load contacts list',()=>{
    //TODO:: detectChanges move to begoreEach
    component.contacts = MockContactesArray;
    fixture.detectChanges();
    debugElement =  fixture.debugElement.query(By.css('md-list'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement.textContent).toContain(MockContactesArray[0].first_name);
    expect(htmlElement.textContent).toContain(MockContactesArray[1].first_name);
    expect(htmlElement.textContent).toContain(MockContactesArray[2].first_name);
    expect(htmlElement.textContent).toContain(MockContactesArray[3].first_name);
    expect(htmlElement.textContent).toContain(MockContactesArray[4].first_name);
  });



  it('should be destroy called', () => {
    spyOn(component.destroyContactEvent, 'emit');
    component.destroy(MockContactesArray[0]);
    expect(component.destroyContactEvent.emit).toHaveBeenCalled();
    expect(component.destroyContactEvent.emit).toHaveBeenCalledWith(MockContactesArray[0]);
  });

  it('should be create called', () => {
    spyOn(component.changeViewEvent, 'emit');
    component.changeView();
    expect(component.changeViewEvent.emit).toHaveBeenCalled();
    expect(component.changeViewEvent.emit).toHaveBeenCalledWith(true);
  });
});



