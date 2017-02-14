The **row**  provides the layout of a link.
It is usually used as a list of links providing additional details at a glance.

### mno-row settings

* `name` -
  The name of the link

* `status` -
  Additional information available at a glance.

* `mno-row-href` or `mno-row-click` -
  Only one of the mnoRowClick or mnoRowHref attributes are required to be specified.
  * `mno-row-click`
    mnoRowClick function which will be called when the link is clicked to change
    the page. Renders as an `ng-click`.
  * `mno-row-href`
    url to transition to when this link is clicked. Renders as an `ng-href`.
