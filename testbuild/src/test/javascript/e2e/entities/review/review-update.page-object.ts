import { element, by, ElementFinder } from 'protractor';

export default class ReviewUpdatePage {
  pageTitle: ElementFinder = element(by.id('blogApp.review.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#review-title'));
  contentInput: ElementFinder = element(by.css('textarea#review-content'));
  ratingInput: ElementFinder = element(by.css('input#review-rating'));
  trailSelect: ElementFinder = element(by.css('select#review-trail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return this.contentInput.getAttribute('value');
  }

  async setRatingInput(rating) {
    await this.ratingInput.sendKeys(rating);
  }

  async getRatingInput() {
    return this.ratingInput.getAttribute('value');
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
