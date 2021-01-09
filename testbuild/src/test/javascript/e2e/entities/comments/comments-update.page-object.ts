import { element, by, ElementFinder } from 'protractor';

export default class CommentsUpdatePage {
  pageTitle: ElementFinder = element(by.id('blogApp.comments.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  authorInput: ElementFinder = element(by.css('input#comments-author'));
  descriptionInput: ElementFinder = element(by.css('input#comments-description'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAuthorInput(author) {
    await this.authorInput.sendKeys(author);
  }

  async getAuthorInput() {
    return this.authorInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
