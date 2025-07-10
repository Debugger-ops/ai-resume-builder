'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Next.js equivalent
import Link from 'next/link';
import './NotFound.css'; // ✅ if you have custom styles

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error('404 Error: User attempted to access:', pathname);
  }, [pathname]);

  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">Oops! Page not found</p>
        <Link href="/" className="notfound-link">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
