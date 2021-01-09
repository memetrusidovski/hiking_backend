import { element, by, ElementFinder } from 'protractor';

export default class SavedTrailsUpdatePage {
  pageTitle: ElementFinder = element(by.id('blogApp.savedTrails.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#saved-trails-title'));
  userSelect: ElementFinder = element(by.css('select#saved-trails-user'));
  trailSelect: ElementFinder = element(by.css('select#saved-trails-trail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async trailSelectLastOption() {
    await this.trailSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async trailSelectOption(option) {
    await this.trailSelect.sendKeys(option);
  }

  getTrailSelect() {
    return this.trailSelect;
  }

  async getTrailSelectedOption() {
    return this.trailSelect.element(by.css('option:checked')).getText();
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
