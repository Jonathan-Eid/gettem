(self.webpackChunkgettem=self.webpackChunkgettem||[]).push([[2892,1536],{94456:g=>{function u(s,t,l,d){for(var r=l-1,P=s.length;++r<P;)if(d(s[r],t))return r;return-1}g.exports=u},97368:(g,u,s)=>{var t=s(12480),l=s(39024),d=s(94456),r=s(85968),P=s(4288),L=Array.prototype,h=L.splice;function v(i,p,A,Q){var X=Q?d:l,z=-1,H=p.length,E=i;for(i===p&&(p=P(p)),A&&(E=t(i,r(A)));++z<H;)for(var K=0,R=p[z],S=A?A(R):R;(K=X(E,S,K,Q))>-1;)E!==i&&h.call(E,K,1),h.call(i,K,1);return i}g.exports=v},92096:(g,u,s)=>{var t=s(12480),l=s(24020),d=s(22488),r=s(75516);function P(L,h){var v=r(L)?t:d;return v(L,l(h,3))}g.exports=P},39620:(g,u,s)=>{var t=s(41912),l=s(35140),d=t(l);g.exports=d},35140:(g,u,s)=>{var t=s(97368);function l(d,r){return d&&d.length&&r&&r.length?t(d,r):d}g.exports=l},96772:(g,u,s)=>{var t=s(35904);function l(d){var r=d==null?0:d.length;return r?t(d,1,r):[]}g.exports=l},42892:(g,u,s)=>{"use strict";s.d(u,{ProtectedCreateView:()=>cs});var t=s(19968),l=s(47616),d=s(70516),r=s(72704),P=s(1536),L=s(62552),h=s(38768),v=s(79904),i=s(19508),p=s(54320),A=s(5240),Q=s(91892),X=s(36196),z=s(20880),H=s(21424),E=s(31812),K=s(18424),R=s(52540),S=s(21968),N=s(12132),b=s(48632),k=s(85676),W=s(35184),os=s(99568),is=s(96556),ls=s(13192),_s=s(30840),ds=s(77784),Y=s(79371),rs=s(67888),G=s(52600),Es=s(95752),ss=s(37388),As=s(61840),Ts=s(49108),hs=s(44632),ms=s(50840),gs=s(20252),ps=s(86432),Cs=s(22612),Is=s(24808),vs=s(24024),us=s(40960),Ls=s(33656),Rs=s(43280),ys=s(79804),fs=s(19632),Us=s(29576),Bs=s(61152),xs=s(9589),Ks=s(45488),Ws=s(75516),js=s(71076),Ss=s(7496),Ns=s(92096),ks=s(96772),Gs=s(76683),Vs=s(39620);const cs=()=>{const Ps=(0,d.w1)(r.s);return(0,t.jsx)(l.rF,{permissions:Ps.settings?.["api-tokens"].create,children:(0,t.jsx)(P.M,{})})}},1536:(g,u,s)=>{"use strict";s.d(u,{M:()=>Ms,ProtectedEditView:()=>dt});var t=s(19968),l=s(62552),d=s(5e3),r=s(48936),P=s(63358),L=s(28724),h=s(70996),v=s(48112),i=s(28464),p=s(35676),A=s(42816),Q=s(42616),X=s(34404),z=s(12248),H=s(32568),E=s(47616),K=s(31812),R=s(14632),S=s(49008),N=s(19508),b=s(71076),k=s(49748),W=s(7496),os=s(43164),is=s(53305),ls=s(46596),_s=s(92096),ds=s(96772),Y=s(3704),rs=s(76683),G=s(52540),Es=s(29088),ss=s(39620),As=s(54320),Ts=s(5240),hs=s(91892),ms=s(36196),gs=s(20880),ps=s(21424),Cs=s(70516),Is=s(18424),vs=s(21968),us=s(12132),Ls=s(48632),Rs=s(85676),ys=s(35184),fs=s(99568),Us=s(96556),Bs=s(13192),xs=s(30840),Ks=s(77784),Ws=s(79371),js=s(67888),Ss=s(52600),Ns=s(95752),ks=s(37388),Gs=s(61840),Vs=s(49108),cs=s(44632),Ps=s(50840),Tt=s(20252),ht=s(86432),mt=s(22612),gt=s(24808),pt=s(24024),Ct=s(40960),It=s(33656),vt=s(43280),ut=s(79804),Lt=s(19632),Rt=s(29576),yt=s(61152),ft=s(9589),Ut=s(45488),Bt=s(75516);const $s=N.n.injectEndpoints({endpoints:n=>({getPermissions:n.query({query:()=>"/admin/content-api/permissions",transformResponse:e=>e.data}),getRoutes:n.query({query:()=>"/admin/content-api/routes",transformResponse:e=>e.data})}),overrideExisting:!1}),{useGetPermissionsQuery:Fs,useGetRoutesQuery:Qs}=$s,[zs,Hs]=(0,os.G)("ApiTokenPermissionsContext"),Ys=({children:n,...e})=>(0,t.jsx)(zs,{...e,children:n}),ts=()=>Hs("useApiTokenPermissions"),Js=({errors:n={},onChange:e,canEditInputs:a,isCreating:c,values:o={},apiToken:M={},onDispatch:_,setHasChangedPermissions:x})=>{const{formatMessage:m}=(0,R.c)(),B=({target:{value:y}})=>{x(!1),y==="full-access"&&_({type:"SELECT_ALL_ACTIONS"}),y==="read-only"&&_({type:"ON_CHANGE_READ_ONLY"})},J=[{value:"read-only",label:{id:"Settings.tokens.types.read-only",defaultMessage:"Read-only"}},{value:"full-access",label:{id:"Settings.tokens.types.full-access",defaultMessage:"Full access"}},{value:"custom",label:{id:"Settings.tokens.types.custom",defaultMessage:"Custom"}}];return(0,t.jsx)(d.k,{background:"neutral0",hasRadius:!0,shadow:"filterShadow",paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7,children:(0,t.jsxs)(r.C,{direction:"column",alignItems:"stretch",gap:4,children:[(0,t.jsx)(P.O,{variant:"delta",as:"h2",children:m({id:"global.details",defaultMessage:"Details"})}),(0,t.jsxs)(L.y,{gap:5,children:[(0,t.jsx)(h.C,{col:6,xs:12,children:(0,t.jsx)(W.T,{error:n.name,value:o.name,canEditInputs:a,onChange:e})},"name"),(0,t.jsx)(h.C,{col:6,xs:12,children:(0,t.jsx)(W.a,{error:n.description,value:o.description,canEditInputs:a,onChange:e})},"description"),(0,t.jsx)(h.C,{col:6,xs:12,children:(0,t.jsx)(W.L,{isCreating:c,error:n.lifespan,value:o.lifespan,onChange:e,token:M})},"lifespan"),(0,t.jsx)(h.C,{col:6,xs:12,children:(0,t.jsx)(W.b,{value:o.type,error:n.type,label:{id:"Settings.tokens.form.type",defaultMessage:"Token type"},onChange:y=>{B({target:{value:y}}),e({target:{name:"type",value:y}})},options:J,canEditInputs:a})},"type")]})]})})},Zs=({apiTokenName:n=null})=>{const{formatMessage:e}=(0,R.c)();return(0,E.G0)(),(0,t.jsxs)(v.G,{"aria-busy":"true",children:[(0,t.jsx)(E.K8,{name:"API Tokens"}),(0,t.jsx)(i.a,{primaryAction:(0,t.jsx)(p.Z,{disabled:!0,startIcon:(0,t.jsx)(is.c,{}),type:"button",size:"L",children:e({id:"global.save",defaultMessage:"Save"})}),title:n||e({id:"Settings.apiTokens.createPage.title",defaultMessage:"Create API Token"})}),(0,t.jsx)(A.S,{children:(0,t.jsx)(E.Wm,{})})]})},Xs=n=>{switch(n){case"POST":return{text:"success600",border:"success200",background:"success100"};case"GET":return{text:"secondary600",border:"secondary200",background:"secondary100"};case"PUT":return{text:"warning600",border:"warning200",background:"warning100"};case"DELETE":return{text:"danger600",border:"danger200",background:"danger100"};default:return{text:"neutral600",border:"neutral200",background:"neutral100"}}},bs=(0,Y.cp)(d.k)`
  margin: -1px;
  border-radius: ${({theme:n})=>n.spaces[1]} 0 0 ${({theme:n})=>n.spaces[1]};
`,ws=({route:n={handler:"Nocontroller.error",method:"GET",path:"/there-is-no-path"}})=>{const{formatMessage:e}=(0,R.c)(),{method:a,handler:c,path:o}=n,M=o?ds(o.split("/")):[],[_="",x=""]=c?c.split("."):[],m=Xs(n.method);return(0,t.jsxs)(r.C,{direction:"column",alignItems:"stretch",gap:2,children:[(0,t.jsxs)(P.O,{variant:"delta",as:"h3",children:[e({id:"Settings.apiTokens.createPage.BoundRoute.title",defaultMessage:"Bound route to"}),"\xA0",(0,t.jsx)("span",{children:_}),(0,t.jsxs)(P.O,{variant:"delta",textColor:"primary600",children:[".",x]})]}),(0,t.jsxs)(r.C,{hasRadius:!0,background:"neutral0",borderColor:"neutral200",gap:0,children:[(0,t.jsx)(bs,{background:m.background,borderColor:m.border,padding:2,children:(0,t.jsx)(P.O,{fontWeight:"bold",textColor:m.text,children:a})}),(0,t.jsx)(d.k,{paddingLeft:2,paddingRight:2,children:_s(M,B=>(0,t.jsxs)(P.O,{textColor:B.includes(":")?"neutral600":"neutral900",children:["/",B]},B))})]})]})},qs=()=>{const{value:{selectedAction:n,routes:e}}=ts(),{formatMessage:a}=(0,R.c)(),c=n?.split(".")[0];return(0,t.jsx)(h.C,{col:5,background:"neutral150",paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7,style:{minHeight:"100%"},children:n?(0,t.jsx)(r.C,{direction:"column",alignItems:"stretch",gap:2,children:c&&c in e&&e[c].map(o=>o.config.auth?.scope?.includes(n)||o.handler===n?(0,t.jsx)(ws,{route:o},o.handler):null)}):(0,t.jsxs)(r.C,{direction:"column",alignItems:"stretch",gap:2,children:[(0,t.jsx)(P.O,{variant:"delta",as:"h3",children:a({id:"Settings.apiTokens.createPage.permissions.header.title",defaultMessage:"Advanced settings"})}),(0,t.jsx)(P.O,{as:"p",textColor:"neutral600",children:a({id:"Settings.apiTokens.createPage.permissions.header.hint",defaultMessage:"Select the application's actions or the plugin's actions and click on the cog icon to display the bound route"})})]})})},Os=(0,Y.gV)`
  background: ${n=>n.theme.colors.primary100};
  svg {
    opacity: 1;
  }
`,st=(0,Y.cp)(d.k)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    opacity: 0;
    path {
      fill: ${n=>n.theme.colors.primary600};
    }
  }

  /* Show active style both on hover and when the action is selected */
  ${n=>n.isActive&&Os}
  &:hover {
    ${Os}
  }
`,tt=Y.cp.div`
  flex: 1;
  align-self: center;
  border-top: 1px solid ${({theme:n})=>n.colors.neutral150};
`,et=({controllers:n=[],label:e,orderNumber:a=0,disabled:c=!1,onExpanded:o=()=>null,indexExpandendCollapsedContent:M=null})=>{const{value:{onChangeSelectAll:_,onChange:x,selectedActions:m,setSelectedAction:B,selectedAction:J}}=ts(),[y,w]=l.useState(!1),{formatMessage:Z}=(0,R.c)(),C=()=>{w(T=>!T),o(a)};l.useEffect(()=>{M!==null&&M!==a&&y&&w(!1)},[M,a,y]);const Ds=T=>T===J;return(0,t.jsxs)(Q.G,{expanded:y,onToggle:C,variant:a%2?"primary":"secondary",children:[(0,t.jsx)(X.M,{title:rs(e)}),(0,t.jsx)(z.u,{children:n?.map(T=>{const f=T.actions.every(I=>m.includes(I.actionId)),U=T.actions.some(I=>m.includes(I.actionId));return(0,t.jsxs)(d.k,{children:[(0,t.jsxs)(r.C,{justifyContent:"space-between",alignItems:"center",padding:4,children:[(0,t.jsx)(d.k,{paddingRight:4,children:(0,t.jsx)(P.O,{variant:"sigma",textColor:"neutral600",children:T?.controller})}),(0,t.jsx)(tt,{}),(0,t.jsx)(d.k,{paddingLeft:4,children:(0,t.jsx)(H.y,{value:f,indeterminate:!f&&U,onValueChange:()=>{_({target:{value:[...T.actions]}})},disabled:c,children:Z({id:"app.utils.select-all",defaultMessage:"Select all"})})})]}),(0,t.jsx)(L.y,{gap:4,padding:4,children:T?.actions&&T?.actions.map(I=>(0,t.jsx)(h.C,{col:6,children:(0,t.jsxs)(st,{isActive:Ds(I.actionId),padding:2,hasRadius:!0,children:[(0,t.jsx)(H.y,{value:m.includes(I.actionId),name:I.actionId,onValueChange:()=>{x({target:{value:I.actionId}})},disabled:c,children:I.action}),(0,t.jsx)("button",{type:"button","data-testid":"action-cog",onClick:()=>B({target:{value:I.actionId}}),style:{display:"inline-flex",alignItems:"center"},children:(0,t.jsx)(ls.c,{})})]})},I.actionId))})]},`${e}.${T?.controller}`)})})]})},nt=({section:n=null,...e})=>{const[a,c]=l.useState(null),o=M=>c(M);return(0,t.jsx)(d.k,{padding:4,background:"neutral0",children:n&&n.map((M,_)=>(0,t.jsx)(et,{label:M.label,controllers:M.controllers,orderNumber:_,indexExpandendCollapsedContent:a,onExpanded:o,...e},M.apiId))})},at=({...n})=>{const{value:{data:e}}=ts(),{formatMessage:a}=(0,R.c)();return(0,t.jsxs)(L.y,{gap:0,shadow:"filterShadow",hasRadius:!0,background:"neutral0",children:[(0,t.jsxs)(h.C,{col:7,paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7,children:[(0,t.jsxs)(r.C,{direction:"column",alignItems:"stretch",gap:2,children:[(0,t.jsx)(P.O,{variant:"delta",as:"h2",children:a({id:"Settings.apiTokens.createPage.permissions.title",defaultMessage:"Permissions"})}),(0,t.jsx)(P.O,{as:"p",textColor:"neutral600",children:a({id:"Settings.apiTokens.createPage.permissions.description",defaultMessage:"Only actions bound by a route are listed below."})})]}),e?.permissions&&(0,t.jsx)(nt,{section:e?.permissions,...n})]}),(0,t.jsx)(qs,{})]})},ot=G.kt().shape({name:G.Qb().max(100).required(E.aO.required),type:G.Qb().oneOf(["read-only","full-access","custom"]).required(E.aO.required),description:G.Qb().nullable(),lifespan:G.CQ().integer().min(0).nullable().defined(E.aO.required)}),it=n=>{const e={allActionsIds:[],permissions:[]};return e.permissions=Object.entries(n).map(([a,c])=>({apiId:a,label:a.split("::")[1],controllers:Object.keys(c.controllers).map(o=>({controller:o,actions:o in c.controllers?c.controllers[o].map(M=>{const _=`${a}.${o}.${M}`;return a.includes("api::")&&e.allActionsIds.push(_),{action:M,actionId:_}}).flat():[]})).flat()})),e},lt={data:{allActionsIds:[],permissions:[]},routes:{},selectedAction:"",selectedActions:[]},_t=(n,e)=>(0,Es.cp)(n,a=>{switch(e.type){case"ON_CHANGE":{a.selectedActions.includes(e.value)?ss(a.selectedActions,e.value):a.selectedActions.push(e.value);break}case"SELECT_ALL_IN_PERMISSION":{e.value.every(o=>a.selectedActions.includes(o.actionId))?e.value.forEach(o=>{ss(a.selectedActions,o.actionId)}):e.value.forEach(o=>{a.selectedActions.push(o.actionId)});break}case"SELECT_ALL_ACTIONS":{a.selectedActions=[...a.data.allActionsIds];break}case"ON_CHANGE_READ_ONLY":{const c=a.data.allActionsIds.filter(o=>o.includes("find")||o.includes("findOne"));a.selectedActions=[...c];break}case"UPDATE_PERMISSIONS_LAYOUT":{a.data=it(e.value);break}case"UPDATE_ROUTES":{a.routes={...e.value};break}case"UPDATE_PERMISSIONS":{a.selectedActions=[...e.value];break}case"SET_SELECTED_ACTION":{a.selectedAction=e.value;break}default:return a}}),Ms=()=>{(0,E.G0)();const{formatMessage:n}=(0,R.c)(),e=(0,E.eo)(),{lockApp:a,unlockApp:c}=(0,E.H6)(),{state:o}=(0,S.IT)(),M=(0,N.j)(O=>O.admin_app.permissions),[_,x]=l.useState(o?.apiToken?.accessKey?{...o.apiToken}:null),{trackUsage:m}=(0,E.m4)(),{setCurrentStep:B}=(0,E.sg)(),{allowedActions:{canCreate:J,canUpdate:y,canRegenerate:w}}=(0,E.aU)(M.settings?.["api-tokens"]),[Z,C]=l.useReducer(_t,lt),T=(0,S.SU)("/settings/api-tokens/:id")?.params?.id,f=T==="create",{_unstableFormatAPIError:U,_unstableFormatValidationErrors:I}=(0,E.An)(),rt=(0,S.Uz)(),V=Fs(),$=Qs();l.useEffect(()=>{V.error&&e({type:"warning",message:U(V.error)})},[V.error,U,e]),l.useEffect(()=>{$.error&&e({type:"warning",message:U($.error)})},[$.error,U,e]),l.useEffect(()=>{V.data&&C({type:"UPDATE_PERMISSIONS_LAYOUT",value:V.data})},[V.data]),l.useEffect(()=>{$.data&&C({type:"UPDATE_ROUTES",value:$.data})},[$.data]),l.useEffect(()=>{_&&(_.type==="read-only"&&C({type:"ON_CHANGE_READ_ONLY"}),_.type==="full-access"&&C({type:"SELECT_ALL_ACTIONS"}),_.type==="custom"&&C({type:"UPDATE_PERMISSIONS",value:_?.permissions}))},[_]),l.useEffect(()=>{m(f?"didAddTokenFromList":"didEditTokenFromList",{tokenType:k.A})},[f,m]);const{data:j,error:es,isLoading:Et}=(0,b.b)(T,{skip:!T||f||!!_});l.useEffect(()=>{es&&e({type:"warning",message:U(es)})},[es,U,e]),l.useEffect(()=>{j&&(x(j),j.type==="read-only"&&C({type:"ON_CHANGE_READ_ONLY"}),j.type==="full-access"&&C({type:"SELECT_ALL_ACTIONS"}),j.type==="custom"&&C({type:"UPDATE_PERMISSIONS",value:j?.permissions}))},[j]);const[ct]=(0,b.c)(),[Pt]=(0,b.d)(),Ot=async(O,F)=>{m(f?"willCreateToken":"willEditToken",{tokenType:k.A}),a();try{if(f){const D=await ct({...O,lifespan:O.lifespan==="0"?parseInt(O.lifespan):null,permissions:O.type==="custom"?Z.selectedActions:null});if("error"in D){(0,N.x)(D.error)&&D.error.name==="ValidationError"?F.setErrors(I(D.error)):e({type:"warning",message:U(D.error)});return}e({type:"success",message:n({id:"notification.success.apitokencreated",defaultMessage:"API Token successfully created"})}),m("didCreateToken",{type:D.data.type,tokenType:k.A}),rt.replace(`/settings/api-tokens/${D.data.id}`,{apiToken:D.data}),B("apiTokens.success")}else{const D=await Pt({id:T,name:O.name,description:O.description,type:O.type,permissions:O.type==="custom"?Z.selectedActions:null});if("error"in D){(0,N.x)(D.error)&&D.error.name==="ValidationError"?F.setErrors(I(D.error)):e({type:"warning",message:U(D.error)});return}e({type:"success",message:n({id:"notification.success.apitokenedited",defaultMessage:"API Token successfully edited"})}),m("didEditToken",{type:D.data.type,tokenType:k.A})}}catch{e({type:"warning",message:{id:"notification.error",defaultMessage:"Something went wrong"}})}finally{c()}},[Mt,ns]=l.useState(!1),Dt={...Z,onChange:({target:{value:O}})=>{ns(!0),C({type:"ON_CHANGE",value:O})},onChangeSelectAll:({target:{value:O}})=>{ns(!0),C({type:"SELECT_ALL_IN_PERMISSION",value:O})},setSelectedAction:({target:{value:O}})=>{C({type:"SET_SELECTED_ACTION",value:O})}},as=y&&!f||J&&f;return Et?(0,t.jsx)(Zs,{apiTokenName:_?.name}):(0,t.jsx)(Ys,{value:Dt,children:(0,t.jsxs)(v.G,{children:[(0,t.jsx)(E.K8,{name:"API Tokens"}),(0,t.jsx)(K.QJ,{validationSchema:ot,validateOnChange:!1,initialValues:{name:_?.name||"",description:_?.description||"",type:_?.type,lifespan:_?.lifespan?_.lifespan.toString():_?.lifespan},enableReinitialize:!0,onSubmit:(O,F)=>Ot(O,F),children:({errors:O,handleChange:F,isSubmitting:D,values:q,setFieldValue:At})=>(Mt&&q?.type!=="custom"&&At("type","custom"),(0,t.jsxs)(E.QF,{children:[(0,t.jsx)(W.F,{backUrl:"/settings/api-tokens",title:{id:"Settings.apiTokens.createPage.title",defaultMessage:"Create API Token"},token:_,setToken:x,canEditInputs:as,canRegenerate:w,isSubmitting:D,regenerateUrl:"/admin/api-tokens/"}),(0,t.jsx)(A.S,{children:(0,t.jsxs)(r.C,{direction:"column",alignItems:"stretch",gap:6,children:[Boolean(_?.name)&&(0,t.jsx)(W.c,{token:_?.accessKey,tokenType:k.A}),(0,t.jsx)(Js,{errors:O,onChange:F,canEditInputs:as,isCreating:f,values:q,apiToken:_,onDispatch:C,setHasChangedPermissions:ns}),(0,t.jsx)(at,{disabled:!as||q?.type==="read-only"||q?.type==="full-access"})]})})]}))})]})})},dt=()=>{const n=(0,N.j)(e=>e.admin_app.permissions.settings?.["api-tokens"].read);return(0,t.jsx)(E.rF,{permissions:n,children:(0,t.jsx)(Ms,{})})}},71076:(g,u,s)=>{"use strict";s.d(u,{a:()=>L,b:()=>r,c:()=>P,d:()=>h,u:()=>d});var t=s(19508);const l=t.n.injectEndpoints({endpoints:v=>({getAPITokens:v.query({query:()=>"/admin/api-tokens",transformResponse:i=>i.data,providesTags:(i,p)=>[...i?.map(({id:A})=>({type:"ApiToken",id:A}))??[],{type:"ApiToken",id:"LIST"}]}),getAPIToken:v.query({query:i=>`/admin/api-tokens/${i}`,transformResponse:i=>i.data,providesTags:(i,p,A)=>[{type:"ApiToken",id:A}]}),createAPIToken:v.mutation({query:i=>({url:"/admin/api-tokens",method:"POST",data:i}),transformResponse:i=>i.data,invalidatesTags:[{type:"ApiToken",id:"LIST"}]}),deleteAPIToken:v.mutation({query:i=>({url:`/admin/api-tokens/${i}`,method:"DELETE"}),transformResponse:i=>i.data,invalidatesTags:(i,p,A)=>[{type:"ApiToken",id:A}]}),updateAPIToken:v.mutation({query:({id:i,...p})=>({url:`/admin/api-tokens/${i}`,method:"PUT",data:p}),transformResponse:i=>i.data,invalidatesTags:(i,p,{id:A})=>[{type:"ApiToken",id:A}]})}),overrideExisting:!1}),{useGetAPITokensQuery:d,useGetAPITokenQuery:r,useCreateAPITokenMutation:P,useDeleteAPITokenMutation:L,useUpdateAPITokenMutation:h}=l}}]);
