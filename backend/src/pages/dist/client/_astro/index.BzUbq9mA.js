import{r as R,g as w,R as P}from"./index.DNi1g-pO.js";const m=t=>{let e;const n=new Set,o=(s,d)=>{const c=typeof s=="function"?s(e):s;if(!Object.is(c,e)){const i=e;e=d??(typeof c!="object"||c===null)?c:Object.assign({},e,c),n.forEach(a=>a(e,i))}},r=()=>e,E={setState:o,getState:r,getInitialState:()=>p,subscribe:s=>(n.add(s),()=>n.delete(s)),destroy:()=>{n.clear()}},p=e=t(o,r,E);return E},_=t=>t?m(t):m;var g={exports:{}},D={},I={exports:{}},b={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f=R;function A(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var O=typeof Object.is=="function"?Object.is:A,T=f.useState,F=f.useEffect,L=f.useLayoutEffect,U=f.useDebugValue;function j(t,e){var n=e(),o=T({inst:{value:n,getSnapshot:e}}),r=o[0].inst,u=o[1];return L(function(){r.value=n,r.getSnapshot=e,h(r)&&u({inst:r})},[t,n,e]),F(function(){return h(r)&&u({inst:r}),t(function(){h(r)&&u({inst:r})})},[t]),U(n),n}function h(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!O(t,n)}catch{return!0}}function V(t,e){return e()}var q=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?V:j;b.useSyncExternalStore=f.useSyncExternalStore!==void 0?f.useSyncExternalStore:q;I.exports=b;var B=I.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=R,C=B;function W(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var $=typeof Object.is=="function"?Object.is:W,M=C.useSyncExternalStore,z=v.useRef,X=v.useEffect,k=v.useMemo,G=v.useDebugValue;D.useSyncExternalStoreWithSelector=function(t,e,n,o,r){var u=z(null);if(u.current===null){var l={hasValue:!1,value:null};u.current=l}else l=u.current;u=k(function(){function E(i){if(!p){if(p=!0,s=i,i=o(i),r!==void 0&&l.hasValue){var a=l.value;if(r(a,i))return d=a}return d=i}if(a=d,$(s,i))return a;var y=o(i);return r!==void 0&&r(a,y)?a:(s=i,d=y)}var p=!1,s,d,c=n===void 0?null:n;return[function(){return E(e())},c===null?void 0:function(){return E(c())}]},[e,n,o,r]);var S=M(t,u[0],u[1]);return X(function(){l.hasValue=!0,l.value=S},[S]),G(S),S};g.exports=D;var H=g.exports;const J=w(H),{useDebugValue:K}=P,{useSyncExternalStoreWithSelector:N}=J;const Q=t=>t;function Y(t,e=Q,n){const o=N(t.subscribe,t.getState,t.getServerState||t.getInitialState,e,n);return K(o),o}const x=t=>{const e=typeof t=="function"?_(t):t,n=(o,r)=>Y(e,o,r);return Object.assign(n,e),n},tt=t=>t?x(t):x;export{tt as c};
