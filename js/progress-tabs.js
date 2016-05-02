/*_____________________________________________________________________
__________---___---__---_______________________________________________
__________---___---__---________________---____________________________
__________---___---__---________________---____________________________
______--__---___---__---______----______---___________________---______
____-----_---___---__---____--------__-------__---____---___-------____
___---___----___---__---___----__----_-------__---____---__---___---___
__---_____---___---__---__----____----__---____---____---__---____---__
__---_____---___---__---__----____----__---____---____---__-------_____
__---_____---___---__---__---______---__---____---____---___--------___
__---_____---___---__---__----____----__---____---____---________----__
__----___----___---__---___---____---___---____---___----__---____---__
___----------___---__---____--------____-----__----------__----__----__
_____----_---___---__---_____------______----___-----_---___--------___
_______________----___________________________________________---______
______________-----________________________________Progress Tabs_______
______________----_________________________________4/26/2016___________
_______________________________________________________________________
_____________________________________________________________________*/

(function () {

   // - - - - - - - - - - - - - - - - - - - -
   // Set Variables
   // - - - - - - - - - - - - - - - - - - - -

   var tabCollection =						document.querySelectorAll("[data-progress-tab]"), // create collection of tab elements
   panelCollection =					document.querySelectorAll("[data-progress-panel]"), // create collection of panel elements

   tabs =								      [], // create empty array for tabs collection
   panels =							      []; // create empty array for panels collection

   // Convert collections to objects; need loop because IE8 does not support Array.prototype.slice.call :(
   for (i = 0; i < tabCollection.length; i++) {
      tabs.push(tabCollection[i]);
   }
   for (i = 0; i < panelCollection.length; i++) {
      panels.push(panelCollection[i]);
   }

   var totalTabs =							tabs.length, // total number of tabs
   tabObjects =							[]; // create empty array for tab objects

   var attrTab =									"data-progress-tab", //  set shorthand for tab attribute
   attrPanel =								"data-progress-panel"; // set shorthand for panel attribute

   // Hide all but first panel initially. No JS will display all panels. :)
   for (var i = 1; i < panels.length; i++) {
      panels[i].setAttribute(attrPanel, "");
   }


   // - - - - - - - - - - - - - - - - - - - -
   // Functions
   // - - - - - - - - - - - - - - - - - - - -

   // Add tab objects to array
   function addTabObjects() {
      tabObjects.push ({
         name: name,
            state: state,
            panelID: panelID,
            panelEl: panelEl,
            tabNumber: tabNumber,
            current: element,
            previous: previous,
            next: next
      });
   };

   // Set initial state of tabs
   function setTabState() {
      for (var i = 0; i <= tabObjects.length - 1; i++) { // for each tab

         var thisTab = tabObjects[i];

         if (thisTab.tabNumber === 1) { // if the first tab
            thisTab.state = "active"; // set state to "active"
         };
         //		if (thisTab.tabNumber === 2) { // if second tab
            //			thisTab.state = ""; // leave state at default
            //		};
         //		if (thisTab.tabNumber === totalTabs || thisTab.tabNumber != 1 && thisTab.tabNumber != 2) { // if the last tab or if not tab 1 or tab 2
            //			thisTab.state = "disabled"; // set state to "disabled"
            //		};
         // apply states to elements		
         if (thisTab.state === "active") { // if state is active
            thisTab.current.setAttribute(attrTab, "active"); // set attribute to active
            thisTab.panelEl.setAttribute(attrPanel, "active");
         } else {
            thisTab.current.setAttribute(attrTab, ""); // set attribute to active
            thisTab.panelEl.setAttribute(attrPanel, "");
         };
         //		if (thisTab.state === "disabled") { // if state is disabled
            //			thisTab.current.setAttribute(attr, "disabled"); // set attribute to active
            //		};
      };
   };

   // set previous elements
   function setPreviousSiblings(el, att, state) { 
      var siblings = []; // create empty array for sibling elements
      if (document.previousElementSibling) { // if broswer supports previousElementSibling
         while (el = el.previousElementSibling) { // while current element has a previous element
            siblings.push(el); // push current previous element to array
         };
      } else { // if sad browser :(
         while (el = el.previousSibling) { // while current element has a previous sibling (anytype)
            if (el.nodeType === 1) { // once that sibling is element type
               siblings.push(el); // push current previous element to array
            }
         }
      };

      for (var i = 0; i <= siblings.length - 1; i++) { // for each element in array
         siblings[i].setAttribute(att, state); // set attribute to "passive"
      };
      return siblings; //return updated array
   };

   // set next elements
   function setNextSiblings(el, att, state) { 
      var siblings = []; // create empty array for sibling elements
      if (document.nextElementSibling) {
         while (el = el.nextElementSibling) { // while current element has a previous element
            siblings.push(el); // push current previous element to array
         }; 
      } else { // if sad browser :(
         while (el = el.nextSibling) { // while current element has a next sibling
            if (el.nodeType === 1) { // if that sibling is element type
               siblings.push(el); // push current next element to array
            }
         }
      };

      for (var i = 0; i <= siblings.length - 1; i++) { // for each element in array
         siblings[i].setAttribute(att, state); // set attribute to "passive"
      };
      //	console.log(siblings); // debug
      return siblings; //return updated array
   };

   // assign object based on value of "panelID"
   function showPanel(arr, value) {
      var activePanelObject, // set variable for object
      activePanel; // set variable for panel
      for (var i = 0; i <= arr.length - 1; i++) { // for each object in array
         if (arr[i].panelID == value) { // if the value of "panelID" is equal to the value of value of the "aria-controls" attribute of the clicked button
            activePanelObject = arr[i]; // var activePanelObject is equal to the current object
            activePanel = activePanelObject.panelEl; // var activePanel is equal to the value of the current object's "panelEL" property
            activePanel.setAttribute(attrPanel, "active"); // set the value of the attribute to "active"
            activePanel.setAttribute("aria-hidden", "false"); // expose panel to AT
         };
      };
   };

   // reset panel visibility
   function resetPanels() {
      for (var i = 0; i <= tabObjects.length - 1; i++) {
         tabObjects[i].panelEl.setAttribute(attrPanel, ""); // remove value from attribute - hide panels
         tabObjects[i].panelEl.setAttribute("aria-hidden", "true"); // hide panel from AT
      }
   };


   // - - - - - - - - - - - - - - - - - - -
   // Create Tab Objects
   // - - - - - - - - - - - - - - - - - - - 

   for (var i = 0; i <= tabs.length - 1; i++) { // for each tab element
      var name = tabs[i].getAttribute("id"), // example: "tab1-title"
         state = null, // example: "active"
         panelID = tabs[i].getAttribute("aria-controls"), // example: "tab1a-panel"
         panelEl = document.getElementById(panelID),
         tabNumber = i + 1, // number of current tab
         element = tabs[i],
         previous = tabs[i - 1], // set previous tab
         next = tabs[i + 1]; // set next tab

      // convert undefined value to null value when search for neighbors returns nothing
      if (previous === undefined) {
         previous = null;
      };
      if (next === undefined) {
         next = null;
      };
      addTabObjects(); // run function to create object
   };
   setTabState();


   // - - - - - - - - - - - - - - - - - - - -
   // Add Event Handlers
   // - - - - - - - - - - - - - - - - - - - -

   var control = document.getElementById("progress-tabs"); // get tabs container

   if (document.addEventListener) {
      control.addEventListener("click", function(e) {
         var target = e.target || e.srcElement;
         var tLi = target.nodeName == "LI",
         tSpan = target.nodeName == "SPAN",
         tP = target.nodeName == "P";
         if (target && tLi || tSpan || tP) {
            // console.log("you have clicked on a tab");
            if (tLi) {
               var currentPanel = target.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
               target.setAttribute(attrTab, "active"); // add value "active" to attribute
               target.setAttribute("aria-selected", "true"); // pass state to AT
               setPreviousSiblings(target, attrTab, "passive"); // set previous elements to "passive"
               setPreviousSiblings(target, "aria-selected", "false"); // pass state to AT
               setNextSiblings(target, attrTab, ""); // set next elements to ""
               setNextSiblings(target, "aria-selected", "false"); // pass state to AT
               // reset panels
               resetPanels();
               // show corresponding panels
               showPanel(tabObjects, currentPanel);
            } else if (tSpan || tP) {
               var currentPanel = target.parentElement.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
               target.parentElement.setAttribute(attrTab, "active"); // add value "active" to attribute
               target.parentElement.setAttribute("aria-selected", "true"); // pass state to AT
               setPreviousSiblings(target.parentElement, attrTab, "passive"); // set previous elements to "passive"
               setPreviousSiblings(target.parentElement, "aria-selected", "false"); // pass state to AT
               setNextSiblings(target.parentElement, attrTab, ""); // set next elements to ""
               setNextSiblings(target.parentElement, "aria-selected", "false"); // pass state to AT
               // reset panels
               resetPanels();
               // show corresponding panels
               showPanel(tabObjects, currentPanel);
            }
         }
      });
      control.addEventListener("keydown", function(e) {
         var target = e.target || e.srcElement;
         e.which = e.which || e.keycode;
         if (e.which === 13 || e.which === 32) {
            var currentPanel = e.target.getAttribute("aria-controls");
            // control tab behavior
            target.setAttribute(attrTab, "active"); // add value "active" to attribute
            target.setAttribute("aria-selected", "true") // pass state to AT
            setPreviousSiblings(target, attrTab, "passive"); // set previous elements to "passive"
            setPreviousSiblings(target, "aria-selected", "false"); // pass state to AT
            setNextSiblings(target, attrTab, ""); // set next elements to ""
            setNextSiblings(target, "aria-selected", "false"); // pass state to AT
            // reset panels
            resetPanels();
            // show corresponding panels
            showPanel(tabObjects, currentPanel);
         };
      });
   } else if (document.attachEvent) {
      control.attachEvent("onclick", function(e) {
         var target = e.target || e.srcElement;

         var tLi = target.nodeName == "LI",
         tSpan = target.nodeName == "SPAN",
         tP =target.nodeName == "P";
         if (target && tLi || tSpan || tP) {
            // console.log("you have clicked on a tab");

            if (tLi) {
               var currentPanel = target.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
               target.setAttribute(attrTab, "active"); // add value "active" to attribute
               target.setAttribute("aria-selected", "true");
               setPreviousSiblings(target, attrTab, "passive"); // set previous elements to "passive"
               setPreviousSiblings(target, "aria-selected", "false");
               setNextSiblings(target, attrTab, ""); // set next elements to ""
               setNextSiblings(target, "aria-selected", "false");
               // reset panels
               resetPanels();
               // show corresponding panels
               showPanel(tabObjects, currentPanel);
            } else if (tSpan || tP) {
               var currentPanel = target.parentElement.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
               target.parentElement.setAttribute(attrTab, "active"); // add value "active" to attribute
               target.parentElement.setAttribute("aria-selected", "true");
               setPreviousSiblings(target.parentElement, attrTab, "passive"); // set previous elements to "passive"
               setPreviousSiblings(target.parentElement, "aria-selected", "false");
               setNextSiblings(target.parentElement, attrTab, ""); // set next elements to ""
               setNextSiblings(target.parentElement, "aria-selected", "false");
               // reset panels
               resetPanels();
               // show corresponding panels
               showPanel(tabObjects, currentPanel);
            }
         }
      });
      control.attachEvent("onkeydown", function(e) {
         var target = e.target || e.srcElement;

         e.which = e.which || e.keycode;
         if (e.which === 13 || e.which === 32) {
            var currentPanel = target.parentElement.getAttribute("aria-controls");
            // control tab behavior
            target.parentElement.setAttribute(attrTab, "active"); // add value "active" to attribute
            target.parentElement.setAttribute("aria-selected", "true")
            setPreviousSiblings(target.parentElement, attrTab, "passive"); // set previous elements to "passive"
            setPreviousSiblings(target.parentElement, "aria-selected", "false");
            setNextSiblings(target.parentElement, attrTab, ""); // set next elements to ""
            setNextSiblings(target.parentElement, "aria-selected", "false");
            // reset panels
            resetPanels();
            // show corresponding panels
            showPanel(tabObjects, currentPanel);
         };
      });
   }


   // - - - - - - - - - - - - - - - - - - - -
   // Remove outline when mouse user clicks tab
   // - - - - - - - - - - - - - - - - - - - -

   // outline.js
   // based on http://www.paciellogroup.com/blog/2012/04/how-to-remove-css-outlines-in-an-accessible-manner/
      (function(d){

         var style_element = d.createElement('STYLE'),
         dom_events = 'addEventListener' in d,
         add_event_listener = function(type, callback){
            // Basic cross-browser event handling
            if(dom_events){
               d.addEventListener(type, callback);
            }else{
               d.attachEvent('on' + type, callback);
            }
         },
         set_css = function(css_text){
            // Handle setting of <style> element contents in IE8
            !!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;
         }
         ;

         d.getElementsByTagName('HEAD')[0].appendChild(style_element);

         // Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
         add_event_listener('mousedown', function(){
            set_css(':focus{outline:0}::-moz-focus-inner{border:0;}');
         });

         add_event_listener('keydown', function(){
            set_css('');
         });

   })(document);
})()