exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'https://www.google.com/',
      show: true,
      windowSize: '1200x900'
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'e2e-test',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    },
    stepByStepReport: {
      enabled: false,
      deleteSuccessful: false,
    },
    allure: {
      enabled: true
    }
  },
  //並列化
  //npx codeceptjs run-workers 3で起動
  multiple: {
    parallel: {
      chunks: 3
    }
  }
}