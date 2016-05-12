(function() {


}());
/*                                                                          **
**                      MAESTRANO MNO-UI-ELEMENTS LIBRARY                   **
**                                                                          */
//***************************************************************************/
//* Create all modules and define dependencies.
//*************************************************************************/
angular.module('mnoUiElements',
    [
        'mnoUiElements.config',
        'mnoUiElements.services',
        'mnoUiElements.components'
    ]);


// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

/*
** CONFIG
*/
angular.module('mnoUiElements.config', [])
    .value('mnoUiElements.config', {
        debug: true
    });

/*
** COMPONENTS
*/
angular.module('mnoUiElements.components',
    [
        'mnoUiElements.components.loading'
    ]);

angular.module('mnoUiElements.services', []);
