import styles from './styles.module.scss'
import { SignInButton } from '../signInButton/index';

export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}> 
                <img src="/images/logo.svg" alt="ig.news" />{/*padrão next, tem q ter pasta images dentro da pasta public se não num funfa */}
            
            <nav>
                <a className={styles.active}>Home</a>
                <a className="" href="">Posts</a>
            </nav>
            <SignInButton />
            </div>
        </header>
    )
}