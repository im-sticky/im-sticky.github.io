(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[195],{5809:function(t,e,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog",function(){return o(5540)}])},1669:function(t,e,o){"use strict";o.d(e,{W:function(){return c}});var s=o(5893),n=(o(7294),o(5697)),i=o.n(n),l=o(6010),r=o(7218),a=o.n(r);function c(t){var e=t.children,o=t.className;return(0,s.jsx)("div",{className:(0,l.Z)(a().container,o),children:e})}c.propTypes={children:i().any.isRequired,className:i().string}},368:function(t,e,o){"use strict";o.d(e,{S:function(){return p}});var s=o(5893),n=o(7294),i=o(6010),l=o(5697),r=o.n(l),a=o(2814),c=o(2857),_=o.n(c);function p(t){var e,o,l,r=t.icon,c=t.alt,p=t.children,g=t.level,d=void 0===g?1:g,u=t.small,m=void 0!==u&&u,h=t.className;return(0,n.createElement)("h".concat(d),{className:(0,i.Z)(_()["title-shape-heading"],h)},(0,s.jsxs)(s.Fragment,{children:[p,(0,s.jsx)("div",{className:(0,i.Z)(_()["title-shape"],(e={},o=_()["title-shape--small"],l=m,o in e?Object.defineProperty(e,o,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[o]=l,e)),children:(0,s.jsx)(a.G,{icon:r,alt:c,className:_()["title-shape-icon"]})})]}))}p.propTypes={alt:r().string.isRequired,children:r().any.isRequired,className:r().string,icon:r().instanceOf(Object).isRequired,level:r().number,small:r().bool}},9087:function(t,e,o){"use strict";o.d(e,{_:function(){return s}});var s="https://im-sticky.github.io"},184:function(t,e,o){"use strict";function s(t){var e=new Date(t);return e.setUTCHours(10),new Intl.DateTimeFormat("en-CA",{year:"numeric",month:"long",day:"numeric"}).format(e)}o.d(e,{p:function(){return s}})},5540:function(t,e,o){"use strict";o.r(e),o.d(e,{__N_SSG:function(){return j},default:function(){return f}});var s=o(5893),n=(o(7294),o(9008)),i=o(1163),l=o(6010),r=o(5050),a=o(1669),c=o(3512),_=o(368),p=o(2814),g=o(9398),d=o(184),u=o(9087),m=o(7015),h=o.n(m),b=o(7468),x=o.n(b),j=!0;function f(t){var e=t.posts,o=(0,i.useRouter)().query.page,m=o?parseInt(o):1,b=e.slice(8*(m-1),8*m);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.default,{children:[(0,s.jsx)("title",{children:"Alex Craig | Blog"}),(0,s.jsx)("meta",{property:"og:site_name",content:"Alex Craig's Blog"}),(0,s.jsx)("meta",{property:"og:type",content:"website"}),(0,s.jsx)("meta",{property:"og:url",content:"".concat(u._,"/blog")}),(0,s.jsx)("meta",{property:"og:title",content:"Blog"}),(0,s.jsx)("meta",{property:"og:description",content:"Alex Craig's Blog"}),(0,s.jsx)("meta",{property:"og:image",content:"/mstile-144x144.png"}),(0,s.jsx)("meta",{name:"twitter:site",content:"@im_sticky"}),(0,s.jsx)("meta",{name:"twitter:card",content:"summary"}),(0,s.jsx)("meta",{name:"twitter:url",content:"".concat(u._,"/blog")}),(0,s.jsx)("meta",{name:"twitter:title",content:"Blog"}),(0,s.jsx)("meta",{name:"twitter:description",content:"Alex Craig's Blog"}),(0,s.jsx)("meta",{name:"twitter:image",content:"/mstile-144x144.png"})]}),(0,s.jsx)(r.$,{grow:!0,id:"BlogList",className:x()["blog-list"],children:(0,s.jsxs)(a.W,{children:[(0,s.jsx)("p",{className:(0,l.Z)(h()["blog-post__descriptor"],h()["blog-post__descriptor--small"],h()["blog-post__descriptor--spaced"]),children:(0,s.jsxs)(c.h,{icon:!0,to:"/",children:[(0,s.jsx)(p.G,{icon:g.wzR,alt:"Back arrow",className:h()["blog-post__back-icon"]}),"Back to home"]})}),(0,s.jsx)(_.S,{icon:g.y1i,alt:"Sticky note",children:"Blog Posts"}),(0,s.jsx)("p",{className:h()["blog-list__descriptor"],children:"A collection of my thoughts and anecdotes"}),(0,s.jsx)("p",{className:(0,l.Z)(h()["blog-post__descriptor"],h()["blog-post__descriptor--small"]),children:(0,s.jsxs)(c.h,{noUnderline:!0,to:"/feed.xml",target:"_blank",children:[(0,s.jsx)(p.G,{icon:g.TwV,alt:"RSS feed",className:x()["blog-list__rss"]}),"RSS Feed"]})}),b.map((function(t){return(0,s.jsxs)("div",{className:x().post,children:[(0,s.jsx)("h3",{children:(0,s.jsx)(c.h,{to:"/blog/".concat(t.slug),children:t.title})}),(0,s.jsx)("p",{className:x().post__description,children:t.description}),(0,s.jsx)("small",{className:x().post__date,children:(0,d.p)(t.date)})]},"post.".concat(t.slug))})),(0,s.jsxs)("div",{className:h()["blog-pagination"],children:[m>1?(0,s.jsxs)(c.h,{icon:!0,to:2===m?"/blog":"/blog?page=".concat(m-1),children:[(0,s.jsx)(p.G,{icon:g.wzR,alt:"Back arrow",className:h()["blog-post__back-icon"]}),"Newer posts"]}):null,m<Math.ceil(e.length/8)?(0,s.jsxs)(c.h,{icon:!0,to:"/blog?page=".concat(m+1),className:h()["blog-pagination__previous"],children:["Older posts",(0,s.jsx)(p.G,{icon:g.AGO,alt:"Next arrow",className:h()["blog-post__next-icon"]})]}):null]})]})})]})}},7218:function(t){t.exports={container:"Container_container___g4LK"}},2857:function(t){t.exports={"title-shape-heading":"TitleShape_title-shape-heading__ow2RH","title-shape":"TitleShape_title-shape__8_bJ3","title-shape--small":"TitleShape_title-shape--small__mwpiW","title-shape-icon":"TitleShape_title-shape-icon__Du3Qf"}},7468:function(t){t.exports={"blog-list":"Blog_blog-list__lYcq0","blog-list__descriptor":"Blog_blog-list__descriptor__Fy9XQ","blog-list__descriptor--small":"Blog_blog-list__descriptor--small__sfgGq","blog-list__rss":"Blog_blog-list__rss__p8bk2",post:"Blog_post__R4iVK",post__description:"Blog_post__description__jTzOJ",post__date:"Blog_post__date__3WiZ7"}},7015:function(t){t.exports={"blog-post__descriptor":"BlogShared_blog-post__descriptor__vNI_5","blog-post__descriptor--small":"BlogShared_blog-post__descriptor--small__izje8","blog-post__descriptor--italic":"BlogShared_blog-post__descriptor--italic__xXxb_","blog-post__descriptor--spaced":"BlogShared_blog-post__descriptor--spaced__yTUxd","blog-post__back-icon":"BlogShared_blog-post__back-icon__3do4r","blog-post__next-icon":"BlogShared_blog-post__next-icon__uwBFH","blog-pagination":"BlogShared_blog-pagination__FNmwI","blog-pagination__previous":"BlogShared_blog-pagination__previous__SeO1c"}},9008:function(t,e,o){t.exports=o(3121)},1163:function(t,e,o){t.exports=o(880)}},function(t){t.O(0,[774,888,179],(function(){return e=5809,t(t.s=e);var e}));var e=t.O();_N_E=e}]);