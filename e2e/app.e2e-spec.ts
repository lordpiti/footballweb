import { AngularCliHerokuPage } from './app.po';
import { ElementFinder } from 'protractor/built/element';
import { browser } from 'protractor';


describe('angular-cli-heroku App', () => {
  let page: AngularCliHerokuPage;

  beforeEach(() => {
    page = new AngularCliHerokuPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    page.clickButton();
    expect(browser.getCurrentUrl()).toMatch(`/teams`);
  });
});
