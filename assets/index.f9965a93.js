import{S as n,P as e,W as i,I as o,M as t,a}from"./vendor.a5ed5a38.js";const r=new n,w=new e(75,window.innerWidth/window.innerHeight,.1,1e3),d=new i({canvas:document.querySelector(".main")});d.setPixelRatio(window.devicePixelRatio),d.setSize(window.innerWidth,window.innerHeight),w.position.setZ(30),d.render(r,w);const s=new a(new o(10,0),new t({color:7798563}));r.add(s),function n(){requestAnimationFrame(n),s.rotation.x+=.01,s.rotation.y+=.005,s.rotation.z+=.01,d.render(r,w)}();