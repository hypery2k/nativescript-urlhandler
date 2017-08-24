import './mocks/general.mock';
import {
    handleOpenURL,
    UrlHandlerAppDelegate
} from '../../urlhandler.ios';


describe('iOS', function() {
    it('handleOpenURL', function() {
        expect(handleOpenURL).toBeDefined();
    });
    it('UrlHandlerAppDelegate', function() {
        expect(UrlHandlerAppDelegate).toBeDefined();
    });
});