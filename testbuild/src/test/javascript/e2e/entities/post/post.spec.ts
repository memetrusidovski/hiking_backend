/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PostComponentsPage from './post.page-object';
import { PostDeleteDialog } from './post.page-object';
import PostUpdatePage from './post-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Post e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let postUpdatePage: PostUpdatePage;
  let postComponentsPage: PostComponentsPage;
  let postDeleteDialog: PostDeleteDialog;

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

  it('should load Posts', async () => {
    await navBarPage.getEntityPage('post');
    postComponentsPage = new PostComponentsPage();
    expect(await postComponentsPage.getTitle().getText()).to.match(/Posts/);
  });

  it('should load create Post page', async () => {
    await postComponentsPage.clickOnCreateButton();
    postUpdatePage = new PostUpdatePage();
    expect(await postUpdatePage.getPageTitle().getAttribute('id')).to.match(/blogApp.post.home.createOrEditLabel/);
    await postUpdatePage.cancel();
  });

  it('should create and save Posts', async () => {
    async function createPost() {
      await postComponentsPage.clickOnCreateButton();
      await postUpdatePage.setTitleInput('title');
      expect(await postUpdatePage.getTitleInput()).to.match(/title/);
      await postUpdatePage.setContentInput('content');
      expect(await postUpdatePage.getContentInput()).to.match(/content/);
      await postUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await postUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
      await postUpdatePage.blogSelectLastOption();
      // postUpdatePage.tagSelectLastOption();
      await waitUntilDisplayed(postUpdatePage.getSaveButton());
      await postUpdatePage.save();
      await waitUntilHidden(postUpdatePage.getSaveButton());
      expect(await postUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createPost();
    await postComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await postComponentsPage.countDeleteButtons();
    await createPost();

    await postComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await postComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Post', async () => {
    await postComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await postComponentsPage.countDeleteButtons();
    await postComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    postDeleteDialog = new PostDeleteDialog();
    expect(await postDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/blogApp.post.delete.question/);
    await postDeleteDialog.clickOnConfirmButton();

    await postComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await postComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
