import './mocks/general.mock';
import {
    handleOpenURL,
    appDelegate
} from '../../urlhandler.ios';


describe('iOS', function() {
    it('handleOpenURL', function() {
        expect(handleOpenURL).toBeDefined();
    });
    it('continueUserActivity', function() {
        expect(appDelegate.prototype.applicationContinueUserActivityRestorationHandler).toBeDefined();
    });
    it('applicationOpenURLOptions', function() {
      expect(appDelegate.prototype.applicationOpenURLOptions).toBeDefined();
    });
});
