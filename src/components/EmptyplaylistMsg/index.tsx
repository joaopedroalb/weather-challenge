import styles from './index.module.scss'

import Link from 'next/link'

export default function EmptyplaylistMsg(){
    return(
        <div className={styles.container}>
            <img src="sad-face.svg" alt="sad face"/>
            <div className={styles.notesContainer}>
                <h1>Você não tem nenhuma lista</h1>
                <p>Adicione alguma cidade. Clique <Link href="/"><strong>aqui</strong></Link> para buscar alguma cidade.</p>
            </div>
        </div>
    )
}