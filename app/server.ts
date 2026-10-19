import {getUser} from './auth';
import {rows,eq,configured} from './backend';
import {initialCatalog,defaultOffers} from './catalog';
export async function catalog(){if(!configured())return {catalog:initialCatalog,revision:0};const [r]=await rows('records?id=eq.catalog&select=data,revision');return r?{catalog:{...JSON.parse(r.data),offers:JSON.parse(r.data).offers??defaultOffers},revision:r.revision}:{catalog:initialCatalog,revision:0};}
export async function identity(){const u=await getUser();if(!u)return null;if(u.email===process.env.ADMIN_EMAIL?.trim().toLowerCase())return {...u,role:'owner'};const [m]=await rows('members?email=eq.'+eq(u.email));if(!m||!['manager','editor'].includes(m.role))return null;return {...u,role:m.role};}
export function sameOrigin(r:Request){return r.headers.get('origin')===new URL(r.url).origin;}
export const json=(d:any,status=200)=>Response.json(d,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
