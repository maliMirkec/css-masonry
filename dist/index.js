(()=>{var e={798:e=>{"use strict";let t=".js-css-masonry",r=".js-css-masonry-item",n=[],o=0,c=0,l=!1;const i=(e,t)=>{if(!e)return!1;if(t<=1)return!1;let n=!1,l=0,u=!1,s=1e16,m=!1;if(e.forEach((t=>{if(!t.children.length)return e[0].getBoundingClientRect().top===t.getBoundingClientRect().top&&(m=t),!1;const o=(e=>{if(!e)return!1;const t=e.querySelectorAll(r);if(!t.length)return!1;const n=t[t.length-1];return{elem:n,rect:n.getBoundingClientRect()}})(t);if(!o)return!1;o.rect.bottom>=l&&(l=o.rect.bottom,n={elem:o.elem,rect:o.rect}),o.rect.bottom<=s&&(s=o.rect.bottom,u={elem:o.elem,rect:o.rect})})),!n||!u)return!1;const h=n.rect.top,p=n.rect.bottom,f=u.rect.top,g=u.rect.bottom;(h>g||m)&&(m?m.appendChild(n.elem):h!==f&&p!==g&&u.elem.parentNode.appendChild(n.elem),o++,o<c&&i(e,t))},u=e=>{if(!n.length)return!1;o=0,c=0,n.forEach(((e,t)=>{e.columns.forEach((e=>{c+=e.children.length?e.children.length:0}));const r=(e=>{if(!e)return!1;let t=0;return e.forEach(((r,n)=>{r.getBoundingClientRect().top<=e[0].getBoundingClientRect().top&&t++})),t})(e.columns);i(e.columns,r)}))};e.exports={init:e=>{e&&e.parentSelector&&(t=e.parentSelector),e&&e.itemSelector&&(r=e.itemSelector);const o=document.querySelectorAll(t);o.length&&o.forEach((e=>{const t=e.children?Array.from(e.children):[];n.push({html:e.innerHTML,parent:e,columns:t,colNum:0})})),u(),(()=>{if(!l){let e;window.onresize=()=>{clearTimeout(e),e=setTimeout((function(){u()}),100)},l=!0}})()},trigger:u}}},t={};(function r(n){var o=t[n];if(void 0!==o)return o.exports;var c=t[n]={exports:{}};return e[n](c,c.exports,r),c.exports})(798).init()})();