"use strict";(self.webpackChunkgettem=self.webpackChunkgettem||[]).push([[7272],{89616:(rt,K,s)=>{s.d(K,{U:()=>W});var t=s(19968),p=s(3704),_=s(5e3),Y=s(6912),E=s(48936),k=s(63358);const S=(0,p.cp)(_.k)`
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
    fill: ${({theme:x})=>x.colors.primary600};
  }
`,F=(0,p.cp)(_.k)`
  border-radius: 0 0 ${({theme:x})=>x.borderRadius} ${({theme:x})=>x.borderRadius};
  display: block;
  width: 100%;
  border: none;
`,W=({children:x,icon:w,...N})=>(0,t.jsxs)("div",{children:[(0,t.jsx)(Y.c,{}),(0,t.jsx)(F,{as:"button",background:"primary100",padding:5,...N,children:(0,t.jsxs)(E.C,{children:[(0,t.jsx)(S,{"aria-hidden":!0,background:"primary200",children:w}),(0,t.jsx)(_.k,{paddingLeft:3,children:(0,t.jsx)(k.O,{variant:"pi",fontWeight:"bold",textColor:"primary600",children:x})})]})})]})},77272:(rt,K,s)=>{s.r(K),s.d(K,{default:()=>Ft});var t=s(19968),p=s(5e3),_=s(48936),Y=s(55716),E=s(63358),k=s(42848),S=s(20464),F=s(76512),W=s(9752),x=s(35676),w=s(89616),N=s(23264),dt=s(28464),ct=s(42816),d=s(47616),ht=s(39716),$=s(48636),J=s(89940),pt=s(71324),_t=s(73560),gt=s(98168),ut=s(53305),mt=s(15396),D=s(85676),Et=s(56781),X=s(13192),Q=s(30840),I=s(14632),H=s(49008),R=s(62552),r=s(41840),f=s(3704),Zt=s(21424),zt=s(9328),Vt=s(35184),Yt=s(57520),wt=s(61397),Ht=s(83180),Gt=s(96556),Jt=s(52540),Xt=s(30680),Qt=s(37132),qt=s(70516),te=s(81112),ee=s(12132),se=s(64772),ne=s(42552),oe=s(61152),ie=s(77784),ae=s(18424),le=s(21968),re=s(87144);const ft=(0,f.cp)(p.k)`
  table {
    width: 100%;
    white-space: nowrap;
  }

  thead {
    border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};

    tr {
      border-top: 0;
    }
  }

  tr {
    border-top: 1px solid ${({theme:e})=>e.colors.neutral150};

    & td,
    & th {
      padding: ${({theme:e})=>e.spaces[4]};
    }

    & td:first-of-type,
    & th:first-of-type {
      padding: 0 ${({theme:e})=>e.spaces[1]};
    }
  }

  th,
  td {
    vertical-align: middle;
    text-align: left;
    color: ${({theme:e})=>e.colors.neutral600};
    outline-offset: -4px;
  }
`,q=f.cp.tr`
  &.component-row,
  &.dynamiczone-row {
    position: relative;
    border-top: none !important;

    table tr:first-child {
      border-top: none;
    }

    > td:first-of-type {
      padding: 0 0 0 ${(0,d.W8)(20)};
      position: relative;

      &::before {
        content: '';
        width: ${(0,d.W8)(4)};
        height: calc(100% - 40px);
        position: absolute;
        top: -7px;
        left: 1.625rem;
        border-radius: 4px;

        ${({isFromDynamicZone:e,isChildOfDynamicZone:n,theme:o})=>n?`background-color: ${o.colors.primary200};`:e?`background-color: ${o.colors.primary200};`:`background: ${o.colors.neutral150};`}
      }
    }
  }

  &.dynamiczone-row > td:first-of-type {
    padding: 0;
  }
`,tt=({customRowComponent:e,component:n,isFromDynamicZone:o=!1,isNestedInDZComponent:i=!1,firstLoopComponentUid:c})=>{const{modifiedData:l}=(0,r.u)(),{schema:{attributes:g}}=D(l,["components",n],{schema:{attributes:[]}});return(0,t.jsx)(q,{isChildOfDynamicZone:o,className:"component-row",children:(0,t.jsx)("td",{colSpan:12,children:(0,t.jsx)(st,{customRowComponent:e,items:g,targetUid:n,firstLoopComponentUid:c||n,editTarget:"components",isFromDynamicZone:o,isNestedInDZComponent:i,isSub:!0,secondLoopComponentUid:c?n:null})})})},xt=({isActive:e=!1,icon:n="cube"})=>(0,t.jsx)(_.C,{alignItems:"center",background:e?"primary200":"neutral200",justifyContent:"center",height:8,width:8,borderRadius:"50%",children:(0,t.jsx)(Y.G,{as:r.C[n]||r.C.cube,height:5,width:5})}),et=(0,f.cp)(p.k)`
  position: absolute;
  display: none;
  top: 5px;
  right: ${(0,d.W8)(8)};

  svg {
    width: ${(0,d.W8)(10)};
    height: ${(0,d.W8)(10)};

    path {
      fill: ${({theme:e})=>e.colors.primary600};
    }
  }
`,Mt=(0,f.cp)(_.C)`
  width: ${(0,d.W8)(140)};
  height: ${(0,d.W8)(80)};
  position: relative;
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  background: ${({theme:e})=>e.colors.neutral100};
  border-radius: ${({theme:e})=>e.borderRadius};
  max-width: 100%;

  &.active,
  &:focus,
  &:hover {
    border: 1px solid ${({theme:e})=>e.colors.primary200};
    background: ${({theme:e})=>e.colors.primary100};

    ${et} {
      display: block;
    }

    ${E.O} {
      color: ${({theme:e})=>e.colors.primary600};
    }

    /* > ComponentIcon */
    > div:first-child {
      background: ${({theme:e})=>e.colors.primary200};
      color: ${({theme:e})=>e.colors.primary600};

      svg {
        path {
          fill: ${({theme:e})=>e.colors.primary600};
        }
      }
    }
  }
`,Ct=({component:e,dzName:n,index:o,isActive:i=!1,isInDevelopmentMode:c=!1,onClick:l})=>{const{modifiedData:g,removeComponentFromDynamicZone:j}=(0,r.u)(),{schema:{icon:C,displayName:M}}=D(g,["components",e],{schema:{}}),u=a=>{a.stopPropagation(),j(n,o)};return(0,t.jsxs)(Mt,{alignItems:"center",direction:"column",className:i?"active":"",borderRadius:"borderRadius",justifyContent:"center",paddingLeft:4,paddingRight:4,shrink:0,onClick:l,role:"tab",tabIndex:i?0:-1,cursor:"pointer","aria-selected":i,"aria-controls":`dz-${n}-panel-${o}`,id:`dz-${n}-tab-${o}`,children:[(0,t.jsx)(xt,{icon:C,isActive:i}),(0,t.jsx)(p.k,{marginTop:1,maxWidth:"100%",children:(0,t.jsx)(E.O,{variant:"pi",fontWeight:"bold",ellipsis:!0,children:M})}),c&&(0,t.jsx)(et,{as:"button",onClick:u,children:(0,t.jsx)(ht.c,{})})]})},yt=(0,f.cp)($.c)`
  width: ${(0,d.W8)(32)};
  height: ${(0,d.W8)(32)};
  padding: ${(0,d.W8)(9)};
  border-radius: ${(0,d.W8)(64)};
  background: ${({theme:e})=>e.colors.primary100};
  path {
    fill: ${({theme:e})=>e.colors.primary600};
  }
`,Dt=(0,f.cp)(p.k)`
  height: ${(0,d.W8)(90)};
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`,jt=(0,f.cp)(_.C)`
  width: 100%;
  overflow-x: auto;
`,Ot=(0,f.cp)(p.k)`
  padding-top: ${(0,d.W8)(90)};
`,Pt=(0,f.cp)(_.C)`
  flex-shrink: 0;
  width: ${(0,d.W8)(140)};
  height: ${(0,d.W8)(80)};
  justify-content: center;
  align-items: center;
`,Tt=({customRowComponent:e,components:n=[],addComponent:o,name:i,targetUid:c})=>{const{isInDevelopmentMode:l}=(0,r.u)(),[g,j]=(0,R.useState)(0),{formatMessage:C}=(0,I.c)(),M=a=>{g!==a&&j(a)},u=()=>{o(i)};return(0,t.jsx)(q,{className:"dynamiczone-row",isFromDynamicZone:!0,children:(0,t.jsxs)("td",{colSpan:12,children:[(0,t.jsx)(Dt,{paddingLeft:8,children:(0,t.jsxs)(jt,{gap:2,children:[l&&(0,t.jsx)("button",{type:"button",onClick:u,children:(0,t.jsxs)(Pt,{direction:"column",alignItems:"stretch",gap:1,children:[(0,t.jsx)(yt,{}),(0,t.jsx)(E.O,{variant:"pi",fontWeight:"bold",textColor:"primary600",children:C({id:(0,r.g)("button.component.add"),defaultMessage:"Add a component"})})]})}),(0,t.jsx)(_.C,{role:"tablist",gap:2,children:n.map((a,h)=>(0,t.jsx)(Ct,{dzName:i||"",index:h,component:a,isActive:g===h,isInDevelopmentMode:l,onClick:()=>M(h)},a))})]})}),(0,t.jsx)(Ot,{children:n.map((a,h)=>{const m={customRowComponent:e,component:a};return(0,t.jsx)(p.k,{id:`dz-${i}-panel-${h}`,role:"tabpanel","aria-labelledby":`dz-${i}-tab-${h}`,style:{display:g===h?"block":"none"},children:(0,t.jsx)("table",{children:(0,t.jsx)("tbody",{children:(0,R.createElement)(tt,{...m,isFromDynamicZone:!0,component:c,key:a})})})},a)})})]})})},vt=(0,f.cp)(p.k)`
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
    fill: ${({theme:e,color:n})=>e.colors[`${n}600`]};
  }
`,bt=(0,f.cp)(p.k)`
  border-radius: 0 0 ${({theme:e})=>e.borderRadius} ${({theme:e})=>e.borderRadius};
  display: block;
  width: 100%;
  border: none;
  position: relative;
  left: -0.25rem;
`,Bt=({children:e,icon:n,color:o,...i})=>(0,t.jsx)(bt,{paddingBottom:4,paddingTop:4,as:"button",type:"button",...i,children:(0,t.jsxs)(_.C,{children:[(0,t.jsx)(vt,{color:o,"aria-hidden":!0,background:`${o}200`,children:n}),(0,t.jsx)(p.k,{paddingLeft:3,children:(0,t.jsx)(E.O,{variant:"pi",fontWeight:"bold",textColor:`${o}600`,children:e})})]})}),st=({addComponentToDZ:e,customRowComponent:n,editTarget:o,firstLoopComponentUid:i,isFromDynamicZone:c=!1,isMain:l=!1,isNestedInDZComponent:g=!1,isSub:j=!1,items:C=[],secondLoopComponentUid:M,targetUid:u})=>{const{formatMessage:a}=(0,I.c)(),{trackUsage:h}=(0,d.m4)(),{isInDevelopmentMode:m,modifiedData:B,isInContentTypeView:P}=(0,r.u)(),{onOpenModalAddField:v}=(0,r.a)(),O=()=>{h("hasClickedCTBAddFieldBanner"),v({forTarget:o,targetUid:u})};return u?C.length===0&&l?(0,t.jsxs)(k.o,{colCount:2,rowCount:2,children:[(0,t.jsx)(S.o,{children:(0,t.jsxs)(F.Tr,{children:[(0,t.jsx)(W.Th,{children:(0,t.jsx)(E.O,{variant:"sigma",textColor:"neutral600",children:a({id:"global.name",defaultMessage:"Name"})})}),(0,t.jsx)(W.Th,{children:(0,t.jsx)(E.O,{variant:"sigma",textColor:"neutral600",children:a({id:"global.type",defaultMessage:"Type"})})})]})}),(0,t.jsx)(d.YZ,{action:(0,t.jsx)(x.Z,{onClick:O,size:"L",startIcon:(0,t.jsx)($.c,{}),variant:"secondary",children:a({id:(0,r.g)("table.button.no-fields"),defaultMessage:"Add new field"})}),colSpan:2,content:P?{id:(0,r.g)("table.content.no-fields.collection-type"),defaultMessage:"Add your first field to this Collection-Type"}:{id:(0,r.g)("table.content.no-fields.component"),defaultMessage:"Add your first field to this component"}})]}):(0,t.jsxs)(ft,{children:[(0,t.jsx)(p.k,{paddingLeft:6,paddingRight:l?6:0,...l&&{style:{overflowX:"auto"}},children:(0,t.jsxs)("table",{children:[l&&(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:(0,t.jsx)(E.O,{variant:"sigma",textColor:"neutral600",children:a({id:"global.name",defaultMessage:"Name"})})}),(0,t.jsx)("th",{colSpan:2,children:(0,t.jsx)(E.O,{variant:"sigma",textColor:"neutral600",children:a({id:"global.type",defaultMessage:"Type"})})})]})}),(0,t.jsx)("tbody",{children:C.map(T=>{const{type:A}=T,L=n;return(0,t.jsxs)(R.Fragment,{children:[(0,t.jsx)(L,{...T,isNestedInDZComponent:g,targetUid:u,editTarget:o,firstLoopComponentUid:i,isFromDynamicZone:c,secondLoopComponentUid:M}),A==="component"&&(0,t.jsx)(tt,{...T,customRowComponent:n,targetUid:u,isNestedInDZComponent:c,editTarget:o,firstLoopComponentUid:i}),A==="dynamiczone"&&(0,t.jsx)(Tt,{...T,customRowComponent:n,addComponent:e,targetUid:u})]},T.name)})})]})}),l&&m&&(0,t.jsx)(w.U,{icon:(0,t.jsx)($.c,{}),onClick:O,children:a({id:(0,r.g)(`form.button.add.field.to.${B.contentType?B.contentType.schema.kind:o||"collectionType"}`),defaultMessage:"Add another field"})}),j&&m&&(0,t.jsx)(Bt,{icon:(0,t.jsx)($.c,{}),onClick:O,color:c?"primary":"neutral",children:a({id:(0,r.g)("form.button.add.field.to.component"),defaultMessage:"Add another field"})})]}):(0,t.jsxs)(k.o,{colCount:2,rowCount:2,children:[(0,t.jsx)(S.o,{children:(0,t.jsxs)(F.Tr,{children:[(0,t.jsx)(W.Th,{children:(0,t.jsx)(E.O,{variant:"sigma",textColor:"neutral600",children:a({id:"global.name",defaultMessage:"Name"})})}),(0,t.jsx)(W.Th,{children:(0,t.jsx)(E.O,{variant:"sigma",textColor:"neutral600",children:a({id:"global.type",defaultMessage:"Type"})})})]})}),(0,t.jsx)(d.YZ,{colSpan:2,content:{id:(0,r.g)("table.content.create-first-content-type"),defaultMessage:"Create your first Collection-Type"}})]})},At=(0,f.cp)(p.k)`
  position: absolute;
  left: -1.125rem;
  top: 0px;

  &:before {
    content: '';
    width: ${4/16}rem;
    height: ${12/16}rem;
    background: ${({theme:e,color:n})=>e.colors[n]};
    display: block;
  }
`,Wt=f.cp.svg`
  position: relative;
  flex-shrink: 0;
  transform: translate(-0.5px, -1px);

  * {
    fill: ${({theme:e,color:n})=>e.colors[n]};
  }
`,It=e=>(0,t.jsx)(At,{children:(0,t.jsx)(Wt,{width:"20",height:"23",viewBox:"0 0 20 23",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e,children:(0,t.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.02477 14.7513C8.65865 17.0594 11.6046 18.6059 17.5596 18.8856C18.6836 18.9384 19.5976 19.8435 19.5976 20.9688V20.9688C19.5976 22.0941 18.6841 23.0125 17.5599 22.9643C10.9409 22.6805 6.454 20.9387 3.75496 17.1258C0.937988 13.1464 0.486328 7.39309 0.486328 0.593262H4.50974C4.50974 7.54693 5.06394 11.9813 7.02477 14.7513Z"})})}),$t=({type:e,customField:n=null,repeatable:o=!1})=>{const{formatMessage:i}=(0,I.c)();let c=e;return["integer","biginteger","float","decimal"].includes(e)?c="number":["string"].includes(e)&&(c="text"),n?(0,t.jsx)(E.O,{children:i({id:(0,r.g)("attribute.customField"),defaultMessage:"Custom field"})}):(0,t.jsxs)(E.O,{children:[i({id:(0,r.g)(`attribute.${c}`),defaultMessage:e}),"\xA0",o&&i({id:(0,r.g)("component.repeatable"),defaultMessage:"(repeatable)"})]})},Rt=({content:e})=>(0,t.jsx)(t.Fragment,{children:Q(e)}),Lt=(0,f.cp)(p.k)`
  position: relative;
`,Ut=(0,R.memo)(({configurable:e=!0,customField:n=null,editTarget:o,firstLoopComponentUid:i=null,isFromDynamicZone:c=!1,name:l,onClick:g,relation:j="",repeatable:C=!1,secondLoopComponentUid:M=null,target:u=null,targetUid:a=null,type:h})=>{const{contentTypes:m,isInDevelopmentMode:B,removeAttribute:P}=(0,r.u)(),{formatMessage:v}=(0,I.c)(),O=h==="relation"&&j.includes("morph"),T=["integer","biginteger","float","decimal"].includes(h)?"number":h,A=D(m,[u],{}),L=D(A,["schema","displayName"],""),U=D(A,"plugin"),G=u?"relation":T,Z=()=>{O||e!==!1&&g(o,M||i||a,l,h,n)};let b;return M&&i?b=2:i?b=1:b=0,(0,t.jsxs)(Lt,{as:"tr",...(0,d.on)({fn:Z,condition:B&&e&&!O}),children:[(0,t.jsxs)("td",{style:{position:"relative"},children:[b!==0&&(0,t.jsx)(It,{color:c?"primary200":"neutral150"}),(0,t.jsxs)(_.C,{paddingLeft:2,gap:4,children:[(0,t.jsx)(r.A,{type:G,customField:n}),(0,t.jsx)(E.O,{fontWeight:"bold",children:l})]})]}),(0,t.jsx)("td",{children:u?(0,t.jsxs)(E.O,{children:[v({id:(0,r.g)(`modelPage.attribute.${O?"relation-polymorphic":"relationWith"}`),defaultMessage:"Relation with"}),"\xA0",(0,t.jsxs)("span",{style:{fontStyle:"italic"},children:[(0,t.jsx)(Rt,{content:L}),"\xA0",U&&`(${v({id:(0,r.g)("from"),defaultMessage:"from"})}: ${U})`]})]}):(0,t.jsx)($t,{type:h,customField:n,repeatable:C})}),(0,t.jsx)("td",{children:B?(0,t.jsx)(_.C,{justifyContent:"flex-end",...d.Ii,children:e?(0,t.jsxs)(_.C,{gap:1,children:[!O&&(0,t.jsx)(N.w,{onClick:Z,label:`${v({id:"app.utils.edit",defaultMessage:"Edit"})} ${l}`,noBorder:!0,icon:(0,t.jsx)(J.c,{})}),(0,t.jsx)(N.w,{onClick:z=>{z.stopPropagation(),P(o,l,M||i||"")},label:`${v({id:"global.delete",defaultMessage:"Delete"})} ${l}`,noBorder:!0,icon:(0,t.jsx)(pt.c,{})})]}):(0,t.jsx)(_t.c,{})}):(0,t.jsx)(p.k,{height:(0,d.W8)(32)})})]})}),Kt=e=>{let n;switch(e){case"date":case"datetime":case"time":case"timestamp":n="date";break;case"integer":case"biginteger":case"decimal":case"float":n="number";break;case"string":case"text":n="text";break;case"":n="relation";break;default:n=e}return n},kt={collectionTypesConfigurations:[{action:"plugin::content-manager.collection-types.configure-view",subject:null}],componentsConfigurations:[{action:"plugin::content-manager.components.configure-layout",subject:null}],singleTypesConfigurations:[{action:"plugin::content-manager.single-types.configure-view",subject:null}]},St=(0,R.memo)(({disabled:e,isTemporary:n=!1,isInContentTypeView:o=!0,contentTypeKind:i="collectionType",targetUid:c=""})=>{const{formatMessage:l}=(0,I.c)(),{push:g}=(0,H.Uz)(),{collectionTypesConfigurations:j,componentsConfigurations:C,singleTypesConfigurations:M}=kt,u=l({id:"content-type-builder.form.button.configure-view",defaultMessage:"Configure the view"});let a=j;const h=()=>(n||g(o?`/content-manager/collection-types/${c}/configurations/edit`:`/content-manager/components/${c}/configurations/edit`),!1);return o&&i==="singleType"&&(a=M),o||(a=C),(0,t.jsx)(d.Yj,{permissions:a,children:(0,t.jsx)(x.Z,{startIcon:(0,t.jsx)(gt.c,{}),variant:"tertiary",onClick:h,disabled:n||e,children:u})})}),Ft=()=>{const{initialData:e,modifiedData:n,isInDevelopmentMode:o,isInContentTypeView:i,submitData:c}=(0,r.u)(),{formatMessage:l}=(0,I.c)(),{trackUsage:g}=(0,d.m4)(),j=(0,H.SU)("/plugins/content-type-builder/:kind/:currentUID"),{onOpenModalAddComponentsToDZ:C,onOpenModalAddField:M,onOpenModalEditField:u,onOpenModalEditSchema:a,onOpenModalEditCustomField:h}=(0,r.a)(),m=i?"contentType":"component",B=[m,"schema","attributes"],P=D(n,[m,"uid"]),v=D(n,[m,"isTemporary"],!1),O=D(n,[m,"schema","kind"],null),T=D(n,B,[]),A=Et(e,[m,"plugin"]),L=!X(n,e),U=i?"contentType":"component",G=y=>{C({dynamicZoneTarget:y,targetUid:P})},Z=async(y,nt,ot,it,at)=>{const lt=Kt(it);at?h({forTarget:y,targetUid:nt,attributeName:ot,attributeType:lt,customFieldUid:at}):u({forTarget:y,targetUid:nt,attributeName:ot,attributeType:lt,step:it==="component"?"2":null})};let b=D(n,[m,"schema","displayName"],"");const z=D(n,[m,"schema","kind"],""),V=j?.params.currentUID==="create-content-type";!b&&V&&(b=l({id:(0,r.g)("button.model.create"),defaultMessage:"Create new collection type"}));const Nt=()=>{const y=z||m;y==="collectionType"&&g("willEditNameOfContentType"),y==="singleType"&&g("willEditNameOfSingleType"),a({modalType:m,forTarget:m,targetUid:P,kind:y})};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(H.K2,{message:y=>y.hash==="#back"?!1:l({id:(0,r.g)("prompt.unsaved")}),when:L}),(0,t.jsx)(dt.a,{id:"title",primaryAction:o&&(0,t.jsxs)(_.C,{gap:2,children:[!V&&(0,t.jsx)(x.Z,{startIcon:(0,t.jsx)($.c,{}),variant:"secondary",onClick:()=>{M({forTarget:U,targetUid:P})},children:l({id:(0,r.g)("button.attributes.add.another"),defaultMessage:"Add another field"})}),(0,t.jsx)(x.Z,{startIcon:(0,t.jsx)(ut.c,{}),onClick:()=>c(),type:"submit",disabled:X(n,e),children:l({id:"global.save",defaultMessage:"Save"})})]}),secondaryAction:o&&!A&&!V&&(0,t.jsx)(x.Z,{startIcon:(0,t.jsx)(J.c,{}),variant:"tertiary",onClick:Nt,children:l({id:"app.utils.edit",defaultMessage:"Edit"})}),title:Q(b),subtitle:l({id:(0,r.g)("listView.headerLayout.description"),defaultMessage:"Build the data architecture of your content"}),navigationAction:(0,t.jsx)(d.cH,{startIcon:(0,t.jsx)(mt.c,{}),to:"/plugins/content-type-builder/",children:l({id:"global.back",defaultMessage:"Back"})})}),(0,t.jsx)(ct.S,{children:(0,t.jsxs)(_.C,{direction:"column",alignItems:"stretch",gap:4,children:[(0,t.jsx)(_.C,{justifyContent:"flex-end",children:(0,t.jsx)(_.C,{gap:2,children:(0,t.jsx)(St,{targetUid:P,isTemporary:v,isInContentTypeView:i,contentTypeKind:O,disabled:V},"link-to-cm-settings-view")})}),(0,t.jsx)(p.k,{background:"neutral0",shadow:"filterShadow",hasRadius:!0,children:(0,t.jsx)(st,{items:T,customRowComponent:y=>(0,t.jsx)(Ut,{...y,onClick:Z}),addComponentToDZ:G,targetUid:P,editTarget:U,isMain:!0})})]})})]})}}}]);
