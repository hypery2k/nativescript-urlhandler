import {
    extractAppURL
} from '../../urlhandler.common';


describe('extractAppURL', function() {
    it('should handle empty url', function() {
        let url = null;
        let result = extractAppURL(url);
        expect(result).toBeNull();
    });
    it('should handle empty path and param', function() {
        let url = 'app://';
        let result = extractAppURL(url);
        expect(result.path).toBeNull();
        expect(result.params.size).toBe(0);
    });
    it('should split url into path only', function() {
        let url = 'app://config';
        let result = extractAppURL(url);
        expect(result.path).toBe('config');
        expect(result.params.size).toBe(0);
    });
    it('should split url into path and param', function() {
        let url = 'app://config?dev=true';
        let result = extractAppURL(url);
        expect(result.path).toBe('config');
        expect(result.params.get('dev')).toBe('true');
    });
    it('should split url into path and two params', function() {
        let url = 'app://config?dev=true&test=abc';
        let result = extractAppURL(url);
        expect(result.path).toBe('config');
        expect(result.params.get('dev')).toBe('true');
        expect(result.params.get('test')).toBe('abc');
    });
});