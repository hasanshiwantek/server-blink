import React from "react";
import SignupPage from "@/app/components/Auth/Signup";
import { Metadata } from "next";
import ProtectedRoute from "@/app/components/ProtectedPages/ProtectedRoute";
export const metadata: Metadata = {
  title: "Signup - ServerBlink",
  description: "Create your account at ServerBlink to access premium services.",
  keywords: ["signup", "register", "server blink", "create account"],
  robots: { index: true, follow: true },
};

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <SignupPage />
      </div>
    </ProtectedRoute>
  );
};

export default page;
