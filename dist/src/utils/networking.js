// @bun
import"../../build-sewy0hdv.js";import q from"node:os";var x=()=>{let m=q.networkInterfaces(),j=Object.values(m).flat().filter((g)=>g!==void 0).find((g)=>g.family==="IPv4"&&!g.internal);if(j)return j.address;return console.warn("No IP address found, falling back to localhost"),"localhost"};export{x as getLocalIPAddress};
export{x as j};
