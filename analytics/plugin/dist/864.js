"use strict";(self.webpackChunkgettem_analytics_app=self.webpackChunkgettem_analytics_app||[]).push([[864],{567(e,t,r){r.d(t,{N:()=>c});var n=r(959),a=r(531),l=r(508);function o(e,t,r,n,a,l,o){try{var c=e[l](o),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,a)}function c(e){const{intervalMs:t}=(0,l.w)(),[r,c]=(0,n.useState)(null),[s,i]=(0,n.useState)(!0),[d,m]=(0,n.useState)(null),u=(0,n.useRef)(0),g=(0,n.useCallback)(()=>{return(t=function*(){0===u.current&&i(!0),m(null);const t=++u.current;try{const r=yield(0,a.getBackendSrv)().get(`/api/plugins/gettem-analytics-app/resources/${e}`);if(t!==u.current)return;c(r)}catch(e){t===u.current&&m(e instanceof Error?e.message:String(e))}finally{t===u.current&&i(!1)}},function(){var e=this,r=arguments;return new Promise(function(n,a){var l=t.apply(e,r);function c(e){o(l,n,a,c,s,"next",e)}function s(e){o(l,n,a,c,s,"throw",e)}c(void 0)})})();var t},[e]);return(0,n.useEffect)(()=>{if(g(),t>0){const e=setInterval(g,t);return()=>clearInterval(e)}},[g,t]),{data:r,loading:s,error:d,refetch:g}}},864(e,t,r){r.r(t),r.d(t,{default:()=>m});var n=r(959),a=r.n(n),l=r(89),o=r(531),c=r(7),s=r(567);function i({left:e,right:t}){const r=(0,c.useTheme2)(),n=e+t;if(0===n)return a().createElement("span",{style:{color:r.colors.text.disabled}},"No swipes");const l=t/n*100,o=100-l;return a().createElement("div",{style:{display:"flex",alignItems:"center",gap:8,minWidth:200}},a().createElement("span",{style:{fontSize:11,color:r.colors.error.text,width:28,textAlign:"right"}},e),a().createElement("div",{style:{flex:1,height:14,borderRadius:7,display:"flex",overflow:"hidden",background:r.colors.background.canvas}},a().createElement("div",{style:{width:`${o}%`,background:r.colors.error.main,transition:"width 0.3s"}}),a().createElement("div",{style:{width:`${l}%`,background:r.colors.success.main,transition:"width 0.3s"}})),a().createElement("span",{style:{fontSize:11,color:r.colors.success.text,width:28}},t))}function d({value:e,max:t}){const r=(0,c.useTheme2)(),n=t>0?e/t*100:0;return a().createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},a().createElement("span",{style:{fontSize:12,fontWeight:600,minWidth:40}},e.toLocaleString()),a().createElement("div",{style:{flex:1,height:8,borderRadius:4,overflow:"hidden",minWidth:80,background:r.colors.background.canvas}},a().createElement("div",{style:{width:`${n}%`,height:"100%",borderRadius:4,background:`linear-gradient(90deg, ${r.colors.primary.main}, ${r.colors.primary.shade})`,transition:"width 0.3s"}})))}const m=function(){const e=(0,c.useStyles2)(u),t=(0,c.useTheme2)(),{data:r,loading:n,error:l}=(0,s.N)("cards"),m=null!=r?r:[],g=Math.max(...m.map(e=>e.engagement),1);return a().createElement(o.PluginPage,null,a().createElement("div",{className:e.root},a().createElement("h2",{className:e.heading},"Card leaderboard ",a().createElement("span",{className:e.period},"— last 30 days, ranked by engagement")),n&&a().createElement(c.LoadingBar,{width:300}),l&&a().createElement(c.Alert,{title:"Query error",severity:"error"},l),!n&&!l&&a().createElement("div",{className:e.tableWrapper},a().createElement("table",{className:e.table},a().createElement("thead",null,a().createElement("tr",null,a().createElement("th",null,"#"),a().createElement("th",null,"Card"),a().createElement("th",null,"Swipe ratio (left / right)"),a().createElement("th",null,"Right %"),a().createElement("th",null,"Engagement score"),a().createElement("th",null,"Impressions"),a().createElement("th",null,"Detail opens"),a().createElement("th",null,"Avg dwell"),a().createElement("th",null,"Sessions"))),a().createElement("tbody",null,m.map((r,n)=>{var l,o,c,s;return a().createElement("tr",{key:r.card_id},a().createElement("td",{className:e.rank},0===n?"1":n+1),a().createElement("td",null,a().createElement("div",null,r.card_name),r.card_category&&a().createElement("span",{className:e.category},r.card_category.replace("_"," "))),a().createElement("td",null,a().createElement(i,{left:r.swipe_left,right:r.swipe_right})),a().createElement("td",null,a().createElement("span",{style:{color:r.right_pct>=60?t.colors.success.text:r.right_pct<=30?t.colors.error.text:t.colors.text.primary,fontWeight:600}},r.right_pct,"%")),a().createElement("td",null,a().createElement(d,{value:r.engagement,max:g})),a().createElement("td",null,null===(l=r.impressions)||void 0===l?void 0:l.toLocaleString()),a().createElement("td",null,null===(o=r.detail_opens)||void 0===o?void 0:o.toLocaleString()),a().createElement("td",null,null===(c=r.avg_dwell_ms)||void 0===c?void 0:c.toLocaleString(),"ms"),a().createElement("td",null,null===(s=r.sessions)||void 0===s?void 0:s.toLocaleString()))}),0===m.length&&a().createElement("tr",null,a().createElement("td",{colSpan:9,className:e.empty},"No summary data yet — the operator runs nightly.")))))))},u=e=>({root:l.css`padding: ${e.spacing(2,0)};`,heading:l.css`
    font-size: ${e.typography.h3.fontSize};
    font-weight: ${e.typography.fontWeightMedium};
    margin-bottom: ${e.spacing(2)};
  `,period:l.css`
    font-size: ${e.typography.body.fontSize};
    font-weight: normal;
    color: ${e.colors.text.secondary};
  `,tableWrapper:l.css`overflow-x: auto;`,table:l.css`
    width: 100%;
    border-collapse: collapse;
    font-size: ${e.typography.bodySmall.fontSize};
    th, td {
      text-align: left;
      padding: ${e.spacing(1,1.5)};
      border-bottom: 1px solid ${e.colors.border.weak};
    }
    th {
      color: ${e.colors.text.secondary};
      font-weight: ${e.typography.fontWeightMedium};
      white-space: nowrap;
    }
    tr:hover td { background: ${e.colors.background.secondary}; }
  `,rank:l.css`
    color: ${e.colors.text.disabled};
    width: 32px;
    font-size: 14px;
    font-weight: ${e.typography.fontWeightBold};
  `,category:l.css`
    font-size: 11px;
    color: ${e.colors.text.secondary};
    text-transform: capitalize;
  `,empty:l.css`
    text-align: center;
    color: ${e.colors.text.disabled};
    padding: ${e.spacing(3)} !important;
  `})}}]);
//# sourceMappingURL=864.js.map?_cache=644a71bd9f6958994649