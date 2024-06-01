'use client'
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { store } from '@/app/redux/store';
import { Provider } from 'react-redux';
import { Suspense } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <Suspense>
          {children}
        </Suspense>
      </NextThemesProvider>
    </NextUIProvider>
    </Provider>
  )
}