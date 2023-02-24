const reporter = require('cucumber-html-reporter')

let date = new Date();

let currentDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}_${date.getMilliseconds()}`

let options = {
    brandTitle: 'Trust Portal Test Report',
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json',
    output: `reports/html_report_${currentDate}.html`,
    screenShotsDirectory: '/reports/screenshots',
    storeScreenshots: true,
    launchReport: true,
    metaData: {
        'Release Version': '1.7',
        'Test ENV': 'QA'
    },
    scenarioTimestamp: true
}

reporter.generate(options);