"use client"
import {Box,Card} from '@mantine/core'
import {ZodI18nProvider} from "tp-kit/components";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
          <div className={"flex items-center space-around"}>


              <Card shadow="sm" padding="lg" radius="md" withBorder mx={"auto"} m={"lg"} className={"w-1/4"}>
                  <ZodI18nProvider>
                    {children}
                  </ZodI18nProvider>
          </Card>
          </div>
      </>

  )
}
