import { Roboto_Slab, Roboto, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
})

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  coalitions,
  clusters,
  projects,
  events,
}: Readonly<{
  coalitions: React.ReactNode
  clusters: React.ReactNode
  projects: React.ReactNode
  events: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        roboto.variable,
        robotoSlab.variable
      )}
    >
      <body className="flex gap-4 p-4">
        <ThemeProvider>
          {coalitions}
          {clusters}
          {projects}
          {events}
        </ThemeProvider>
      </body>
    </html>
  )
}
