import { WebSecurityProjectFrontendPage } from './app.po';

describe('web-security-project-frontend App', () => {
  let page: WebSecurityProjectFrontendPage;

  beforeEach(() => {
    page = new WebSecurityProjectFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
