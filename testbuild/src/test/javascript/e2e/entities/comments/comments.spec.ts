/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CommentsComponentsPage from './comments.page-object';
import { CommentsDeleteDialog } from './comments.page-object';
import CommentsUpdatePage from './comments-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Comments e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let commentsUpdatePage: CommentsUpdatePage;
  let commentsComponentsPage: CommentsComponentsPage;
  let commentsDeleteDialog: CommentsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Comments', async () => {
    await navBarPage.getEntityPage('comments');
    commentsComponentsPage = new CommentsComponentsPage();
    expect(await commentsComponentsPage.getTitle().getText()).to.match(/Comments/);
  });

  it('should load create Comments page', async () => {
    await commentsComponentsPage.clickOnCreateButton();
    commentsUpdatePage = new CommentsUpdatePage();
    expect(await commentsUpdatePage.getPageTitle().getAttribute('id')).to.match(/blogApp.comments.home.createOrEditLabel/);
    await commentsUpdatePage.cancel();
  });

  it('should create and save Comments', async () => {
    async function createComments() {
      await commentsComponentsPage.clickOnCreateButton();
      await commentsUpdatePage.setAuthorInput('author');
      expect(await commentsUpdatePage.getAuthorInput()).to.match(/author/);
      await commentsUpdatePage.setDescriptionInput('description');
      expect(await commentsUpdatePage.getDescriptionInput()).to.match(/description/);
      await waitUntilDisplayed(commentsUpdatePage.getSaveButton());
      await commentsUpdatePage.save();
      await waitUntilHidden(commentsUpdatePage.getSaveButton());
      expect(await commentsUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createComments();
    await commentsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await commentsComponentsPage.countDeleteButtons();
    await createComments();

    await commentsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await commentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Comments', async () => {
    await commentsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await commentsComponentsPage.countDeleteButtons();
    await commentsComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    commentsDeleteDialog = new CommentsDeleteDialog();
    expect(await commentsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/blogApp.comments.delete.question/);
    await commentsDeleteDialog.clickOnConfirmButton();

    await commentsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await commentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
