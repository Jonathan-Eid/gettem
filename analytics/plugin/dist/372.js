"use strict";(self.webpackChunkgettem_analytics_app=self.webpackChunkgettem_analytics_app||[]).push([[372],{567(e,t,a){a.d(t,{N:()=>o});var l=a(959),n=a(531),r=a(508);function s(e,t,a,l,n,r,s){try{var o=e[r](s),c=o.value}catch(e){return void a(e)}o.done?t(c):Promise.resolve(c).then(l,n)}function o(e){const{intervalMs:t}=(0,r.w)(),[a,o]=(0,l.useState)(null),[c,i]=(0,l.useState)(!0),[d,m]=(0,l.useState)(null),u=(0,l.useRef)(0),p=(0,l.useCallback)(()=>{return(t=function*(){0===u.current&&i(!0),m(null);const t=++u.current;try{const a=yield(0,n.getBackendSrv)().get(`/api/plugins/gettem-analytics-app/resources/${e}`);if(t!==u.current)return;o(a)}catch(e){t===u.current&&m(e instanceof Error?e.message:String(e))}finally{t===u.current&&i(!1)}},function(){var e=this,a=arguments;return new Promise(function(l,n){var r=t.apply(e,a);function o(e){s(r,l,n,o,c,"next",e)}function c(e){s(r,l,n,o,c,"throw",e)}o(void 0)})})();var t},[e]);return(0,l.useEffect)(()=>{if(p(),t>0){const e=setInterval(p,t);return()=>clearInterval(e)}},[p,t]),{data:a,loading:c,error:d,refetch:p}}},372(e,t,a){a.r(t),a.d(t,{default:()=>m});var l=a(959),n=a.n(l),r=a(89),s=a(531),o=a(7),c=a(567);function i({value:e,max:t,color:a}){const l=(0,o.useTheme2)(),r=t>0?e/t*100:0;return n().createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},n().createElement("span",{style:{fontSize:12,fontWeight:600,minWidth:40}},"number"==typeof e&&e%1!=0?e.toFixed(1):e),n().createElement("div",{style:{flex:1,height:8,borderRadius:4,overflow:"hidden",minWidth:60,background:l.colors.background.canvas}},n().createElement("div",{style:{width:`${r}%`,height:"100%",borderRadius:4,background:null!=a?a:l.colors.primary.main,transition:"width 0.3s"}})))}function d({title:e,data:t,showPct:a}){const l=(0,o.useStyles2)(u),r=Math.max(...t.map(e=>e.sessions),1);return n().createElement("div",{className:l.card},n().createElement("h4",{className:l.cardTitle},e),n().createElement("table",{className:l.miniTable},n().createElement("tbody",null,t.map(e=>n().createElement("tr",{key:e.label},n().createElement("td",{className:l.audienceLabel},e.label),n().createElement("td",{style:{width:"60%"}},n().createElement(i,{value:e.sessions,max:r})),a&&n().createElement("td",{className:l.pctCell},e.pct,"%"))),0===t.length&&n().createElement("tr",null,n().createElement("td",{colSpan:a?3:2,className:l.empty},"No data yet.")))))}const m=function(){var e,t,a,l,r,m,p,g,h,E,y,f,v;const b=(0,o.useStyles2)(u),$=(0,o.useTheme2)(),N=(0,c.N)("sessions"),x=(0,c.N)("visitors"),w=(0,c.N)("audience"),_=null!==(e=N.data)&&void 0!==e?e:[],k=null!==(t=null===(g=x.data)||void 0===g?void 0:g.top_visitors)&&void 0!==t?t:[],S=Math.max(..._.map(e=>e.duration_secs),1),z=Math.max(...k.map(e=>e.event_count),1),W=N.loading||x.loading||w.loading,L=N.error||x.error||w.error;return n().createElement(s.PluginPage,null,n().createElement("div",{className:b.root},W&&n().createElement(o.LoadingBar,{width:300}),L&&n().createElement(o.Alert,{title:"Query error",severity:"error"},L),!W&&!L&&n().createElement(n().Fragment,null,n().createElement("h2",{className:b.heading},"Unique visitors ",n().createElement("span",{className:b.period},"— last 30 days")),n().createElement("div",{className:b.statRow},n().createElement("div",{className:b.statCard},n().createElement("div",{className:b.statValue,style:{color:$.colors.primary.text}},null!==(a=null===(h=x.data)||void 0===h?void 0:h.unique_visitors)&&void 0!==a?a:0),n().createElement("div",{className:b.statLabel},"Unique visitors")),n().createElement("div",{className:b.statCard},n().createElement("div",{className:b.statValue,style:{color:$.colors.warning.text}},(null!==(l=null===(E=x.data)||void 0===E?void 0:E.return_rate_pct)&&void 0!==l?l:0).toFixed(1),"%"),n().createElement("div",{className:b.statLabel},"Return rate")),n().createElement("div",{className:b.statCard},n().createElement("div",{className:b.statValue},_.length),n().createElement("div",{className:b.statLabel},"Total sessions"))),n().createElement("h2",{className:b.heading},"Top visitors ",n().createElement("span",{className:b.period},"— by activity")),n().createElement("div",{className:b.tableWrapper},n().createElement("table",{className:b.table},n().createElement("thead",null,n().createElement("tr",null,n().createElement("th",null,"#"),n().createElement("th",null,"IP"),n().createElement("th",null,"Device / Screen"),n().createElement("th",null,"Sessions"),n().createElement("th",null,"Events"),n().createElement("th",null,"Swipes"),n().createElement("th",null,"Detail opens"),n().createElement("th",null,"Total time"),n().createElement("th",null,"First seen"),n().createElement("th",null,"Last seen"))),n().createElement("tbody",null,k.map((e,t)=>n().createElement("tr",{key:e.fingerprint},n().createElement("td",{className:b.rank},t+1),n().createElement("td",{className:b.mono},e.ip),n().createElement("td",null,e.device_type," / ",e.screen_resolution),n().createElement("td",null,n().createElement("span",{style:{fontWeight:600,color:e.session_count>1?$.colors.success.text:$.colors.text.primary}},e.session_count,e.session_count>1&&n().createElement("span",{style:{fontSize:10,marginLeft:4,opacity:.7}},"return"))),n().createElement("td",null,n().createElement(i,{value:e.event_count,max:z,color:"#5794f2"})),n().createElement("td",null,e.swipes),n().createElement("td",null,e.detail_opens),n().createElement("td",{className:b.mono},function(e){if(e<60)return`${Math.round(e)}s`;const t=Math.floor(e/60),a=Math.round(e%60);if(t>=60)return`${Math.floor(t/60)}h ${t%60}m`;return`${t}m ${a}s`}(e.total_duration_secs)),n().createElement("td",{className:b.mono},e.first_seen),n().createElement("td",{className:b.mono},e.last_seen))),0===k.length&&n().createElement("tr",null,n().createElement("td",{colSpan:10,className:b.empty},"No visitor data yet."))))),n().createElement("h2",{className:b.heading,style:{marginTop:32}},"Longest sessions"),n().createElement("div",{className:b.tableWrapper},n().createElement("table",{className:b.table},n().createElement("thead",null,n().createElement("tr",null,n().createElement("th",null,"#"),n().createElement("th",null,"Visitor"),n().createElement("th",null,"Duration"),n().createElement("th",null,"Started"),n().createElement("th",null,"Events"),n().createElement("th",null,"Swipes"),n().createElement("th",null,"Detail opens"),n().createElement("th",null,"Location"))),n().createElement("tbody",null,_.map((e,t)=>n().createElement("tr",{key:e.session_id},n().createElement("td",{className:b.rank},t+1),n().createElement("td",null,n().createElement("span",{className:b.mono,style:{fontSize:11}},e.ip),n().createElement("span",{style:{opacity:.5,margin:"0 4px"}},"/"),n().createElement("span",{style:{fontSize:11}},e.device_type," ","unknown"!==e.screen_resolution?e.screen_resolution:"")),n().createElement("td",{style:{minWidth:180}},n().createElement(i,{value:e.duration_secs,max:S,color:`linear-gradient(90deg, ${$.colors.primary.main}, #73bf69)`})),n().createElement("td",{className:b.mono},e.started),n().createElement("td",null,e.event_count),n().createElement("td",null,e.swipes),n().createElement("td",null,e.detail_opens),n().createElement("td",null,e.timezone))),0===_.length&&n().createElement("tr",null,n().createElement("td",{colSpan:8,className:b.empty},"No session data yet."))))),n().createElement("h2",{className:b.heading,style:{marginTop:32}},"Audience breakdown ",n().createElement("span",{className:b.period},"— last 30 days")),n().createElement("div",{className:b.grid},n().createElement(d,{title:"Device",data:null!==(r=null===(y=w.data)||void 0===y?void 0:y.devices)&&void 0!==r?r:[],showPct:!0}),n().createElement(d,{title:"Timezone",data:null!==(m=null===(f=w.data)||void 0===f?void 0:f.timezones)&&void 0!==m?m:[]}),n().createElement(d,{title:"Language",data:null!==(p=null===(v=w.data)||void 0===v?void 0:v.languages)&&void 0!==p?p:[]})))))},u=e=>({root:r.css`padding: ${e.spacing(2,0)};`,heading:r.css`
    font-size: ${e.typography.h3.fontSize};
    font-weight: ${e.typography.fontWeightMedium};
    margin-bottom: ${e.spacing(2)};
  `,period:r.css`
    font-size: ${e.typography.body.fontSize};
    font-weight: normal;
    color: ${e.colors.text.secondary};
  `,statRow:r.css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: ${e.spacing(2)};
    margin-bottom: ${e.spacing(3)};
  `,statCard:r.css`
    background: ${e.colors.background.secondary};
    border: 1px solid ${e.colors.border.weak};
    border-radius: ${e.shape.radius.default};
    padding: ${e.spacing(2,2.5)};
  `,statValue:r.css`
    font-size: 2rem;
    font-weight: ${e.typography.fontWeightBold};
    line-height: 1.1;
  `,statLabel:r.css`
    font-size: ${e.typography.bodySmall.fontSize};
    color: ${e.colors.text.secondary};
    margin-top: ${e.spacing(.5)};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,tableWrapper:r.css`overflow-x: auto;`,table:r.css`
    width: 100%;
    border-collapse: collapse;
    font-size: ${e.typography.bodySmall.fontSize};
    th, td {
      text-align: left;
      padding: ${e.spacing(1,1.5)};
      border-bottom: 1px solid ${e.colors.border.weak};
    }
    th { color: ${e.colors.text.secondary}; font-weight: ${e.typography.fontWeightMedium}; white-space: nowrap; }
    tr:hover td { background: ${e.colors.background.secondary}; }
  `,rank:r.css`
    color: ${e.colors.text.disabled};
    width: 32px;
    font-weight: ${e.typography.fontWeightBold};
  `,mono:r.css`font-family: ${e.typography.fontFamilyMonospace}; font-size: 12px;`,grid:r.css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${e.spacing(2)};
  `,card:r.css`
    background: ${e.colors.background.secondary};
    border: 1px solid ${e.colors.border.weak};
    border-radius: ${e.shape.radius.default};
    padding: ${e.spacing(2)};
  `,cardTitle:r.css`
    font-size: 11px;
    font-weight: ${e.typography.fontWeightMedium};
    margin: 0 0 ${e.spacing(1.5)};
    color: ${e.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,miniTable:r.css`
    width: 100%;
    border-collapse: collapse;
    font-size: ${e.typography.bodySmall.fontSize};
    td { padding: ${e.spacing(.5,.75)}; border-bottom: 1px solid ${e.colors.border.weak}; }
    tr:last-child td { border-bottom: none; }
  `,audienceLabel:r.css`
    white-space: nowrap;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  `,pctCell:r.css`
    text-align: right;
    font-size: 11px;
    color: ${e.colors.text.secondary};
    white-space: nowrap;
  `,empty:r.css`
    text-align: center;
    color: ${e.colors.text.disabled};
    padding: ${e.spacing(3)} !important;
  `})}}]);
//# sourceMappingURL=372.js.map?_cache=385620695c6eae0f3a4b