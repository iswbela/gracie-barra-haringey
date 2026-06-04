import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ToastContainer } from "@/components/ui/ToastContainer";

export const metadata: Metadata = {
  title: {
    default: "Gracie Barra Haringey | Brazilian Jiu-Jitsu in North London",
    template: "%s | Gracie Barra Haringey",
  },
  icons: {
    icon: "/media/gb-logo.png",
    apple: "/media/gb-logo.png",
  },
  description:
    "Train Brazilian Jiu-Jitsu at Gracie Barra Haringey. World-class instruction for adults, kids and beginners in North London. Book your free trial class today.",
  keywords: ["Brazilian Jiu-Jitsu", "BJJ", "Haringey", "North London", "Gracie Barra", "martial arts", "self defence", "kids BJJ"],
  openGraph: {
    title: "Gracie Barra Haringey | Brazilian Jiu-Jitsu in North London",
    description: "Train Brazilian Jiu-Jitsu at Gracie Barra Haringey. World-class instruction for adults, kids and beginners in North London.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ background: "var(--white)", color: "var(--black)" }}>
        <Navbar />
        <CartDrawer />
        <ToastContainer />
        <main style={{ minHeight: "100vh" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
