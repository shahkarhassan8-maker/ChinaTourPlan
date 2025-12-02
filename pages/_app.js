import '../styles/globals.css'
import { Toaster } from 'sonner'
import { LanguageProvider } from '@/lib/LanguageContext'

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
      <Toaster position="top-center" richColors />
    </LanguageProvider>
  )
}

export default MyApp
