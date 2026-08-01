import { Roboto_Slab, Roboto, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

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
  children,
  coalitions,
}: Readonly<{
  children: React.ReactNode
  coalitions: React.ReactNode
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
      <body>
        {children}
        <Suspense fallback={<Skeleton className="h-6 w-1/2 bg-primary" />}>
          {coalitions}
        </Suspense>
      </body>
    </html>
  )
}
