// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('mnoUiElements.config', [])
    .value('mnoUiElements.config', {
        debug: true
    });

// Modules
angular.module('mnoUiElements.components',
    [
        'mnoUiElements.components.loading'
    ]);
angular.module('mnoUiElements.services', []);
angular.module('mnoUiElements',
    [
        'mnoUiElements.config',
        'mnoUiElements.services',
        'mnoUiElements.components'
    ]);
