import './mocks/general.mock';
import {
    handleOpenURL,
    appDelegate
} from '../../urlhandler.ios';


describe('iOS', function() {
    it('handleOpenURL', function() {
        expect(handleOpenURL).toBeDefined();
    });
    it('applicationDidFinishLaunchingWithOptions', function() {
        expect(appDelegate.prototype.applicationDidFinishLaunchingWithOptions).toBeDefined();
    });
    it('applicationOpenURLOptions', function() {
      expect(appDelegate.prototype.applicationOpenURLOptions).toBeDefined();
    });
});
