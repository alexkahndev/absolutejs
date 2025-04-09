// @bun
import{h as r}from"../../build-s7a2qjm1.js";import{j as e}from"../utils/networking.js";import"../../build-sewy0hdv.js";import{argv as a}from"node:process";var{env:s}=globalThis.Bun;var t=s.HOST??"localhost",o=s.PORT??r,l,c=a,n=c.includes("--host");if(n)l=e(),t="0.0.0.0";var d=(i)=>i.listen({hostname:t,port:o},()=>{if(n)console.log(`Server started on http://localhost:${o}`),console.log(`Server started on network: http://${l}:${o}`);else console.log(`Server started on http://${t}:${o}`)});export{d as networkingPlugin};
export{d as c};
