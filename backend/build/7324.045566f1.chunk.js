"use strict";(self.webpackChunkgettem=self.webpackChunkgettem||[]).push([[7324],{27324:(I,P,_)=>{_.r(P),_.d(P,{LoginEE:()=>K});var E=_(19968),D=_(6912),a=_(5e3),O=_(48936),o=_(63358),l=_(14632),i=_(3704),n=_(19508),M=_(132),h=_(47616),r=_(54320),d=_(5240),C=_(91892),s=_(36196),L=_(20880),B=_(21424),t=_(62552),W=_(70516),m=_(31812),g=_(18424),x=_(52540),j=_(21968),c=_(12132),f=_(48632),y=_(85676),S=_(35184),$=_(99568),N=_(96556),F=_(13192),z=_(30840),G=_(77784),H=_(79371),Z=_(67888),J=_(52600),Q=_(95752),V=_(37388),X=_(61840),Y=_(49108),u=_(44632),p=_(50840),e=_(20252),k=_(86432),w=_(22612),b=_(24808),q=_(24024),__=_(40960),E_=_(33656),s_=_(43280),t_=_(79804),a_=_(19632),O_=_(29576),n_=_(61152),P_=_(9589),D_=_(45488),M_=_(75516);const R=(0,i.cp)(D.c)`
  flex: 1;
`,K=v=>{const{formatMessage:T}=(0,l.c)(),{isLoading:U,data:A=[]}=(0,n.g)(void 0,{skip:!window.strapi.features.isEnabled(window.strapi.features.SSO)});return!window.strapi.features.isEnabled(window.strapi.features.SSO)||!U&&A.length===0?(0,E.jsx)(n.L,{...v}):(0,E.jsx)(n.L,{...v,children:(0,E.jsx)(a.k,{paddingTop:7,children:(0,E.jsxs)(O.C,{direction:"column",alignItems:"stretch",gap:7,children:[(0,E.jsxs)(O.C,{children:[(0,E.jsx)(R,{}),(0,E.jsx)(a.k,{paddingLeft:3,paddingRight:3,children:(0,E.jsx)(o.O,{variant:"sigma",textColor:"neutral600",children:T({id:"Auth.login.sso.divider"})})}),(0,E.jsx)(R,{})]}),(0,E.jsx)(M.S,{providers:A,displayAllProviders:!1})]})})})}},132:(I,P,_)=>{_.d(P,{S:()=>h});var E=_(19968),D=_(28724),a=_(70996),O=_(70544),o=_(48936),l=_(63358),i=_(14632),n=_(39380),M=_(3704);const h=({providers:s,displayAllProviders:L})=>{const{formatMessage:B}=(0,i.c)();return L?(0,E.jsx)(D.y,{gap:4,children:s.map(t=>(0,E.jsx)(a.C,{col:4,children:(0,E.jsx)(d,{provider:t})},t.uid))}):s.length>2&&!L?(0,E.jsxs)(D.y,{gap:4,children:[s.slice(0,2).map(t=>(0,E.jsx)(a.C,{col:4,children:(0,E.jsx)(d,{provider:t})},t.uid)),(0,E.jsx)(a.C,{col:4,children:(0,E.jsx)(O.o,{label:B({id:"global.see-more"}),children:(0,E.jsx)(C,{as:n.cH,to:"/auth/providers",children:(0,E.jsx)("span",{"aria-hidden":!0,children:"\u2022\u2022\u2022"})})})})]}):(0,E.jsx)(r,{justifyContent:"center",children:s.map(t=>(0,E.jsx)(d,{provider:t},t.uid))})},r=(0,M.cp)(o.C)`
  & a:not(:first-child):not(:last-child) {
    margin: 0 ${({theme:s})=>s.spaces[2]};
  }
  & a:first-child {
    margin-right: ${({theme:s})=>s.spaces[2]};
  }
  & a:last-child {
    margin-left: ${({theme:s})=>s.spaces[2]};
  }
`,d=({provider:s})=>(0,E.jsx)(O.o,{label:s.displayName,children:(0,E.jsx)(C,{href:`${window.strapi.backendURL}/admin/connect/${s.uid}`,children:s.icon?(0,E.jsx)("img",{src:s.icon,"aria-hidden":!0,alt:"",height:"32px"}):(0,E.jsx)(l.O,{children:s.displayName})})}),C=M.cp.a`
  width: ${136/16}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${48/16}rem;
  border: 1px solid ${({theme:s})=>s.colors.neutral150};
  border-radius: ${({theme:s})=>s.borderRadius};
  text-decoration: inherit;
  &:link {
    text-decoration: none;
  }
  color: ${({theme:s})=>s.colors.neutral600};
`}}]);
