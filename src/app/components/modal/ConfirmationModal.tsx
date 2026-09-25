"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ShieldCheck, ShieldOff, AlertTriangle } from "lucide-react";

type ConfirmVariant = "enable" | "disable" | "warning";

export default function ConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  loading,
  variant = "enable",
  title,
  description,
}: {
  open: boolean;
  loading?: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
  variant?: ConfirmVariant;
  title?: string;
  description?: string;
}) {
  const config = {
    enable: {
      icon: <ShieldCheck className="w-5 h-5 text-green-600" />,
      iconBg: "bg-green-50",
      title: title || "Enable this feature?",
      description: description || "Are you sure you want to enable this? This will take effect immediately.",
      confirmLabel: "Enable",
      confirmClass: "bg-[#031033] hover:bg-[#031033] text-white",
    },
    disable: {
      icon: <ShieldOff className="w-5 h-5 text-red-500" />,
      iconBg: "bg-red-50",
      title: title || "Disable this feature?",
      description: description || "Are you sure you want to disable this? This will take effect immediately.",
      confirmLabel: "Disable",
      confirmClass: "bg-red-600 hover:bg-red-700 text-white",
    },
    warning: {
      icon: <AlertTriangle className="w-8 h-8 text-yellow-600" />,
      iconBg: "bg-yellow-50",
      title: title || "Are you sure?",
      description: description || "This action cannot be undone. Please confirm to proceed.",
      confirmLabel: "Confirm",
      confirmClass: "bg-yellow-600 hover:bg-yellow-700 text-white",
    },
  };

  const c = config[variant];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[440px] p-8">

        {/* Header */}
     {/* Header */}
{/* Header */}
<div className="flex flex-col items-center text-center gap-4 mb-9!">
  <div
    className={`w-16 h-16 rounded-full ${c.iconBg} flex items-center justify-center shrink-0`}
  >
     {c.icon}
  </div>

  <div className="space-y-1.5">
    <DialogTitle className="text-[18px]! font-semibold">
      {c.title}
    </DialogTitle>

    <DialogDescription className="text-[12px]! text-muted-foreground leading-6">
      {c.description}
    </DialogDescription>
  </div>
</div>

        {/* Divider + Footer */}
        <div className="border-t pt-6 flex justify-end gap-3">
  <Button
    variant="outline"
    type="button"
    className="text-base px-5 py-5"
    onClick={() => onOpenChange(false)}
  >
    Cancel
  </Button>

  <Button
    type="button"
    className={`text-base px-5 py-5 ${c.confirmClass}`}
    disabled={loading}
    onClick={onConfirm}
  >
    {loading ? "Please wait..." : c.confirmLabel}
  </Button>
</div>

      </DialogContent>
    </Dialog>
  );
}