import Link from "next/link";



export default function SiteFooter() {
    return (
        <>
            <footer className=" bg-slate-200"> 
                <div className="flex justify-between items-center container mx-auto lg:max-w-5xl">
                    <div className="py3">
                        &copy; 2022-2023 Cool
                    </div>
                    <ul className="flex [&>li>a]:px-2">
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="/sample-page">Sample Page</Link>
                        </li>
                    </ul>
                </div>
                
               
            </footer>
        </>
    )
}