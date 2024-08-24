import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shawn Smith | Software Engineer",
  description: "Portfolio Website of Shawn Smith Software Engineer specializing in JavaScript and TypeScript with a focus on SPAs with React and Express",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
