"use strict";(self.webpackChunkgettem=self.webpackChunkgettem||[]).push([[4312],{34312:(F,D,s)=>{s.d(D,{ProtectedEditPage:()=>ts});var a=s(19968),e=s(62552),m=s(48112),P=s(28464),i=s(35676),c=s(42816),g=s(5e3),h=s(48936),O=s(63358),A=s(28724),L=s(70996),U=s(5540),t=s(47616),I=s(53305),R=s(15396),T=s(31812),r=s(20880),_=s(14632),d=s(49008),u=s(39380),v=s(52540),l=s(19508),n=s(72704),K=s(26051),N=s(57940),J=s(54320),X=s(5240),E=s(91892),ds=s(36196),ls=s(21424),Es=s(70516),Ms=s(18424),ms=s(21968),Ps=s(12132),cs=s(48632),Os=s(85676),Ds=s(35184),gs=s(99568),hs=s(96556),As=s(13192),Ls=s(30840),vs=s(77784),fs=s(79371),Cs=s(67888),Us=s(52600),Is=s(95752),us=s(37388),ps=s(61840),Bs=s(49108),Rs=s(44632),Ts=s(50840),Ks=s(20252),Ws=s(86432),xs=s(22612),js=s(24808),ys=s(24024),Ss=s(40960),zs=s(33656),Fs=s(43280),Ns=s(79804),Qs=s(19632),Vs=s(29576),$s=s(61152),Gs=s(9589),Ys=s(45488),Zs=s(75516),Hs=s(38768),Js=s(79904),Xs=s(58276);const q=v.kt().shape({...N.C,isActive:v.SK(),roles:v.M$().min(1,t.aO.required).required(t.aO.required)}),b=["email","firstname","lastname","username","isActive","roles"],ss=()=>{const{formatMessage:o}=(0,_.c)(),p=(0,d.SU)("/settings/users/:id")?.params?.id??"",{push:B}=(0,d.Uz)(),M=(0,t.eo)(),{lockApp:V,unlockApp:$}=(0,t.H6)(),w=(0,l.p)(K.M,async()=>(await s.e(4072).then(s.bind(s,24072))).MagicLinkEE),{_unstableFormatAPIError:G,_unstableFormatValidationErrors:es}=(0,t.An)(),k=(0,l.j)(n.s),{isLoading:os,allowedActions:{canUpdate:Y}}=(0,t.aU)({read:k.settings?.users.read??[],update:k.settings?.users.update??[]}),[ns]=(0,l.M)();(0,t.G0)();const{data:is,error:y,isLoading:rs}=(0,l.k)({id:p},{refetchOnMountOrArgChange:!0}),[S]=is?.users??[];if(e.useEffect(()=>{y&&(y.name==="UnauthorizedError"?(M({type:"info",message:{id:"notification.permission.not-allowed-read",defaultMessage:"You are not allowed to see this document"}}),B("/")):M({type:"warning",message:{id:"notification.error",defaultMessage:G(y)}}))},[y,G,B,M]),rs||!w||os)return(0,a.jsxs)(m.G,{"aria-busy":"true",children:[(0,a.jsx)(t.K8,{name:"Users"}),(0,a.jsx)(P.a,{primaryAction:(0,a.jsx)(i.Z,{disabled:!0,startIcon:(0,a.jsx)(I.c,{}),type:"button",size:"L",children:o({id:"global.save",defaultMessage:"Save"})}),title:o({id:"app.containers.Users.EditPage.header.label-loading",defaultMessage:"Edit user"}),navigationAction:(0,a.jsx)(U.c,{as:u.Af,startIcon:(0,a.jsx)(R.c,{}),to:"/settings/users?pageSize=10&page=1&sort=firstname",children:o({id:"global.back",defaultMessage:"Back"})})}),(0,a.jsx)(c.S,{children:(0,a.jsx)(t.Wm,{})})]});const z={...r(S,b),roles:S.roles.map(({id:f})=>f),password:"",confirmPassword:""},_s=async(f,W)=>{V?.();const{confirmPassword:Z,password:x,...H}=f,C=await ns({id:p,...H,password:x===""?void 0:x});"error"in C&&(0,l.x)(C.error)?(C.error.name==="ValidationError"&&W.setErrors(es(C.error)),M({type:"warning",message:G(C.error)})):(M({type:"success",message:o({id:"notification.success.saved",defaultMessage:"Saved"})}),W.setValues({...r(f,b),password:"",confirmPassword:""})),$?.()};return(0,a.jsxs)(m.G,{children:[(0,a.jsx)(t.K8,{name:"Users"}),(0,a.jsx)(T.QJ,{onSubmit:_s,initialValues:z,validateOnChange:!1,validationSchema:q,children:({errors:f,values:W,handleChange:Z,isSubmitting:x,dirty:H})=>(0,a.jsxs)(t.QF,{children:[(0,a.jsx)(P.a,{primaryAction:(0,a.jsx)(i.Z,{disabled:x||!Y?!0:!H,startIcon:(0,a.jsx)(I.c,{}),loading:x,type:"submit",size:"L",children:o({id:"global.save",defaultMessage:"Save"})}),title:o({id:"app.containers.Users.EditPage.header.label",defaultMessage:"Edit {name}"},{name:z.username||(0,n.g)(z?.firstname??"",z.lastname)}),navigationAction:(0,a.jsx)(U.c,{as:u.Af,startIcon:(0,a.jsx)(R.c,{}),to:"/settings/users?pageSize=10&page=1&sort=firstname",children:o({id:"global.back",defaultMessage:"Back"})})}),(0,a.jsxs)(c.S,{children:[S?.registrationToken&&(0,a.jsx)(g.k,{paddingBottom:6,children:(0,a.jsx)(w,{registrationToken:S.registrationToken})}),(0,a.jsxs)(h.C,{direction:"column",alignItems:"stretch",gap:7,children:[(0,a.jsx)(g.k,{background:"neutral0",hasRadius:!0,shadow:"filterShadow",paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7,children:(0,a.jsxs)(h.C,{direction:"column",alignItems:"stretch",gap:4,children:[(0,a.jsx)(O.O,{variant:"delta",as:"h2",children:o({id:"app.components.Users.ModalCreateBody.block-title.details",defaultMessage:"Details"})}),(0,a.jsx)(A.y,{gap:5,children:as.map(C=>C.map(j=>(0,a.jsx)(L.C,{...j.size,children:(0,a.jsx)(t.u,{...j,disabled:!Y,error:f[j.name],onChange:Z,value:W[j.name]})},j.name)))})]})}),(0,a.jsx)(g.k,{background:"neutral0",hasRadius:!0,shadow:"filterShadow",paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7,children:(0,a.jsxs)(h.C,{direction:"column",alignItems:"stretch",gap:4,children:[(0,a.jsx)(O.O,{variant:"delta",as:"h2",children:o({id:"global.roles",defaultMessage:"User's role"})}),(0,a.jsx)(A.y,{gap:5,children:(0,a.jsx)(L.C,{col:6,xs:12,children:(0,a.jsx)(K.S,{disabled:!Y,error:f.roles,onChange:Z,value:W.roles})})})]})})]})]})]})})]})},as=[[{intlLabel:{id:"Auth.form.firstname.label",defaultMessage:"First name"},name:"firstname",placeholder:{id:"Auth.form.firstname.placeholder",defaultMessage:"e.g. Kai"},type:"text",size:{col:6,xs:12},required:!0},{intlLabel:{id:"Auth.form.lastname.label",defaultMessage:"Last name"},name:"lastname",placeholder:{id:"Auth.form.lastname.placeholder",defaultMessage:"e.g. Doe"},type:"text",size:{col:6,xs:12}}],[{intlLabel:{id:"Auth.form.email.label",defaultMessage:"Email"},name:"email",placeholder:{id:"Auth.form.email.placeholder",defaultMessage:"e.g. kai.doe@strapi.io"},type:"email",size:{col:6,xs:12},required:!0},{intlLabel:{id:"Auth.form.username.label",defaultMessage:"Username"},name:"username",placeholder:{id:"Auth.form.username.placeholder",defaultMessage:"e.g. Kai_Doe"},type:"text",size:{col:6,xs:12}}],[{intlLabel:{id:"global.password",defaultMessage:"Password"},name:"password",type:"password",size:{col:6,xs:12},autoComplete:"new-password"},{intlLabel:{id:"Auth.form.confirmPassword.label",defaultMessage:"Password confirmation"},name:"confirmPassword",type:"password",size:{col:6,xs:12},autoComplete:"new-password"}],[{intlLabel:{id:"Auth.form.active.label",defaultMessage:"Active"},name:"isActive",type:"bool",size:{col:6,xs:12}}]],ts=()=>{const o=(0,t.eo)(),Q=(0,l.j)(n.s),{isLoading:p,allowedActions:{canRead:B,canUpdate:M}}=(0,t.aU)({read:Q.settings?.users.read??[],update:Q.settings?.users.update??[]}),{state:V}=(0,d.IT)(),$=V?.from??"/";return e.useEffect(()=>{p||!B&&!M&&o({type:"info",message:{id:"notification.permission.not-allowed-read",defaultMessage:"You are not allowed to see this document"}})},[p,B,M,o]),p?(0,a.jsx)(t.Wm,{}):!B&&!M?(0,a.jsx)(d.YJ,{to:$}):(0,a.jsx)(ss,{})}},26051:(F,D,s)=>{s.d(D,{M:()=>U,S:()=>t,a:()=>L});var a=s(19968),e=s(14632),m=s(19508),P=s(23264),i=s(5928),c=s(47616),g=s(32680),h=s(24144),O=s(3704),A=s(58276);const L=({children:r,target:_})=>{const d=(0,c.eo)(),{formatMessage:u}=(0,e.c)(),{copy:v}=(0,c.UC)(),l=u({id:"app.component.CopyToClipboard.label",defaultMessage:"Copy to clipboard"}),n=async()=>{await v(_)&&d({type:"info",message:{id:"notification.link-copied"}})};return(0,a.jsx)(c._y,{endAction:(0,a.jsx)(P.w,{label:l,noBorder:!0,icon:(0,a.jsx)(g.c,{}),onClick:n}),title:_,titleEllipsis:!0,subtitle:r,icon:(0,a.jsx)("span",{style:{fontSize:32},children:"\u2709\uFE0F"}),iconBackground:"neutral100"})},U=({registrationToken:r})=>{const{formatMessage:_}=(0,e.c)(),d=`${window.location.origin}${(0,m.K)()}/auth/register?registrationToken=${r}`;return(0,a.jsx)(L,{target:d,children:_({id:"app.components.Users.MagicLink.connect",defaultMessage:"Copy and share this link to give access to this user"})})},t=({disabled:r,error:_,onChange:d,value:u})=>{const{isLoading:v,roles:l}=(0,A.u)(),{formatMessage:n}=(0,e.c)(),K=_?n({id:_,defaultMessage:_}):"",N=n({id:"app.components.Users.ModalCreateBody.block-title.roles",defaultMessage:"User's roles"}),J=n({id:"app.components.Users.ModalCreateBody.block-title.roles.description",defaultMessage:"A user can have one or several roles"}),X=n({id:"app.components.Select.placeholder",defaultMessage:"Select"});return(0,a.jsx)(i.e,{id:"roles",disabled:r,error:K,hint:J,label:N,name:"roles",onChange:E=>{d({target:{name:"roles",value:E}})},placeholder:X,startIcon:v?(0,a.jsx)(T,{}):void 0,value:u.map(E=>E.toString()),withTags:!0,required:!0,children:l.map(E=>(0,a.jsx)(i.eI,{value:E.id.toString(),children:n({id:`global.${E.code}`,defaultMessage:E.name})},E.id))})},I=(0,O.xZ)`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`,R=O.cp.div`
  animation: ${I} 2s infinite linear;
`,T=()=>(0,a.jsx)(R,{children:(0,a.jsx)(h.c,{})})},58276:(F,D,s)=>{s.d(D,{u:()=>i});var a=s(62552),e=s(47616),m=s(14632),P=s(19508);const i=(c={},g)=>{const{locale:h}=(0,m.c)(),O=(0,e.In)(h,{sensitivity:"base"}),{data:A,error:L,isError:U,isLoading:t,refetch:I}=(0,P.z)(c,g);return{roles:a.useMemo(()=>[...A??[]].sort((T,r)=>O.compare(T.name,r.name)),[A,O]),error:L,isError:U,isLoading:t,refetch:I}}},57940:(F,D,s)=>{s.d(D,{C:()=>m});var a=s(47616),e=s(52540);const m={firstname:e.Qb().trim().required(a.aO.required),lastname:e.Qb(),email:e.Qb().email(a.aO.email).lowercase().required(a.aO.required),username:e.Qb().nullable(),password:e.Qb().min(8,a.aO.minLength).matches(/[a-z]/,"components.Input.error.contain.lowercase").matches(/[A-Z]/,"components.Input.error.contain.uppercase").matches(/\d/,"components.Input.error.contain.number"),confirmPassword:e.Qb().min(8,a.aO.minLength).oneOf([e.IL("password"),null],"components.Input.error.password.noMatch").when("password",(P,i)=>P?i.required(a.aO.required):i)}}}]);
