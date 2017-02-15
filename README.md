# mno-ui-elements


Please note that using Mno UI Elements requires the use of **Angular 1.5.x** or higher.

## Mno-ui-elements requirements
* Mno-ui-elements requires **Bootstrap CSS** version 3.x or higher and it has been tested with Bootstrap CSS 3.3.6.
* Mno-ui-elements requires **Font Awesome** version 4.x or higher and it has been tested with font-awesome 4.4.0.

### Downloading the library

* Add the following depency to your bower.json or package.json

```json
"mno-enterprise-angular": "git@github.com:maestrano/mno-ui-elements.git#master"
```

### Adding dependency to your project

When you are done downloading all the dependencies and project files the only remaining part is to add dependencies on the `mnoUiElements` AngularJS module:

```js
angular.module('myModule', ['mnoUiElements']);
```

## Components ready for use

At the moment the following components have been tested and documented.
* mno-admin
* mno-kpi

## Work in progress

The following components have been started and need to be tested
* mno-row
* mno-loading-ellipsis
* mno-section

