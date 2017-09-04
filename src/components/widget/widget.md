The **mno-widget** component provides the complex layout of a widget.
This component is composed by three parts:

* `mno-widget-header` which sets the header of the widget
* `mno-widget-body` which sets the main container of the widget
* `mno-widget-footer` which sets the footer of the widget

The parts `mno-widget-header` and `mno-widget-body` are compulsory while `mno-widget-footer` is optional.

### mno-widget settings

* `icon`
  _(eg. `fa-file`)_ -
  Add a font awesome icon class to your widget header to help identifying its content.

* `heading`
  _(Default: `''`)_ -
  You may give a title to your widget to help identifying its content.

* `is-loading`
  Add a boolean variable specifying if the widget is loading or not. 
  This will display a loader instead of the `mno-widget-body` content.
  
### mno-widget-header layout
Add any other information you would like to display in your header here. You may want to add default style to your input search box.

* `.search-bar` -
  Add this class to your input for a default style.

E.g:
``` html
<mno-widget ... >
  <mno-widget-header>
    <input type="search" class="search-bar" name="searchVariable">
  </mno-widget-header>
  ...
</mno-widget>
```

### mno-widget-body layout
Add any code you want to the body of your widget. You may also use the default style by adding the following classes:

* `.no-padding` -
  Add this class to remove the default padding of your `mno-widget-body`.

* `.xlarge`, `.large` or `.medium` -
  Add one of this class to apply a maximum height and display a scroll bar.

E.g:
``` html
<mno-widget ... >
  ...
  <mno-widget-body class="no-padding large">
    <h3>Some content</h3>
  </mno-widget-body>
  ...
</mno-widget>
```

### mno-widget-footer layout (optional)
Add any code you want to the footer of your widget. 

E.g:
``` html
<mno-widget ... >
  ...
  <mno-widget-footer>
    <span>Add any content you want to include here.</span>
  </mno-widget-footer>
</mno-widget>
```

### Style personalization
You can modify the style of mno-widget by changing the following less variables.

#### General
- @mno-widget-bg-color
- @mno-widget-border-color

#### Header
- @mno-widget-header-bg-color
- @mno-widget-header-font-color
- @mno-widget-header-border-bottom-color

#### Body
- @mno-widget-body-loader-color

#### Footer
- @mno-widget-footer-bg-color
- @mno-widget-footer-border-top-color


### Demo
Display a list of members using the widget component.

``` html
<mno-widget icon="fa-people" heading="List of Members" is-loading="listOfMembers.length > 0" >
  <mno-widget-header>
    <input type="search" class="search-bar" ng-model="searchVariable.name" placeholder="Search...">
  </mno-widget-header>
  
  <mno-widget-body class="no-padding large">
      <h3>List of members</h3>
      <ul>
        <li ng-repeat="member in listOfMembers | filter:searchVariable">{{member.name}} {{member.email}}<li>
      </ul>
    </mno-widget-body>
  
  <mno-widget-footer>
    <span>This is the complete list of members.</span>
  </mno-widget-footer>
</mno-widget>
```
