The **mno-kpi** provides the layout of a Key Performance Indicator.

### mno-kpi settings

These fields are required:
* `description` -
  Give a quick description of your Key Performance Indicator.

* `loading` -
  Only display the KPI value when the variable is set to false. Prints a loader otherwise.
  
* `value` -
  The KPI value to display.

These fields are optional:
* `unit` -
  _(Default: ``)_ -
  KPI unit (currency, etc...)

* link url (one or none)

  If no link is specified, the bottom part of the KPI will not displayed
  * `mno-href` -
    _(Default: ``)_ -
    link using href on user click
  * `mno-ui-sref` -
    _(Default: ``)_ -
    link using ui-sref on user click
  * `mno-click` -
    _(Default: ``)_ -
    Call the given function on user click

* `link-text` -
  _(Default: `View more`)_ -
  The text to be displayed on the link.
     
### mno-kpi layout
You can customize your kpi by specifying the following values:

* `color` -
  _(Default: `white`)_ -
  The color of the KPI text

* `bg-color` -
  _(Default: `transparent`)_ -
  The background color of your KPI

* `icon` -
  _(Default: `fa-file-text-o`)_ -
  The font awesome icon to display on the KPI

* If you do not specify any link (see mno-kpi settings), it won't be displayed.
     
### mno-kpi demo
``` html
<mno-kpi
  icon="fa-money" 
  bg-color="#ffcb40"
  color="#000"
  description="Still to be paid"
  unit="EUR" 
  value="15"
  mno-href="/#/finance"
  loading="vm.loader">
</mno-kpi>
```
