import { browser, by, element } from 'protractor';

export class AngularCliHerokuPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  clickButton() {
    let buttonFound = element(by.id('linkManageTeams'));
    buttonFound.click();
  }
}
