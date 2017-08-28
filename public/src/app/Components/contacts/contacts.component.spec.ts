import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {ContactsService} from '../../services/contacts.service';
import {ContactsComponent} from './contacts.component';
import {Contact} from './contact';
import configs from '../../config/contacts';

let MockContactesArray: Array<Contact> = configs.contacts;


describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let contactsService: ContactsService;
  let de: DebugElement;
  let contacts: Array<Contact>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, ReactiveFormsModule, FormsModule],
      declarations: [ContactsComponent],
      providers: [
        ContactsService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    contactsService = TestBed.get(ContactsService);
    spyOn(contactsService, 'getContacts').and.callFake(() => {
      return {
        then: function (callback) {
          return callback(MockContactesArray);
        }
      };
    });

    spyOn(contactsService, 'create').and.callFake(() => {
      return Promise.resolve(MockContactesArray[0]);
    });

    //fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be called getContacts', () => {
    expect(component.contacts.length).toBe(0);
    component.getContacts();
    // expect(component.getContacts).toHaveBeenCalledTimes(1);
    expect(component.contacts.length).toBe(5);

  });

  it('should be called to contact save', async((done) => {
    expect(component.create(MockContactesArray[0])).toBe(true);
    expect(contactsService.create).toHaveBeenCalledTimes(1);
    expect(contactsService.create).toHaveBeenCalledWith(MockContactesArray[0]);
  }));


  it('should be click toggleView shuould change value', async((done) => {
    fixture.detectChanges();
    expect(component.isListView).toBe(true);
    component.toggleView();
    expect(component.isListView).toBe(false);
  }));

});
