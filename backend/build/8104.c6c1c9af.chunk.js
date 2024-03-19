(self.webpackChunkgettem=self.webpackChunkgettem||[]).push([[8104],{92268:N=>{function w(u,s,j,f){for(var y=-1,D=u==null?0:u.length;++y<D;){var b=u[y];s(f,b,j(b),u)}return f}N.exports=w},20456:(N,w,u)=>{var s=u(80232);function j(f,y,D,b){return s(f,function(R,$,K){y(b,R,D(R),K)}),b}N.exports=j},4068:(N,w,u)=>{var s=u(92268),j=u(20456),f=u(24020),y=u(75516);function D(b,R){return function($,K){var le=y($)?s:j,de=R?R():{};return le($,b,f(K,2),de)}}N.exports=D},30680:(N,w,u)=>{var s=u(92188),j=u(4068),f=Object.prototype,y=f.hasOwnProperty,D=j(function(b,R,$){y.call(b,$)?b[$].push(R):s(b,$,[R])});N.exports=D},28104:(N,w,u)=>{"use strict";u.d(w,{P:()=>Rs});var s=u(19968),j=u(62552),f=u(48936),y=u(5e3),D=u(19576),b=u(63358),R=u(35676),$=u(11208),K=u(2931),le=u(25824),de=u(3548),Ne=u(32912),Ve=u(42616),Ge=u(34404),we=u(12248),fe=u(32568),He=u(28724),Fe=u(70996),Xe=u(6496),xe=u(53804),J=u(80700),_e=u(59232),je=u(29088),ce=u(96556),A=u(85676),ne=u(56781),Q=u(79804),V=u(35184),B=u(14632),H=u(4400),Ye=u(43164),Ze=u(36196),ue=u(30680),ye=u(21968),S=u(3704),ze=u(14520),Je=u(46596),Qe=u(64472),qe=u(79484),es=u(5848),ss=u(39820),ts=u(30840);const[ns,os]=(0,Ye.G)("PermissionsDataManager"),Z=()=>os("usePermissionsDataManager"),Oe=e=>Array.isArray(e)?e.reduce((t,o)=>(Array.isArray(o)?t.push(...Oe(o)):t.push(o),t),[]):[],X=e=>(0,H.F)(e)?Oe(Object.values(e).map(t=>(0,H.F)(t)?X(t):t)):[],Ee=(e,t,o)=>e.find(n=>n.action===t&&n.subject===o),is=e=>{const t=Me(e.plugins),o=Me(e.settings),n=be(e.collectionTypes),r=be(e.singleTypes);return[...t,...o,...n,...r]},Me=e=>Object.values(e).reduce((t,o)=>{const n=Object.values(o).reduce((r,a)=>{const d=Object.entries(a).reduce((i,[l,{conditions:c,properties:{enabled:p}}])=>(p&&i.push({action:l,subject:null,conditions:pe(c),properties:{}}),i),[]);return[...r,...d]},[]);return[...t,...n]},[]),be=e=>Object.entries(e).reduce((o,n)=>{const[r,a]=n,d=Object.entries(a).reduce((i,l)=>{const[c,p]=l;if(!X(p).some(C=>C))return i;if(!p?.properties?.enabled){const C=Object.entries(p.properties).reduce((x,_)=>{const[h,m]=_;return x.properties[h]=Ae(m),x},{action:c,subject:r,conditions:pe(p.conditions),properties:{}});return[...i,C]}return p.properties.enabled&&i.push({action:c,subject:r,properties:{},conditions:pe(p.conditions)}),i},[]);return[...o,...d]},[]),Ae=(e,t="")=>Object.entries(e).reduce((o,n)=>{const[r,a]=n;return(0,H.F)(a)?[...o,...Ae(a,`${t}${r}.`)]:(a&&!(0,H.F)(a)&&o.push(`${t}${r}`),o)},[]),pe=e=>Object.entries(e).filter(([,t])=>t).map(([t])=>t),Pe=(e,t=[])=>e.reduce((o,n)=>(o[n.id]=t.indexOf(n.id)!==-1,o),{}),ve=(e,t,o=[])=>e.reduce((n,{categoryId:r,childrenForm:a})=>{const d=a.reduce((i,l)=>(i[l.subCategoryId]=l.actions.reduce((c,p)=>{const g=Ee(o,p.action,null);return c[p.action]={properties:{enabled:g!==void 0},conditions:Pe(t,g?.conditions??[])},c},{}),i),{});return n[r]=d,n},{}),rs=(e,t,o)=>{const n=({children:r=[]},a,d="")=>r.reduce((i,l)=>{if(l.children)return{...i,[l.value]:n(l,a,`${d}${l.value}.`)};const c=a.indexOf(`${d}${l.value}`)!==-1;return i[l.value]=c,i},{});return e.reduce((r,a)=>{const d=t.properties.find(({value:i})=>i===a);if(d){const i=o?.properties[d.value]??[],l=n(d,i);r.properties[a]=l}return r},{properties:{}})},Te=({subjects:e,actions:t=[]},o,n=[])=>t.reduce((r,a)=>{const d=a.subjects.reduce((l,c)=>{const p=e.find(({uid:g})=>g===c)||null;return p&&(l[c]=p),l},{});if(Q(d))return r;const i=Object.keys(d).reduce((l,c)=>{const{actionId:p,applyToProperties:g}=a,_=d[c].properties.map(({value:P})=>P).every(P=>(g||[]).indexOf(P)===-1),h=Ee(n,p,c),m=Pe(o,h?.conditions??[]);if(l[c]||(l[c]={}),Q(g)||_)return l[c][p]={properties:{enabled:h!==void 0},conditions:m},l;const O=rs(g,d[c],h);return l[c][p]={...O,conditions:m},l},{});return Ze(r,i)},{}),Se=(e,t)=>Object.entries(ue(e,t)).map(([o,n])=>({category:o,categoryId:o.split(" ").join("-"),childrenForm:Object.entries(ue(n,"subCategory")).map(([r,a])=>({subCategoryName:r,subCategoryId:r.split(" ").join("-"),actions:a}))})),oe=e=>Object.keys(e).reduce((t,o)=>{const n=e[o];if((0,H.F)(n)&&!ne(n,"conditions"))return{...t,[o]:oe(n)};if((0,H.F)(n)&&ne(n,"conditions")&&!X(ye(n,"conditions")).some(a=>a)){const a=Object.keys(n.conditions).reduce((d,i)=>(d[i]=!1,d),{});return{...t,[o]:{...n,conditions:a}}}return t[o]=n,t},{}),q=(e,t,o=!1)=>Object.keys(e).reduce((n,r)=>{const a=e[r];return r==="conditions"&&!o?(n[r]=a,n):(0,H.F)(a)?{...n,[r]:q(a,t,r==="fields")}:(n[r]=t,n)},{}),G=`${120/16}rem`,he=`${200/16}rem`,ie=`${53/16}rem`,ge=e=>e?Object.entries(e).reduce((t,[o,n])=>(o!=="conditions"&&(t[o]=n),t),{}):null,Y=e=>{const t=ge(e),o=X(t);if(!o.length)return{hasAllActionsSelected:!1,hasSomeActionsSelected:!1};const n=o.every(a=>a),r=o.some(a=>a)&&!n;return{hasAllActionsSelected:n,hasSomeActionsSelected:r}},re=e=>e.charAt(0).toUpperCase()+e.slice(1),De=(0,S.default)(f.C)`
  padding-right: ${({theme:e})=>e.spaces[2]};
  overflow: hidden;
  flex: 1;
  ${({isCollapsable:e})=>e&&"cursor: pointer;"}
`,Ce=S.default.div`
  width: ${G};
`,$e=()=>(0,s.jsx)(y.k,{color:"danger700",paddingLeft:1,children:"*"}),Le=({checkboxName:e="",children:t,isActive:o=!1,isCollapsable:n=!1,isFormDisabled:r=!1,label:a,onChange:d,onClick:i,someChecked:l=!1,value:c})=>{const{formatMessage:p}=(0,B.c)();return(0,s.jsxs)(f.C,{alignItems:"center",paddingLeft:6,width:he,shrink:0,children:[(0,s.jsx)(y.k,{paddingRight:2,children:(0,s.jsx)(D.c,{name:e,"aria-label":p({id:"Settings.permissions.select-all-by-permission",defaultMessage:"Select all {label} permissions"},{label:a}),disabled:r,onValueChange:g=>d({target:{name:e,value:g}}),indeterminate:l,value:c})}),(0,s.jsxs)(De,{title:a,alignItems:"center",isCollapsable:n,...n&&{onClick:i,"aria-expanded":o,onKeyDown:({key:g})=>(g==="Enter"||g===" ")&&i(),tabIndex:0,role:"button"},children:[(0,s.jsx)(b.O,{fontWeight:o?"bold":void 0,textColor:o?"primary600":"neutral800",ellipsis:!0,children:re(a)}),t]})]})},as=({availableActions:e=[],childrenForm:t=[],isFormDisabled:o,label:n,pathToData:r,propertyName:a})=>{const d=(0,j.useMemo)(()=>e.map(i=>{const l=Array.isArray(i.applyToProperties)&&i.applyToProperties.indexOf(a)!==-1&&i.isDisplayed;return{label:i.label,actionId:i.actionId,isActionRelatedToCurrentProperty:l}}),[e,a]);return(0,s.jsxs)(f.C,{display:"inline-flex",direction:"column",minWidth:0,children:[(0,s.jsx)(ms,{label:n,headers:d}),(0,s.jsx)(y.k,{children:t.map(({children:i,label:l,value:c,required:p},g)=>(0,s.jsx)(ls,{childrenForm:i,label:l,isFormDisabled:o,name:c,required:p,propertyActions:d,pathToData:r,propertyName:a,isOdd:g%2===0},c))})]})},ls=({childrenForm:e=[],label:t,isFormDisabled:o=!1,name:n,required:r=!1,pathToData:a,propertyActions:d,propertyName:i,isOdd:l=!1})=>{const{formatMessage:c}=(0,B.c)(),[p,g]=j.useState(null),{modifiedData:C,onChangeCollectionTypeLeftActionRowCheckbox:x,onChangeParentCheckbox:_,onChangeSimpleCheckbox:h}=Z(),m=p===n,O=(0,j.useMemo)(()=>Array.isArray(e)?e:[],[e]),P=O.length>0,L=j.useCallback(()=>{P&&g(v=>v===n?null:n)},[P,n]),E=({target:{value:v}})=>{x(a,i,n,v)},{hasAllActionsSelected:M,hasSomeActionsSelected:T}=(0,j.useMemo)(()=>ds(d,C,a,i,n),[d,C,a,i,n]);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(cs,{alignItems:"center",isCollapsable:P,isActive:m,background:l?"neutral100":"neutral0",children:(0,s.jsxs)(f.C,{children:[(0,s.jsxs)(Le,{onChange:E,onClick:L,isCollapsable:P,isFormDisabled:o,label:t,someChecked:T,value:M,isActive:m,children:[r&&(0,s.jsx)($e,{}),(0,s.jsx)(ee,{$isActive:m})]}),(0,s.jsx)(f.C,{children:d.map(({label:v,isActionRelatedToCurrentProperty:I,actionId:W})=>{if(!I)return(0,s.jsx)(Ce,{},v);const k=[...a.split(".."),W,"properties",i,n];if(!P){const U=A(C,k,!1);return(0,s.jsx)(f.C,{width:G,position:"relative",justifyContent:"center",alignItems:"center",children:(0,s.jsx)(D.c,{disabled:o,name:k.join(".."),"aria-label":c({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${n} ${v}`}),onValueChange:Ks=>{h({target:{name:k.join(".."),value:Ks}})},value:U})},W)}const z=A(C,k,{}),{hasAllActionsSelected:F,hasSomeActionsSelected:te}=Y(z);return(0,s.jsx)(f.C,{width:G,position:"relative",justifyContent:"center",alignItems:"center",children:(0,s.jsx)(D.c,{disabled:o,name:k.join(".."),onValueChange:U=>{_({target:{name:k.join(".."),value:U}})},"aria-label":c({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${n} ${v}`}),value:F,indeterminate:te})},v)})})]})}),m&&(0,s.jsx)(ke,{childrenForm:O,isFormDisabled:o,parentName:n,pathToDataFromActionRow:a,propertyName:i,propertyActions:d,recursiveLevel:0})]})},ds=(e,t,o,n,r)=>{const d=e.reduce((i,l)=>(l.isActionRelatedToCurrentProperty&&i.push(l.actionId),i),[]).reduce((i,l)=>{const c=A(t,[...o.split(".."),l,"properties",n,r],!1);return i[l]=c,i},{});return Y(d)},cs=(0,S.default)(f.C)`
  height: ${ie};
  flex: 1;

  ${({isCollapsable:e,theme:t})=>e&&`
      ${ee} {
        display: block;
        color: ${t.colors.neutral100};
      }
      &:hover {
        ${se(t)}
      }
  `}
  ${({isActive:e,theme:t})=>e&&se(t)};
`,ee=(0,S.default)(ze.c)`
  display: none;
  width: ${10/16}rem;
  transform: rotate(${({$isActive:e})=>e?"180":"0"}deg);
  margin-left: ${({theme:e})=>e.spaces[2]};
`,ke=({childrenForm:e=[],isFormDisabled:t,recursiveLevel:o,pathToDataFromActionRow:n,propertyActions:r,parentName:a,propertyName:d})=>{const{formatMessage:i}=(0,B.c)(),{modifiedData:l,onChangeParentCheckbox:c,onChangeSimpleCheckbox:p}=Z(),[g,C]=j.useState(null),x=h=>{C(m=>m===h?null:h)},_=(0,j.useMemo)(()=>g?e.find(({value:h})=>h===g):null,[g,e]);return(0,s.jsxs)(y.k,{paddingLeft:"2rem",children:[(0,s.jsx)(hs,{}),e.map(({label:h,value:m,required:O,children:P},L)=>{const E=L+1<e.length,M=Array.isArray(P),T=g===m;return(0,s.jsxs)(us,{isVisible:E,children:[(0,s.jsxs)(f.C,{height:ie,children:[(0,s.jsx)(gs,{children:(0,s.jsx)(Cs,{width:"20",height:"23",viewBox:"0 0 20 23",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"primary200",children:(0,s.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.02477 14.7513C8.65865 17.0594 11.6046 18.6059 17.5596 18.8856C18.6836 18.9384 19.5976 19.8435 19.5976 20.9688V20.9688C19.5976 22.0941 18.6841 23.0125 17.5599 22.9643C10.9409 22.6805 6.454 20.9387 3.75496 17.1258C0.937988 13.1464 0.486328 7.39309 0.486328 0.593262H4.50974C4.50974 7.54693 5.06394 11.9813 7.02477 14.7513Z",fill:"#D9D8FF"})})}),(0,s.jsxs)(f.C,{style:{flex:1},children:[(0,s.jsx)(ps,{level:o,isActive:T,isCollapsable:M,children:(0,s.jsxs)(De,{alignItems:"center",isCollapsable:M,...M&&{onClick:()=>x(m),"aria-expanded":T,onKeyDown:({key:v})=>(v==="Enter"||v===" ")&&x(m),tabIndex:0,role:"button"},title:h,children:[(0,s.jsx)(b.O,{ellipsis:!0,children:re(h)}),O&&(0,s.jsx)($e,{}),(0,s.jsx)(ee,{$isActive:T})]})}),(0,s.jsx)(f.C,{style:{flex:1},children:r.map(({actionId:v,label:I,isActionRelatedToCurrentProperty:W})=>{if(!W)return(0,s.jsx)(Ce,{},v);const k=[...n.split(".."),v,"properties",d,...a.split(".."),m],z=A(l,k,!1);if(!P)return(0,s.jsx)(f.C,{position:"relative",width:G,justifyContent:"center",alignItems:"center",children:(0,s.jsx)(D.c,{disabled:t,name:k.join(".."),"aria-label":i({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${a} ${h} ${I}`}),onValueChange:U=>{p({target:{name:k.join(".."),value:U}})},value:z})},I);const{hasAllActionsSelected:F,hasSomeActionsSelected:te}=Y(z);return(0,s.jsx)(f.C,{position:"relative",width:G,justifyContent:"center",alignItems:"center",children:(0,s.jsx)(D.c,{disabled:t,name:k.join(".."),"aria-label":i({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${a} ${h} ${I}`}),onValueChange:U=>{c({target:{name:k.join(".."),value:U}})},value:F,indeterminate:te},I)},I)})})]})]}),_&&T&&(0,s.jsx)(y.k,{paddingBottom:2,children:(0,s.jsx)(ke,{isFormDisabled:t,parentName:`${a}..${m}`,pathToDataFromActionRow:n,propertyActions:r,propertyName:d,recursiveLevel:o+1,childrenForm:_.children})})]},m)})]})},us=(0,S.default)(y.k)`
  border-left: ${({isVisible:e,theme:t})=>e?`4px solid ${t.colors.primary200}`:"4px solid transparent"};
`,ps=(0,S.default)(f.C)`
  padding-left: ${({theme:e})=>e.spaces[4]};
  width: ${({level:e})=>145-e*36}px;

  ${({isCollapsable:e,theme:t})=>e&&`
      ${ee} {
        display: block;
        color: ${t.colors.neutral100};
      }
      &:hover {
        ${se(t)}
      }
  `}
  ${({isActive:e,theme:t})=>e&&se(t)};
`,hs=S.default.div`
  padding-top: ${({theme:e})=>e.spaces[2]};
  margin-top: ${({theme:e})=>e.spaces[2]};
  width: ${4/16}rem;
  background-color: ${({theme:e})=>e.colors.primary200};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`,gs=(0,S.default)(y.k)`
  transform: translate(-4px, -12px);

  &:before {
    content: '';
    width: ${4/16}rem;
    height: ${12/16}rem;
    background: ${({theme:e})=>e.colors.primary200};
    display: block;
  }
`,Cs=S.default.svg`
  position: relative;
  flex-shrink: 0;
  transform: translate(-0.5px, -1px);

  * {
    fill: ${({theme:e,color:t})=>e.colors[t]};
  }
`,ms=({headers:e=[],label:t})=>{const{formatMessage:o}=(0,B.c)();return(0,s.jsxs)(f.C,{children:[(0,s.jsx)(f.C,{width:he,height:ie,shrink:0,alignItems:"center",paddingLeft:6,children:(0,s.jsx)(b.O,{variant:"sigma",textColor:"neutral500",children:o({id:"Settings.roles.form.permission.property-label",defaultMessage:"{label} permissions"},{label:t})})}),e.map(n=>n.isActionRelatedToCurrentProperty?(0,s.jsx)(f.C,{width:G,shrink:0,justifyContent:"center",children:(0,s.jsx)(b.O,{variant:"sigma",textColor:"neutral500",children:o({id:`Settings.roles.form.permissions.${n.label.toLowerCase()}`,defaultMessage:n.label})})},n.label):(0,s.jsx)(f.C,{width:G,shrink:0},n.label))]})},se=e=>(0,S.css)`
  ${b.O} {
    color: ${e.colors.primary600};
    font-weight: ${e.fontWeights.bold};
  }
  ${ee} {
    display: block;

    path {
      fill: ${e.colors.primary600};
    }
  }
`,fs=({onClick:e,className:t,hasConditions:o=!1,variant:n="tertiary"})=>{const{formatMessage:r}=(0,B.c)();return(0,s.jsx)(xs,{hasConditions:o,className:t,children:(0,s.jsx)(R.Z,{variant:n,startIcon:(0,s.jsx)(Je.c,{}),onClick:e,children:r({id:"global.settings",defaultMessage:"Settings"})})})},xs=(0,S.default)(y.k)`
  ${({hasConditions:e,disabled:t,theme:o})=>e&&`
    &:before {
      content: '';
      position: absolute;
      top: -3px;
      left: -10px;
      width: 6px;
      height: 6px;
      border-radius: ${20/16}rem;;
      background: ${t?o.colors.neutral100:o.colors.primary600};
    }
  `}
`,ae=(0,S.default)(fs)``,Re=({actions:e=[],headerBreadCrumbs:t=[],isFormDisabled:o,onClosed:n,onToggle:r})=>{const{formatMessage:a}=(0,B.c)(),{availableConditions:d,modifiedData:i,onChangeConditions:l}=Z(),c=j.useMemo(()=>Object.entries(ue(d,"category")),[d]),p=e.filter(({isDisplayed:h,hasSomeActionsSelected:m,hasAllActionsSelected:O})=>h&&Boolean(m||O)),[g,C]=j.useState(_s(p,i,c)),x=(h,m)=>{C((0,je.cp)(O=>{O[h]||(O[h]={}),O[h].default||(O[h].default={}),O[h].default=m}))},_=()=>{const h=Object.entries(g).reduce((m,O)=>{const[P,L]=O,E=Object.values(L).reduce((M,T)=>({...M,...T}),{});return m[P]=E,m},{});l(h),r()};return(0,s.jsxs)($.E,{labelledBy:"condition-modal-breadcrumbs",onClose:n,children:[(0,s.jsx)(K.k,{children:(0,s.jsx)(es.M,{id:"condition-modal-breadcrumbs",label:t.join(", "),children:t.map((h,m,O)=>(0,s.jsx)(ss.i,{isCurrent:m===O.length-1,children:ts(a({id:h,defaultMessage:h}))},h))})}),(0,s.jsxs)(le.a,{children:[p.length===0&&(0,s.jsx)(b.O,{children:a({id:"Settings.permissions.conditions.no-actions",defaultMessage:"You first need to select actions (create, read, update, ...) before defining conditions on them."})}),(0,s.jsx)("ul",{children:p.map(({actionId:h,label:m,pathToConditionsObject:O},P)=>{const L=O.join("..");return(0,s.jsx)(js,{arrayOfOptionsGroupedByCategory:c,label:m,isFormDisabled:o,isGrey:P%2===0,name:L,onChange:x,value:A(g,L,{})},h)})})]}),(0,s.jsx)(de._,{startActions:(0,s.jsx)(R.Z,{variant:"tertiary",onClick:r,children:a({id:"app.components.Button.cancel",defaultMessage:"Cancel"})}),endActions:(0,s.jsx)(R.Z,{onClick:_,children:a({id:"Settings.permissions.conditions.apply",defaultMessage:"Apply"})})})]})},_s=(e,t,o)=>e.reduce((n,r)=>{const a=A(t,[...r.pathToConditionsObject,"conditions"],{}),d=o.reduce((i,l)=>{const[c,p]=l,g=p.reduce((C,x)=>(C[x.id]=A(a,x.id,!1),C),{});return i[c]=g,i},{});return n[r.pathToConditionsObject.join("..")]=d,n},{}),js=({arrayOfOptionsGroupedByCategory:e,isFormDisabled:t=!1,isGrey:o=!1,label:n,name:r,onChange:a,value:d})=>{const{formatMessage:i}=(0,B.c)(),l=c=>{a&&a(r,Es(e,c))};return(0,s.jsxs)(f.C,{as:"li",background:o?"neutral100":"neutral0",paddingBottom:3,paddingTop:3,children:[(0,s.jsxs)(f.C,{paddingLeft:6,style:{width:180},children:[(0,s.jsxs)(b.O,{variant:"sigma",textColor:"neutral600",children:[i({id:"Settings.permissions.conditions.can",defaultMessage:"Can"}),"\xA0"]}),(0,s.jsx)(b.O,{variant:"sigma",title:n,textColor:"primary600",ellipsis:!0,children:i({id:`Settings.roles.form.permissions.${n.toLowerCase()}`,defaultMessage:n})}),(0,s.jsxs)(b.O,{variant:"sigma",textColor:"neutral600",children:["\xA0",i({id:"Settings.permissions.conditions.when",defaultMessage:"When"})]})]}),(0,s.jsx)(y.k,{style:{maxWidth:430,width:"100%"},children:(0,s.jsx)(Ne.U,{id:r,customizeContent:(c=[])=>`${c.length} currently selected`,onChange:l,value:ys(d),options:Os(e),disabled:t})})]})},ys=e=>Object.values(e).map(t=>Object.entries(t).filter(([,o])=>o).map(([o])=>o)).flat(),Os=e=>e.reduce((t,[o,n])=>(t.push({label:re(o),children:n.map(r=>({label:r.displayName,value:r.id}))}),t),[]),Es=(e,t)=>e.map(([,o])=>o).flat().reduce((o,n)=>({[n.id]:t.includes(n.id),...o}),{}),Ms=({actions:e=[],isFormDisabled:t,pathToData:o,subjects:n=[]})=>{const[r,a]=j.useState(null),d=i=>()=>{a(r===i?null:i)};return(0,s.jsx)(s.Fragment,{children:n.map(({uid:i,label:l,properties:c},p)=>{const g=r===i,C=e.map(x=>({...x,isDisplayed:Array.isArray(x.subjects)&&x.subjects.indexOf(i)!==-1}));return(0,s.jsxs)(f.C,{direction:"column",display:"inline-flex",minWidth:"100%",borderColor:"primary600",borderWidth:g?1:0,children:[(0,s.jsx)(bs,{availableActions:C,isActive:g,isGrey:p%2===0,isFormDisabled:t,label:l,onClickToggle:d(i),pathToData:[o,i].join("..")}),g&&c.map(({label:x,value:_,children:h})=>(0,s.jsx)(as,{availableActions:C,childrenForm:h,isFormDisabled:t,label:x,pathToData:[o,i].join(".."),propertyName:_},_))]},i)})})},bs=({availableActions:e=[],isActive:t=!1,isGrey:o=!1,isFormDisabled:n=!1,label:r,onClickToggle:a,pathToData:d})=>{const[i,l]=j.useState(!1),{formatMessage:c}=(0,B.c)(),{modifiedData:p,onChangeParentCheckbox:g,onChangeSimpleCheckbox:C}=Z(),x=()=>{l(M=>!M)},_=()=>{l(!1)},h=A(p,d.split(".."),{}),m=j.useMemo(()=>Object.keys(h).reduce((M,T)=>(M[T]=ye(h[T],"conditions"),M),{}),[h]),{hasAllActionsSelected:O,hasSomeActionsSelected:P}=Y(m),L=j.useMemo(()=>As(e,p,d),[e,p,d]),E=L.some(M=>M.hasConditions);return(0,s.jsxs)(Ps,{isActive:t,children:[(0,s.jsxs)(Ie,{height:ie,flex:1,alignItems:"center",background:o?"neutral100":"neutral0",children:[(0,s.jsx)(Le,{isCollapsable:!0,isFormDisabled:n,label:r,checkboxName:d,onChange:g,onClick:a,someChecked:P,value:O,isActive:t,children:(0,s.jsx)(We,{paddingLeft:2,children:t?(0,s.jsx)(Qe.c,{}):(0,s.jsx)(qe.c,{})})}),(0,s.jsx)(f.C,{style:{flex:1},children:L.map(({actionId:M,hasSomeActionsSelected:T,isDisplayed:v,...I})=>{if(!v)return(0,s.jsx)(Ce,{},M);const{hasConditions:W,hasAllActionsSelected:k,isParentCheckbox:z,checkboxName:F,label:te}=I;return z?(0,s.jsxs)(Be,{justifyContent:"center",alignItems:"center",children:[W&&(0,s.jsx)(y.k,{as:"span",position:"absolute",top:"-6px",left:"37px",width:"6px",height:"6px",borderRadius:"20px",background:"primary600"}),(0,s.jsx)(D.c,{disabled:n,name:F,"aria-label":c({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${te} ${r}`}),onValueChange:U=>{g({target:{name:F,value:U}})},indeterminate:T,value:k})]},M):(0,s.jsxs)(Be,{justifyContent:"center",alignItems:"center",children:[W&&(0,s.jsx)(y.k,{as:"span",position:"absolute",top:"-6px",left:"37px",width:"6px",height:"6px",borderRadius:"20px",background:"primary600"}),(0,s.jsx)(D.c,{disabled:n,indeterminate:W,name:F,onValueChange:U=>{C({target:{name:F,value:U}})},value:k})]},M)})}),i&&(0,s.jsx)(Re,{headerBreadCrumbs:[r,"Settings.permissions.conditions.conditions"],actions:L,isFormDisabled:n,onClosed:_,onToggle:x})]}),(0,s.jsx)(y.k,{transform:"translateY(10px)",right:"9px",position:"absolute",children:(0,s.jsx)(ae,{onClick:x,hasConditions:E})})]})},As=(e,t,o)=>e.map(({actionId:n,isDisplayed:r,applyToProperties:a,label:d})=>{if(!r)return{actionId:n,hasSomeActionsSelected:!1,isDisplayed:r};const i=[...o.split(".."),n],l=Q(a)?[...i,"properties","enabled"]:i,c=A(t,[...i,"conditions"],null),p={actionId:n,checkboxName:l.join(".."),hasConditions:X(c).some(_=>_),isDisplayed:r,label:d,pathToConditionsObject:i};if(Q(a)){const _=A(t,l,!1);return{...p,hasAllActionsSelected:_,hasSomeActionsSelected:_,isParentCheckbox:!1}}const g=A(t,l,null),{hasAllActionsSelected:C,hasSomeActionsSelected:x}=Y(g);return{...p,hasAllActionsSelected:C,hasSomeActionsSelected:x,isParentCheckbox:!0}}),me=(e,t)=>`
  ${Ie} {
    background-color: ${e.colors.primary100};
    color: ${e.colors.primary600};
    border-radius: ${t?"2px 2px 0 0":"2px"};
  }
  ${We} {
    display: flex;
  }
  ${ae} {
    display: block;
  }
  &:hover {
    ${se(e)}
  }

  &:focus-within {
    ${()=>me(e,t)}
  }
`,Ie=(0,S.default)(f.C)`
  border: 1px solid transparent;
`,Ps=S.default.div`
  display: inline-flex;
  min-width: 100%;

  ${ae} {
    display: none;
  }
  ${({isActive:e,theme:t})=>e&&me(t,e)}
  &:hover {
    ${({theme:e,isActive:t})=>me(e,t)}
  }
`,Be=(0,S.default)(f.C)`
  width: ${G};
  position: relative;
`,We=(0,S.default)(y.k)`
  display: none;
  svg {
    width: 11px;
  }
  * {
    fill: ${({theme:e})=>e.colors.primary600};
  }
`,vs=({actions:e=[],isFormDisabled:t,kind:o})=>{const{formatMessage:n}=(0,B.c)(),{modifiedData:r,onChangeCollectionTypeGlobalActionCheckbox:a}=Z(),d=e.filter(({subjects:l})=>l&&l.length),i=j.useMemo(()=>{const l=d.map(({actionId:C})=>C),c=r[o],p=l.reduce((C,x)=>(Object.keys(c).forEach(_=>{const h=A(c,[_,x]),m={[_]:ge(h)};C[x]?C[x]={...C[x],...m}:C[x]=m}),C),{});return Object.keys(p).reduce((C,x)=>(C[x]=Y(p[x]),C),{})},[r,d,o]);return(0,s.jsx)(y.k,{paddingBottom:4,paddingTop:6,style:{paddingLeft:he},children:(0,s.jsx)(f.C,{gap:0,children:d.map(({label:l,actionId:c})=>(0,s.jsxs)(f.C,{shrink:0,width:G,direction:"column",alignItems:"center",justifyContent:"center",gap:3,children:[(0,s.jsx)(b.O,{variant:"sigma",textColor:"neutral500",children:n({id:`Settings.roles.form.permissions.${l.toLowerCase()}`,defaultMessage:l})}),(0,s.jsx)(D.c,{disabled:t,onValueChange:p=>{a(o,c,p)},name:c,"aria-label":n({id:"Settings.permissions.select-all-by-permission",defaultMessage:"Select all {label} permissions"},{label:n({id:`Settings.roles.form.permissions.${l.toLowerCase()}`,defaultMessage:l})}),value:A(i,[c,"hasAllActionsSelected"],!1),indeterminate:A(i,[c,"hasSomeActionsSelected"],!1)})]},c))})})},Ke=({isFormDisabled:e,kind:t,layout:{actions:o,subjects:n}})=>{const r=[...n].sort((a,d)=>a.label.localeCompare(d.label));return(0,s.jsxs)(Ts,{background:"neutral0",children:[(0,s.jsx)(vs,{actions:o,kind:t,isFormDisabled:e}),(0,s.jsx)(Ms,{actions:o,isFormDisabled:e,pathToData:t,subjects:r})]})},Ts=(0,S.default)(y.k)`
  overflow-x: auto;
`,Ue=({layout:e,...t})=>{const[o,n]=j.useState(null),r=a=>{n(a===o?null:a)};return(0,s.jsx)(y.k,{padding:6,background:"neutral0",children:e.map(({category:a,categoryId:d,childrenForm:i},l)=>(0,s.jsx)(Ss,{childrenForm:i,isOpen:o===a,isWhite:l%2===1,name:a,onOpenCategory:r,pathToData:[t.kind,d],...t},a))})},Ss=({childrenForm:e,kind:t,name:o,isOpen:n=!1,isFormDisabled:r=!1,isWhite:a,onOpenCategory:d,pathToData:i})=>{const{formatMessage:l}=(0,B.c)(),c=()=>{d(o)},p=o.split("::").pop()??"";return(0,s.jsxs)(Ve.G,{expanded:n,onToggle:c,id:`accordion-${o}`,variant:a?"primary":"secondary",children:[(0,s.jsx)(Ge.M,{title:re(p),description:`${l({id:"Settings.permissions.category",defaultMessage:p},{category:p})} ${t==="plugins"?"plugin":t}`}),(0,s.jsx)(we.u,{children:(0,s.jsx)(y.k,{padding:6,children:e.map(({actions:g,subCategoryName:C,subCategoryId:x})=>(0,s.jsx)(Ds,{actions:g,categoryName:p,isFormDisabled:r,subCategoryName:C,pathToData:[...i,x]},C))})})]})},Ds=({actions:e=[],categoryName:t,isFormDisabled:o,subCategoryName:n,pathToData:r})=>{const[a,d]=j.useState(!1),{modifiedData:i,onChangeParentCheckbox:l,onChangeSimpleCheckbox:c}=Z(),{formatMessage:p}=(0,B.c)(),g=A(i,r,{}),C=j.useMemo(()=>Object.keys(g).reduce((E,M)=>(E[M]=ge(g[M]),E),{}),[g]),{hasAllActionsSelected:x,hasSomeActionsSelected:_}=Y(C),h=()=>{d(E=>!E)},m=()=>{d(!1)},O=j.useMemo(()=>e.map(E=>{const M=[...r,E.action,"properties","enabled"],T=A(i,M,!1),v=A(i,[...r,E.action,"conditions"],{}),I=X(v).some(W=>W);return{...E,isDisplayed:T,checkboxName:M.join(".."),hasSomeActionsSelected:T,value:T,hasConditions:I,label:E.displayName,actionId:E.action,pathToConditionsObject:[...r,E.action]}}),[e,i,r]),P=A(i,[...r],{}),L=X(Object.entries(P).reduce((E,M)=>{const[T,{conditions:v}]=M;return E[T]=v,E},{})).some(E=>E);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(y.k,{children:[(0,s.jsxs)(f.C,{justifyContent:"space-between",alignItems:"center",children:[(0,s.jsx)(y.k,{paddingRight:4,children:(0,s.jsx)(b.O,{variant:"sigma",textColor:"neutral600",children:n})}),(0,s.jsx)($s,{flex:1}),(0,s.jsx)(y.k,{paddingLeft:4,children:(0,s.jsx)(fe.y,{name:r.join(".."),disabled:o,onValueChange:E=>{l({target:{name:r.join(".."),value:E}})},indeterminate:_,value:x,children:p({id:"app.utils.select-all",defaultMessage:"Select all"})})})]}),(0,s.jsxs)(f.C,{paddingTop:6,paddingBottom:6,children:[(0,s.jsx)(He.y,{gap:2,style:{flex:1},children:O.map(({checkboxName:E,value:M,action:T,displayName:v,hasConditions:I})=>(0,s.jsx)(Fe.C,{col:3,children:(0,s.jsx)(Ls,{disabled:o,hasConditions:I,children:(0,s.jsx)(fe.y,{name:E,disabled:o,onValueChange:W=>{c({target:{name:E,value:W}})},value:M,children:v})})},T))}),(0,s.jsx)(ae,{hasConditions:L,onClick:h})]})]}),a&&(0,s.jsx)(Re,{headerBreadCrumbs:[t,n],actions:O,isFormDisabled:o,onClosed:m,onToggle:h})]})},$s=(0,S.default)(y.k)`
  align-self: center;
  border-top: 1px solid ${({theme:e})=>e.colors.neutral150};
`,Ls=S.default.div`
  position: relative;
  word-break: keep-all;
  ${({hasConditions:e,disabled:t,theme:o})=>e&&`
    &:before {
      content: '';
      position: absolute;
      top: ${-4/16}rem;
      left: ${-8/16}rem;
      width: ${6/16}rem;
      height: ${6/16}rem;
      border-radius: ${20/16}rem;
      background: ${t?o.colors.neutral100:o.colors.primary600};
    }
  `}
`,ks=[{labelId:"app.components.LeftMenuLinkContainer.collectionTypes",defaultMessage:"Collection Types",id:"collectionTypes"},{labelId:"app.components.LeftMenuLinkContainer.singleTypes",id:"singleTypes",defaultMessage:"Single Types"},{labelId:"app.components.LeftMenuLinkContainer.plugins",defaultMessage:"Plugins",id:"plugins"},{labelId:"app.components.LeftMenuLinkContainer.settings",defaultMessage:"Settings",id:"settings"}],Rs=j.forwardRef(({layout:e,isFormDisabled:t,permissions:o=[]},n)=>{const[{initialData:r,layouts:a,modifiedData:d},i]=j.useReducer(Bs,Is,()=>Ws(e,o)),{formatMessage:l}=(0,B.c)();j.useImperativeHandle(n,()=>({getPermissions(){const _=(0,_e.o1)(r.collectionTypes,d.collectionTypes),h=(0,_e.o1)(r.singleTypes,d.singleTypes),m={..._,...h};let O;return Q(m)?O=!1:O=Object.values(m).some((P={})=>Object.values(P).some(L=>ne(L,"conditions"))),{permissionsToSend:is(d),didUpdateConditions:O}},resetForm(){i({type:"RESET_FORM"})},setFormAfterSubmit(){i({type:"SET_FORM_AFTER_SUBMIT"})}}));const c=(_,h,m,O)=>{i({type:"ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX",pathToCollectionType:_,propertyName:h,rowName:m,value:O})},p=(_,h,m)=>{i({type:"ON_CHANGE_COLLECTION_TYPE_GLOBAL_ACTION_CHECKBOX",collectionTypeKind:_,actionId:h,value:m})},g=_=>{i({type:"ON_CHANGE_CONDITIONS",conditions:_})},C=j.useCallback(({target:{name:_,value:h}})=>{i({type:"ON_CHANGE_SIMPLE_CHECKBOX",keys:_,value:h})},[]),x=j.useCallback(({target:{name:_,value:h}})=>{i({type:"ON_CHANGE_TOGGLE_PARENT_CHECKBOX",keys:_,value:h})},[]);return(0,s.jsx)(ns,{availableConditions:e.conditions,modifiedData:d,onChangeConditions:g,onChangeSimpleCheckbox:C,onChangeParentCheckbox:x,onChangeCollectionTypeLeftActionRowCheckbox:c,onChangeCollectionTypeGlobalActionCheckbox:p,children:(0,s.jsxs)(Xe.M,{id:"tabs",label:l({id:"Settings.permissions.users.tabs.label",defaultMessage:"Tabs Permissions"}),children:[(0,s.jsx)(xe.k,{children:ks.map(_=>(0,s.jsx)(xe.s,{children:l({id:_.labelId,defaultMessage:_.defaultMessage})},_.id))}),(0,s.jsxs)(J.o,{style:{position:"relative"},children:[(0,s.jsx)(J.G,{children:(0,s.jsx)(Ke,{layout:a.collectionTypes,kind:"collectionTypes",isFormDisabled:t})}),(0,s.jsx)(J.G,{children:(0,s.jsx)(Ke,{layout:a.singleTypes,kind:"singleTypes",isFormDisabled:t})}),(0,s.jsx)(J.G,{children:(0,s.jsx)(Ue,{layout:a.plugins,kind:"plugins",isFormDisabled:t})}),(0,s.jsx)(J.G,{children:(0,s.jsx)(Ue,{layout:a.settings,kind:"settings",isFormDisabled:t})})]})]})})}),Is={initialData:{},modifiedData:{},layouts:{}},Bs=(e,t)=>(0,je.cp)(e,o=>{switch(t.type){case"ON_CHANGE_COLLECTION_TYPE_GLOBAL_ACTION_CHECKBOX":{const{collectionTypeKind:n,actionId:r,value:a}=t,d=["modifiedData",n];Object.keys(A(e,d)).forEach(i=>{const l=A(e,[...d,i,r],void 0);if(l){let c=q(l,a);if(!a&&c.conditions){const p=q(c.conditions,!1);c={...c,conditions:p}}V(o,[...d,i,r],c)}});break}case"ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX":{const{pathToCollectionType:n,propertyName:r,rowName:a,value:d}=t;let i=ce(e.modifiedData);const l=n.split(".."),c=A(i,l,{});Object.keys(c).forEach(p=>{if(ne(c[p],`properties.${r}`)){const g=A(c,[p,"properties",r,a]),C=[...l,p,"properties",r,a];if(!(0,H.F)(g))V(i,C,d);else{const x=q(g,d);V(i,C,x)}}}),d||(i=oe(i)),V(o,"modifiedData",i);break}case"ON_CHANGE_CONDITIONS":{Object.entries(t.conditions).forEach(n=>{const[r,a]=n;V(o,["modifiedData",...r.split(".."),"conditions"],a)});break}case"ON_CHANGE_SIMPLE_CHECKBOX":{let n=ce(e.modifiedData);V(n,[...t.keys.split("..")],t.value),t.value||(n=oe(n)),V(o,"modifiedData",n);break}case"ON_CHANGE_TOGGLE_PARENT_CHECKBOX":{const{keys:n,value:r}=t,a=[...n.split("..")];let d=ce(e.modifiedData);const i=A(d,a,{}),l=q(i,r);V(d,a,l),r||(d=oe(d)),V(o,["modifiedData"],d);break}case"RESET_FORM":{o.modifiedData=e.initialData;break}case"SET_FORM_AFTER_SUBMIT":{o.initialData=e.modifiedData;break}default:return o}}),Ws=(e,t)=>{const{conditions:o,sections:{collectionTypes:n,singleTypes:r,plugins:a,settings:d}}=e,i={collectionTypes:n,singleTypes:r,plugins:Se(a,"plugin"),settings:Se(d,"category")},l={collectionTypes:Te(n,o,t),singleTypes:Te(r,o,t),plugins:ve(i.plugins,o,t),settings:ve(i.settings,o,t)};return{initialData:l,modifiedData:l,layouts:i}}},32912:(N,w,u)=>{"use strict";u.d(w,{U:()=>y});var s=u(19968),j=u(3704),f=u(5928);const y=({options:b,...R})=>(0,s.jsx)(f.e,{...R,children:b.map($=>"children"in $?(0,s.jsx)(f.OK,{label:$.label,values:$.children.map(K=>K.value.toString()),children:$.children.map(K=>(0,s.jsx)(D,{value:K.value,children:K.label},K.value))},$.label):(0,s.jsx)(f.eI,{value:$.value,children:$.label},$.value))}),D=(0,j.default)(f.eI)`
  padding-left: ${({theme:b})=>b.spaces[7]};
`}}]);
