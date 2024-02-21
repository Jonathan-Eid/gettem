"use strict";(self.webpackChunkgettem=self.webpackChunkgettem||[]).push([[5888],{95888:(hs,X,s)=>{s.d(X,{ReviewWorkflowsEditPage:()=>is});var t=s(19968),r=s(62552),Z=s(35676),C=s(48936),$=s(89296),A=s(63358),M=s(47616),b=s(53305),T=s(31812),q=s(14632),l=s(70516),ss=s(49008),ts=s(58276),os=s(47752),e=s(33556),es=s(72704),x=s(19508),ns=s(78744),h=s(9164),E=s(6484),R=s(1844),as=s(46964),cs=s(85240),Ls=s(13192),Cs=s(35184),As=s(52540),Ts=s(38768),Rs=s(79904),Ws=s(85676),Is=s(96556),Bs=s(54320),Ks=s(5240),Us=s(91892),ws=s(36196),ys=s(20880),us=s(21424),js=s(18424),xs=s(21968),Ss=s(12132),ps=s(48632),Fs=s(99568),zs=s(30840),Vs=s(77784),Ys=s(79371),ks=s(67888),Ns=s(52600),Gs=s(95752),Qs=s(37388),Hs=s(61840),Js=s(49108),Xs=s(44632),Zs=s(50840),$s=s(20252),bs=s(86432),qs=s(22612),st=s(24808),tt=s(24024),ot=s(40960),et=s(33656),nt=s(43280),at=s(79804),it=s(19632),lt=s(29576),rt=s(61152),_t=s(9589),Et=s(45488),dt=s(75516);const is=()=>{const{workflowId:W}=(0,ss.W4)(),ls=(0,l.w1)(es.s),{formatMessage:n}=(0,q.c)(),_=(0,l.OY)(),{_unstableFormatAPIError:rs,_unstableFormatValidationErrors:_s}=(0,M.An)(),D=(0,M.eo)(),{isLoading:O,meta:P,workflows:g}=(0,as.u)(),{collectionTypes:S,singleTypes:p,isLoading:I}=(0,os.u)(),Es=(0,l.w1)(e.j),ds=(0,l.w1)(e.a),a=(0,l.w1)(e.b),F=(0,l.w1)(e.k),z=(0,l.w1)(e.c),v=(0,l.w1)(e.s),{allowedActions:{canDelete:Ms,canUpdate:B}}=(0,M.aU)(ls.settings?.["review-workflows"]),[c,L]=r.useState({}),{getFeature:Ds,isLoading:V}=(0,x.m)(),{isLoading:K,roles:Y}=(0,ts.u)(void 0),[k,d]=r.useState(null),[Os,N]=r.useState(),[Ps,G]=r.useState(!1),U=g?.find(o=>o.id===parseInt(W,10)),Q=g?.filter(o=>o.id!==parseInt(W,10)).flatMap(o=>o.contentTypes),w=Ds("review-workflows"),f=w?.[R.C],m=w?.[R.a],[gs]=(0,ns.e)(),H=async()=>{N(void 0),G(!0);try{const o=await gs({id:W,data:{...a,stages:a.stages?.map(i=>{let J=!0;const u=Es.workflow?.stages?.find(j=>j.id===i?.id);return u&&(J=u.permissions?.length!==i.permissions?.length||!u.permissions?.every(j=>!!i.permissions?.find(ms=>ms.role===j.role))),{...i,permissions:J?i.permissions:void 0}})}});if("error"in o){(0,x.x)(o.error)&&o.error.name==="ValidationError"&&N(_s(o.error)),D({type:"warning",message:rs(o.error)});return}D({type:"success",message:{id:"notification.success.saved",defaultMessage:"Saved"}})}catch{D({type:"warning",message:{id:"notification.error",defaultMessage:"An error occurred"}})}finally{G(!1)}L({})},vs=async()=>{await H()},fs=()=>{L({})},y=(0,T.KO)({enableReinitialize:!0,initialErrors:Os,initialValues:a,async onSubmit(){const o=a.contentTypes?.some(i=>Q?.includes(i));P&&f&&P?.workflowCount>parseInt(f,10)?d("workflow"):a.stages&&m&&a.stages.length>parseInt(m,10)?d("stage"):F||o?(F&&L(i=>({...i,hasDeletedServerStages:!0})),o&&L(i=>({...i,hasReassignedContentTypes:!0}))):H()},validate(o){return(0,e.v)({values:o,formatMessage:n})}});return(0,e.u)(R.R,e.i),r.useEffect(()=>(!O&&U&&g&&(_((0,e.l)({workflow:U})),_((0,e.d)({workflows:g}))),I||_((0,e.e)({collectionTypes:S,singleTypes:p})),K||_((0,e.f)(Y)),_((0,e.g)(O||I||K)),()=>{_((0,e.r)())}),[S,_,I,O,K,Y,p,U,g]),r.useEffect(()=>{!O&&!V&&(P&&f&&P?.workflowCount>parseInt(f,10)?d("workflow"):a.stages&&m&&a.stages.length>parseInt(m,10)&&d("stage"))},[a.stages,V,O,w,P,f,m]),r.useEffect(()=>{!v&&z?.length===0&&D({blockTransition:!0,type:"warning",message:n({id:"Settings.review-workflows.stage.permissions.noPermissions.description",defaultMessage:"You don\u2019t have the permission to see roles"})})},[n,v,z,D]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(h.D,{}),(0,t.jsx)(T.uo,{value:y,children:(0,t.jsxs)(T.QF,{onSubmit:y.handleSubmit,children:[(0,t.jsx)(h.H,{navigationAction:(0,t.jsx)(h.B,{href:"/settings/review-workflows"}),primaryAction:B&&(0,t.jsx)(Z.Z,{startIcon:(0,t.jsx)(b.c,{}),type:"submit",size:"M",disabled:!ds,loading:!Boolean(Object.keys(c).length>0)&&Ps,children:n({id:"global.save",defaultMessage:"Save"})}),subtitle:!v&&n({id:"Settings.review-workflows.page.subtitle",defaultMessage:"{count, plural, one {# stage} other {# stages}}"},{count:a.stages?.length}),title:a.name||""}),(0,t.jsx)(h.R,{children:v?(0,t.jsx)(C.C,{justifyContent:"center",children:(0,t.jsx)($.c,{children:n({id:"Settings.review-workflows.page.isLoading",defaultMessage:"Workflow is loading"})})}):(0,t.jsxs)(C.C,{alignItems:"stretch",direction:"column",gap:7,children:[(0,t.jsx)(e.W,{canUpdate:B}),(0,t.jsx)(e.S,{canDelete:Ms,canUpdate:B,stages:y.values?.stages})]})})]})}),(0,t.jsx)(M.cz.Root,{isConfirmButtonLoading:v,isOpen:Object.keys(c).length>0,onToggleDialog:fs,onConfirm:vs,children:(0,t.jsx)(M.cz.Body,{children:(0,t.jsxs)(C.C,{direction:"column",gap:5,children:[c.hasDeletedServerStages&&(0,t.jsx)(A.O,{textAlign:"center",variant:"omega",children:n({id:"Settings.review-workflows.page.delete.confirm.stages.body",defaultMessage:"All entries assigned to deleted stages will be moved to the previous stage."})}),c.hasReassignedContentTypes&&(0,t.jsx)(A.O,{textAlign:"center",variant:"omega",children:n({id:"Settings.review-workflows.page.delete.confirm.contentType.body",defaultMessage:"{count} {count, plural, one {content-type} other {content-types}} {count, plural, one {is} other {are}} already mapped to {count, plural, one {another workflow} other {other workflows}}. If you save changes, {count, plural, one {this} other {these}} {count, plural, one {content-type} other {{count} content-types}} will no more be mapped to the {count, plural, one {another workflow} other {other workflows}} and all corresponding information will be removed."},{count:Q?.filter(o=>a.contentTypes?.includes(o)).length})}),(0,t.jsx)(A.O,{textAlign:"center",variant:"omega",children:n({id:"Settings.review-workflows.page.delete.confirm.confirm",defaultMessage:"Are you sure you want to save?"})})]})})}),(0,t.jsxs)(E.L.Root,{isOpen:k==="workflow",onClose:()=>d(null),children:[(0,t.jsx)(E.L.Title,{children:n({id:"Settings.review-workflows.edit.page.workflows.limit.title",defaultMessage:"You\u2019ve reached the limit of workflows in your plan"})}),(0,t.jsx)(E.L.Body,{children:n({id:"Settings.review-workflows.edit.page.workflows.limit.body",defaultMessage:"Delete a workflow or contact Sales to enable more workflows."})})]}),(0,t.jsxs)(E.L.Root,{isOpen:k==="stage",onClose:()=>d(null),children:[(0,t.jsx)(E.L.Title,{children:n({id:"Settings.review-workflows.edit.page.stages.limit.title",defaultMessage:"You have reached the limit of stages for this workflow in your plan"})}),(0,t.jsx)(E.L.Body,{children:n({id:"Settings.review-workflows.edit.page.stages.limit.body",defaultMessage:"Try deleting some stages or contact Sales to enable more stages."})})]})]})}}}]);
