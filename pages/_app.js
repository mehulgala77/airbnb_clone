import 'tailwindcss/tailwind.css'
// Note: Import Tailwind custom styles
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
