var packageName = 'atom-blue-jeans-ui';
describe('Custom Color options', () => {
    beforeEach(() => {
        jasmine.attachToDOM(atom.views.getView(atom.workspace));
        waitsForPromise('Theme Activation', () => {
            return atom.packages.activatePackage(packageName);
        });
    });
    it('should be able to change UI custom color', () => {
        atom.config.set(packageName + '.colors.customColor', '#3f51b5');
        expect(atom.config.get(packageName + '.colors.customColor').toHexString()).toBe('#3f51b5');
    });
    it('should be able to change UI default color', () => {
        atom.config.set(packageName + '.colors.setDefaultColor', true);
        expect(atom.config.get(packageName + '.colors.setDefaultColor')).toBe(true);
    });
});
