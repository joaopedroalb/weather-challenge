import '../../styles/global.scss'
import type { AppProps } from 'next/app'
import WeatherProvider from '../context/weatherContext'
import PlaylistProvider from '../context/playlistContext'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    
      <WeatherProvider>
        <PlaylistProvider>
          <Component {...pageProps} />
        </PlaylistProvider>
      </WeatherProvider>
    
    
  )
}
export default MyApp
