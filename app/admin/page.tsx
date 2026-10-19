import Admin from './panel';
import {getUser} from '../auth';
import {configured} from '../backend';
import Login from './login';
export const dynamic='force-dynamic';
export default async function Page(){const user=await getUser();if(!user)return <main className="auth-page"><img src="/images/shop-logo.png" alt="Nur Dress Gallary"/><div className="eyebrow">AUTHORIZED TEAM ONLY</div><h1>Your boutique,<br/><em>beautifully managed.</em></h1>{configured()?<Login/>:<p>Admin setup is pending. Follow SETUP.md to connect Supabase and create your owner account.</p>}<a className="text-link" href="/">← Back to storefront</a></main>;return <Admin email={user.email}/>}
