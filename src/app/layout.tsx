import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { Providers } from "./providers";

const pressStartFont = Press_Start_2P({
  style: "normal",
  weight: "400",
  subsets:["latin"]
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element;
}>) {
  return (
    <html lang="en">
      <body className={pressStartFont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
