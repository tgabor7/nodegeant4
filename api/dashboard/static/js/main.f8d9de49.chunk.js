(this.webpackJsonpdashboard=this.webpackJsonpdashboard||[]).push([[0],{31:function(e,t,n){},33:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var o=n(0),s=n.n(o),a=n(10),c=n.n(a),i=(n(31),n(18)),r=n.n(i),l=n(20),d=n(26),j=(n.p,n(33),n(46)),p=n(47),u=n(45),b=(n(34),n(3));var g=function(){var e=window.sessionStorage.getItem("user"),t=Object(o.useState)([]),n=Object(d.a)(t,2),s=n[0],a=n[1];return Object(o.useEffect)(Object(l.a)(r.a.mark((function t(){var n,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null!==e){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,fetch("http://localhost:9000/projectAPI/getNames/"+e,{headers:{Accept:"application/json","Content-Type":"application/json","auth-token":window.sessionStorage.getItem("auth")},method:"GET"});case 4:return n=t.sent,t.next=7,n.json();case 7:o=t.sent,a(o.map((function(e){return Object(b.jsxs)("div",{className:"project",onClick:function(){window.location="/?projectid="+e._id},children:[Object(b.jsx)("span",{className:"projectBody",style:{backgroundImage:"url(/folder.jpg)"}}),Object(b.jsx)("span",{className:"projectTitle",children:e.name})]})})));case 9:case"end":return t.stop()}}),t)}))),[]),null===e?Object(b.jsx)(b.Fragment,{children:"You are no logged in!"}):Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(j.a,{className:"navbar",bg:"light",variant:"light",style:{position:"fixed","z-index":"4"},children:Object(b.jsxs)(p.a,{className:"mr-auto",children:[Object(b.jsx)(j.a.Brand,{children:"Geant4"}),Object(b.jsxs)("p",{style:void 0==e?{display:"none"}:{fontSize:"20px",display:"block",position:"absolute",right:"10%"},children:["Logged in as ",e,"! "]}),Object(b.jsx)(u.a,{style:void 0==e?{display:"block",position:"absolute",right:"2%"}:{display:"none"},onClick:function(){window.location="../Login"},children:"Login"}),Object(b.jsx)(u.a,{style:void 0==e?{display:"none"}:{display:"block",backgroundColor:"#ff0000",position:"absolute",right:"2%"},onClick:function(){window.sessionStorage.removeItem("auth"),window.sessionStorage.removeItem("user"),window.location="../Login"},children:"Logout"})]})}),Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)("p",{children:"asd"}),Object(b.jsxs)("div",{className:"project",onClick:function(){window.location="/"},children:[Object(b.jsx)("span",{className:"projectBody",style:{backgroundImage:"url(/create.jpg)"}}),Object(b.jsx)("span",{className:"projectTitle",children:"Create New Project"})]}),s]})]})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,48)).then((function(t){var n=t.getCLS,o=t.getFID,s=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),o(e),s(e),a(e),c(e)}))};c.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(g,{})}),document.getElementById("root")),h()}},[[42,1,2]]]);
//# sourceMappingURL=main.f8d9de49.chunk.js.map