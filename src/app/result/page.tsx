"use client"
import React, { useEffect } from 'react'
import ResultSuccess from '../components/Result/ResultSuccess';
import { useRouter } from 'next/navigation';


const ResultPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if this is a page refresh
    const hasVisited = sessionStorage.getItem('successPageVisited');

    if (hasVisited) {
      // User refreshed the page → redirect to home
      router.replace('/');
    } else {
      // First visit (redirected from another page) → allow showing success
      sessionStorage.setItem('successPageVisited', 'true');
    }

    // Cleanup when user leaves the page
    return () => {
      sessionStorage.removeItem('successPageVisited');
    };
  }, [router]);
  return (
    <main>
      <ResultSuccess />
    </main>
  )
}

export default ResultPage