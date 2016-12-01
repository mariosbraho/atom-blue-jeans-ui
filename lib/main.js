var addBlendTreeView, removeBlendTreeView;

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
    activate() {
        removeBlendTreeView();
        addBlendTreeView();
    },
    deactivate() {
        removeBlendTreeView();
    }
};
