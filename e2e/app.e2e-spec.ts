import { PizzSysPage } from './app.po';

describe('pizz-sys App', function() {
  let page: PizzSysPage;

  beforeEach(() => {
    page = new PizzSysPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
