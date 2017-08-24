import './mocks/general.mock';
import {
  handleOpenURL,
  handleIntent
} from '../../urlhandler.android';

describe('Android', function () {

  describe('handleOpenURL', function () {

    it('function should be defined', function () {
      expect(handleOpenURL).toBeDefined();
    });

  });

  describe('handleIntent', function () {

    it('function should be defined', function () {
      expect(handleOpenURL).toBeDefined();
    });

    it('should handle empty data', function () {
      handleIntent({ getData: () => '', getAction: () => '' });
    });

  });

});
