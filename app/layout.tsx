import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CustomLayout } from "@/components";
import AppProvider from "./Provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Mevinai',
  description: 'Deploy ERPNext SaaS in 3 just minutes automatically.',
  keywords: 'mevinai, frappe,erpnext, ethiopia, innovation',
  robots: 'index, follow',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <AppProvider>
        <body
          className={`bg-white ${geistSans.variable} ${geistMono.variable}`}
        >
          <CustomLayout>{children} </CustomLayout>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </body>
      </AppProvider>

    </html>
  );
}
