// app/my-account/layout.tsx
import React from "react";
import MyAccountTabs from "../components/layout/MyAccountLayoutWrapper";
import ProtectedLayout from "../components/ProtectedPages/ProtectedLayout";


const MyAccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <ProtectedLayout>
<main className="flex flex-col gap-8" role="main">
  {/* Container: max-width 1170px, centered */}
  <div className="w-full max-w-[1170px] mx-auto lg:px-6 xl:px-0">
    <div className="py-2">
      {/* My Account Tabs */}
      <MyAccountTabs />

      {/* Main Content */}
      <div className="mt-6">
        {children}
      </div>
    </div>
  </div>
</main>

    </ProtectedLayout>
    </>
  );
};

export default MyAccountLayout;
