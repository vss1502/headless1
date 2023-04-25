import Head from "next/head";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getPostSlugs, getSinglePost } from "@/lib/posts";
import Date from "@/components/Date";

export async function getStaticProps({params}) {
    const postData = await getSinglePost(params.postSlug);

    let featureImageUrl = "http://headless/wp-content/uploads/2023/04/images.png"

    if(postData.featuredImage && postData.featuredImage.node.mediaDetails.sizes[1].sourceUrl) {
        featureImageUrl = postData.featuredImage.node.mediaDetails.sizes[1].sourceUrl;
    }

    return {
        props: {
            postData,
            featuredImageUrl: "url(" + featureImageUrl + ")"
        }
    }
}

export async function getStaticPaths() {
    const postSlugs = await getPostSlugs();

    return {
        paths: postSlugs.map((s) => (
            {
                params: { 
                    postSlug: s.slug
                }
            }
            
        )),
        fallback: false
    }
}

export default function Post({postData, featuredImageUrl}) {
    return (
        <>
            <Head>
                <title key={postData.slug}>{postData.title}</title>
                <meta name="description" content={postData.excerpt} key="metadescription"></meta>
            </Head>
            <section className="bg-slate-700 bg-opacity-70 absolute w-full z-20">
                <SiteHeader className="header-single-post z-10 relative"></SiteHeader>
            </section>
            <article>
                <section className="hero-area h-[60vh] min-h-[30rem] bg-cover bg-center relative" style={{backgroundImage: featuredImageUrl}}>
                    <div className="absolute inset-0 bg-slate-900 opacity-40"></div>
                    <div className="container mx-auto h-full flex flex-col justify-center lg:max-w-4xl">
                        <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8 mt-12">
                            {postData.title}
                        </h1>
                        <div className="pb-4 text-slate-100 z-10">
                            Posted by onPoint, last updated on 
                            <Date dateString={postData.modified} />
                        </div>
                        <div dangerouslySetInnerHTML={{__html: postData.excerpt}} className="relative z-10 text-left text-slate-200 text-2xl pl-4 border-l-4 border-lime-200" ></div>
                    </div>
                </section>
                <section className="content-area py-8">
                    <div dangerouslySetInnerHTML={{__html: postData.content}} className="post-content comtainer max-w-4xl mx-auto"></div>
                </section>
            </article>
            <SiteFooter />
        </>
    )
}