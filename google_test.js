//Featureにretry(1)を付けるだけで、全てのシナリオに対して失敗した場合は1回までリトライをしてくれる
//1度失敗したテストもリトライして成功すればそれは成功とみなされる
Feature('はじめてのCodeceptJS').retry(1);

Scenario('Googleで検索、表示内容の確認', async({ I }) => {
    I.amOnPage('https://www.google.com');
    I.fillField('q', 'CodeceptJS');
    I.pressKey('Enter');
    I.wait(1);
    let firstResult = await I.grabTextFrom('h3');
    //console.log(firstResult);
    I.click(firstResult);
    I.fillField('#algolia-search-input', 'puppetter');
    I.pressKey('Enter');
    I.see('Now you can use Puppeteer for Firefox (min version: Firefox/63.0.4)');
});

Scenario('並列化テスト', async({ I }) => {
    I.amOnPage('https://www.google.com');
    I.fillField('q', '並列化 CodeceptJS');
    I.pressKey('Enter');
    I.wait(1);
    let firstResult = await I.grabTextFrom('h3');
    I.click(firstResult);
    I.fillField('q', 'CodeceptJS');
    I.pressKey('Enter');
    I.see('CodeceptJS 3.0 (日本語)');
});

const testWords = [
    { 'searchWord': 'puppetter', 'responseWord': 'Now you can use Puppeteer for Firefox (min version: Firefox/63.0.4)' },
    { 'searchWord': 'selenium', 'responseWord': 'Testing with WebDriver' },
]

// currentは特別な変数で、repositoriesでループを回したときの現在の変数が入っている
Data(testWords).Scenario('データ駆動テスト', async({I, current}) => {

  I.amOnPage('https://www.google.co.jp/')
  I.fillField('q', 'CodeceptJS');
  I.pressKey('Enter');
  I.wait(1);
  let firstResult =await I.grabTextFrom('h3');
  I.click(firstResult);
  I.fillField('#algolia-search-input', current['searchWord']);
  I.pressKey('Enter');
  I.see(current['responseWord']);
})