import {ContactPage} from './app.page';
import {browser, element, by} from 'protractor';
import configs from '../src/app/config/contacts';
import {Contact} from "../src/app/Components/contacts/contact";

describe('create-contact component', () => {
  let page: ContactPage;
  let contact: Contact;
  beforeEach(() => {
    page = new ContactPage();
    page.navigateTo();
    // Open contact page
    page.contactAddBtn().click();
    this.contact = configs.contacts[0];
  });

  it('should be create contact form should load', () => {
    // Some browsers are slow to load
    browser.driver.sleep(100);
    expect(page.getAddContactHeaderText()).toContain('Add New Contact');
  });

  it('should be all field reuired', () => {
    expect(page.checkRequred('first_name', '')).toBeTruthy();
    expect(page.checkRequred('last_name', '')).toBeTruthy();
    expect(page.checkRequred('email', '')).toBeTruthy();
    expect(page.checkRequred('phone', '')).toBeTruthy();
  });

  it('should be all reuired message should hide', () => {
    expect(page.checkRequred('last_name', 'na')).toBeTruthy();
    expect(page.checkRequred('email', 'na')).toBeTruthy();
    expect(page.checkRequred('phone', '12')).toBeTruthy();
  });

  it('should be form should be filed and save button availebe', () => {
    page.fillFormData(this.contact);
    expect(page.saveBtn()).toBeDefined();
  });

  it('should be contact add and check contact list is updated', () => {
    page.fillFormData(this.contact);
    page.saveBtn().click();
    browser.sleep(10);
    expect(page.getContactList().count()).not.toEqual(0);
    expect(page.getContactList().last().$('h4').getText()).toEqual(`${this.contact.first_name} ${this.contact.last_name}`);
  });
});
