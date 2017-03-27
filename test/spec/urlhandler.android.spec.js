import './mocks/general.mock';
import {
    handleOpenURL
} from '../../urlhandler.android';

describe('Android', function() {
    it('handleOpenURL', function() {
        expect(handleOpenURL).toBeDefined();
    });
});