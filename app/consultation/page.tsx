import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ConsultationForm from '@/components/ConsultationForm';
export default function Consultation(){return <><div className="container nav"><Link href="/" className="brand"><span className="brand-mark">B</span><span>THE BENGAL<br/>ELECTRICAL INDUSTRY</span></Link><Link href="/" className="back-link"><ArrowLeft size={14}/> Back to study overview</Link></div><main className="container"><ConsultationForm/></main><footer><div className="container">Founded by Saptarshi Mitra | With Chief Mentorship of Dr. Jagat Shah</div></footer></>}
