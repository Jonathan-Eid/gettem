"use strict";(self.webpackChunkgettem_analytics_app=self.webpackChunkgettem_analytics_app||[]).push([[54],{567(e,t,l){l.d(t,{N:()=>o});var a=l(959),n=l(531),r=l(508);function s(e,t,l,a,n,r,s){try{var o=e[r](s),i=o.value}catch(e){return void l(e)}o.done?t(i):Promise.resolve(i).then(a,n)}function o(e){const{intervalMs:t}=(0,r.w)(),[l,o]=(0,a.useState)(null),[i,c]=(0,a.useState)(!0),[d,p]=(0,a.useState)(null),u=(0,a.useRef)(0),m=(0,a.useCallback)(()=>{return(t=function*(){0===u.current&&c(!0),p(null);const t=++u.current;try{const l=yield(0,n.getBackendSrv)().get(`/api/plugins/gettem-analytics-app/resources/${e}`);if(t!==u.current)return;o(l)}catch(e){t===u.current&&p(e instanceof Error?e.message:String(e))}finally{t===u.current&&c(!1)}},function(){var e=this,l=arguments;return new Promise(function(a,n){var r=t.apply(e,l);function o(e){s(r,a,n,o,i,"next",e)}function i(e){s(r,a,n,o,i,"throw",e)}o(void 0)})})();var t},[e]);return(0,a.useEffect)(()=>{if(m(),t>0){const e=setInterval(m,t);return()=>clearInterval(e)}},[m,t]),{data:l,loading:i,error:d,refetch:m}}},54(e,t,l){l.r(t),l.d(t,{default:()=>d});var a=l(959),n=l.n(a),r=l(89),s=l(531),o=l(7),i=l(567);function c({values:e,color:t,label:l,latest:a,unit:r,width:s=240,height:i=64}){const c=(0,o.useStyles2)(p);if(e.length<2)return null;const d=Math.max(...e,1),u=e.map((t,l)=>`${l/(e.length-1)*s},${i-t/d*(i-4)}`).join(" ");return n().createElement("div",{className:c.sparkCard},n().createElement("div",{className:c.sparkHeader},n().createElement("span",{className:c.sparkLabel},l),n().createElement("span",{className:c.sparkValue,style:{color:t}},a,r&&n().createElement("span",{className:c.sparkUnit},r))),n().createElement("svg",{width:s,height:i,style:{display:"block"}},n().createElement("defs",null,n().createElement("linearGradient",{id:`area-${t.replace("#","")}`,x1:"0",y1:"0",x2:"0",y2:"1"},n().createElement("stop",{offset:"0%",stopColor:t,stopOpacity:"0.25"}),n().createElement("stop",{offset:"100%",stopColor:t,stopOpacity:"0.02"}))),n().createElement("polygon",{points:`0,${i} ${u} ${s},${i}`,fill:`url(#area-${t.replace("#","")})`}),n().createElement("polyline",{points:u,fill:"none",stroke:t,strokeWidth:"2"})))}const d=function(){var e,t,l,a,r,d,u,m;const g=(0,o.useStyles2)(p),{data:v,loading:f,error:h}=(0,i.N)("trends"),y=null!=v?v:[],E=[...y].reverse(),b=y[0];return n().createElement(s.PluginPage,null,n().createElement("div",{className:g.root},n().createElement("h2",{className:g.heading},"Engagement trends ",n().createElement("span",{className:g.period},"— last 30 days")),f&&n().createElement(o.LoadingBar,{width:300}),h&&n().createElement(o.Alert,{title:"Query error",severity:"error"},h),!f&&!h&&n().createElement(n().Fragment,null,n().createElement("div",{className:g.sparkGrid},n().createElement(c,{label:"Sessions / day",values:E.map(e=>e.sessions),color:"#5794f2",latest:null!==(e=null==b?void 0:b.sessions)&&void 0!==e?e:0}),n().createElement(c,{label:"Swipes / day",values:E.map(e=>e.swipes),color:"#73bf69",latest:null!==(t=null==b?void 0:b.swipes)&&void 0!==t?t:0}),n().createElement(c,{label:"Right swipe %",values:E.map(e=>e.right_pct),color:"#ff9830",latest:null!==(l=null==b?void 0:b.right_pct)&&void 0!==l?l:0,unit:"%"}),n().createElement(c,{label:"Detail opens / day",values:E.map(e=>e.detail_opens),color:"#b877d9",latest:null!==(a=null==b?void 0:b.detail_opens)&&void 0!==a?a:0}),n().createElement(c,{label:"Page views / day",values:E.map(e=>e.page_views),color:"#8ab8ff",latest:null!==(r=null==b?void 0:b.page_views)&&void 0!==r?r:0}),n().createElement(c,{label:"Link clicks / day",values:E.map(e=>e.link_clicks),color:"#ff6600",latest:null!==(d=null==b?void 0:b.link_clicks)&&void 0!==d?d:0}),n().createElement(c,{label:"Avg dwell time",values:E.map(e=>e.avg_dwell_ms),color:"#f2495c",latest:null!==(u=null==b||null===(m=b.avg_dwell_ms)||void 0===m?void 0:m.toLocaleString())&&void 0!==u?u:"0",unit:"ms"})),n().createElement("h3",{className:g.subheading},"Daily breakdown"),n().createElement("div",{className:g.tableWrapper},n().createElement("table",{className:g.table},n().createElement("thead",null,n().createElement("tr",null,n().createElement("th",null,"Date"),n().createElement("th",null,"Sessions"),n().createElement("th",null,"Impressions"),n().createElement("th",null,"Swipes"),n().createElement("th",null,"Right %"),n().createElement("th",null,"Detail opens"),n().createElement("th",null,"Page views"),n().createElement("th",null,"Link clicks"),n().createElement("th",null,"Avg dwell"))),n().createElement("tbody",null,y.map(e=>{var t,l,a,r,s,o,i,c;return n().createElement("tr",{key:e.day},n().createElement("td",{className:g.date},e.day),n().createElement("td",null,null===(l=e.sessions)||void 0===l?void 0:l.toLocaleString()),n().createElement("td",null,null===(a=e.impressions)||void 0===a?void 0:a.toLocaleString()),n().createElement("td",null,null===(r=e.swipes)||void 0===r?void 0:r.toLocaleString()),n().createElement("td",null,null!==(t=e.right_pct)&&void 0!==t?t:"—","%"),n().createElement("td",null,null===(s=e.detail_opens)||void 0===s?void 0:s.toLocaleString()),n().createElement("td",null,null===(o=e.page_views)||void 0===o?void 0:o.toLocaleString()),n().createElement("td",null,null===(i=e.link_clicks)||void 0===i?void 0:i.toLocaleString()),n().createElement("td",null,null===(c=e.avg_dwell_ms)||void 0===c?void 0:c.toLocaleString(),"ms"))}),0===y.length&&n().createElement("tr",null,n().createElement("td",{colSpan:7,className:g.empty},"No data yet — the operator runs nightly."))))))))},p=e=>({root:r.css`padding: ${e.spacing(2,0)};`,heading:r.css`
    font-size: ${e.typography.h3.fontSize};
    font-weight: ${e.typography.fontWeightMedium};
    margin-bottom: ${e.spacing(2)};
  `,subheading:r.css`
    font-size: ${e.typography.h5.fontSize};
    font-weight: ${e.typography.fontWeightMedium};
    margin: ${e.spacing(3,0,1.5)};
  `,period:r.css`
    font-size: ${e.typography.body.fontSize};
    font-weight: normal;
    color: ${e.colors.text.secondary};
  `,sparkGrid:r.css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: ${e.spacing(2)};
    margin-bottom: ${e.spacing(1)};
  `,sparkCard:r.css`
    background: ${e.colors.background.secondary};
    border: 1px solid ${e.colors.border.weak};
    border-radius: ${e.shape.radius.default};
    padding: ${e.spacing(2)};
  `,sparkHeader:r.css`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: ${e.spacing(1)};
  `,sparkLabel:r.css`
    font-size: ${e.typography.bodySmall.fontSize};
    color: ${e.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,sparkValue:r.css`
    font-size: 1.4rem;
    font-weight: ${e.typography.fontWeightBold};
  `,sparkUnit:r.css`
    font-size: 0.75rem;
    margin-left: 2px;
    opacity: 0.7;
  `,tableWrapper:r.css`overflow-x: auto;`,table:r.css`
    width: 100%;
    border-collapse: collapse;
    font-size: ${e.typography.bodySmall.fontSize};
    th, td {
      text-align: left;
      padding: ${e.spacing(.75,1.5)};
      border-bottom: 1px solid ${e.colors.border.weak};
    }
    th { color: ${e.colors.text.secondary}; font-weight: ${e.typography.fontWeightMedium}; }
    tr:hover td { background: ${e.colors.background.secondary}; }
  `,date:r.css`font-family: ${e.typography.fontFamilyMonospace}; font-size: 12px;`,empty:r.css`
    text-align: center;
    color: ${e.colors.text.disabled};
    padding: ${e.spacing(3)} !important;
  `})}}]);
//# sourceMappingURL=54.js.map?_cache=9551f536863a663fba10