"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosInstance";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ForgotPasswordValues {
  email: string;
}

const ForgotPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordValues>();
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data: ForgotPasswordValues) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("user/forgot-password", {
        email: data.email,
      });
      const body = res?.data as {
        status?: boolean | string;
        message?: string;
      };
      const ok =
        body?.status === true ||
        body?.status === "true" ||
        String(body?.status).toLowerCase() === "true";
      if (ok) {
        setSuccessMessage(
          body.message || "Reset link sent to your email."
        );
        setSuccessOpen(true);
        reset();
      } else {
        toast.error(body?.message || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Unable to send reset email. Please try again later.";
      toast.error(typeof msg === "string" ? msg : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[var(--bg-color)] py-10 lg:py-14">
      <div className="w-[80%] max-w-full lg:max-w-[1170px] mx-0 lg:mx-auto lg:px-[0%] px-[7%]">
        <div className="flex w-full justify-center">
          {/* 585px column: page par center, andar text left (image jaisa) */}
          <div className="w-full min-w-0 max-w-[585px] text-left">
            <nav className="mb-5 w-full">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Link
                  href="/"
                  className="text-black hover:underline hover:text-gray-800"
                >
                  Home
                </Link>
                <span className="text-gray-500">/</span>
                <span className="text-[#b91c1c]">Forgot Password</span>
              </div>
            </nav>

            <h1 className="mb-4 text-3xl font-light tracking-tight text-gray-700 md:text-4xl">
              Reset Password
            </h1>
            <p className="mb-8 text-base leading-relaxed text-gray-600">
              Fill in your email below to request a new password. An email will
              be sent to the address below containing a link to verify your email
              address.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="forgot-email"
                  className="text-base font-semibold text-gray-700"
                >
                  Email Address
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
                  <Input
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    className="h-11 w-full min-w-0 flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-base shadow-none focus-visible:border-gray-400 focus-visible:ring-0 sm:h-12 sm:rounded-r-none sm:border-r-0"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="btn-primary inline-flex h-11 min-w-[200px] shrink-0 items-center justify-center px-5 text-sm font-bold uppercase sm:h-12 sm:min-w-[220px] sm:rounded-l-none sm:px-6 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <span
                          className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-white border-t-transparent"
                          aria-hidden
                        />
                        <span className="sr-only">Sending…</span>
                      </>
                    ) : (
                      "RESET PASSWORD"
                    )}
                  </button>
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </form>

            <p className="mt-8 text-sm text-gray-600">
              <Link
                href="/auth/login"
                className="text-[#b91c1c] underline decoration-[#b91c1c] underline-offset-2 hover:opacity-90"
              >
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent
          showCloseButton={true}
          className="max-w-[420px] border border-gray-200 bg-white sm:max-w-[440px]"
        >
          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Email sent
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              {successMessage ||
                "Reset link sent to your email. Please check your inbox."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              className="btn-primary w-full sm:w-auto sm:min-w-[200px]"
              onClick={() => {
                setSuccessOpen(false);
                router.push("/auth/login");
              }}
            >
              GO TO LOGIN
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ForgotPassword;
