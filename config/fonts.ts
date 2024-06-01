import { Fira_Code as FontMono, Inter as FontSans, Sacramento } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-monoo",
})

export const sacraMento = Sacramento({
  subsets: ["latin"],
  variable: "--font-sacramento",
  weight: "400"
})
