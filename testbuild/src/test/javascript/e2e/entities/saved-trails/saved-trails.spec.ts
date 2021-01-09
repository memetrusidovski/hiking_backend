/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SavedTrailsComponentsPage from './saved-trails.page-object';
import { SavedTrailsDeleteDialog } from './saved-trails.page-object';
import SavedTrailsUpdatePage from './saved-trails-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('SavedTrails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let savedTrailsUpdatePage: SavedTrailsUpdatePage;
  let savedTrailsComponentsPage: SavedTrailsComponentsPage;
  let savedTrailsDeleteDialog: SavedTrailsDeleteDialog;

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

  it('should load SavedTrails', async () => {
    await navBarPage.getEntityPage('saved-trails');
    savedTrailsComponentsPage = new SavedTrailsComponentsPage();
    expect(await savedTrailsComponentsPage.getTitle().getText()).to.match(/Saved Trails/);
  });

  it('should load create SavedTrails page', async () => {
    await savedTrailsComponentsPage.clickOnCreateButton();
    savedTrailsUpdatePage = new SavedTrailsUpdatePage();
    expect(await savedTrailsUpdatePage.getPageTitle().getAttribute('id')).to.match(/blogApp.savedTrails.home.createOrEditLabel/);
    await savedTrailsUpdatePage.cancel();
  });

  it('should create and save SavedTrails', async () => {
    async function createSavedTrails() {
      await savedTrailsComponentsPage.clickOnCreateButton();
      await savedTrailsUpdatePage.setTitleInput('title');
      expect(await savedTrailsUpdatePage.getTitleInput()).to.match(/title/);
      await savedTrailsUpdatePage.userSelectLastOption();
      await savedTrailsUpdatePage.trailSelectLastOption();
      await waitUntilDisplayed(savedTrailsUpdatePage.getSaveButton());
      await savedTrailsUpdatePage.save();
      await waitUntilHidden(savedTrailsUpdatePage.getSaveButton());
      expect(await savedTrailsUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createSavedTrails();
    await savedTrailsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await savedTrailsComponentsPage.countDeleteButtons();
    await createSavedTrails();

    await savedTrailsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await savedTrailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last SavedTrails', async () => {
    await savedTrailsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await savedTrailsComponentsPage.countDeleteButtons();
    await savedTrailsComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    savedTrailsDeleteDialog = new SavedTrailsDeleteDialog();
    expect(await savedTrailsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/blogApp.savedTrails.delete.question/);
    await savedTrailsDeleteDialog.clickOnConfirmButton();

    await savedTrailsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await savedTrailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
