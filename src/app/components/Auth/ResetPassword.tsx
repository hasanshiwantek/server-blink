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
import { useSearchParams } from "next/navigation";

interface ResetPasswordValues {
    password: string;
    password_confirmation: string;
}

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordValues>();
    const password = watch("password");

    const [loading, setLoading] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = async (data: ResetPasswordValues) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post("user/reset-password", {
                token: token,
                password: data.password,
                password_confirmation: data.password_confirmation
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
                                <span className="text-[#b91c1c]">Reset Password</span>
                            </div>
                        </nav>

                        <h1 className="mb-4 text-3xl font-light tracking-tight text-gray-700 md:text-4xl">
                            Change Password
                        </h1>
                        <p className="mb-0 text-[14px] leading-relaxed text-[#545454]">
                            Passwords must be at least 7 characters and contain both alphabetic and numeric characters.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-10">
                                {/* Password */}
                                <div>
                                    <div className="flex justify-between items-center">
                                        <label
                                            htmlFor="password"
                                            className="block text-[14px] font-normal text-[#545454] mb-2"
                                        >
                                            New Password
                                        </label>
                                        <span className="text-[#545454]">*</span>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        className="h-[42px] min-h-[42px] w-full max-w-full"
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-[14px] text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <div className="flex justify-between items-center">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block text-[14px] font-normal text-[#545454] mb-2"
                                        >
                                            Confirm Password
                                        </label>
                                        <span className="text-[#545454]">*</span>
                                    </div>

                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        className="h-[42px] min-h-[42px] w-full max-w-full"
                                        {...register("password_confirmation", {
                                            required: "Please confirm your password",
                                            validate: (value) =>
                                                value === password || "Passwords do not match",
                                        })}
                                    />
                                    {errors.password_confirmation && (
                                        <p className="mt-1 text-[14px] text-red-500">
                                            {errors.password_confirmation.message}
                                        </p>
                                    )}
                                </div>
                                <div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        aria-busy={loading}
                                        className="btn-primary inline-flex h-11 min-w-[150px] shrink-0 items-center justify-center px-5 text-sm font-bold uppercase sm:h-12 sm:min-w-[150px] sm:rounded-l-none sm:px-6 disabled:opacity-70"
                                    >
                                        {loading ? (
                                            "LOADING..."
                                        ) : (
                                            "CONTINUE"
                                        )}
                                    </button>
                                </div>

                            </div>
                        </form>
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

export default ResetPassword;
