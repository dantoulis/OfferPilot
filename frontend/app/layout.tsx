import type { Metadata } from "next";
import "./globals.css";

import {ReactQueryProvider} from './providers'

export const metadata: Metadata = {
  title: "OfferPilot - Your job search command center",
  description: "OfferPilot is a full-stack job-search CRM that helps users track applications, manage follow-ups, monitor progress, and turn their job search into a clear, organized workflow."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
