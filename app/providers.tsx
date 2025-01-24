'use client'
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { store } from '@/app/redux/store';
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <Suspense>
        <SessionProvider>
          {children}
          </SessionProvider>
        </Suspense>
      </NextThemesProvider>
    </NextUIProvider>
    </Provider>
  )
}