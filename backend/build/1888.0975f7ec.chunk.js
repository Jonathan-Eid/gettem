"use strict";(self.webpackChunkgettem=self.webpackChunkgettem||[]).push([[1888],{9164:(L,D,s)=>{s.d(D,{B:()=>U,D:()=>B,H:()=>y,R:()=>K});var t=s(19968),l=s(48936),d=s(63358),P=s(20596),O=s(48112),g=s(42816),m=s(28464),a=s(59232),o=s(14520),e=s(37776),E=s(14632),c=s(4400),C=s(1844),r=s(3704);const M=(0,r.default)(l.C)`
  svg path {
    fill: ${({theme:i})=>i.colors.neutral600};
  }
`,I=({name:i})=>(0,t.jsxs)(l.C,{background:"primary100",borderStyle:"dashed",borderColor:"primary600",borderWidth:"1px",gap:3,hasRadius:!0,padding:3,shadow:"tableShadow",width:(0,a.W8)(300),children:[(0,t.jsx)(M,{alignItems:"center",background:"neutral200",borderRadius:"50%",height:6,justifyContent:"center",width:6,children:(0,t.jsx)(o.c,{width:`${8/16}rem`})}),(0,t.jsx)(d.O,{fontWeight:"bold",children:i})]}),B=()=>(0,t.jsx)(c.P,{renderItem:i=>{if(i.type===C.D.STAGE)return(0,t.jsx)(I,{name:typeof i.item=="string"?i.item:null})}}),K=({children:i})=>(0,t.jsx)(P._,{children:(0,t.jsx)(O.G,{tabIndex:-1,children:(0,t.jsx)(g.S,{children:i})})}),U=({href:i})=>{const{formatMessage:T}=(0,E.c)();return(0,t.jsx)(a.cH,{startIcon:(0,t.jsx)(e.c,{}),to:i,children:T({id:"global.back",defaultMessage:"Back"})})},y=({title:i,subtitle:T,navigationAction:W,primaryAction:h})=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.K8,{name:i}),(0,t.jsx)(m.a,{navigationAction:W,primaryAction:h,title:i,subtitle:T})]})},21888:(L,D,s)=>{s.d(D,{ProtectedReviewWorkflowsPage:()=>Y});var t=s(19968),l=s(62552),d=s(48936),P=s(89296),O=s(42848),g=s(89616),m=s(20464),a=s(76512),o=s(9752),e=s(63358),E=s(35480),c=s(48744),C=s(23264),r=s(59232),M=s(48636),I=s(89940),B=s(71324),K=s(14632),U=s(49008),y=s(3704),i=s(4400),T=s(47752),W=s(9164),h=s(6484),H=s(1844),Q=s(46964),ls=s(54320),Es=s(5240),ds=s(91892),Ms=s(36196),Ds=s(20880),Ps=s(21424),Os=s(70516),gs=s(31812),ms=s(18424),cs=s(52540),fs=s(21968),vs=s(12132),Cs=s(48632),Ts=s(85676),hs=s(35184),Ls=s(99568),Ws=s(96556),Rs=s(13192),As=s(30840),Is=s(77784),Bs=s(79371),Ks=s(67888),Us=s(52600),ys=s(95752),js=s(37388),xs=s(61840),us=s(49108),ws=s(44632),ps=s(50840),Ss=s(20252),$s=s(86432),Fs=s(22612),Gs=s(24808),Ns=s(24024),zs=s(40960),Hs=s(33656),Qs=s(43280),ks=s(79804),Vs=s(19632),Ys=s(29576),Zs=s(61152),Js=s(9589),Xs=s(45488),bs=s(75516),qs=s(78744);const k=(0,y.default)(r.cH)`
  align-items: center;
  height: ${(0,r.W8)(32)};
  display: flex;
  justify-content: center;
  padding: ${({theme:n})=>`${n.spaces[2]}}`};
  width: ${(0,r.W8)(32)};

  svg {
    height: ${(0,r.W8)(12)};
    width: ${(0,r.W8)(12)};

    path {
      fill: ${({theme:n})=>n.colors.neutral500};
    }
  }

  &:hover,
  &:focus {
    svg {
      path {
        fill: ${({theme:n})=>n.colors.neutral800};
      }
    }
  }
`,V=()=>{const{formatMessage:n}=(0,K.c)(),{push:R}=(0,U.Uz)(),{trackUsage:p}=(0,r.m4)(),[j,x]=l.useState(null),[Z,A]=l.useState(!1),{collectionTypes:J,singleTypes:X,isLoading:b}=(0,T.u)(),{meta:f,workflows:S,isLoading:u,deleteWorkflow:q}=(0,Q.u)(),[ss,$]=l.useState(!1),{_unstableFormatAPIError:ts}=(0,r.An)(),w=(0,r.eo)(),{getFeature:es,isLoading:F}=(0,i.m)(),os=(0,i.j)(_=>_.admin_app.permissions.settings?.["review-workflows"]),{allowedActions:{canCreate:G,canDelete:ns}}=(0,r.aU)(os),v=es("review-workflows")?.[H.C],_s=_=>[...J,...X].find(z=>z.uid===_)?.info.displayName,as=_=>{x(_)},rs=()=>{x(null)},is=async()=>{if(j)try{$(!0);const _=await q({id:j});if("error"in _){w({type:"warning",message:ts(_.error)});return}x(null),w({type:"success",message:{id:"notification.success.deleted",defaultMessage:"Deleted"}})}catch{w({type:"warning",message:{id:"notification.error.unexpected",defaultMessage:"An error occurred"}})}finally{$(!1)}};return l.useEffect(()=>{!u&&!F&&v&&f&&f?.workflowCount>parseInt(v,10)&&A(!0)},[F,u,f,f?.workflowCount,v]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(W.H,{primaryAction:G&&(0,t.jsx)(r.EZ,{startIcon:(0,t.jsx)(M.c,{}),size:"S",to:"/settings/review-workflows/create",onClick:_=>{v&&f&&f?.workflowCount>=parseInt(v,10)?(_.preventDefault(),A(!0)):p("willCreateWorkflow")},children:n({id:"Settings.review-workflows.list.page.create",defaultMessage:"Create new workflow"})}),subtitle:n({id:"Settings.review-workflows.list.page.subtitle",defaultMessage:"Manage your content review process"}),title:n({id:"Settings.review-workflows.list.page.title",defaultMessage:"Review Workflows"})}),(0,t.jsxs)(W.R,{children:[u||b?(0,t.jsx)(d.C,{justifyContent:"center",children:(0,t.jsx)(P.c,{children:n({id:"Settings.review-workflows.page.list.isLoading",defaultMessage:"Workflows are loading"})})}):(0,t.jsxs)(O.o,{colCount:3,footer:G&&(0,t.jsx)(g.U,{icon:(0,t.jsx)(M.c,{}),onClick:()=>{v&&f&&f?.workflowCount>=parseInt(v,10)?A(!0):(R("/settings/review-workflows/create"),p("willCreateWorkflow"))},children:n({id:"Settings.review-workflows.list.page.create",defaultMessage:"Create new workflow"})}),rowCount:1,children:[(0,t.jsx)(m.o,{children:(0,t.jsxs)(a.Tr,{children:[(0,t.jsx)(o.Th,{children:(0,t.jsx)(e.O,{variant:"sigma",children:n({id:"Settings.review-workflows.list.page.list.column.name.title",defaultMessage:"Name"})})}),(0,t.jsx)(o.Th,{children:(0,t.jsx)(e.O,{variant:"sigma",children:n({id:"Settings.review-workflows.list.page.list.column.stages.title",defaultMessage:"Stages"})})}),(0,t.jsx)(o.Th,{children:(0,t.jsx)(e.O,{variant:"sigma",children:n({id:"Settings.review-workflows.list.page.list.column.contentTypes.title",defaultMessage:"Content Types"})})}),(0,t.jsx)(o.Th,{children:(0,t.jsx)(E.K,{children:n({id:"Settings.review-workflows.list.page.list.column.actions.title",defaultMessage:"Actions"})})})]})}),(0,t.jsx)(c.K,{children:S?.map(_=>(0,l.createElement)(a.Tr,{...(0,r.on)({fn(N){N.target.nodeName!=="BUTTON"&&R(`/settings/review-workflows/${_.id}`)}}),key:`workflow-${_.id}`},(0,t.jsx)(o.Td,{width:(0,r.W8)(250),children:(0,t.jsx)(e.O,{textColor:"neutral800",fontWeight:"bold",ellipsis:!0,children:_.name})}),(0,t.jsx)(o.Td,{children:(0,t.jsx)(e.O,{textColor:"neutral800",children:_.stages.length})}),(0,t.jsx)(o.Td,{children:(0,t.jsx)(e.O,{textColor:"neutral800",children:(_?.contentTypes??[]).map(_s).join(", ")})}),(0,t.jsx)(o.Td,{children:(0,t.jsxs)(d.C,{alignItems:"center",justifyContent:"end",children:[(0,t.jsx)(k,{to:`/settings/review-workflows/${_.id}`,"aria-label":n({id:"Settings.review-workflows.list.page.list.column.actions.edit.label",defaultMessage:"Edit {name}"},{name:_.name}),children:(0,t.jsx)(I.c,{})}),S.length>1&&ns&&(0,t.jsx)(C.w,{"aria-label":n({id:"Settings.review-workflows.list.page.list.column.actions.delete.label",defaultMessage:"Delete {name}"},{name:"Default workflow"}),icon:(0,t.jsx)(B.c,{}),noBorder:!0,onClick:()=>{as(String(_.id))}})]})})))})]}),(0,t.jsx)(r.cz,{bodyText:{id:"Settings.review-workflows.list.page.delete.confirm.body",defaultMessage:"If you remove this worfklow, all stage-related information will be removed for this content-type. Are you sure you want to remove it?"},isConfirmButtonLoading:ss,isOpen:!!j,onToggleDialog:rs,onConfirm:is}),(0,t.jsxs)(h.L.Root,{isOpen:Z,onClose:()=>A(!1),children:[(0,t.jsx)(h.L.Title,{children:n({id:"Settings.review-workflows.list.page.workflows.limit.title",defaultMessage:"You\u2019ve reached the limit of workflows in your plan"})}),(0,t.jsx)(h.L.Body,{children:n({id:"Settings.review-workflows.list.page.workflows.limit.body",defaultMessage:"Delete a workflow or contact Sales to enable more workflows."})})]})]})]})},Y=()=>{const n=(0,i.j)(R=>R.admin_app.permissions.settings?.["review-workflows"]?.main);return(0,t.jsx)(r.rF,{permissions:n,children:(0,t.jsx)(V,{})})}},47752:(L,D,s)=>{s.d(D,{u:()=>m});var t=s(62552),l=s(59232),d=s(4400);const P=d.n.injectEndpoints({endpoints:a=>({getComponents:a.query({query:()=>({url:"/content-manager/components",method:"GET"}),transformResponse:o=>o.data}),getContentTypes:a.query({query:()=>({url:"/content-manager/content-types",method:"GET"}),transformResponse:o=>o.data})}),overrideExisting:!1}),{useGetComponentsQuery:O,useGetContentTypesQuery:g}=P;function m(){const{_unstableFormatAPIError:a}=(0,l.An)(),o=(0,l.eo)(),e=O(),E=g();t.useEffect(()=>{E.error&&o({type:"warning",message:a(E.error)})},[E.error,a,o]),t.useEffect(()=>{e.error&&o({type:"warning",message:a(e.error)})},[e.error,a,o]);const c=e.isLoading||E.isLoading,C=t.useMemo(()=>(E?.data??[]).filter(M=>M.kind==="collectionType"&&M.isDisplayed),[E?.data]),r=t.useMemo(()=>(E?.data??[]).filter(M=>M.kind!=="collectionType"&&M.isDisplayed),[E?.data]);return{isLoading:c,components:t.useMemo(()=>e?.data??[],[e?.data]),collectionTypes:C,singleTypes:r}}},46964:(L,D,s)=>{s.d(D,{u:()=>l});var t=s(78744);function l(d={}){const{id:P="",...O}=d,{data:g,isLoading:m}=(0,t.c)({id:P,populate:"stages",...O}),[a]=(0,t.d)(),[o]=(0,t.e)(),[e]=(0,t.f)(),{workflows:E,meta:c}=g??{};return{meta:c,workflows:E,isLoading:m,createWorkflow:a,updateWorkflow:o,deleteWorkflow:e}}},89616:(L,D,s)=>{s.d(D,{U:()=>o});var t=s(19968),l=s(3704),d=s(5e3),P=s(6912),O=s(48936),g=s(63358);const m=(0,l.default)(d.k)`
  height: ${24/16}rem;
  width: ${24/16}rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: ${10/16}rem;
    width: ${10/16}rem;
  }

  svg path {
    fill: ${({theme:e})=>e.colors.primary600};
  }
`,a=(0,l.default)(d.k)`
  border-radius: 0 0 ${({theme:e})=>e.borderRadius} ${({theme:e})=>e.borderRadius};
  display: block;
  width: 100%;
  border: none;
`,o=({children:e,icon:E,...c})=>(0,t.jsxs)("div",{children:[(0,t.jsx)(P.c,{}),(0,t.jsx)(a,{as:"button",background:"primary100",padding:5,...c,children:(0,t.jsxs)(O.C,{children:[(0,t.jsx)(m,{"aria-hidden":!0,background:"primary200",children:E}),(0,t.jsx)(d.k,{paddingLeft:3,children:(0,t.jsx)(g.O,{variant:"pi",fontWeight:"bold",textColor:"primary600",children:e})})]})})]})}}]);
