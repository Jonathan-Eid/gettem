"use strict";(self.webpackChunkgettem_analytics_app=self.webpackChunkgettem_analytics_app||[]).push([[820],{567(e,t,a){a.d(t,{N:()=>o});var n=a(959),r=a(531),l=a(508);function s(e,t,a,n,r,l,s){try{var o=e[l](s),i=o.value}catch(e){return void a(e)}o.done?t(i):Promise.resolve(i).then(n,r)}function o(e){const{intervalMs:t}=(0,l.w)(),[a,o]=(0,n.useState)(null),[i,c]=(0,n.useState)(!0),[d,m]=(0,n.useState)(null),p=(0,n.useRef)(0),g=(0,n.useCallback)(()=>{return(t=function*(){0===p.current&&c(!0),m(null);const t=++p.current;try{const a=yield(0,r.getBackendSrv)().get(`/api/plugins/gettem-analytics-app/resources/${e}`);if(t!==p.current)return;o(a)}catch(e){t===p.current&&m(e instanceof Error?e.message:String(e))}finally{t===p.current&&c(!1)}},function(){var e=this,a=arguments;return new Promise(function(n,r){var l=t.apply(e,a);function o(e){s(l,n,r,o,i,"next",e)}function i(e){s(l,n,r,o,i,"throw",e)}o(void 0)})})();var t},[e]);return(0,n.useEffect)(()=>{if(g(),t>0){const e=setInterval(g,t);return()=>clearInterval(e)}},[g,t]),{data:a,loading:i,error:d,refetch:g}}},820(e,t,a){a.r(t),a.d(t,{default:()=>m});var n=a(959),r=a.n(n),l=a(89),s=a(531),o=a(7),i=a(567);const c={gallery:"Gallery",resume:"Resume",github:"Github",swipe:"Swipe"};function d({value:e,max:t,color:a}){const n=(0,o.useTheme2)(),l=t>0?e/t*100:0;return r().createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},r().createElement("span",{style:{fontSize:12,fontWeight:600,minWidth:32}},e),r().createElement("div",{style:{flex:1,height:8,borderRadius:4,overflow:"hidden",minWidth:80,background:n.colors.background.canvas}},r().createElement("div",{style:{width:`${l}%`,height:"100%",borderRadius:4,background:null!=a?a:n.colors.primary.main,transition:"width 0.3s"}})))}const m=function(){var e,t;const a=(0,o.useStyles2)(p),n=(0,o.useTheme2)(),{data:l,loading:m,error:g}=(0,i.N)("pages"),u=null!==(e=null==l?void 0:l.page_views)&&void 0!==e?e:[],h=null!==(t=null==l?void 0:l.link_clicks)&&void 0!==t?t:[],y=Math.max(...u.map(e=>e.views),1),f=Math.max(...h.map(e=>e.clicks),1);return r().createElement(s.PluginPage,null,r().createElement("div",{className:a.root},m&&r().createElement(o.LoadingBar,{width:300}),g&&r().createElement(o.Alert,{title:"Query error",severity:"error"},g),!m&&!g&&r().createElement(r().Fragment,null,r().createElement("h2",{className:a.heading},"Page views ",r().createElement("span",{className:a.period},"— last 30 days")),0===u.length?r().createElement("div",{className:a.empty},"No page view data yet. Navigate around the gettem site to generate events."):r().createElement("div",{className:a.cardGrid},u.map(e=>{var t;return r().createElement("div",{key:e.page_name,className:a.pageCard},r().createElement("div",{className:a.pageCardHeader},r().createElement("span",{className:a.pageName},null!==(t=c[e.page_name])&&void 0!==t?t:e.page_name),r().createElement("span",{className:a.pageViews,style:{color:n.colors.primary.text}},e.views," ",r().createElement("span",{className:a.viewsLabel},"views"))),r().createElement("div",{className:a.pageStats},r().createElement("div",null,r().createElement("strong",null,e.unique_visitors),r().createElement("span",null," unique visitors")),r().createElement("div",null,r().createElement("strong",null,e.avg_dwell_secs,"s"),r().createElement("span",null," avg dwell time"))),r().createElement(d,{value:e.views,max:y,color:"#5794f2"}))})),r().createElement("h2",{className:a.heading,style:{marginTop:32}},"Link clicks ",r().createElement("span",{className:a.period},"— last 30 days")),0===h.length?r().createElement("div",{className:a.empty},"No link click data yet. Click some links on the Github page to generate events."):r().createElement("div",{className:a.tableWrapper},r().createElement("table",{className:a.table},r().createElement("thead",null,r().createElement("tr",null,r().createElement("th",null,"#"),r().createElement("th",null,"Link"),r().createElement("th",null,"Clicks"))),r().createElement("tbody",null,h.map((e,t)=>r().createElement("tr",{key:e.label},r().createElement("td",{className:a.rank},t+1),r().createElement("td",null,r().createElement("code",{className:a.linkLabel},e.label)),r().createElement("td",{style:{width:"50%"}},r().createElement(d,{value:e.clicks,max:f,color:"#73bf69"}))))))))))},p=e=>({root:l.css`padding: ${e.spacing(2,0)};`,heading:l.css`
    font-size: ${e.typography.h3.fontSize};
    font-weight: ${e.typography.fontWeightMedium};
    margin-bottom: ${e.spacing(2)};
  `,period:l.css`
    font-size: ${e.typography.body.fontSize};
    font-weight: normal;
    color: ${e.colors.text.secondary};
  `,cardGrid:l.css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: ${e.spacing(2)};
  `,pageCard:l.css`
    background: ${e.colors.background.secondary};
    border: 1px solid ${e.colors.border.weak};
    border-radius: ${e.shape.radius.default};
    padding: ${e.spacing(2)};
  `,pageCardHeader:l.css`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: ${e.spacing(1)};
  `,pageName:l.css`
    font-size: ${e.typography.h4.fontSize};
    font-weight: ${e.typography.fontWeightBold};
    text-transform: capitalize;
  `,pageViews:l.css`
    font-size: 1.5rem;
    font-weight: ${e.typography.fontWeightBold};
  `,viewsLabel:l.css`
    font-size: 0.75rem;
    opacity: 0.7;
  `,pageStats:l.css`
    display: flex;
    gap: ${e.spacing(3)};
    font-size: ${e.typography.bodySmall.fontSize};
    color: ${e.colors.text.secondary};
    margin-bottom: ${e.spacing(1.5)};
  `,tableWrapper:l.css`overflow-x: auto;`,table:l.css`
    width: 100%;
    border-collapse: collapse;
    font-size: ${e.typography.bodySmall.fontSize};
    th, td {
      text-align: left;
      padding: ${e.spacing(1,1.5)};
      border-bottom: 1px solid ${e.colors.border.weak};
    }
    th { color: ${e.colors.text.secondary}; font-weight: ${e.typography.fontWeightMedium}; }
    tr:hover td { background: ${e.colors.background.secondary}; }
  `,rank:l.css`
    color: ${e.colors.text.disabled};
    width: 32px;
    font-weight: ${e.typography.fontWeightBold};
  `,linkLabel:l.css`
    font-family: ${e.typography.fontFamilyMonospace};
    font-size: 12px;
    background: ${e.colors.background.secondary};
    padding: ${e.spacing(.25,.5)};
    border-radius: 3px;
  `,empty:l.css`
    text-align: center;
    color: ${e.colors.text.disabled};
    padding: ${e.spacing(4)};
    background: ${e.colors.background.secondary};
    border-radius: ${e.shape.radius.default};
  `})}}]);
//# sourceMappingURL=820.js.map?_cache=a96c20e33a90cf575730