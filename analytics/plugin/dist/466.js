"use strict";(self.webpackChunkgettem_analytics_app=self.webpackChunkgettem_analytics_app||[]).push([[466],{567(e,t,a){a.d(t,{N:()=>s});var r=a(959),l=a(531),n=a(508);function o(e,t,a,r,l,n,o){try{var s=e[n](o),c=s.value}catch(e){return void a(e)}s.done?t(c):Promise.resolve(c).then(r,l)}function s(e){const{intervalMs:t}=(0,n.w)(),[a,s]=(0,r.useState)(null),[c,i]=(0,r.useState)(!0),[d,p]=(0,r.useState)(null),m=(0,r.useRef)(0),u=(0,r.useCallback)(()=>{return(t=function*(){0===m.current&&i(!0),p(null);const t=++m.current;try{const a=yield(0,l.getBackendSrv)().get(`/api/plugins/gettem-analytics-app/resources/${e}`);if(t!==m.current)return;s(a)}catch(e){t===m.current&&p(e instanceof Error?e.message:String(e))}finally{t===m.current&&i(!1)}},function(){var e=this,a=arguments;return new Promise(function(r,l){var n=t.apply(e,a);function s(e){o(n,r,l,s,c,"next",e)}function c(e){o(n,r,l,s,c,"throw",e)}s(void 0)})})();var t},[e]);return(0,r.useEffect)(()=>{if(u(),t>0){const e=setInterval(u,t);return()=>clearInterval(e)}},[u,t]),{data:a,loading:c,error:d,refetch:u}}},466(e,t,a){a.r(t),a.d(t,{default:()=>u});var r=a(959),l=a.n(r),n=a(89),o=a(531),s=a(7),c=a(567);function i({values:e,color:t,width:a=80,height:r=28}){if(e.length<2)return null;const n=Math.max(...e,1),o=e.map((t,l)=>`${l/(e.length-1)*a},${r-t/n*(r-2)}`).join(" ");return l().createElement("svg",{width:a,height:r,style:{display:"block"}},l().createElement("defs",null,l().createElement("linearGradient",{id:`grad-${t.replace("#","")}`,x1:"0",y1:"0",x2:"0",y2:"1"},l().createElement("stop",{offset:"0%",stopColor:t,stopOpacity:"0.3"}),l().createElement("stop",{offset:"100%",stopColor:t,stopOpacity:"0.02"}))),l().createElement("polygon",{points:`0,${r} ${o} ${a},${r}`,fill:`url(#grad-${t.replace("#","")})`}),l().createElement("polyline",{points:o,fill:"none",stroke:t,strokeWidth:"2"}))}function d({label:e,value:t,unit:a,color:r,sparkValues:n,sparkColor:o}){const c=(0,s.useStyles2)(g),d=(0,s.useTheme2)(),p=null!=r?r:d.colors.text.primary;return l().createElement("div",{className:c.statCard},l().createElement("div",{className:c.statValue,style:{color:p}},null!=t?t:"—",a&&l().createElement("span",{className:c.statUnit},a)),l().createElement("div",{className:c.statLabel},e),n&&n.length>1&&l().createElement("div",{className:c.sparkContainer},l().createElement(i,{values:n,color:null!=o?o:p,width:120,height:32})))}const p={swipe:"#5794f2",card_impression:"#73bf69",detail_open:"#ff9830",detail_close:"#b877d9",session_start:"#8ab8ff",session_end:"#f2495c",undo:"#ff6600"};function m({type:e}){var t;const a=(0,s.useStyles2)(g),r=null!==(t=p[e])&&void 0!==t?t:"#666";return l().createElement("span",{className:a.eventBadge,style:{background:r}},e.replace("_"," "))}const u=function(){var e,t,a,r;const n=(0,s.useStyles2)(g),i=(0,s.useTheme2)(),p=(0,c.N)("overview"),u=(0,c.N)("trends"),f=(0,c.N)("cards"),h=(0,c.N)("recent"),y=(null!==(e=u.data)&&void 0!==e?e:[]).slice().reverse(),E=(null!==(t=f.data)&&void 0!==t?t:[])[0];return l().createElement(o.PluginPage,null,l().createElement("div",{className:n.root},p.loading&&l().createElement(s.LoadingBar,{width:300}),p.error&&l().createElement(s.Alert,{title:"Query error",severity:"error"},p.error),!p.loading&&!p.error&&p.data&&l().createElement(l().Fragment,null,l().createElement("div",{className:n.statRow},l().createElement(d,{label:"Sessions today",value:p.data.sessions,color:i.colors.primary.text,sparkValues:y.map(e=>e.sessions),sparkColor:"#5794f2"}),l().createElement(d,{label:"Swipes today",value:p.data.swipes,color:i.colors.text.primary,sparkValues:y.map(e=>e.swipes),sparkColor:"#73bf69"}),l().createElement(d,{label:"Right swipe rate",value:p.data.right_pct,unit:"%",color:p.data.right_pct>=50?i.colors.success.text:i.colors.warning.text}),l().createElement(d,{label:"Detail opens",value:p.data.detail_opens,color:i.colors.warning.text,sparkValues:y.map(e=>e.detail_opens),sparkColor:"#ff9830"})),E&&l().createElement("div",{className:n.heroCard},l().createElement("div",{className:n.heroLabel},"Most engaged card"),l().createElement("div",{className:n.heroTitle},E.card_name),l().createElement("div",{className:n.heroStats},l().createElement("div",null,l().createElement("strong",null,E.engagement.toLocaleString())," total engagement"),l().createElement("div",null,l().createElement("strong",null,E.impressions.toLocaleString())," impressions"),l().createElement("div",null,l().createElement("span",{style:{color:i.colors.success.text}},E.swipe_right," right")," / ",l().createElement("span",{style:{color:i.colors.error.text}},E.swipe_left," left")," ","(",E.right_pct,"% right)"),l().createElement("div",null,l().createElement("strong",null,E.detail_opens)," detail opens"),l().createElement("div",null,l().createElement("strong",null,E.avg_dwell_ms.toLocaleString()),"ms avg dwell")))),l().createElement("h3",{className:n.subheading},"Recent events"),h.loading&&l().createElement(s.LoadingBar,{width:300}),h.error&&l().createElement(s.Alert,{title:"Query error",severity:"error"},h.error),!h.loading&&!h.error&&l().createElement("div",{className:n.tableWrapper},l().createElement("table",{className:n.table},l().createElement("thead",null,l().createElement("tr",null,l().createElement("th",null,"Time"),l().createElement("th",null,"Event"),l().createElement("th",null,"Card"),l().createElement("th",null,"Direction"),l().createElement("th",null,"Dwell (ms)"),l().createElement("th",null,"Device"))),l().createElement("tbody",null,(null!==(a=h.data)&&void 0!==a?a:[]).map((e,t)=>l().createElement("tr",{key:t},l().createElement("td",{className:n.mono},e.time),l().createElement("td",null,l().createElement(m,{type:e.event_type})),l().createElement("td",null,e.card),l().createElement("td",null,e.direction),l().createElement("td",null,e.dwell_time_ms),l().createElement("td",null,e.device_type))),0===(null!==(r=h.data)&&void 0!==r?r:[]).length&&l().createElement("tr",null,l().createElement("td",{colSpan:6,className:n.empty},"No events today yet.")))))))},g=e=>({root:n.css`padding: ${e.spacing(2,0)};`,statRow:n.css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${e.spacing(2)};
    margin-bottom: ${e.spacing(3)};
  `,statCard:n.css`
    background: ${e.colors.background.secondary};
    border: 1px solid ${e.colors.border.weak};
    border-radius: ${e.shape.radius.default};
    padding: ${e.spacing(2,2.5)};
  `,statValue:n.css`
    font-size: 2.2rem;
    font-weight: ${e.typography.fontWeightBold};
    line-height: 1.1;
  `,statUnit:n.css`
    font-size: 1rem;
    margin-left: 2px;
    opacity: 0.7;
  `,statLabel:n.css`
    font-size: ${e.typography.bodySmall.fontSize};
    color: ${e.colors.text.secondary};
    margin-top: ${e.spacing(.5)};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,sparkContainer:n.css`
    margin-top: ${e.spacing(1)};
  `,heroCard:n.css`
    background: linear-gradient(135deg, ${e.colors.background.secondary}, ${e.colors.background.canvas});
    border: 2px solid ${e.colors.primary.border};
    border-radius: ${e.shape.radius.default};
    padding: ${e.spacing(3)};
    margin-bottom: ${e.spacing(3)};
  `,heroLabel:n.css`
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${e.colors.primary.text};
    margin-bottom: ${e.spacing(.5)};
  `,heroTitle:n.css`
    font-size: ${e.typography.h2.fontSize};
    font-weight: ${e.typography.fontWeightBold};
    color: ${e.colors.text.primary};
    margin-bottom: ${e.spacing(1.5)};
  `,heroStats:n.css`
    display: flex;
    flex-wrap: wrap;
    gap: ${e.spacing(1,3)};
    font-size: ${e.typography.body.fontSize};
    color: ${e.colors.text.secondary};
  `,subheading:n.css`
    font-size: ${e.typography.h5.fontSize};
    font-weight: ${e.typography.fontWeightMedium};
    margin: ${e.spacing(1,0,1.5)};
  `,tableWrapper:n.css`overflow-x: auto;`,table:n.css`
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
  `,eventBadge:n.css`
    color: #fff;
    border-radius: 3px;
    padding: ${e.spacing(.25,.75)};
    font-size: 11px;
    font-family: ${e.typography.fontFamilyMonospace};
    white-space: nowrap;
  `,mono:n.css`font-family: ${e.typography.fontFamilyMonospace}; font-size: 12px;`,empty:n.css`
    text-align: center;
    color: ${e.colors.text.disabled};
    padding: ${e.spacing(3)} !important;
  `})}}]);
//# sourceMappingURL=466.js.map?_cache=d00d4c8cf3de1769aec7