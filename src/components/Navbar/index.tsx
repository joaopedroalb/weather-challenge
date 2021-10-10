import styles from './index.module.scss'

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
        </nav>
    )
}