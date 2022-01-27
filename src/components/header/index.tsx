import { SignInButton } from '../signInButton/index';
import {ActiveLink} from '../activLink/Index'

import styles from './styles.module.scss'


export function Header(){

    

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}> 
                <img src="/images/logo.svg" alt="ig.news" />{/*padrão next, tem q ter pasta images dentro da pasta public se não num funfa */}
            
            <nav>
                <ActiveLink href='/' activeClassname={styles.active}>
                <a>Home</a>
                </ActiveLink>
                <ActiveLink href='/posts' activeClassname={styles.active}>
                <a>Posts</a>
                </ActiveLink>
            </nav>
            <SignInButton />
            </div>
        </header>
    )
}