import Head from "next/head";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useState } from "react";



export default function Contact() {

    const [submitStatus, setSubmitStatus] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [alertColor, setAlertColor] = useState('bg-green-500');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {
            firstName: event.target.firstName.value,
            email: event.target.email.value,
            message: event.target.message.value,
        }
    
       const jsonData = JSON.stringify(data);
       const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
       });
    
       const result = await response.json();
       console.log(result.data);

       setSubmitStatus(true);
       setResponseMessage(result.data);

       if(!response.ok) {
        setAlertColor('bg-red-500')
       }
       else {
        setAlertColor('bg-green-500')
       }
    }

    return (
        <>
            <Head>
                <title>Contact us</title>
            </Head>
            <section className="bg-slate-700">
                <SiteHeader className="header-contact" />
            </section>
            <section>
                <div className="container mx-auto lg:max-w-4xl">
                    <h1 className="text-4xl text-center text-slate-700 py-8">Contact us</h1>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label htmlFor="firstName">First name:</label>
                        <input type="text" id="firstName" name="firstName"></input>

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email"></input>

                        <label>Message</label>
                        <textarea name="message" id="message"></textarea>
                        <button type="submit">Submit</button>
                    </form>
                    {submitStatus ? <SubmissionAlert message={responseMessage} alertColor={alertColor}/> : null}
                </div>
                
            </section>
        </>
    )
}

const SubmissionAlert = ({message, alertColor}) => {
    return (
        <div className={`${alertColor} py-2 px-4 mt-4 text-slate-100 rounded-md`}> 
            {message}
        </div>
    )
}