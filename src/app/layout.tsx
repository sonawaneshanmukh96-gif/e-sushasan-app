import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import "./globals.css";

export const metadata: Metadata = {
    title: "Nandurbar e-Sushasan",
    description: "District Governance Administration System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* Force the background and flex here */}
            <body className="bg-gray-50">
                <ClientLayoutWrapper>
                    {/* The wrapper must handle the flex layout */}
                    <div className="flex min-h-screen">
                        <Sidebar />
                        <main className="flex-1 overflow-y-auto p-8">
                            {children}
                        </main>
                    </div>
                </ClientLayoutWrapper>
            </body>
        </html>
    );
}