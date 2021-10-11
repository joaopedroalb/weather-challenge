import type { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.scss'
import SearchInput from '../components/SearchInput'

import { useContext } from 'react'

import { WeatherContext } from '../context/weatherContext'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {

  const {} = useContext(WeatherContext)
  
  return (
    <section className={styles.container}>
      <Navbar/>
      <header className={styles.headerStuff}>
        <img src="./search-place.svg"/>
      </header>
      <SearchInput/>
    </section>
  )
}

export default Home
