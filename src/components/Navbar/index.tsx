import styles from './index.module.scss'
import {FiGithub} from 'react-icons/fi'
import {BsGithub} from 'react-icons/bs'

import Link from 'next/link'

export default function Navbar(){
    return(
        <nav className={styles.container}>
            <ul>
                <li>
                    <Link href="/"><button>Buscar</button></Link>
                </li>
                <li>
                    <Link href="/mylist"><button>Minha Lista</button></Link>
                </li>
            </ul>
            
            <div className={styles.gitIconContainer}>
                <a href='https://github.com/joaopedroalb/weather-challenge'>
                    <BsGithub size={30}/>
                </a>
            </div>

        </nav>
    )
}