# Progress-Tabs
Accessible, simple, cross-browser compatible progress tabs.

## Accessible
[WAI-ARIA](https://www.w3.org/WAI/intro/aria.php "Web Accessibility Initiative :: ARIA Homepage") [states & properties](https://www.w3.org/TR/wai-aria/states_and_properties "ARIA States and Properties") as well as [roles](https://www.w3.org/TR/wai-aria/roles "ARIA Roles Model") have been used to convey meaning and status of elements to AT.
## Simple
Only basic HTML elements are used. One class is used for styling. `class="progress-tabs"` is used to style the unordered list. All other styling is handling by attributes and CSS2 selectors. This (all but) guarantees no conflicting styles and complatibility with sad browsers. State changes are handled via JS so user agents with JS disabled will still have access to all content.

## Cross-Browser Compliant
Currently tested on:

**OSX (10.11.4)**
* Safari (9.1)
* Firefox (46)
* Chrome (50.0.2661.86)

**iOS (9.3.1)**
* Safari
* Chrome
* Firefox

**Windows 7 (64-bit; service pack 1)**
* Firefox (44.0.2, 46)
* Chrome (49.0.2623.112)
* IE (8, 9, 10, 11, Edge
  * Versions below 11 were tested with F12 tools

**Android (Marshmallow 6.1)**
* Chrome
* Default Samsung Browser
