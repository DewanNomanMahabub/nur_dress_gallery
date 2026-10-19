import 'server-only';
import {cookies} from 'next/headers';
import {config,configured} from './backend';
export async function getUser(){if(!configured())return null;const token=(await cookies()).get('nur-session')?.value;if(!token)return null;const c=config();const r=await fetch(c.url+'/auth/v1/user',{headers:{apikey:c.anon,Authorization:'Bearer '+token},cache:'no-store'});if(!r.ok)return null;const u=await r.json();if(!u.id||!u.email||!u.email_confirmed_at)return null;return {userId:u.id,email:u.email.toLowerCase()};}
