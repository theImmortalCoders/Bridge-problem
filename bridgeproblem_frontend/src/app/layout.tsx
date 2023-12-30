import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Bridge problem",
    description: "Marcin Bator, Wiktor Mazur",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="eng">
        <body className={inter.className}>{children}</body>
        </html>
    );
}
