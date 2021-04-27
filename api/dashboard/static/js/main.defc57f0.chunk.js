(this.webpackJsonpdashboard=this.webpackJsonpdashboard||[]).push([[0],{31:function(e,t,n){},51:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var o=n(0),i=n.n(o),c=n(17),a=n.n(c),s=(n(51),n(29)),r=n.n(s),l=n(33),d=n(42),j=(n.p,n(31),n(64)),u=n(63),h=n(61),p=(n(32),n(34)),b=n(35),g=n(20),f=n(44),O=n(43),x=n(62),m=n(3),w=function(e){Object(f.a)(n,e);var t=Object(O.a)(n);function n(e){var o;return Object(p.a)(this,n),(o=t.call(this,e)).showDialog=o.showDialog.bind(Object(g.a)(o)),o.hideDialog=o.hideDialog.bind(Object(g.a)(o)),o.state={show:!1,func:void 0},o}return Object(b.a)(n,[{key:"componentDidMount",value:function(){}},{key:"showDialog",value:function(e){this.setState({show:!0,func:e})}},{key:"hideDialog",value:function(){this.setState({show:!1})}},{key:"render",value:function(){var e=this;return Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)(x.a,{show:this.state.show,onHide:function(){e.hideDialog()},children:[Object(m.jsx)(x.a.Header,{closeButton:!0,children:Object(m.jsx)(x.a.Title,{children:this.props.title})}),Object(m.jsx)(x.a.Body,{children:this.props.content}),Object(m.jsxs)(x.a.Footer,{children:[Object(m.jsx)(h.a,{variant:"secondary",onClick:function(){e.hideDialog()},children:"No"}),Object(m.jsx)(h.a,{variant:"primary",onClick:function(){e.state.func(),e.hideDialog()},children:"Yes"})]})]})})}}]),n}(o.Component);var v=function(){var e=window.sessionStorage.getItem("user"),t=Object(o.useState)([]),n=Object(d.a)(t,2),i=n[0],c=n[1],a="http://localhost:9000/",s=Object(o.useRef)(null);return Object(o.useEffect)(Object(l.a)(r.a.mark((function t(){var n,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null!==e){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,fetch(a+"projectAPI/getNames/"+e,{headers:{Accept:"application/json","Content-Type":"application/json","auth-token":window.sessionStorage.getItem("auth")},method:"GET"});case 4:return n=t.sent,t.next=7,n.json();case 7:o=t.sent,c(o.map((function(e){return Object(m.jsxs)("div",{className:"project",onClick:function(){window.location="/?projectid="+e._id},children:[Object(m.jsx)("span",{className:"projectBody",style:{backgroundImage:"url(/folder.jpg)"}}),Object(m.jsx)("span",{className:"projectTitle",children:e.name}),Object(m.jsx)("span",{className:"deleteProject",onClick:function(t){var n;s.current.showDialog((n=e._id,void fetch(a+"projectAPI/delete/",{headers:{Accept:"application/json","Content-Type":"application/json","auth-token":window.sessionStorage.getItem("auth")},body:{id:n},method:"POST"}))),t.stopPropagation()},children:"X"})]})})));case 9:case"end":return t.stop()}}),t)}))),[]),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(w,{ref:s,fun:function(){},title:"Delete project",content:"Are you sure you want to delete this project?"}),Object(m.jsx)(j.a,{className:"navbar",bg:"light",variant:"light",style:{position:"fixed","z-index":"4"},children:Object(m.jsxs)(u.a,{className:"mr-auto",children:[Object(m.jsx)(j.a.Brand,{children:"Geant4"}),Object(m.jsxs)("p",{style:void 0==e?{display:"none"}:{fontSize:"20px",display:"block",position:"absolute",right:"10%"},children:["Logged in as ",e,"! "]}),Object(m.jsx)(h.a,{style:void 0==e?{display:"block",position:"absolute",right:"2%"}:{display:"none"},onClick:function(){window.location="../Login"},children:"Login"}),Object(m.jsx)(h.a,{style:void 0==e?{display:"none"}:{display:"block",backgroundColor:"#ff0000",position:"absolute",right:"2%"},onClick:function(){window.sessionStorage.removeItem("auth"),window.sessionStorage.removeItem("user"),window.location="../Login"},children:"Logout"})]})}),Object(m.jsxs)("div",{className:"App",children:[Object(m.jsx)("p",{children:"asd"}),Object(m.jsxs)("div",{className:"project",onClick:function(){window.location="/"},children:[Object(m.jsx)("span",{className:"projectBody",style:{backgroundImage:"url(/create.jpg)"}}),Object(m.jsx)("span",{className:"projectTitle",children:"Create New Project"})]}),i]})]})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,65)).then((function(t){var n=t.getCLS,o=t.getFID,i=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),o(e),i(e),c(e),a(e)}))};a.a.render(Object(m.jsx)(i.a.StrictMode,{children:Object(m.jsx)(v,{})}),document.getElementById("root")),y()}},[[59,1,2]]]);
//# sourceMappingURL=main.defc57f0.chunk.js.map