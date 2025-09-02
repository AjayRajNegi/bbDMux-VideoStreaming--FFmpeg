import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Interactive Design Lab",
  description: "Immersive interactive experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-ffmpeg-black text-ffmpeg-white font-sans">
        {children}
      </body>
    </html>
  );
}
