import Jasmine from 'jasmine';
import jasmineReporters from 'jasmine-reporters';
var jasmine = new Jasmine();
var junitReporter = new jasmineReporters.JUnitXmlReporter({
    savePath: 'target/junit-report',
    consolidateAll: false
});
jasmine.loadConfigFile('test/spec/support/jasmine.json');
jasmine.addReporter(junitReporter);
jasmine.execute();
