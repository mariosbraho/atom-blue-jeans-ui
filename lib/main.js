var fs = require('fs');
var config = require('./config.json');

var observeColorChanges,
    observeCustomColor,
    observeSetDefaultColor,
    setColor,
    isHex,
    addBlendTreeView,
    removeBlendTreeView,
    getTreeViews,
    theme,
    packageName = 'atom-blue-jeans-ui',
    lessCustomColorPath = '/../styles/ui-variables.less',
    defaultColor = "#D60036";

// Atom theme
theme = atom.packages.getLoadedPackage(packageName);

/**
 * Writes color in styles/variables-ui.less as @custom-color variable / Reactivates theme
 * @param {String} color
 * @return {void}
 */
setColor = function(color) {
    fs.readFile(__dirname + lessCustomColorPath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var result = data.replace(/@custom-color: .*/g, `@custom-color: ${color};`);
        fs.writeFile(__dirname + lessCustomColorPath, result, 'utf8', function(err) {
            if (err) {
                throw err;
            }
            theme.deactivate();
            setImmediate(() => theme.activate());
        });
    });
};

/**
 * Checks if color given has hex format
 * @param  {String}  color
 * @return {Boolean}
 */
isHex = function(color) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
};

/**
 * Watches if custom color has changed and initiates new color setting
 * @return {function} sets updated color
 */
observeCustomColor = function() {
    atom.config.observe(packageName + '.colors.customColor', function(value) {
        var isDefaultSet = atom.config.get(packageName + '.colors.setDefaultColor');
        if (value !== undefined && !isDefaultSet) {
            return setColor(isHex(value) ? value : value.toRGBAString());
        }
    });
};

/**
 * Watches if default color is set and initiates new color setting
 * @return {function} sets updated color
 */
observeSetDefaultColor = function() {
    atom.config.observe(packageName + '.colors.setDefaultColor', function(isDefaultSet) {
        if (isDefaultSet) {
            return setColor(defaultColor);
        } else {
            var customColor = atom.config.get(packageName + '.colors.customColor');
            if (customColor !== undefined) {
                return setColor(isHex(customColor) ? customColor : customColor.toRGBAString());
            }
        }
    });
};

/**
 * Watches color configuration changes
 * @return {void}
 */
observeColorChanges = function() {
    observeCustomColor();
    observeSetDefaultColor();
};

/**
 * Adds "Projects" tab
 * @return {void}
 */
addBlendTreeView = function() {
    var treeViewResizer = document.querySelector(".tree-view-resizer");
    if (treeViewResizer) {
        var title = document.createElement('span');
        var projectsTab = document.createElement('div');
        projectsTab.classList.add('projects-tab');
        projectsTab.appendChild(title);
        treeViewResizer.insertBefore(projectsTab, treeViewResizer.firstChild);
    }
};

/**
 * Removes "Projects" tab
 * @return {void}
 */
removeBlendTreeView = function() {
    var itemNode = document.querySelector(".projects-tab");
    if (itemNode) {
        itemNode.parentNode.removeChild(itemNode);
    }
};

module.exports = {
    config,
    // observeColorChanges: observeColorChanges(),
    activate() {
        removeBlendTreeView();
        addBlendTreeView();
    },
    deactivate() {
        removeBlendTreeView();
    }
};
