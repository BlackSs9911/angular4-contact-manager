import {browser, by, element} from 'protractor';

export class ContactPage {
  escapeFields: Array<String>

  constructor() {
    this.escapeFields = ['eitable', '_id'];
  }


  navigateTo() {
    return browser.get('/');
  }

  getHeaderText() {
    return element(by.css('app-list-contacts md-toolbar-row span')).getText();
  }

  //TODO:: optimize passing parameters
  getAddContactHeaderText() {
    return element(by.css('app-create-contact md-toolbar-row .title-margin_left')).getText();
  }

  contactAddBtn() {
    return element(by.css('app-contacts .btn-contact_add'));
  }

  saveBtn() {
    return element(by.css('button.create-contact-submit.mat-raised-button'));
  }

  checkRequred(fieldName: string, fieldValue: string) {
    if (this.escapeFields.indexOf(fieldName) == -1) {
      element(by.name(fieldName)).sendKeys(fieldValue);
      this.saveBtn().click();
      return expect(element(by.css(`.${fieldName}-container .${fieldName}-required-alert`))).toBeDefined;
    }
  }

  inputFied(fieldName: string, fieldValue: string) {
    if (this.escapeFields.indexOf(fieldName) == -1) {
      return element(by.name(fieldName)).sendKeys(fieldValue);
    }
  }

  fillFormData(formValue) {
    for (let key in formValue) {
      this.inputFied(key, formValue[key])
    }
    return true;
  }

  getContactList() {
    return element.all(by.css('app-list-contacts md-list .each-contact'));
  }

}
