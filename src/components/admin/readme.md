The **admin** provides the complex layout of an admin dashboard.
This component is composed by four parts:

* `mno-admin-header` which sets the header of the dashboard
* `mno-admin-nav` which sets the navigation sidebar of the dashboard
* `mno-admin-footer` which sets the footer of the dashboard
* `mno-admin-content` which sets the main container of the dashboard

Each of these parts need to be used as attribute components.

### mno-admin settings

* `hide-footer`
  _(Default: `false`)_ -
  You may disable the footer.

* `logo`
  _(Default: `''`)_ -
  You may specify a logo to add branding to your dashboard.

### mno-admin-header layout
You may want to use the default layout provided by mno-admin-nav. 
Simply add the following classes to .

* `.title` -
  Add this class to one of your title for a default style.

E.g:
``` html
<mno-admin>
  <mno-admin-header>
    <h1 class="title">This is a title with style.</h1>
  </mno-admin-header>
  ...
</mno-admin>
```
  
### mno-admin-nav layout

You may want to use the default layout provided by mno-admin-nav. 

* `.sidebar-title` -
  Add this class to one of your list element to give it a title style.
  
* `.sidebar-list` -
  Add this class to your list element to apply a default style.
  
  * `.menu-icon` - Add this class to a font awesome icon to help identifying the content.
  
E.g:
``` html
<mno-admin>
  ...
  <mno-admin-nav>
    <li class="sidebar-title">Navigation</li>
    <li class="sidebar-list">
      <a href="">
        Homepage 
        <span class="menu-icon fa fa-tachometer"></span>
      </a>
    </li>
    <li class="sidebar-list"><a href="">Edit</a></li>
  </mno-admin-nav>
  ...
</mno-admin>
```

### Style personalization
You can modify the style of mno-admin by changing the following less variables.

#### Header
- @header-title-text-color
- @header-title-text-size
- @header-background-color
- @header-font-color
- @header-height

### Navigation (sidebar)
- @sidebar-base-color
- @sidebar-menu-item-font-color
- @sidebar-menu-item-font-hover-color
- @sidebar-menu-item-hover-color
- @sidebar-menu-item-hover-border-color
- @sidebar-menu-item-hover-background-color
- @sidebar-title-color

#### Footer
- @footer-background-color
- @footer-height


### Demo
``` html
<mno-admin>
  <mno-admin-header>
    <ul>
      <li class="sidebar-title">Navigation</li>
      <li class="sidebar-list"><a href="">Homepage</a></li>
      <li class="sidebar-list"><a href="">Edit</a></li>
    </ul>
  </mno-admin-header>
  <mno-admin-nav></mno-admin-nav>
  <mno-admin-content></mno-admin-content>
  <mno-admin-footer></mno-admin-footer>
</mno-admin>
```
