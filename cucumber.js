module.exports = {
    default: {
        publishQuiet: true,
        format: ['progress-bar', 'json:./reports/cucumber_report.json', '@cucumber/pretty-formatter'],
        requireModule: ['ts-node/register'],
        require: ['steps/*.steps.ts', 'features/'],
        formatOptions: {
            colorsEnabled: true,
            theme: {
                "datatable border": ["green"],
                "datatable content": ["green", "italic"],
                "docstring content": ["green", "italic"],
                "docstring delimiter": ["green"],
                "feature description": ["green"],
                "feature keyword": ["bold", "green"],
                "rule keyword": ["yellow"],
                "scenario keyword": ["greenBright"],
                "scenario name": ["green", "underline"],
                "step keyword": ["bgGreen", "black", "italic"],
                "step text": ["greenBright", "italic"],
                "tag": ["green"]
            }
        }
    }
}