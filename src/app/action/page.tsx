"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import ActionSuccess from '../components/Result/ActionSuccess';


const ActionPage = () => {
//   const router = useRouter();

//   useEffect(() => {
//     // Check if this is a page refresh
//     const hasVisited = sessionStorage.getItem('successPageVisited');

//     if (hasVisited) {
//       // User refreshed the page → redirect to home
//       router.replace('/');
//     } else {
//       // First visit (redirected from another page) → allow showing success
//       sessionStorage.setItem('successPageVisited', 'true');
//     }

//     // Cleanup when user leaves the page
//     return () => {
//       sessionStorage.removeItem('successPageVisited');
//     };
//   }, [router]);
  return (
    <main>
      <ActionSuccess />
    </main>
  )
}

export default ActionPage