import { element, by, ElementFinder } from 'protractor';

export default class TrailUpdatePage {
  pageTitle: ElementFinder = element(by.id('blogApp.trail.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#trail-title'));
  urlInput: ElementFinder = element(by.css('input#trail-url'));
  contentInput: ElementFinder = element(by.css('textarea#trail-content'));
  dateInput: ElementFinder = element(by.css('input#trail-date'));
  tagSelect: ElementFinder = element(by.css('select#trail-tag'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setUrlInput(url) {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return this.contentInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async tagSelectLastOption() {
    await this.tagSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tagSelectOption(option) {
    await this.tagSelect.sendKeys(option);
  }

  getTagSelect() {
    return this.tagSelect;
  }

  async getTagSelectedOption() {
    return this.tagSelect.element(by.css('option:checked')).getText();
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
