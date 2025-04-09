// @bun
import"../build-azzc5a4m.js";import{readFile as K,writeFile as L}from"node:fs/promises";var{Glob:M}=globalThis.Bun;var W=async(y,z)=>{let A=new M("*.html"),q=[];for await(let j of A.scan({cwd:z,absolute:!0}))q.push(j);for(let j of q){let k=await K(j,"utf8");for(let[B,C]of Object.entries(y)){let E=B.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),H=new RegExp(`(<script[^>]+src=["'])(/?(?:.*\\/)?${E})(?:\\.[^."'/]+)?(\\.js)(["'][^>]*>)`,"g");k=k.replace(H,(O,I,Q,T,J)=>{return`${I}${C}${J}`})}await L(j,k,"utf8")}};export{W as updateScriptTags};
export{W as g};
