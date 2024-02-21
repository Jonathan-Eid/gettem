"use strict";(self.webpackChunkgettem=self.webpackChunkgettem||[]).push([[9508],{89508:(Re,S,s)=>{s.r(S),s.d(S,{ProvidersPage:()=>G,default:()=>be});var e=s(19968),L=s(62552),w=s(28216),Y=s(62492),ee=s(11208),se=s(2931),te=s(25824),ae=s(48936),ie=s(28724),re=s(70996),ne=s(3548),F=s(35676),de=s(20596),le=s(48112),oe=s(28464),ue=s(42816),ce=s(42848),_e=s(20464),z=s(76512),P=s(9752),O=s(63358),ge=s(35480),me=s(48744),pe=s(23264),r=s(47616),Ee=s(89940),he=s(30840),C=s(14632),R=s(48632),Pe=s(5848),Me=s(39820),ve=s(31812),t=s(33104),n=s(27168),Te=s(79804),a=s(52540);const T=({description:l,disabled:M,intlLabel:p,error:_,name:c,onChange:v,placeholder:d,providerToEditName:E,type:m,value:u})=>{const{formatMessage:o}=(0,C.c)(),h=c==="noName"?`${window.strapi.backendURL}/api/connect/${E}/callback`:u,b=o({id:p.id,defaultMessage:p.defaultMessage},{provider:E,...p.values}),g=l?o({id:l.id,defaultMessage:l.defaultMessage},{provider:E,...l.values}):"";if(m==="bool")return(0,e.jsx)(w.a,{"aria-label":c,checked:u,disabled:M,hint:g,label:b,name:c,offLabel:o({id:"app.components.ToggleCheckbox.off-label",defaultMessage:"Off"}),onLabel:o({id:"app.components.ToggleCheckbox.on-label",defaultMessage:"On"}),onChange:D=>{v({target:{name:c,value:D.target.checked}})}});const K=d?o({id:d.id,defaultMessage:d.defaultMessage},{...d.values}):"",B=_?o({id:_,defaultMessage:_}):"";return(0,e.jsx)(Y.g,{"aria-label":c,disabled:M,error:B,label:b,name:c,onChange:v,placeholder:K,type:m,value:h})};T.defaultProps={description:null,disabled:!1,error:"",placeholder:null,value:""},T.propTypes={description:t.shape({id:t.string.isRequired,defaultMessage:t.string.isRequired,values:t.object}),disabled:t.bool,error:t.string,intlLabel:t.shape({id:t.string.isRequired,defaultMessage:t.string.isRequired,values:t.object}).isRequired,name:t.string.isRequired,onChange:t.func.isRequired,placeholder:t.shape({id:t.string.isRequired,defaultMessage:t.string.isRequired,values:t.object}),providerToEditName:t.string.isRequired,type:t.string.isRequired,value:t.oneOfType([t.bool,t.string])};const U=({headerBreadcrumbs:l,initialData:M,isSubmiting:p,layout:_,isOpen:c,onSubmit:v,onToggle:d,providerToEditName:E})=>{const{formatMessage:m}=(0,C.c)();return c?(0,e.jsxs)(ee.E,{onClose:d,labelledBy:"title",children:[(0,e.jsx)(se.k,{children:(0,e.jsx)(Pe.M,{label:l.join(", "),children:l.map((u,o,h)=>(0,e.jsx)(Me.i,{isCurrent:o===h.length-1,children:u},u))})}),(0,e.jsx)(ve.QJ,{onSubmit:u=>v(u),initialValues:M,validationSchema:_.schema,validateOnChange:!1,children:({errors:u,handleChange:o,values:h})=>(0,e.jsxs)(r.QF,{children:[(0,e.jsx)(te.a,{children:(0,e.jsx)(ae.C,{direction:"column",alignItems:"stretch",gap:1,children:(0,e.jsx)(ie.y,{gap:5,children:_.form.map(b=>b.map(g=>(0,e.jsx)(re.C,{col:g.size,xs:12,children:(0,e.jsx)(T,{...g,error:u[g.name],onChange:o,value:h[g.name],providerToEditName:E})},g.name)))})})}),(0,e.jsx)(ne._,{startActions:(0,e.jsx)(F.Z,{variant:"tertiary",onClick:d,type:"button",children:m({id:"app.components.Button.cancel",defaultMessage:"Cancel"})}),endActions:(0,e.jsx)(F.Z,{type:"submit",loading:p,children:m({id:"global.save",defaultMessage:"Save"})})})]})})]}):null};U.defaultProps={initialData:null,providerToEditName:null},U.propTypes={headerBreadcrumbs:t.arrayOf(t.string).isRequired,initialData:t.object,layout:t.shape({form:t.arrayOf(t.array),schema:t.object}).isRequired,isOpen:t.bool.isRequired,isSubmiting:t.bool.isRequired,onSubmit:t.func.isRequired,onToggle:t.func.isRequired,providerToEditName:t.string};const q={id:(0,n.g)("PopUpForm.Providers.redirectURL.front-end.label"),defaultMessage:"The redirect URL to your front-end app"},N={id:"http://www.client-app.com",defaultMessage:"http://www.client-app.com"},j={id:(0,n.g)("PopUpForm.Providers.enabled.description"),defaultMessage:"If disabled, users won't be able to use this provider."},A={id:(0,n.g)("PopUpForm.Providers.enabled.label"),defaultMessage:"Enable"},H={id:(0,n.g)("PopUpForm.Providers.key.label"),defaultMessage:"Client ID"},$={id:(0,n.g)("PopUpForm.Providers.redirectURL.label"),defaultMessage:"The redirect URL to add in your {provider} application configurations"},f={id:(0,n.g)("PopUpForm.Providers.key.placeholder"),defaultMessage:"TEXT"},k={id:(0,n.g)("PopUpForm.Providers.secret.label"),defaultMessage:"Client Secret"},I={email:{form:[[{intlLabel:A,name:"enabled",type:"bool",description:j,size:6}]],schema:a.kt().shape({enabled:a.SK().required(r.aO.required)})},providers:{form:[[{intlLabel:A,name:"enabled",type:"bool",description:j,size:6,validations:{required:!0}}],[{intlLabel:H,name:"key",type:"text",placeholder:f,size:12,validations:{required:!0}}],[{intlLabel:k,name:"secret",type:"text",placeholder:f,size:12,validations:{required:!0}}],[{intlLabel:q,placeholder:N,name:"callback",type:"text",size:12,validations:{required:!0}}],[{intlLabel:$,name:"noName",type:"text",validations:{},size:12,disabled:!0}]],schema:a.kt().shape({enabled:a.SK().required(r.aO.required),key:a.Qb().when("enabled",{is:!0,then:a.Qb().required(r.aO.required),otherwise:a.Qb()}),secret:a.Qb().when("enabled",{is:!0,then:a.Qb().required(r.aO.required),otherwise:a.Qb()}),callback:a.Qb().when("enabled",{is:!0,then:a.Qb().required(r.aO.required),otherwise:a.Qb()})})},providersWithSubdomain:{form:[[{intlLabel:A,name:"enabled",type:"bool",description:j,size:6,validations:{required:!0}}],[{intlLabel:H,name:"key",type:"text",placeholder:f,size:12,validations:{required:!0}}],[{intlLabel:k,name:"secret",type:"text",placeholder:f,size:12,validations:{required:!0}}],[{intlLabel:{id:(0,n.g)({id:"PopUpForm.Providers.jwksurl.label"}),defaultMessage:"JWKS URL"},name:"jwksurl",type:"text",placeholder:f,size:12,validations:{required:!1}}],[{intlLabel:{id:(0,n.g)("PopUpForm.Providers.subdomain.label"),defaultMessage:"Host URI (Subdomain)"},name:"subdomain",type:"text",placeholder:{id:(0,n.g)("PopUpForm.Providers.subdomain.placeholder"),defaultMessage:"my.subdomain.com"},size:12,validations:{required:!0}}],[{intlLabel:q,placeholder:N,name:"callback",type:"text",size:12,validations:{required:!0}}],[{intlLabel:$,name:"noName",type:"text",validations:{},size:12,disabled:!0}]],schema:a.kt().shape({enabled:a.SK().required(r.aO.required),key:a.Qb().when("enabled",{is:!0,then:a.Qb().required(r.aO.required),otherwise:a.Qb()}),secret:a.Qb().when("enabled",{is:!0,then:a.Qb().required(r.aO.required),otherwise:a.Qb()}),subdomain:a.Qb().when("enabled",{is:!0,then:a.Qb().required(r.aO.required),otherwise:a.Qb()}),callback:a.Qb().when("enabled",{is:!0,then:a.Qb().required(r.aO.required),otherwise:a.Qb()})})}},G=()=>{const{formatMessage:l,locale:M}=(0,C.c)(),p=(0,R.useQueryClient)(),{trackUsage:_}=(0,r.m4)(),[c,v]=L.useState(!1),[d,E]=L.useState(null),m=(0,r.eo)(),{lockApp:u,unlockApp:o}=(0,r.H6)(),{get:h,put:b}=(0,r.Qn)(),{formatAPIError:g}=(0,r.An)(),K=(0,r.In)(M,{sensitivity:"base"});(0,r.G0)();const{isLoading:B,allowedActions:{canUpdate:D}}=(0,r.aU)({update:n.P.updateProviders}),{isLoading:Oe,data:W}=(0,R.useQuery)(["users-permissions","get-providers"],async()=>{const{data:i}=await h("/users-permissions/providers");return i},{initialData:{}}),J=(0,R.useMutation)(i=>b("/users-permissions/providers",i),{async onSuccess(){await p.invalidateQueries(["users-permissions","providers"]),m({type:"success",message:{id:(0,n.g)("notification.success.submit")}}),_("didEditAuthenticationProvider"),Q(),o()},onError(i){m({type:"warning",message:g(i)}),o()},refetchActive:!1}),x=Object.entries(W).reduce((i,[y,Le])=>{const{icon:X,enabled:xe,subdomain:Ce}=Le;return i.push({name:y,icon:X==="envelope"?["fas","envelope"]:["fab",X],enabled:xe,subdomain:Ce}),i},[]).sort((i,y)=>K.compare(i.name,y.name)),fe=Oe||B,V=L.useMemo(()=>d?!!x.find(y=>y.name===d)?.subdomain:!1,[x,d]),De=L.useMemo(()=>d==="email"?I.email:V?I.providersWithSubdomain:I.providers,[d,V]),Q=()=>{v(i=>!i)},Z=i=>{D&&(E(i.name),Q())},ye=async i=>{u(),_("willEditAuthenticationProvider"),J.mutate({providers:{...W,[d]:i}})};return(0,e.jsxs)(de._,{children:[(0,e.jsx)(r.K8,{name:l({id:(0,n.g)("HeaderNav.link.providers"),defaultMessage:"Providers"})}),(0,e.jsxs)(le.G,{children:[(0,e.jsx)(oe.a,{title:l({id:(0,n.g)("HeaderNav.link.providers"),defaultMessage:"Providers"})}),fe?(0,e.jsx)(r.Wm,{}):(0,e.jsx)(ue.S,{children:(0,e.jsxs)(ce.o,{colCount:3,rowCount:x.length+1,children:[(0,e.jsx)(_e.o,{children:(0,e.jsxs)(z.Tr,{children:[(0,e.jsx)(P.Th,{children:(0,e.jsx)(O.O,{variant:"sigma",textColor:"neutral600",children:l({id:"global.name",defaultMessage:"Name"})})}),(0,e.jsx)(P.Th,{children:(0,e.jsx)(O.O,{variant:"sigma",textColor:"neutral600",children:l({id:(0,n.g)("Providers.status"),defaultMessage:"Status"})})}),(0,e.jsx)(P.Th,{children:(0,e.jsx)(O.O,{variant:"sigma",children:(0,e.jsx)(ge.K,{children:l({id:"global.settings",defaultMessage:"Settings"})})})})]})}),(0,e.jsx)(me.K,{children:x.map(i=>(0,e.jsxs)(z.Tr,{...(0,r.on)({fn:()=>Z(i),condition:D}),children:[(0,e.jsx)(P.Td,{width:"45%",children:(0,e.jsx)(O.O,{fontWeight:"semiBold",textColor:"neutral800",children:i.name})}),(0,e.jsx)(P.Td,{width:"65%",children:(0,e.jsx)(O.O,{textColor:i.enabled?"success600":"danger600","data-testid":`enable-${i.name}`,children:i.enabled?l({id:"global.enabled",defaultMessage:"Enabled"}):l({id:"global.disabled",defaultMessage:"Disabled"})})}),(0,e.jsx)(P.Td,{...r.Ii,children:D&&(0,e.jsx)(pe.w,{onClick:()=>Z(i),noBorder:!0,icon:(0,e.jsx)(Ee.c,{}),label:"Edit"})})]},i.name))})]})})]}),(0,e.jsx)(U,{initialData:W[d],isOpen:c,isSubmiting:J.isLoading,layout:De,headerBreadcrumbs:[l({id:(0,n.g)("PopUpForm.header.edit.providers"),defaultMessage:"Edit Provider"}),he(d)],onToggle:Q,onSubmit:ye,providerToEditName:d})]})},be=()=>(0,e.jsx)(r.rF,{permissions:n.P.readProviders,children:(0,e.jsx)(G,{})})}}]);
