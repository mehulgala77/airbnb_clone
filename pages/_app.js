import 'tailwindcss/tailwind.css'
// Note: Import Tailwind custom styles
import '../styles/global.css'

import ProgressBar from '@badrap/bar-of-progress'
import { Router } from 'next/router'

// Note: Progress Bar when page transition happens
const progress = new ProgressBar({
  size: 4,
  color: '#fe595e',
  className: 'z-50',
  delay: 100
})

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
