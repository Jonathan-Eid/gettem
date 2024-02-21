"use strict";(self.webpackChunkgettem=self.webpackChunkgettem||[]).push([[2360],{22360:(Te,$,s)=>{s.d($,{ProtectedSettingsPage:()=>Ce});var e=s(19968),f=s(62552),H=s(3400),J=s(65092),Y=s(9544),A=s(11208),p=s(2931),M=s(63358),B=s(25824),S=s(6496),y=s(48936),O=s(53804),I=s(6912),W=s(5e3),x=s(80700),U=s(3548),P=s(35676),K=s(28724),v=s(70996),R=s(62492),X=s(32568),N=s(56104),w=s(42848),k=s(20464),Q=s(76512),h=s(9752),q=s(35480),ee=s(48744),F=s(23264),se=s(48112),ae=s(28464),te=s(42816),ne=s(36132),r=s(47616),G=s(53305),le=s(89940),ie=s(71324),V=s(48636),oe=s(79848),m=s(14632),C=s(31812),L=s(52540),de=s(78164),ce=s(70516),a=s(32048),re=s(48632),Ae=s(85676),pe=s(12132),Be=s(96556),Se=s(36196),Ie=s(35184),We=s(21968);const ge=()=>{const[t,l]=f.useState(!1),d=(0,ce.OY)(),n=(0,r.eo)(),{post:c}=(0,r.Qn)(),{formatAPIError:i}=(0,r.An)();return{isAdding:t,addLocale:async g=>{l(!0);try{const{data:_}=await c("/i18n/locales",g);n({type:"success",message:{id:(0,a.g)("Settings.locales.modal.create.success")}}),d({type:a.A,newLocale:_})}catch(_){throw _ instanceof de.Uh?n({type:"warning",message:i(_)}):n({type:"warning",message:{id:"notification.error"}}),_}finally{l(!1)}}}},Z=()=>{const{formatMessage:t}=(0,m.c)(),{notifyStatus:l}=(0,H.O)(),d=(0,r.eo)(),{get:n}=(0,r.Qn)(),{isLoading:c,data:i}=(0,re.useQuery)(["plugin-i18n","locales"],async()=>{const{data:o}=await n("/i18n/iso-locales");if(Array.isArray(o))return o;throw new Error("The response is not an array.")},{onSuccess(){l(t({id:(0,a.g)("Settings.locales.modal.locales.loaded"),defaultMessage:"The locales have been successfully loaded."}))},onError(){d({type:"warning",message:{id:"notification.error"}})},initialData:[]});return{defaultLocales:i,isLoading:c}},_e=({value:t,onClear:l,onLocaleChange:d,error:n})=>{const{formatMessage:c}=(0,m.c)(),{defaultLocales:i=[],isLoading:o}=Z(),{locales:g}=(0,a.u)(),_=i.map(E=>({label:E.name,value:E.code})).filter(E=>{const D=g.find(({code:u})=>u===E.value);return!D||D.code===t}),T=t||"";return(0,e.jsx)(J.k1,{"aria-busy":o,error:n,label:c({id:(0,a.g)("Settings.locales.modal.locales.label"),defaultMessage:"Locales"}),value:T,onClear:l,onChange:E=>{const D=_.find(u=>u.value===E);D&&d({code:D.value,name:D.label})},placeholder:c({id:"components.placeholder.select",defaultMessage:"Select"}),children:_.map(E=>(0,e.jsx)(Y.m,{value:E.value,children:E.label},E.value))})},b=L.kt().shape({code:L.Qb().required(),name:L.Qb().max(50,"Settings.locales.modal.locales.displayName.error").required(r.aO.required),isDefault:L.cT()}),Ee={code:"",name:"",isDefault:!1},Me=({onClose:t})=>{const{isAdding:l,addLocale:d}=ge(),{formatMessage:n}=(0,m.c)(),{refetchPermissions:c}=(0,r.c_)();return(0,e.jsx)(A.E,{onClose:t,labelledBy:"add-locale-title",children:(0,e.jsx)(C.QJ,{initialValues:Ee,onSubmit:async i=>{await d(i),await c()},validationSchema:b,validateOnChange:!1,children:(0,e.jsxs)(r.QF,{children:[(0,e.jsx)(p.k,{children:(0,e.jsx)(M.O,{fontWeight:"bold",textColor:"neutral800",as:"h2",id:"add-locale-title",children:n({id:(0,a.g)("Settings.list.actions.add"),defaultMessage:"Add new locale"})})}),(0,e.jsx)(B.a,{children:(0,e.jsxs)(S.M,{label:n({id:(0,a.g)("Settings.locales.modal.title"),defaultMessage:"Configurations"}),id:"tabs",variant:"simple",children:[(0,e.jsxs)(y.C,{justifyContent:"space-between",children:[(0,e.jsx)(M.O,{as:"h2",variant:"beta",children:n({id:(0,a.g)("Settings.locales.modal.title"),defaultMessage:"Configurations"})}),(0,e.jsxs)(O.k,{children:[(0,e.jsx)(O.s,{children:n({id:(0,a.g)("Settings.locales.modal.base"),defaultMessage:"Basic settings"})}),(0,e.jsx)(O.s,{children:n({id:(0,a.g)("Settings.locales.modal.advanced"),defaultMessage:"Advanced settings"})})]})]}),(0,e.jsx)(I.c,{}),(0,e.jsx)(W.k,{paddingTop:7,paddingBottom:7,children:(0,e.jsxs)(x.o,{children:[(0,e.jsx)(x.G,{children:(0,e.jsx)(me,{})}),(0,e.jsx)(x.G,{children:(0,e.jsx)(z,{})})]})})]})}),(0,e.jsx)(U._,{startActions:(0,e.jsx)(P.Z,{variant:"tertiary",onClick:t,children:n({id:"app.components.Button.cancel",defaultMessage:"Cancel"})}),endActions:(0,e.jsx)(P.Z,{type:"submit",startIcon:(0,e.jsx)(G.c,{}),disabled:l,children:n({id:"global.save",defaultMessage:"Save"})})})]})})})},me=()=>{const{formatMessage:t}=(0,m.c)(),{values:l,handleChange:d,setFieldValue:n,errors:c}=(0,C.Sq)(),i=g=>{n("name",g.name),n("code",g.code)},o=()=>{n("displayName",""),n("code","")};return(0,e.jsxs)(K.y,{gap:4,children:[(0,e.jsx)(v.C,{col:6,children:(0,e.jsx)(_e,{error:c.code,value:l.code,onLocaleChange:i,onClear:o})}),(0,e.jsx)(v.C,{col:6,children:(0,e.jsx)(R.g,{name:"name",label:t({id:(0,a.g)("Settings.locales.modal.locales.displayName"),defaultMessage:"Locale display name"}),hint:t({id:(0,a.g)("Settings.locales.modal.locales.displayName.description"),defaultMessage:"Locale will be displayed under that name in the administration panel"}),error:c.name?t({id:(0,a.g)("Settings.locales.modal.locales.displayName.error"),defaultMessage:"The locale display name can only be less than 50 characters."}):void 0,value:l.name,onChange:d})})]})},z=({isDefaultLocale:t})=>{const{values:l,setFieldValue:d}=(0,C.Sq)(),{formatMessage:n}=(0,m.c)();return(0,e.jsx)(X.y,{name:"isDefault",hint:n({id:(0,a.g)("Settings.locales.modal.advanced.setAsDefault.hint"),defaultMessage:"One default locale is required, change it by selecting another one"}),onChange:()=>d("isDefault",!l.isDefault),value:l.isDefault,disabled:t,children:n({id:(0,a.g)("Settings.locales.modal.advanced.setAsDefault"),defaultMessage:"Set as default locale"})})},he=()=>{const[t,l]=(0,f.useState)(!1),d=(0,a.a)(),n=(0,r.eo)(),{del:c}=(0,r.Qn)();return{isDeleting:t,deleteLocale:async o=>{try{l(!0),await c(`/i18n/locales/${o}`),n({type:"success",message:{id:(0,a.g)("Settings.locales.modal.delete.success")}}),d({type:a.D,id:o})}catch{n({type:"warning",message:{id:"notification.error"}})}finally{l(!1)}}}},De=({localeToDelete:t,onClose:l})=>{const{isDeleting:d,deleteLocale:n}=he(),c=Boolean(t),i=()=>n(t.id).then(l);return(0,e.jsx)(r.cz,{isConfirmButtonLoading:d,onConfirm:i,onToggleDialog:l,isOpen:c})},ue=()=>{const[t,l]=(0,f.useState)(!1),d=(0,a.a)(),n=(0,r.eo)(),{put:c}=(0,r.Qn)();return{isEditing:t,editLocale:async(o,g)=>{try{l(!0);const{data:_}=await c(`/i18n/locales/${o}`,g);if("id"in _)n({type:"success",message:{id:(0,a.g)("Settings.locales.modal.edit.success")}}),d({type:a.U,editedLocale:_});else throw new Error("Invalid response")}catch{n({type:"warning",message:{id:"notification.error"}})}finally{l(!1)}}}},fe=({locale:t,onClose:l})=>{const{refetchPermissions:d}=(0,r.c_)(),{isEditing:n,editLocale:c}=ue(),{formatMessage:i}=(0,m.c)(),o=async({name:g,isDefault:_})=>{await c(t.id,{name:g,isDefault:_}),await d()};return(0,e.jsx)(A.E,{onClose:l,labelledBy:"edit-locale-title",children:(0,e.jsx)(C.QJ,{initialValues:{code:t.code??"",name:t.name??"",isDefault:Boolean(t.isDefault)},onSubmit:o,validationSchema:b,children:(0,e.jsxs)(r.QF,{children:[(0,e.jsx)(p.k,{children:(0,e.jsx)(M.O,{fontWeight:"bold",textColor:"neutral800",as:"h2",id:"edit-locale-title",children:i({id:(0,a.g)("Settings.list.actions.edit"),defaultMessage:"Edit a locale"})})}),(0,e.jsx)(B.a,{children:(0,e.jsxs)(S.M,{label:i({id:(0,a.g)("Settings.locales.modal.title"),defaultMessage:"Configurations"}),id:"tabs",variant:"simple",children:[(0,e.jsxs)(y.C,{justifyContent:"space-between",children:[(0,e.jsx)(M.O,{as:"h2",children:i({id:(0,a.g)("Settings.locales.modal.title"),defaultMessage:"Configurations"})}),(0,e.jsxs)(O.k,{children:[(0,e.jsx)(O.s,{children:i({id:(0,a.g)("Settings.locales.modal.base"),defaultMessage:"Basic settings"})}),(0,e.jsx)(O.s,{children:i({id:(0,a.g)("Settings.locales.modal.advanced"),defaultMessage:"Advanced settings"})})]})]}),(0,e.jsx)(I.c,{}),(0,e.jsx)(W.k,{paddingTop:7,paddingBottom:7,children:(0,e.jsxs)(x.o,{children:[(0,e.jsx)(x.G,{children:(0,e.jsx)(Oe,{locale:t})}),(0,e.jsx)(x.G,{children:(0,e.jsx)(z,{isDefaultLocale:Boolean(t&&t.isDefault)})})]})})]})}),(0,e.jsx)(U._,{startActions:(0,e.jsx)(P.Z,{variant:"tertiary",onClick:l,children:i({id:"app.components.Button.cancel",defaultMessage:"Cancel"})}),endActions:(0,e.jsx)(P.Z,{type:"submit",startIcon:(0,e.jsx)(G.c,{}),disabled:n,children:i({id:"global.save",defaultMessage:"Save"})})})]})})})},Oe=({locale:t})=>{const{formatMessage:l}=(0,m.c)(),{values:d,handleChange:n,errors:c}=(0,C.Sq)(),{defaultLocales:i=[]}=Z(),o=i.find(g=>g.code===t.code);return(0,e.jsxs)(K.y,{gap:4,children:[(0,e.jsx)(v.C,{col:6,children:(0,e.jsx)(N.K_,{label:l({id:(0,a.g)("Settings.locales.modal.locales.label"),defaultMessage:"Locales"}),value:o?.code||t.code,disabled:!0,children:(0,e.jsx)(N.kH,{value:o?.code||t.code,children:o?.name||t.code})})}),(0,e.jsx)(v.C,{col:6,children:(0,e.jsx)(R.g,{name:"name",label:l({id:(0,a.g)("Settings.locales.modal.locales.displayName"),defaultMessage:"Locale display name"}),hint:l({id:(0,a.g)("Settings.locales.modal.locales.displayName.description"),defaultMessage:"Locale will be displayed under that name in the administration panel"}),error:c.name?l({id:(0,a.g)("Settings.locales.modal.locales.displayName.error"),defaultMessage:"The locale display name can only be less than 50 characters."}):void 0,value:d.name,onChange:n})})]})},xe=({locales:t=[],onDeleteLocale:l,onEditLocale:d,canDelete:n=!0,canEdit:c=!0})=>{const{formatMessage:i}=(0,m.c)();return(0,e.jsxs)(w.o,{colCount:4,rowCount:t.length+1,children:[(0,e.jsx)(k.o,{children:(0,e.jsxs)(Q.Tr,{children:[(0,e.jsx)(h.Th,{children:(0,e.jsx)(M.O,{variant:"sigma",textColor:"neutral600",children:i({id:(0,a.g)("Settings.locales.row.id"),defaultMessage:"ID"})})}),(0,e.jsx)(h.Th,{children:(0,e.jsx)(M.O,{variant:"sigma",textColor:"neutral600",children:i({id:(0,a.g)("Settings.locales.row.displayName"),defaultMessage:"Display name"})})}),(0,e.jsx)(h.Th,{children:(0,e.jsx)(M.O,{variant:"sigma",textColor:"neutral600",children:i({id:(0,a.g)("Settings.locales.row.default-locale"),defaultMessage:"Default locale"})})}),(0,e.jsx)(h.Th,{children:(0,e.jsx)(q.K,{children:"Actions"})})]})}),(0,e.jsx)(ee.K,{children:t.map(o=>(0,e.jsxs)(Q.Tr,{...(0,r.on)({fn:()=>d(o),condition:Boolean(d)}),children:[(0,e.jsx)(h.Td,{children:(0,e.jsx)(M.O,{textColor:"neutral800",children:o.id})}),(0,e.jsx)(h.Td,{children:(0,e.jsx)(M.O,{textColor:"neutral800",children:o.name})}),(0,e.jsx)(h.Td,{children:(0,e.jsx)(M.O,{textColor:"neutral800",children:o.isDefault?i({id:(0,a.g)("Settings.locales.default"),defaultMessage:"Default"}):null})}),(0,e.jsx)(h.Td,{children:(0,e.jsxs)(y.C,{gap:1,justifyContent:"flex-end",onClick:g=>g.stopPropagation(),children:[c&&(0,e.jsx)(F.w,{onClick:()=>d(o),label:i({id:(0,a.g)("Settings.list.actions.edit"),defaultMessage:"Edit"}),icon:(0,e.jsx)(le.c,{}),borderWidth:0}),n&&!o.isDefault&&(0,e.jsx)(F.w,{onClick:()=>l(o),label:i({id:(0,a.g)("Settings.list.actions.delete"),defaultMessage:"Delete"}),icon:(0,e.jsx)(ie.c,{}),borderWidth:0})]})})]},o.id))})]})},Pe=()=>{const[t,l]=f.useState(!1),[d,n]=f.useState(),[c,i]=f.useState(),{locales:o}=(0,a.u)(),{formatMessage:g}=(0,m.c)(),{isLoading:_,allowedActions:{canUpdate:T,canCreate:E,canDelete:D}}=(0,r.aU)(a.P),u=()=>{l(j=>!j)};(0,r.G0)();const je=()=>n(void 0),ve=j=>{n(j)},Le=()=>i(void 0),ye=j=>{i(j)};return _?(0,e.jsx)(r.Wm,{}):(0,e.jsxs)(se.G,{tabIndex:-1,children:[(0,e.jsx)(ae.a,{primaryAction:(0,e.jsx)(P.Z,{disabled:!E,startIcon:(0,e.jsx)(V.c,{}),onClick:u,size:"S",children:g({id:(0,a.g)("Settings.list.actions.add"),defaultMessage:"Add new locale"})}),title:g({id:(0,a.g)("plugin.name"),defaultMessage:"Internationalization"}),subtitle:g({id:(0,a.g)("Settings.list.description"),defaultMessage:"Configure the settings"})}),(0,e.jsx)(te.S,{children:o?.length>0?(0,e.jsx)(xe,{locales:o,canDelete:D,canEdit:T,onDeleteLocale:ve,onEditLocale:ye}):(0,e.jsx)(ne.S,{icon:(0,e.jsx)(oe.c,{width:void 0,height:void 0}),content:g({id:(0,a.g)("Settings.list.empty.title"),defaultMessage:"There are no locales"}),action:(0,e.jsx)(P.Z,{disabled:!E,variant:"secondary",startIcon:(0,e.jsx)(V.c,{}),onClick:u,children:g({id:(0,a.g)("Settings.list.actions.add"),defaultMessage:"Add new locale"})})})}),t&&(0,e.jsx)(Me,{onClose:u}),c&&(0,e.jsx)(fe,{onClose:Le,locale:c}),d&&(0,e.jsx)(De,{localeToDelete:d,onClose:je})]})},Ce=()=>(0,e.jsx)(r.rF,{permissions:a.P.read,children:(0,e.jsx)(Pe,{})})}}]);
