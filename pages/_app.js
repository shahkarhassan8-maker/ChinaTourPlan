import '../styles/globals.css'
import { Toaster } from 'sonner'
import { LanguageProvider } from '@/lib/LanguageContext'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
      <Toaster position="top-center" richColors />
      <Script src="https://assets.lemonsqueezy.com/lemon.js" strategy="lazyOnload" />
    </LanguageProvider>
  )
}

export default MyApp
