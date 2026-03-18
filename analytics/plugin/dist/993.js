"use strict";(self.webpackChunkgettem_analytics_app=self.webpackChunkgettem_analytics_app||[]).push([[993],{993(e,t,a){a.r(t),a.d(t,{default:()=>h});var n=a(959),l=a.n(n),r=a(159);var s=function(e){return e.Overview="overview",e.Cards="cards",e.Trends="trends",e.Audience="audience",e.Pages="pages",e}({}),c=a(508),o=a(89),i=a(7);function u(){const e=(0,i.useStyles2)(d),{intervalMs:t,setIntervalMs:a,intervals:n}=(0,c.w)();return l().createElement("div",{className:e.picker},l().createElement("span",{className:e.label},"Auto-refresh:"),n.map(n=>l().createElement("button",{key:n.value,className:`${e.btn} ${t===n.value?e.btnActive:""}`,onClick:()=>a(n.value)},n.label)))}const d=e=>({picker:o.css`
    display: flex;
    align-items: center;
    gap: ${e.spacing(.5)};
    padding: ${e.spacing(1,0)};
  `,label:o.css`
    font-size: ${e.typography.bodySmall.fontSize};
    color: ${e.colors.text.secondary};
    margin-right: ${e.spacing(.5)};
  `,btn:o.css`
    background: ${e.colors.background.secondary};
    border: 1px solid ${e.colors.border.weak};
    border-radius: ${e.shape.radius.default};
    padding: ${e.spacing(.25,1)};
    font-size: 12px;
    color: ${e.colors.text.secondary};
    cursor: pointer;
    &:hover {
      background: ${e.colors.background.canvas};
    }
  `,btnActive:o.css`
    background: ${e.colors.primary.main};
    border-color: ${e.colors.primary.main};
    color: ${e.colors.primary.contrastText};
    &:hover {
      background: ${e.colors.primary.shade};
    }
  `}),m=l().lazy(()=>a.e(466).then(a.bind(a,466))),p=l().lazy(()=>a.e(864).then(a.bind(a,864))),v=l().lazy(()=>a.e(54).then(a.bind(a,54))),b=l().lazy(()=>a.e(372).then(a.bind(a,372))),g=l().lazy(()=>a.e(820).then(a.bind(a,820)));const h=function(e){return l().createElement(c.B,null,l().createElement(u,null),l().createElement(r.Routes,null,l().createElement(r.Route,{path:s.Cards,element:l().createElement(p,null)}),l().createElement(r.Route,{path:s.Trends,element:l().createElement(v,null)}),l().createElement(r.Route,{path:s.Audience,element:l().createElement(b,null)}),l().createElement(r.Route,{path:s.Pages,element:l().createElement(g,null)}),l().createElement(r.Route,{path:"*",element:l().createElement(m,null)})))}},508(e,t,a){a.d(t,{B:()=>c,w:()=>o});var n=a(959),l=a.n(n);const r=[{label:"Off",value:0},{label:"10s",value:1e4},{label:"30s",value:3e4},{label:"1m",value:6e4},{label:"5m",value:3e5}],s=(0,n.createContext)({intervalMs:3e4,setIntervalMs:()=>{},intervals:r}),c=({children:e})=>{const[t,a]=(0,n.useState)(3e4);return l().createElement(s.Provider,{value:{intervalMs:t,setIntervalMs:a,intervals:r}},e)},o=()=>(0,n.useContext)(s)}}]);
//# sourceMappingURL=993.js.map?_cache=5b2d8577b7c54e9958e7