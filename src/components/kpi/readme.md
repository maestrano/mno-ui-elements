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
You can customize your kpi by specifying the following classes/values:

* class:
  * `kpi-color-1` -
    _(Default: `red`)_ -
    A red design of a KPI
  * `kpi-color-2` -
    _(Default: `orange`)_ -
    An orange design of a KPI
  * `kpi-color-3` -
    _(Default: `green`)_ -
    A green design of a KPI
  * `kpi-color-4` -
    _(Default: `dark green`)_ -
    A dark green design of a KPI
    
* `icon` -
  _(Default: `fa-file-text-o`)_ -
  The font awesome icon to display on the KPI

* If you do not specify any link (see mno-kpi settings), it won't be displayed.

### Style personalization
You can modify the style of mno-kpi by modifying the following less variables.
The @kpi-color-[x] will modify the text color while @kpi-bg-color-[x] will modify the background color.

- @kpi-color-1
- @kpi-bg-color-1
- @kpi-color-2
- @kpi-bg-color-2
- @kpi-color-3
- @kpi-bg-color-3
- @kpi-color-4
- @kpi-bg-color-4

### mno-kpi demo
``` html
<mno-kpi
  class="kpi-color-3"
  icon="fa-money" 
  description="Still to be paid"
  unit="EUR" 
  value="15"
  mno-href="/#/finance"
  loading="vm.loader">
</mno-kpi>
```
