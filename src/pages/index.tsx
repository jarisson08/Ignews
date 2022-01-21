import Head from 'next/head';
import styles from './home.module.scss'
import {SubscribeButton} from '../components/subscribeButton/index'
import {GetServerSideProps} from 'next'
import { stripe } from '../services/stripe';


interface HomeProps {
  
  product:{
    priceId: string;
    amount: number;
  }
}

//Next possui 3 formas princiapsi de chamad a api:
//Client-side rendering -> quando não precisa de indexação, qnd informação depende de ação do usuário. Ex: comentário de blog
//Server-side rendering: GetServerSideProps -> Em páginas onde a informação se modifica de maneira mais dinâmica. Ex: área de login com nome pra cada usuário
//Static Site Generation: GetStaticProps -> Em páginas onde a informação não muda com frequência. Ex:home e posts de um blog

export default function Home({product} : HomeProps) {
  return (
    <>
    <Head>{/*Tudo q jogar aqui será anexado ao Head do _document */}
      <title>Home</title>
      
    </Head>
    
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏Hey, Welcome!</span>
        <h1>News about the <span>React </span>World</h1>
        <p>
          Get acess to all the publications <br />
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId}/>
      </section>
      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
  
   </>
  )
}

//essa função tem q ser chamar assim e é chamada em const pra incluir tipagem ja existente no next
export const getServerSideProps: GetServerSideProps = async ()=> {

  const price = await stripe.prices.retrieve('price_1KIm75AfzBZQEHApH5snhIIl')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',

    }).format(price.unit_amount / 100)//dividido por 100 pois está salvando em centavos pra evitar trabalhar com casas decimais
  }

  return{
    props: {
      product,
    }
    
  }
}