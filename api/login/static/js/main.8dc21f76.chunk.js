(this.webpackJsonplogin=this.webpackJsonplogin||[]).push([[0],{10:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var s=n(1),c=n.n(s),i=n(4),a=n.n(i),r=(n(9),n(2)),o=(n(10),n(11),n(0)),l=n(13);var j=function(){var e=Object(s.useState)("login"),t=Object(r.a)(e,2),n=t[0],c=t[1],i=Object(s.useState)(""),a=Object(r.a)(i,2),j=a[0],d=a[1],u=Object(s.useState)(""),b=Object(r.a)(u,2),x=b[0],h=b[1],O=Object(s.useState)(""),p=Object(r.a)(O,2),f=p[0],m=p[1],g=Object(s.useState)(""),v=Object(r.a)(g,2),y=v[0],N=v[1],w=Object(s.useState)(""),B=Object(r.a)(w,2),C=B[0],S=B[1],k=Object(s.useState)(""),P=Object(r.a)(k,2),_=P[0],L=P[1],q=Object(s.useState)(""),F=Object(r.a)(q,2),T=F[0],A=F[1],E=Object(s.useState)(""),I=Object(r.a)(E,2),J=I[0],M=I[1],R="http://localhost:9000/",D=function(){return""==j?(N("Enter username"),!1):(N(""),!0)},U=function(){return""==x?(S("Enter password"),!1):x.length<8?(S("Password needs to be at least 8 characters"),!1):(S(""),!0)},Y=function(){K()&&fetch(R+"userAPI/login",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({name:j,password:x})}).then((function(e){return e.text()})).then((function(e){"Successfull login!"===e?(l.set("login",j,{expires:1}),window.location="/"):S(e)}))},K=function(){return D()||U()};return void 0!=l.get("login")?Object(o.jsx)("div",{children:"You are already signed in!"}):"login"===n?Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("div",{style:{backgroundImage:"url(/background.jpg)"},className:"body",onMouseMove:function(e){e.target.style.transform="translate("+e.clientX/100+"px, "+e.clientY/100+"px)",e.target.style.overflow="hidden"}}),Object(o.jsxs)("div",{className:"center",children:[Object(o.jsx)("h1",{children:"Login"}),Object(o.jsxs)("form",{method:"post",children:[Object(o.jsxs)("div",{className:"text_field",style:""!=y?{borderBottom:"2px solid #ff0000"}:{},children:[Object(o.jsx)("input",{type:"text",required:!0,value:j,onChange:function(e){d(e.target.value)},onBlur:function(){D()},maxLength:"12"}),Object(o.jsx)("span",{}),Object(o.jsx)("label",{children:"Username"})]}),Object(o.jsx)("div",{className:"error",children:y}),Object(o.jsxs)("div",{className:"text_field",style:""!=C?{borderBottom:"2px solid #ff0000"}:{},children:[Object(o.jsx)("input",{type:"password",onKeyPress:function(e){"Enter"==e.key&&Y()},required:!0,value:x,onChange:function(e){h(e.target.value)},onBlur:function(){U()},maxLength:"16"}),Object(o.jsx)("span",{}),Object(o.jsx)("label",{children:"Password"})]}),Object(o.jsx)("div",{className:"error",children:C}),Object(o.jsx)("div",{className:"pass",children:"Forgot password?"}),Object(o.jsx)("input",{type:"button",value:"Login",onClick:function(){Y()}}),Object(o.jsxs)("div",{className:"signup_link",children:["Don't have an account? ",Object(o.jsx)("div",{className:"register_link",onClick:function(){c("register")},children:"Register"})]})]})]})]}):Object(o.jsx)("div",{className:"body",children:Object(o.jsxs)("div",{className:"center",children:[Object(o.jsx)("h1",{children:"Register"}),Object(o.jsxs)("form",{method:"post",children:[Object(o.jsxs)("div",{className:"text_field",style:""!=y?{borderBottom:"2px solid #ff0000"}:{},children:[Object(o.jsx)("input",{type:"text",required:!0,value:j,onChange:function(e){d(e.target.value)},onBlur:function(){D()},maxLength:"12"}),Object(o.jsx)("span",{}),Object(o.jsx)("label",{children:"Username"})]}),Object(o.jsx)("div",{className:"error",children:y}),Object(o.jsxs)("div",{className:"text_field",style:""!=_?{borderBottom:"2px solid #ff0000"}:{},children:[Object(o.jsx)("input",{type:"text",required:!0,value:f,onChange:function(e){m(e.target.value)},onBlur:function(){""!=f&&f.includes("@")?L(""):L("Enter a valid email.")},maxLength:"20"}),Object(o.jsx)("span",{}),Object(o.jsx)("label",{children:"e-mail"})]}),Object(o.jsx)("div",{className:"error",children:_}),Object(o.jsxs)("div",{className:"text_field",style:""!=T?{borderBottom:"2px solid #ff0000"}:{},children:[Object(o.jsx)("input",{type:"text",required:!0,onBlur:function(e){e.target.value!=f?A("confirm email has to be the same as email"):A("")}}),Object(o.jsx)("span",{}),Object(o.jsx)("label",{children:"Confirm e-mail"})]}),Object(o.jsx)("div",{className:"error",children:T}),Object(o.jsxs)("div",{className:"text_field",style:""!=C?{borderBottom:"2px solid #ff0000"}:{},children:[Object(o.jsx)("input",{type:"password",required:!0,value:x,onChange:function(e){h(e.target.value)},onBlur:function(){U()},maxLength:"16"}),Object(o.jsx)("span",{}),Object(o.jsx)("label",{children:"Password"})]}),Object(o.jsx)("div",{className:"error",children:C}),Object(o.jsxs)("div",{className:"text_field",style:""!=J?{borderBottom:"2px solid #ff0000"}:{},children:[Object(o.jsx)("input",{type:"password",required:!0,onBlur:function(e){e.target.value!=x?M("confirm password has to be the same as password"):M("")}}),Object(o.jsx)("span",{}),Object(o.jsx)("label",{children:"Confirm Password"})]}),Object(o.jsx)("div",{className:"error",children:J}),Object(o.jsx)("div",{className:"pass",children:"Forgot password?"}),Object(o.jsx)("input",{type:"button",value:"Register",onClick:function(){fetch(R+"userAPI/register",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({name:j,password:x})}).then((function(e){return e.text()})).then((function(e){alert(e)}))}}),Object(o.jsxs)("div",{className:"signup_link",children:["Already have an account? ",Object(o.jsx)("div",{className:"register_link",onClick:function(){c("login")},children:"Login"})]})]})]})})},d=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(t){var n=t.getCLS,s=t.getFID,c=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),s(e),c(e),i(e),a(e)}))};a.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(j,{})}),document.getElementById("root")),d()},9:function(e,t,n){}},[[14,1,2]]]);
//# sourceMappingURL=main.8dc21f76.chunk.js.map