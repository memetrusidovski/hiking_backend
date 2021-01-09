/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TrailComponentsPage from './trail.page-object';
import { TrailDeleteDialog } from './trail.page-object';
import TrailUpdatePage from './trail-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Trail e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let trailUpdatePage: TrailUpdatePage;
  let trailComponentsPage: TrailComponentsPage;
  let trailDeleteDialog: TrailDeleteDialog;

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

  it('should load Trails', async () => {
    await navBarPage.getEntityPage('trail');
    trailComponentsPage = new TrailComponentsPage();
    expect(await trailComponentsPage.getTitle().getText()).to.match(/Trails/);
  });

  it('should load create Trail page', async () => {
    await trailComponentsPage.clickOnCreateButton();
    trailUpdatePage = new TrailUpdatePage();
    expect(await trailUpdatePage.getPageTitle().getAttribute('id')).to.match(/blogApp.trail.home.createOrEditLabel/);
    await trailUpdatePage.cancel();
  });

  it('should create and save Trails', async () => {
    async function createTrail() {
      await trailComponentsPage.clickOnCreateButton();
      await trailUpdatePage.setTitleInput('title');
      expect(await trailUpdatePage.getTitleInput()).to.match(/title/);
      await trailUpdatePage.setUrlInput('url');
      expect(await trailUpdatePage.getUrlInput()).to.match(/url/);
      await trailUpdatePage.setContentInput('content');
      expect(await trailUpdatePage.getContentInput()).to.match(/content/);
      await trailUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await trailUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
      // trailUpdatePage.tagSelectLastOption();
      await waitUntilDisplayed(trailUpdatePage.getSaveButton());
      await trailUpdatePage.save();
      await waitUntilHidden(trailUpdatePage.getSaveButton());
      expect(await trailUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createTrail();
    await trailComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await trailComponentsPage.countDeleteButtons();
    await createTrail();

    await trailComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await trailComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Trail', async () => {
    await trailComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await trailComponentsPage.countDeleteButtons();
    await trailComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    trailDeleteDialog = new TrailDeleteDialog();
    expect(await trailDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/blogApp.trail.delete.question/);
    await trailDeleteDialog.clickOnConfirmButton();

    await trailComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await trailComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
