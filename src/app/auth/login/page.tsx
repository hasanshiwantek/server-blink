import Signin from '@/app/components/Auth/Signin'
import ProtectedRoute from '@/app/components/ProtectedPages/ProtectedRoute';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Sign In - ServerBlink",
  description:
    "Login to your ServerBlink account to manage orders, track purchases, and access exclusive member features.",
  keywords: [
    "signin",
    "login",
    "server blink",
    "customer login",
    "account access",
    "order tracking"
  ],
  robots: { index: true, follow: true },
};


const page = () => {
  return (
   <ProtectedRoute>
     <div>
      <Signin/>
    </div>
   </ProtectedRoute>
  )
}

export default page