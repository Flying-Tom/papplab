"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[836],{2511:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var i=a(5893),s=a(1151),t=a(2004);const r={sidebar_position:3},o="Frida Hook",l={id:"lab3/frida",title:"Frida Hook",description:"\u63a8\u8350\u6587\u6863",source:"@site/docs/lab3/frida.mdx",sourceDirName:"lab3",slug:"/lab3/frida",permalink:"/papplab/docs/lab3/frida",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"\u5e73\u53f0\u578b\u5e94\u7528\u6848\u4f8b",permalink:"/papplab/docs/lab3/case"},next:{title:"Lab 4 : \u4f4d\u7f6e\u4fe1\u606f\u8c03\u67e5",permalink:"/papplab/docs/lab4/"}},d={},c=[{value:"\u63a8\u8350\u6587\u6863",id:"\u63a8\u8350\u6587\u6863",level:2},{value:"\u793a\u4f8b: \u4fee\u6539\u9ad8\u5fb7\u5730\u56fe\u7684\u5b9a\u4f4d\u4fe1\u606f",id:"\u793a\u4f8b-\u4fee\u6539\u9ad8\u5fb7\u5730\u56fe\u7684\u5b9a\u4f4d\u4fe1\u606f",level:2}];function p(e){const n={a:"a",annotation:"annotation",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",math:"math",mo:"mo",mrow:"mrow",p:"p",pre:"pre",semantics:"semantics",span:"span",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"frida-hook",children:"Frida Hook"})}),"\n",(0,i.jsx)(n.h2,{id:"\u63a8\u8350\u6587\u6863",children:"\u63a8\u8350\u6587\u6863"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://frida.re/docs/home/",children:"Frida Docs"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/hookmaster/frida-all-in-one",children:"frida-all-in-one"})}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"\u4e00\u4e9b\u5de5\u5177\u6216\u811a\u672c\u96c6"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/iddoeldor/frida-snippets",children:"frida-snippets"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/dqzg12300/fridaUiTools",children:"fridaUiTools"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsxs)(n.span,{className:"katex",children:[(0,i.jsx)(n.span,{className:"katex-mathml",children:(0,i.jsx)(n.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,i.jsxs)(n.semantics,{children:[(0,i.jsx)(n.mrow,{children:(0,i.jsx)(n.mo,{children:"\u22ef"})}),(0,i.jsx)(n.annotation,{encoding:"application/x-tex",children:"\\cdots"})]})})}),(0,i.jsx)(n.span,{className:"katex-html","aria-hidden":"true",children:(0,i.jsxs)(n.span,{className:"base",children:[(0,i.jsx)(n.span,{className:"strut",style:{height:"0.313em"}}),(0,i.jsx)(n.span,{className:"minner",children:"\u22ef"})]})})]})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u793a\u4f8b-\u4fee\u6539\u9ad8\u5fb7\u5730\u56fe\u7684\u5b9a\u4f4d\u4fe1\u606f",children:"\u793a\u4f8b: \u4fee\u6539\u9ad8\u5fb7\u5730\u56fe\u7684\u5b9a\u4f4d\u4fe1\u606f"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"amaploc.js"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:'Java.perform(() => {\n    console.log("Script loaded successfully ");\n    var AmapLocation = Java.use("com.amap.location.support.bean.location.AmapLocation");\n    console.log("AmapLocation located successfully")\n\n     var myLongitude = 118.89552;\n    var myLatitude = 32.107558;\n    const step = 0.00002;\n    AmapLocation.getLongitude.overload().implementation = function () {\n        myLongitude -= step;\n        return myLongitude;\n    };\n\n    AmapLocation.getLatitude.overload().implementation = function () {\n        myLatitude -= step;\n        return myLatitude;\n    };\n});\n'})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"script.py"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'import time\nimport frida\n\napp_name = "com.autonavi.minimap"\njs_file = "amaploc.js"\n\ndevice = frida.get_usb_device()\npid = device.spawn(app_name)\n\ndevice.resume(pid)\ntime.sleep(1)\n\n\nprint("[*] Attach to process: %d" % pid)\nsession = device.attach(pid)\nwith open(js_file) as f:\n    script = session.create_script(f.read())\nscript.load()\n\ninput()\n'})}),"\n",(0,i.jsx)(t.Z,{playing:!0,controls:!0,url:"/vid/amap.mp4"})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}}}]);