(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[602],{7713:function(e,n,t){Promise.resolve().then(t.bind(t,4029)),Promise.resolve().then(t.t.bind(t,2550,23)),Promise.resolve().then(t.t.bind(t,7786,23)),Promise.resolve().then(t.t.bind(t,1266,23)),Promise.resolve().then(t.t.bind(t,1715,23)),Promise.resolve().then(t.bind(t,2303))},4029:function(e,n,t){"use strict";t.d(n,{CardZoom:function(){return _}});var r,i,a=t(7437),c=t(2265),l=t(4839),o=t(3992),s=t.n(o);function _(e){var n;let{card:t,className:r}=e,[i,o]=(0,c.useState)(0),_=(0,c.useRef)(null),u=(0,c.useRef)(null);return(0,a.jsxs)("figure",{className:(0,l.Z)(s().container,r),children:[(0,a.jsxs)("div",{ref:_,className:s().picture,onMouseEnter:()=>{o(1)},onMouseLeave:()=>{o(0)},onMouseMove:e=>{if(e.preventDefault(),!_.current||!u.current)return;let n=_.current.getBoundingClientRect(),t=u.current.getBoundingClientRect(),r=(e.clientX-n.left)/n.width,i=(e.clientY-n.top)/n.height,a=r*t.width-r*n.width,c=i*t.height-i*n.height;u.current.style.left="-".concat(Math.round(a),"px"),u.current.style.top="-".concat(Math.round(c),"px")},children:[(0,a.jsx)("img",{src:"/edh/small/".concat(t.imageName),title:t.name,alt:t.name,className:(0,l.Z)(s().image,s()["image--small"]),loading:"lazy"}),(0,a.jsx)("img",{ref:u,src:"/edh/large/".concat(t.imageName),alt:"".concat(t.name," zoomed in"),className:(0,l.Z)(s().image,s()["image--large"],{hidden:1!==i}),loading:"lazy"})]}),(0,a.jsx)("figcaption",{className:s().name,children:t.name}),t.acquired?(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{children:"Location:"})," ",null!==(n=t.acquired)&&void 0!==n?n:"Forgotten"]}):null,t.year?(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{children:"Year:"})," ",t.year,t.yearUnknown?(0,a.jsx)("sup",{children:"*"}):null]}):null,t.description?(0,a.jsx)("p",{children:t.description}):null,t.yearUnknown?(0,a.jsxs)("small",{children:[(0,a.jsx)("sup",{children:"*"}),"Uncertain of exact year"]}):null]})}(r=i||(i={}))[r.Small=0]="Small",r[r.Large=1]="Large"},1650:function(e,n,t){"use strict";t.d(n,{W:function(){return o}});var r=t(7437),i=t(2265),a=t(4839),c=t(7786),l=t.n(c);let o=(0,i.forwardRef)((e,n)=>{let{children:t,className:i,large:c=!1}=e;return(0,r.jsx)("div",{ref:n,className:(0,a.Z)(l().container,i,{[l()["container--large"]]:c}),children:t})});o.displayName="Container"},2303:function(e,n,t){"use strict";t.d(n,{VerticalHero:function(){return o}});var r=t(7437),i=t(2265),a=t(1650),c=t(5555),l=t.n(c);function o(e){let{children:n,imageUrl:t,scrollTarget:c=600}=e,o=(0,i.useRef)(null),s=(0,i.useRef)(null),_=(0,i.useRef)(null),u=(0,i.useRef)(null),h=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=Math.min(window.scrollY/c*100,101);if(o.current&&s.current&&_.current&&u.current&&(n<=100||e)){let e=n/100;s.current.style.backgroundImage="linear-gradient(to left, rgb(250, 250, 250) ".concat(n,"%, rgba(250, 250, 250, 0) ").concat(1.3*n+25,"%, rgba(250, 250, 250, 0))"),u.current.style.objectPosition="50% ".concat(n,"%"),o.current.style.transform="translateX(-".concat(61*e,"%)"),_.current.style.marginTop="".concat((o.current.getBoundingClientRect().height-_.current.getBoundingClientRect().height)*e,"px")}};return(0,i.useEffect)(()=>{h(!0),window.addEventListener("scroll",()=>h())},[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:l()["vertical-hero__splash"],children:[(0,r.jsx)("img",{className:l()["vertical-hero__image"],src:t,alt:"",ref:u}),(0,r.jsx)("div",{className:l()["vertical-hero__screen"],ref:s})]}),(0,r.jsx)("div",{className:l()["vertical-hero"],children:(0,r.jsx)("div",{className:l()["vertical-hero__container"],ref:o,children:(0,r.jsx)(a.W,{ref:_,children:n})})})]})}},3992:function(e){e.exports={container:"cardZoom_container__0N3sT",picture:"cardZoom_picture__9sQ9i","image--small":"cardZoom_image--small__u4mgf","image--large":"cardZoom_image--large__6wM7e",name:"cardZoom_name__U6EpK"}},1715:function(e){e.exports={"title-description":"edh_title-description__mldS2",container:"edh_container__0fYSE",content:"edh_content__yraL2",title:"edh_title__O6NZb","span-grid":"edh_span-grid__cEGfm"}},7786:function(e){e.exports={container:"Container_container__UkED_","container--large":"Container_container--large__p4LBO"}},2550:function(e){e.exports={section:"Section_section__TwzwZ","section--grow":"Section_section--grow__nvWNJ"}},1266:function(e){e.exports={"title-shape-heading":"TitleShape_title-shape-heading__JBKhQ","title-shape":"TitleShape_title-shape__rL3XS","title-shape--small":"TitleShape_title-shape--small__VFLAd","title-shape-icon":"TitleShape_title-shape-icon__mVPnv"}},5555:function(e){e.exports={"vertical-hero":"VerticalHero_vertical-hero__4TU9e","vertical-hero__splash":"VerticalHero_vertical-hero__splash__LU2Uz","vertical-hero__container":"VerticalHero_vertical-hero__container__d75GU","vertical-hero__image":"VerticalHero_vertical-hero__image__TVhuO","vertical-hero__screen":"VerticalHero_vertical-hero__screen__ukMHQ"}},4839:function(e,n,t){"use strict";n.Z=function(){for(var e,n,t=0,r="",i=arguments.length;t<i;t++)(e=arguments[t])&&(n=function e(n){var t,r,i="";if("string"==typeof n||"number"==typeof n)i+=n;else if("object"==typeof n){if(Array.isArray(n)){var a=n.length;for(t=0;t<a;t++)n[t]&&(r=e(n[t]))&&(i&&(i+=" "),i+=r)}else for(r in n)n[r]&&(i&&(i+=" "),i+=r)}return i}(e))&&(r&&(r+=" "),r+=n);return r}}},function(e){e.O(0,[643,350,971,23,744],function(){return e(e.s=7713)}),_N_E=e.O()}]);