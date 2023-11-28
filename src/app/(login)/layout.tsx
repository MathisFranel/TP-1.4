"use client"
import {Box,Card} from '@mantine/core'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
          <div className={"flex items-center space-around"}>
          <Card shadow="sm" padding="lg" radius="md" withBorder mx={"auto"} m={"lg"} className={"w-1/4"}>
      {children}
          </Card>
          </div>
      </>

  )
}
