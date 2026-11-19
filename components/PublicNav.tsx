import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function PublicNav(){return <div className="container nav"><Link href="/" className="brand"><span className="brand-mark">B</span><span>THE BENGAL<br/>POWER INDUSTRY</span></Link><div className="nav-links"><a href="/#initiative">The initiative</a><a href="/#themes">Study themes</a><a href="/#principles">Our vision</a><a href="/#leadership">Leadership</a><Link className="btn" href="/consultation">Participate <ArrowUpRight size={15}/></Link></div></div>}
