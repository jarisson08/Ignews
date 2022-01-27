import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import { RichText } from "prismic-dom"
import { getPrismicClient } from "../../services/prismic"


interface PostProps {
   post: { 
    slug: string,
    title: string,
    content: string
    updatedAt: string,}
}

export default function Post({post}: PostProps) {

    return(
        <>
        <Head>
            <title>{post.title} | Ignews</title>
        </Head>

        <main>
            <article>
                <h1>{post.title}</h1>
                <time>{post.updatedAt}</time>
                <div dangerouslySetInnerHTML={{__html : post.content}} />
            </article>
        </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params})=> {
    const session= await getSession({req})//vai buscar os cookies para saber se o usuário tá logado ou não
    const {slug}= params;//pra saber qual post quero carregar

    if(!session.activeSubscription){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }


    const prismic= getPrismicClient(req);

    const response= await prismic.getByUID<any>('publication', String(slug), {});

    if(!response){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const post= {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }
    
    return{
        props: {
            post
        }
    }
}

