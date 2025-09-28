import { ThemeProvider } from "@/provider/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans} from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"; 
import ModalProvider from "@/provider/modal-provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Automation Builder",
  description: "Automate your work with Fuzzie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider 
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
  >
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} antialiased overflow-x-hidden`}
      >
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </body>
    </html>
   </ClerkProvider>
   );
}
