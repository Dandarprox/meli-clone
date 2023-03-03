import DefaultLayout from '@/components/layouts/Default';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Figtree } from 'next/font/google'

const figtree = Figtree({ 
  subsets: ['latin'], 
  variable: '--font-figtree'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <style jsx global>{`
        html {
          font-family: ${figtree.style.fontFamily};
        }
      `}</style>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </>
  )
}
