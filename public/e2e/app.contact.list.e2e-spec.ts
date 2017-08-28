import { ContactPage } from './app.page';
import { browser, element, by } from 'protractor';

describe('ContactList Cmp', () => {
  let page: ContactPage;

  beforeEach(() => {
    page = new ContactPage();
    page.navigateTo();
  });

  it('should display Page title', () => {
    expect(page.getHeaderText()).toContain('Contact Manager');
  });

  it('should be avaialbel add contact btn', () => { 
    expect(page.contactAddBtn()).toBeDefined; 
  });
});
