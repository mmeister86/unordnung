import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Chaos Quest - Retro Adventure Game",
    description: "An 8-bit retro text-adventure game teaching task breakdown skills for children with ADHD",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-(--retro-bg-dark) text-(--retro-text-main)`}
            >
                <script defer src="https://umami.matthias.lol/script.js" data-website-id="8ebc5d9d-84f0-4ab9-a131-436c28a5047e"></script>
                {children}
            </body>
        </html>
    );
}
