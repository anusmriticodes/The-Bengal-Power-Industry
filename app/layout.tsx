import './globals.css';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'The Bengal Electrical Industry | Market Growth & Export Study',description:'A manufacturer-focused study to understand business priorities, strengthen market access, encourage innovation and explore opportunities for Bengal’s electrical and engineering ecosystem.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
