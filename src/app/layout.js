import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from "@mui/material";
import Header from "./header";
import { theme } from "@/lib/theme";
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
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Header/>
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
  );
}
