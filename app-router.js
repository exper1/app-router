!function(t,e){e.registerElement("app-route",{prototype:Object.create(HTMLElement.prototype)}),e.registerElement("active-route",{prototype:Object.create(HTMLElement.prototype)});var i=Object.create(HTMLElement.prototype),n={},r="ActiveXObject"in t;i.attachedCallback=function(){"manual"!==this.getAttribute("init")&&this.init()},i.init=function(){this.isInitialized||(this.isInitialized=!0,this.activeRoute=e.createElement("app-route"),this.stateChangeHandler=this.go.bind(this),t.addEventListener("popstate",this.stateChangeHandler,!1),r&&t.addEventListener("hashchange",this.stateChangeHandler,!1),this.hasAttribute("shadow")?this.activeRouteContent=this.createShadowRoot():(this.activeRouteContent=e.createElement("active-route"),this.appendChild(this.activeRouteContent)),this.go())},i.detachedCallback=function(){t.removeEventListener("popstate",this.stateChangeHandler,!1),r&&t.removeEventListener("hashchange",this.stateChangeHandler,!1)},i.go=function(){for(var e=this.parseUrlPath(t.location.href),i=this.querySelectorAll("app-route"),n=0;n<i.length;n++)if(this.testRoute(i[n].getAttribute("path"),e,this.getAttribute("trailingSlash"))){this.activateRoute(i[n],e);break}},i.activateRoute=function(t,e){this.activeRoute.removeAttribute("active"),t.setAttribute("active","active"),this.activeRoute=t;var i=t.getAttribute("import"),n=t.getAttribute("path"),r=t.getAttribute("element"),a=t.hasAttribute("template"),o=!a;o&&i?this.importAndActivateCustomElement(i,r,n,e):o&&!i&&r?this.activateCustomElement(r,n,e):a&&i?this.importAndActivateTemplate(i,t):a&&!i&&this.activateTemplate(t)},i.importAndActivateCustomElement=function(t,i,r,a){if(!n.hasOwnProperty(t)){n[t]=!0;var o=e.createElement("link");o.setAttribute("rel","import"),o.setAttribute("href",t),e.head.appendChild(o)}this.activateCustomElement(i||t.split("/").slice(-1)[0].replace(".html",""),r,a)},i.activateCustomElement=function(i,n,r){var a=e.createElement(i),o=this.routeArguments(n,r,t.location.href);for(var s in o)o.hasOwnProperty(s)&&(a[s]=o[s]);this.activeElement(a)},i.importAndActivateTemplate=function(t,i){if(n.hasOwnProperty(t)){var r=e.querySelector('link[href="'+t+'"]');r.import?this.activeElement(e.importNode(r.import.querySelector("template").content,!0)):r.onload=function(){i.hasAttribute("active")&&this.activeElement(e.importNode(r.import.querySelector("template").content,!0))}.bind(this)}else{n[t]=!0;var a=e.createElement("link");a.setAttribute("rel","import"),a.setAttribute("href",t),a.onload=function(){i.hasAttribute("active")&&this.activeElement(e.importNode(a.import.querySelector("template").content,!0))}.bind(this),e.head.appendChild(a)}},i.activateTemplate=function(t){var i=e.importNode(t.querySelector("template").content,!0);this.activeElement(i)},i.activeElement=function(t){for(;this.activeRouteContent.firstChild;)this.activeRouteContent.removeChild(this.activeRouteContent.firstChild);this.activeRouteContent.appendChild(t)},i.parseUrlPath=function(t){var e=t.split("/"),i="/"+e.splice(3,e.length-3).join("/"),n=i.split(/[\?#]/)[0],r=i.indexOf("#");if(-1!==r){var a=i.substring(r).split("?")[0];"#/"===a.substring(0,2)?n=a.substring(1):"#!/"===a.substring(0,3)&&(n=a.substring(2))}return n},i.testRoute=function(t,e,i){if("ignore"===i&&("/"===e.slice(-1)&&(e=e.slice(0,-1)),"/"===t.slice(-1)&&(t=t.slice(0,-1))),t===e||"*"===t)return!0;if(-1===t.indexOf("*")&&-1===t.indexOf(":"))return!1;var n=e.split("/"),r=t.split("/");if(n.length!==r.length)return!1;for(var a=0;a<r.length;a++){var o=r[a];if(o!==n[a]&&"*"!==o&&":"!==o.charAt(0))return!1}return!0},i.routeArguments=function(t,e,i){for(var n={},r=e.split("/"),a=t.split("/"),o=0;o<a.length;o++){var s=a[o];":"===s.charAt(0)&&(n[s.substring(1)]=r[o])}var l=i.indexOf("?"),h="";if(-1!==l){h=i.substring(l);var c=h.indexOf("#");-1!==c&&(h=h.substring(0,c))}var u=i.indexOf("#/"),p=i.indexOf("#!/");if(-1!==u||-1!==p){var v="";v=i.substring(-1!==u?u:p),l=v.indexOf("?"),-1!==l&&(h=v.substring(l))}var m=h.substring(1).split("&");1===m.length&&""===m[0]&&(m=[]);for(var d=0;d<m.length;d++){var f=m[d],g=f.split("=");n[g[0]]=g.splice(1,g.length-1).join("=")}for(var b in n){var A=n[b];n[b]="true"===A?!0:"false"===A?!1:isNaN(A)||""===A?decodeURIComponent(A):+A}return n},e.registerElement("app-router",{prototype:i})}(window,document);