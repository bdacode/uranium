(function(b){function o(f,e,c){var g={},k="[data-ur-set='"+e+"']",v="data-ur-"+e+"-component";b(f).find("["+v+"]").addBack("["+v+"]").each(function(){if(!b(this).data("urCompInit")){var f=b(this).attr("data-ur-id")?b(this):b(this).closest(k);if(f[0]&&!f.data("urInit")){b(this).data("urCompInit",!0);var e=f.attr("data-ur-id");e||(e=S(),f.attr("data-ur-id",e));g[e]=g[e]||{};g[e]._id=e;if(f.is(k))g[e].set=f[0];c?c(g[e],this):(f=b(this).attr(v),g[e][f]=g[e][f]||[],g[e][f].push(this))}}});return g}function K(b){var e=
b.originalEvent.touches,b=e&&e[0]||b;return{x:b.clientX,y:b.clientY}}function x(b){b.preventDefault();b.stopPropagation()}var l=b.fn.jquery.split(".");l[0]==1&&l[1]<4&&(b=b.extend(function(f,e){return new b.fn.init(f||[],e)},b));b.fn.on||b.fn.extend({on:function(b,e,c,g){c==null&&g==null?(g=e,e=null):g==null&&typeof e!="string"&&(g=c,c=e,e=null);return e?this.delegate(e,b,c,g):this.bind(b,c,g)},off:function(b,e,c){c==null&&(c=e,e=null);return e?this.undelegate(e,b,c):this.unbind(b,c)}});if(!b.fn.addBack)b.fn.addBack=
b.fn.andSelf;if(!b.error)b.error=function(b){throw Error(b);};var S=function(){var b=0;return function(){return++b}}(),R=/Android [12]/.test(navigator.userAgent),L=!R;L&&(l=b("<a>").css({webkitTransform:"translate3d(0, 0, 0)",MozTransform:"translate3d(0, 0, 0)",msTransform:"translate3d(0, 0, 0)",transform:"translate3d(0, 0, 0)"}),L=(l.css("WebkitTransform")+l.css("MozTransform")+l.css("msTransform")+l.css("transform")).indexOf("(")!=-1);var D="ontouchstart"in window,M=(D?"touchstart":"mousedown")+
".ur",N=(D?"touchmove":"mousemove")+".ur",Q=(D?"touchend":"mouseup")+".ur",P={toggler:function(f){f=o(f,"toggler");b.each(f,function(e,c){c.button||b.error("no button found for toggler with id: "+e);c.content||b.error("no content found for toggler with id: "+e);var g=b(c.button).attr("data-ur-state")||"disabled";b(c.button).add(c.content).attr("data-ur-state",g);b(c.button).on("click.ur.toggler",function(){var e=b(c.button).attr("data-ur-state")=="enabled",g=e?"disabled":"enabled";b(c.button).add(c.content).attr("data-ur-state",
g);e||b(c.drawer).attr("data-ur-state",g)});b(c.drawer).on("webkitTransitionEnd.ur.toggler transitionend.ur.toggler",function(){b(this).attr("data-ur-state",b(c.button).attr("data-ur-state"))});b(c.set).data("urInit",!0)})},tabs:function(f){f=o(f,"tabs",function(e,c){var g=b(c).attr("data-ur-tab-id");e.tabs=e.tabs||{};e.tabs[g]=e.tabs[g]||{};var f=b(c).attr("data-ur-tabs-component");e.tabs[g][f]=e.tabs[g][f]||[];e.tabs[g][f].push(c)});b.each(f,function(e,c){c.closeable=b(c.set).attr("data-ur-closeable")==
"true";b.each(c.tabs,function(){var c=b(this.button).attr("data-ur-state")||"disabled";b(this.button).add(this.content).attr("data-ur-state",c)});b.each(c.tabs,function(e,f){b(f.button).on("click.ur.tabs",function(){var e=b(this).attr("data-ur-state")=="enabled";b.each(c.tabs,function(){b(this.button).add(this.content).attr("data-ur-state","disabled")});(!e||!c.closeable)&&b(f.button).add(f.content).attr("data-ur-state","enabled")})});b(c.set).data("urInit",!0)})},inputClear:function(f){f=o(f,"input-clear");
b.each(f,function(e,c){var f=b("<div class='data-ur-input-clear-ex'></div>").hide();b(c.set).append(f);f.on(D?"touchstart.ur.inputclear":"click.ur.inputclear",function(){k[0].value="";k[0].focus()}).on("touchend.ur.inputclear",function(){k[0].blur()});var k=b(c.set).find("input");k.on("focus.ur.inputclear",function(){k[0].value!=""&&f.show()}).on("keydown.ur.inputclear",function(){f.show()}).on("blur.ur.inputclear",function(){setTimeout(function(){f.hide()},150)});b(c.set).data("urInit",!0)})},geoCode:function(f){f=
o(f,"reverse-geocode",function(e,c){e.elements=e.elements||{};e.elements[b(c).attr("data-ur-reverse-geocode-component")]=c});b.each(f,function(e,c){function f(e,c,g){var d=0,k=null,a=null,i=null;switch(b(e).attr("data-ur-reverse-geocode-component")){case "rg-city":a="locality";break;case "rg-street":a="street_number";break;case "rg-zip":a="postal_code";break;case "rg-state":a="administrative_area_level_1";break;case "rg-country":a="country"}for(var i=c[0],h=null,v=i.address_components.length,m=0;m<
v;m++)for(var s=i.address_components[m].types.length,q=0;q<s;q++)if(h=i.address_components[m].types[q],a==h){switch(h){case "street_number":d=m;k=m+1;break;case "locality":d=m;break;case "postal_code":d=m;break;case "administrative_area_level_1":d=m;break;case "country":d=m}break}if(g==="input")e.value=k===null?c[0].address_components[d].long_name:c[0].address_components[d].long_name+" "+c[0].address_components[k].long_name;else if(g==="select"){c=c[0].address_components[d];g=0;for(d=e.length;g<d;g++)if(e[g].value===
c.long_name||e[g].value.toUpperCase()===c.short_name)e.selectedIndex=g}}var k=this.set;b(k).attr("data-ur-callback");var v=b(k).attr("data-ur-error-callback"),G,A,B;this.setupCallbacks=function(){B=this;var c=b(this.elements).filter("[data-ur-reverse-geocode-component='rg-button']");if(c.length>0)b(c).on("click.ur.inputclear",function(b){return function(){b.geocodeInit()}}(this));else console.warn("no button for triggering reverse geocoding present"),this.geocodeInit()};this.geoSuccess=function(b){b=
{lat:b.coords.latitude,lng:b.coords.longitude};this.codeLatLng(b.lat,b.lng)};this.geoError=function(b){console.error("Ur geolocation error -- Error Getting Your Coordinates!");switch(b.code){case b.TIMEOUT:console.error("Ur geolocation error -- Timeout");break;case b.POSITION_UNAVAILABLE:console.error("Ur geolocation error -- Position unavailable");break;case b.PERMISSION_DENIED:console.error("Ur geolocation error -- Permission denied");break;case b.UNKNOWN_ERROR:console.error("Ur geolocation error -- Unknown error")}v!==
void 0&&eval(v)};this.geoDenied=function(){console.error("Ur geolocation error -- User Denied Geolocation")};this.codeLatLng=function(b,c){var e=new google.maps.LatLng(b,c),d=this;G.geocode({latLng:e},function(b,a){if(a==google.maps.GeocoderStatus.OK)if(b[1]){A=b;var c=B.elements;for(elm in c)c[elm].localName==="input"?f(c[elm],A,"input"):c[elm].localName==="select"&&f(c[elm],A,"select");d.callback!==void 0&&eval(d.callback);return b}else console.error("Geocoder failed due to: "+a)})};this.geocodeInit=
function(){navigator.geolocation&&(G=new google.maps.Geocoder,navigator.geolocation.getCurrentPosition(function(b){return function(c){b.geoSuccess(c)}}(this),function(b){return function(c){b.geoError(c)}}(this),this.geoDenied))};UrGeocode=function(b){return function(){b.setupCallbacks()}}(this);k=document.createElement("script");k.type="text/javascript";k.src="https://maps.googleapis.com/maps/api/js?sensor=true&callback=UrGeocode";b("head").append(k);b(c.set).data("urInit",!0)})},zoom:function(f){function e(b,
c){return Math.max(Math.min(c[0],b),c[1])}function c(c){function f(){var a=b(d.container).attr("data-ur-transform3d");if(a)d.transform3d=a!="disabled";d.transform3d&&(H="translate3d(",t=",0)",y=" scale3d(",I=",1)");b(d.container).attr("data-ur-transform3d",d.transform3d?"enabled":"disabled");d.canvasWidth=d.canvasWidth||d.container.offsetWidth;d.canvasHeight=d.canvasHeight||d.container.offsetHeight;d.width=d.width||parseInt(j.attr("width"))||parseInt(j.css("width"))||d.img.width;d.height=d.height||
parseInt(j.attr("height"))||parseInt(j.css("height"))||d.img.height;d.bigWidth=parseInt(j.attr("data-ur-width"))||d.img.naturalWidth;d.bigHeight=parseInt(j.attr("data-ur-height"))||d.img.naturalHeight;if(j.attr("data-ur-width")&&j.attr("data-ur-height")||j.attr("src")==j.attr("data-ur-src"))d.prescale=!0;d.ratio=d.bigWidth/d.width;h=(d.canvasWidth-d.bigWidth)/2;n=(d.canvasHeight-d.bigHeight)/2}function G(a){if(a.target==d.img){C=!1;z=a.pageX;r=a.pageY;p=!0;var b=a.originalEvent.touches;if(b)z=b[0].pageX,
r=b[0].pageY;b=d.img.style;window.WebKitCSSMatrix?(b=new WebKitCSSMatrix(b.webkitTransform),q=b.m41,w=b.m42):(b=b.MozTransform||b.msTransform||b.transform||"translate(0, 0)",b=b.replace(/.*?\(|\)/,"").split(","),q=parseInt(b[0]),w=parseInt(b[1]));x(a)}}function A(a){if(p&&a.target==d.img){x(a);var b=a.pageX,c=a.pageY;if(a=a.originalEvent.touches)b=a[0].pageX,c=a[0].pageY;b-=z;c-=r;if(Math.abs(b)>5||Math.abs(c)>5)C=!0;b=e(q+b,[-h,h]);c=e(w+c,[-n,n]);l(b,c,d.ratio)}}function B(a){C||d.zoomOut();x(a);
p=!1;C=!0}function o(){if(d.state=="enabled-in")j.css({webkitTransitionDelay:"",MozTransitionDelay:"",OTransitionDelay:"",transitionDelay:""}),d.img.src=j.attr("data-ur-src"),g.indexOf(d.img.getAttribute("data-ur-src"))==-1&&setTimeout(function(){g.indexOf(d.img.getAttribute("data-ur-src"))==-1&&a.attr("data-ur-state","enabled")},16),d.state="enabled",d.container.setAttribute("data-ur-state",d.state),b(d.container).on(M+".zoom",G).on(N+".zoom",A).on(Q+".zoom",B);else if(d.state=="enabled-out")d.state=
"disabled",d.container.setAttribute("data-ur-state",d.state),b(d.container).off(M+".zoom",G).off(N+".zoom",A).off(Q+".zoom",B)}function u(a,b){i.attr("data-ur-state","enabled");d.state="enabled-in";d.container.setAttribute("data-ur-state",d.state);l(a||0,b||0,d.ratio)}function l(a,b,d){var c="";a!=null&&(c=H+a+"px, "+b+"px"+t);d!=null&&(c+=y+d+", "+d+I);return j.css({webkitTransform:c,MozTransform:c,msTransform:c,transform:c})}var d=this;this.container=c.set;this.img=c.img[0];this.prescale=!1;this.canvasWidth=
this.canvasHeight=this.bigWidth=this.bigHeight=this.width=this.height=0;this.ratio=1;this.state="disabled";this.transform3d=L;this.button=c.button;this.idler=c.loading;var j=b(this.img),a=b(this.idler),i=b(this.button),h,n,m,s,q=0,w=0,z=0,r=0,p=!1,C=!0,H="translate(",t=")",y=" scale(",I=")",E,F,J;g.push(j.attr("src"));this.zoomIn=function(b){if(d.state=="disabled"){if(!d.width)f(),d.img.style.width=d.width+"px",d.img.style.height=d.height+"px";var c=b.pageX,O=b.pageY;if(b.touches)c=b.touches[0].pageX,
O=b.touches[0].pageY;m=b.offsetX;s=b.offsetY;if(m==void 0||s==void 0)b=d.img.getBoundingClientRect(),m=c-b.left,s=O-b.top;d.prescale?(c=e(d.bigWidth/2-d.ratio*m,[-h,h]),O=e(d.bigHeight/2-d.ratio*s,[-n,n]),u(c,O)):(d.state="enabled-in",d.img.src=j.attr("data-ur-src"),setTimeout(function(){d.prescale||a.attr("data-ur-state","enabled")},0))}};this.zoomOut=function(){if(d.state=="enabled")i.attr("data-ur-state","disabled"),d.state="enabled-out",d.container.setAttribute("data-ur-state",d.state),l(0,0,
1)};d.container.getAttribute("data-ur-touch")!="disabled"&&(b(d.container).on(M+".zoom",function(a){F=J=!0;E=K(a)}),b(d.container).on(N+".zoom",function(a){a=K(a);J&&Math.abs(E.x-a.x)+Math.abs(E.x-a.x)>0&&(F=!1)}),b(d.container).on("click.ur.zoom",function(a){F&&d.zoomIn(a)}));j.on("load.ur.zoom",function(){j.attr("src")==j.attr("data-ur-src")&&g.push(j.attr("src"));a.attr("data-ur-state","disabled");if(!d.prescale&&d.state=="enabled-in"){d.prescale=!0;f();var b=e(d.bigWidth/2-d.ratio*m,[-h,h]),c=
e(d.bigHeight/2-d.ratio*s,[-n,n]);j.css({webkitTransitionDelay:"0.3s",MozTransitionDelay:"0.3s",OTransitionDelay:"0.3s",transitionDelay:"0.3s"});u(b,c)}});this.zoom=function(){if(d.state=="disabled"){if(!d.width)f(),d.img.style.width=d.width+"px",d.img.style.height=d.height+"px";d.prescale?u(0,0):(d.state="enabled-in",d.img.src=j.attr("data-ur-src"),setTimeout(function(){g.indexOf(d.img.getAttribute("data-ur-src"))==-1&&a.attr("data-ur-state","enabled")},0))}else d.zoomOut()};b(d.button).on(D?"touchstart.ur.zoom":
"click.ur.zoom",d.zoom);j.on("webkitTransitionEnd.ur.zoom transitionend.ur.zoom",o);this.reset=function(){d.prescale=!1;d.width=d.height=0;j.css({width:"",height:""});l();d.state="enabled-out";o();a.attr("data-ur-state","disabled");i.attr("data-ur-state","disabled")}}var f=o(f,"zoom"),g=[];b.each(f,function(e,f){Uranium.zoom[e]=new c(this);b(f.set).data("urInit",!0)})},carousel:function(f){function e(c){function e(){a.options.transform3d||(I="translate(",E=")");h.each(function(d,c){if(b(c).attr("data-ur-state")==
"active")return a.itemIndex=d,!1});f();l(a.options.center?a.itemIndex+a.options.cloneLength:a.itemIndex);v();a.update();b(a.scroller).on("dragstart.ur.carousel",function(){return!1});a.options.touch&&(b(a.scroller).on(M+".carousel",A).on(N+".carousel",B).on(Q+".carousel",o),h.each(function(d,c){c.onclick&&b(c).data("urClick",c.onclick);c.onclick=function(d){if(a.flag.click||!d.clientX&&!d.clientY){var c=b(this).data("urClick");c&&c.call(this,d)}else x(d),d.stopImmediatePropagation()}}));a.button.prev.on("click.ur.carousel",
function(){u(1)});a.button.next.on("click.ur.carousel",function(){u(-1)});if("onorientationchange"in window)b(window).on("orientationchange.ur.carousel",a.update);else b(window).on("resize.ur.carousel",function(){t!=i.outerWidth()&&(a.update(),setTimeout(a.update,100))});h.find("img").addBack("img").on("load.ur.carousel",a.update);a.autoscrollStart();i.triggerHandler("load.ur.carousel")}function f(){if(a.options.infinite){if(a.options.cloneLength==0)if(a.options.fill)a.options.cloneLength=a.options.center?
a.options.fill-1:a.options.fill;else if(a.options.center){for(var d=[0,0],c=t/2+h[r].offsetWidth/2,e=r;c>0;e=(e-1+a.count)%a.count)c-=h[e].offsetWidth,d[0]++;c=t/2+h[0].offsetWidth/2;for(e=0;c>0;e=(e+1)%a.count)c-=h[e].offsetWidth,d[1]++;a.options.cloneLength=Math.max(d[0],d[1])}else{c=t;for(e=0;c>0;)c-=h[e].offsetWidth,a.options.cloneLength++,e=(e+1)%h.length}i.attr("data-ur-clones",a.options.cloneLength);d=document.createDocumentFragment();for(e=0;e<a.options.cloneLength;e++){var g=e%a.count,g=
h.eq(g).clone(!0).attr("data-ur-clone",g).attr("data-ur-state","inactive");d.appendChild(g[0])}h.parent().append(d);if(a.options.center){d=document.createDocumentFragment();for(e=c=a.count-a.options.cloneLength%a.count;e<c+a.options.cloneLength;e++)g=e%a.count,g=h.eq(g).clone(!0).attr("data-ur-clone",g).attr("data-ur-state","inactive"),d.appendChild(g[0]);h.parent().prepend(d)}h=b(a.scroller).find("[data-ur-carousel-component='item']");r=h.length-1}else a.options.cloneLength=0,i.attr("data-ur-clones",
0)}function v(){if(a.dots){var d=b(a.dots).find("[data-ur-carousel-component='dot']");if(d.length!=a.count){d.remove();for(var d=b("<div data-ur-carousel-component='dot'>"),c=document.createDocumentFragment(),e=0;e<a.count;e++){var f=d.clone().attr("data-ur-state",e==a.itemIndex?"active":"inactive");c.appendChild(f[0])}b(a.dots).append(c)}}}function l(d){if(d!==void 0){a.itemIndex=d;if(a.itemIndex<0)a.itemIndex=0;else if(a.itemIndex>r)a.itemIndex=r;var c=a.itemIndex;a.options.infinite&&a.options.center&&
(c=a.itemIndex-a.options.cloneLength);c%=a.count;b(a.counter).html(function(){return(b(this).attr("data-ur-template")||"{{index}} of {{count}}").replace("{{index}}",c+1).replace("{{count}}",a.count)});h.attr("data-ur-state","inactive");h.eq(a.itemIndex).attr("data-ur-state","active");b(a.dots).find("[data-ur-carousel-component='dot']").attr("data-ur-state","inactive").eq(c).attr("data-ur-state","active");a.options.infinite?b([a.button.prev,a.button.next]).attr("data-ur-state","enabled"):(b(a.button.prev).attr("data-ur-state",
a.itemIndex==0?"disabled":"enabled"),b(a.button.next).attr("data-ur-state",a.itemIndex==a.count-Math.max(a.options.fill,1)?"disabled":"enabled"))}}function A(b){a.options.verticalScroll||x(b);a.autoscrollStop();a.flag.touched=!0;a.flag.lock=null;a.flag.click=!0;s=m=n=K(b);y=a.translate}function B(b){if(a.flag.touched){m=n;n=K(b);if(Math.abs(s.y-n.y)+Math.abs(s.x-n.x)>0)a.flag.click=!1;if(D&&a.options.verticalScroll){var c=Math.abs((s.y-n.y)/(s.x-n.x));if(a.flag.lock){if(a.flag.lock=="y")return}else if(c>
1.2){a.flag.lock="y";return}else if(c<=1.2)a.flag.lock="x";else return}x(b);if(n!==null){var b=y+(n.x-s.x),e=-b;a.options.center&&(e+=t/2);h.each(function(b,c){var d=c.offsetLeft;if(d+c.offsetWidth>e)return a.itemIndex=b,q=(e-d)/c.offsetWidth,a.options.center&&(q-=0.5),!1});a.options.infinite&&(a.options.center?a.itemIndex<a.options.cloneLength?(y-=p,b-=p,a.itemIndex+=a.count):a.itemIndex>=a.count+a.options.cloneLength&&(y+=p,b+=p,a.itemIndex-=a.count):q<0?(y-=p,b-=p,a.itemIndex+=a.count,c=h[a.itemIndex],
q=(-b-c.offsetLeft)/c.offsetWidth):a.itemIndex>=a.count&&(c=h[a.count].offsetLeft-h[0].offsetLeft,y+=c,b+=c,a.itemIndex-=a.count));d(b)}}}function o(b){if(a.flag.touched){if(!a.flag.click||a.flag.lock)x(b);else if(b.target.tagName=="AREA")location.href=b.target.href;a.flag.touched=!1;b=n.x-m.x;a.options.center?b<0&&q>0?u(-1):b>0&&q<0?u(1):u(0):u(b<0?-1:0)}}function u(b){a.autoscrollStop();clearTimeout(H);var c=a.itemIndex-b;a.options.infinite||(c=a.options.fill>0?j(c,[0,a.count-a.options.fill]):j(c,
[0,r]));if(a.options.infinite){var e=a.translate;if(a.options.center)if(c<a.options.cloneLength)d(e-p),c+=a.count,a.itemIndex=c+b;else{if(c>=a.count+a.options.cloneLength)d(e+p),c-=a.count,a.itemIndex=c+b}else if(c<0)d(e-p),c+=a.count,a.itemIndex=c+b;else if(c>a.count)d(e+p),c-=a.count,a.itemIndex=c+b}w=h[c];i.triggerHandler("slidestart",{index:c});setTimeout(function(){P();l(c)},0)}function P(){function b(){if(!a.flag.touched){var c=a.translate,e=z-c;e-=e/a.options.speed>=0?Math.floor(e/a.options.speed):
Math.ceil(e/a.options.speed);Math.abs(e)<0.01&&(e=0);d(c+e);a.flag.snapping=e!=0;a.flag.snapping?H=setTimeout(b,16):(a.options.infinite&&!a.options.center&&a.itemIndex>=a.count&&(d(a.translate+p),a.itemIndex-=a.count),q=0,a.flag.click=!0,a.autoscrollStart(),i.triggerHandler("slideend",{index:a.itemIndex}))}}z=-w.offsetLeft;a.options.center&&(z+=Math.floor((t-w.offsetWidth)/2));b()}function d(c){a.translate=c;c=I+c+"px, 0px"+E;b(a.scroller).css({webkitTransform:c,MozTransform:c,msTransform:c,transform:c})}
function j(a,b){return Math.min(Math.max(b[0],a),b[1])}var a=this;a.urId=c._id;a.container=c.set;a.scroller=c.scroll_container;a.scroller||b.error("carousel missing item components");a.items=c.item||[];a.button={prev:b(c.button).filter("[data-ur-carousel-button-type='prev']"),next:b(c.button).filter("[data-ur-carousel-button-type='next']")};a.counter=c.count;a.dots=c.dots;a.flag={click:!0,snapping:!1,lock:null,touched:!1};a.options={autoscroll:!1,autoscrollDelay:5E3,autoscrollForward:!0,center:!1,
cloneLength:0,fill:0,infinite:!0,speed:1.1,transform3d:L,touch:!0,verticalScroll:!0};a.count=a.items.length;a.itemIndex=0;a.translate=0;var i=b(a.container),h=b(a.items),n=null,m,s={x:0,y:0},q=0,w=h[0],z,r=a.count-1,p,C,H,t=i.outerWidth(),y=null,I="translate3d(",E=", 0)";a.update=function(){var c=h.length;h=b(a.scroller).find("[data-ur-carousel-component='item']");if(c!=h.length){a.items=h.filter(":not([data-ur-clone])").toArray();a.count=a.items.length;r=h.length-1;h.each(function(c,d){if(b(d).attr("data-ur-state")==
"active")return a.itemIndex=c,!1});if(a.itemIndex>=h.length-a.options.cloneLength)a.itemIndex=r-a.options.cloneLength,h.eq(a.itemIndex).attr("data-ur-state","active");b.contains(a.scroller,w)||(w=h[a.itemIndex]);v();l(a.options.center?a.itemIndex+a.options.cloneLength:a.itemIndex)}t=i.outerWidth();var c=0,e=[];if(a.options.fill>0)for(var f=t,g=a.options.fill;g>0;g--){var k=Math.round(f/g);e.push(k);f-=k}for(g=p=0;g<h.length;g++)if(a.options.fill>0?(k=e[g%a.options.fill],h.eq(g).outerWidth(k),c+=k):
c+=h[g].offsetWidth,g<=r-a.options.cloneLength&&g>=(a.options.center?a.options.cloneLength:0))p+=h[g].offsetWidth;b(a.scroller).width(c);c=h[a.itemIndex];e=-(c.offsetLeft+q*c.offsetWidth);z=-w.offsetLeft;a.options.center&&(e+=Math.floor((t-c.offsetWidth)/2),z+=Math.floor((t-w.offsetWidth)/2));d(e)};a.autoscrollStart=function(){a.options.autoscroll&&(C=setTimeout(function(){t!=0?!a.options.infinite&&a.itemIndex==r&&a.options.autoscrollForward?a.jumpToIndex(0):!a.options.infinite&&a.itemIndex==0&&!a.options.autoscrollForward?
a.jumpToIndex(r):u(a.options.autoscrollForward?-1:1):a.autoscrollStart()},a.options.autoscrollDelay))};a.autoscrollStop=function(){clearTimeout(C)};a.jumpToIndex=function(b){u(a.itemIndex-b)};(function(){var c=i.attr("data-ur-android3d")||i.attr("data-ur-transform3d");if(c)a.options.transform3d=c!="disabled";i.attr("data-ur-transform3d",a.options.transform3d?"enabled":"disabled");if(R&&!a.options.transform3d)c=parseFloat(i.attr("data-ur-speed")),a.options.speed=c>1?c:1.3;i.attr("data-ur-speed",a.options.speed);
c=parseInt(i.attr("data-ur-fill"));if(c>0)a.options.fill=c;i.attr("data-ur-fill",a.options.fill);if(c=i.attr("data-ur-clones"))a.options.cloneLength=parseInt(c);i.attr("data-ur-clones",a.options.cloneLength);c=parseInt(i.attr("data-ur-autoscroll-delay"));if(c>=0)a.options.autoscrollDelay=c;i.attr("data-ur-autoscroll-delay",a.options.autoscrollDelay);a.options.autoscrollForward=i.attr("data-ur-autoscroll-dir")!="prev";i.attr("data-ur-autoscroll-dir",a.options.autoscrollForward?"next":"prev");b.each(["autoscroll",
"center","infinite","touch","verticalScroll"],function(b,c){var d="data-ur-"+c.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}),e=i.attr(d);e=="enabled"?a.options[c]=!0:e=="disabled"&&(a.options[c]=!1);i.attr(d,a.options[c]?"enabled":"disabled")})})();var F=!1;a.options.infinite&&!a.options.fill&&a.options.cloneLength==0&&h.width(function(a,b){b==0&&(F=!0)});if(F){console.warn("carousel with id: "+a.urId+" will be late loaded");var c=h.find("img").addBack("img"),J=c.length;if(J>0)c.on("load.ur.carousel",
function(){--J==0&&e()});else b(window).on("load.ur.carousel",e)}else e()}f=o(f,"carousel");b.each(f,function(c,f){b(f.buttons).each(function(){var e=b(this).attr("data-ur-carousel-button-type");e||b.error("malformed carousel button type for carousel with id: "+c);b(this).attr("data-ur-state",e=="prev"?"disabled":"enabled")});Uranium.carousel[c]=new e(f);b(f.set).data("urInit",!0);b(f.set).attr("data-ur-state","enabled")})},lateload:function(f){var f=o(f,"lateload"),e={DOMContentLoaded:document,load:window};
b.each(f,function(c,f){b(f[""]).each(function(){var c=b(this),f=c.attr("data-ur-href"),g=c.attr("data-ur-src"),l,o;f?(o="href",l=f):g&&(o="src",l=g);f=c.attr("data-ur-event")||"load";if(f=="scroll"){var x=c.attr("data-ur-threshold")||100,f=function(){scrollY+innerHeight>=c.offset().top-x&&c.attr(o,l)};f();b(window).on("scroll.ur.lateload",f)}else b(e[f]).on(f+".ur.lateload",function(){c.attr(o,l)})})})}};window.Uranium={};b.each(P,function(b){Uranium[b]={}});b.fn.Uranium=function(){var f=this;b.each(P,
function(){this(f)});return this};b(document).ready(b(document).Uranium)})(jQuery);
