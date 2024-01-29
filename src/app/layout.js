import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AppProvider from "@/components/AppContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yöre Mantı Evi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <Header />
            {children}
            <Footer />
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
