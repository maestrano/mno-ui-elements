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
