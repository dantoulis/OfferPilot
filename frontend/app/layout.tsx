import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import {ReactQueryProvider} from './providers'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "OfferPilot - Your job search command center",
  description: "OfferPilot is a full-stack job-search CRM that helps users track applications, manage follow-ups, monitor progress, and turn their job search into a clear, organized workflow."
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="en"
      className={`h-full antialiased font-sans ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

export default RootLayout
