import ForgotPassword from "@/app/components/Auth/ForgotPassword";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Request a password reset link for your ServerBlink account via email.",
  robots: { index: false, follow: true },
};

export default function ForgotPasswordPage() {
  return (
    <div>
      <ForgotPassword />
    </div>
  );
}
