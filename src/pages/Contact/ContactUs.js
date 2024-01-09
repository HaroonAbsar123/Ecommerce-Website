import React, {useState} from "react";
import classes from "./ContactUs.module.css";
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import MainProduct from '../../Assets/contactUsPhone.png';
import Footer from "../../components/Footer";


export default function ContactUs() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [type, setType] = useState('')
  const [howCanWeSupport, setHowCanWeSupport] = useState('')


  async function formSubmit(e) {
    e.preventDefault();
  
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      type: type,
      howCanWeSupport: howCanWeSupport,
    };
    
  //   // Save the form data to Firestore (your existing code)
    
  //   const tableRows = Object.entries(body)
  //     .map(([key, value]) => `
  //       <tr>
  //         <td>${key}</td>
  //         <td>${value}</td>
  //       </tr>
  //     `)
  //     .join('');
    
  //   const emailParams = {
  //     from_name: "IBInnovators",
  //     to_name: "IBInnovators",
  //     to: 'contact@ibinnovators.com', // Replace with your recipient's email address
  //     subject: 'New Contact Us Form Submission',
  //     message: `
  //     <html>
  //     <head>
  //     </head>
  //     <body>
  //     <p>A person just submitted Contact Us Form:</p>
  //     <table style="border: 1px solid #000; border-collapse: collapse; width: 100%;">
  //     <tbody>
  //         <tr>
  //             <td style="border: 1px solid #000; padding: 8px;"><strong>First Name:</strong></td>
  //             <td style="border: 1px solid #000; padding: 8px;"><strong>Last Name:</strong></td>
  //             <td style="border: 1px solid #000; padding: 8px;"><strong>Email:</strong></td>
  //             <td style="border: 1px solid #000; padding: 8px;"><strong>Phone:</strong></td>
  //             <td style="border: 1px solid #000; padding: 8px;"><strong>Type:</strong></td>
  //             <td style="border: 1px solid #000; padding: 8px;"><strong>How Can We Support:</strong></td>
  //         </tr>
  //         <tr>
  //             <td style="border: 1px solid #000; padding: 8px;">${body.firstName}</td>
  //             <td style="border: 1px solid #000; padding: 8px;">${body.lastName}</td>
  //             <td style="border: 1px solid #000; padding: 8px;">${body.email}</td>
  //             <td style="border: 1px solid #000; padding: 8px;">${body.phone}</td>
  //             <td style="border: 1px solid #000; padding: 8px;">${body.type}</td>
  //             <td style="border: 1px solid #000; padding: 8px;">${body.howCanWeSupport}</td>
  //         </tr>
  //     </tbody>
  // </table>
  
  //     <p>Ibinnovators</p>
      
  //     </body>
  //     </html>
      
  // `,
// };
    
    
    
  
//     // Use your email service credentials here
//     const serviceId = 'service_94jepxc';
//     const templateId = 'template_a3htpzi';
//     const userId = 'ccjdlLBwrBG_K7JJE';
  
//     emailjs.send(serviceId, templateId, emailParams, userId)
//       .then((response) => {
//         console.log('Email sent successfully:', response);
//         // Handle success, such as resetting form fields
//         setFirstName('');
//         setLastName('');
//         setEmail('');
//         setPhone('');
//         setHowCanWeSupport('');
//       })
//       .catch((error) => {
//         console.error('Error sending email:', error);
//       });
  
    console.log(body);
  }

    const navigate= useNavigate()
  return (
    <>
      <div className={classes.mainImage}>

<div className={classes.mainImageComponent}>
    <div className={classes.mainImageText}>
    <h2 style={{fontSize: '5rem', marginBottom: '0rem'}}>Contact Us</h2>
    <p style={{fontSize: '1.5rem'}}>Please Fill Out Form Below</p>
    </div>
</div>

<div className={classes.mainImageComponent}>
    
</div>

</div>


<div style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',marginBottom: '0rem', padding: '0.5rem', backgroundColor: '#ddd', height: '100%', borderRadius: '2rem', margin: '2rem', position: 'relative', top: '-5rem'}} className={classes.contactFormSecond}>
            <div style={{padding: '1rem', backgroundColor: '#eee', borderRadius: '1.5rem'}}>
              <form onSubmit={formSubmit}>
                <div className={classes.formGroup} >
                  <label htmlFor="firstName">First Name:</label>
                  <input value={firstName} onChange={(e) => {setFirstName(e.target.value)}} type="text" id="firstName" name="firstName" required />
                </div>
                <div className={classes.formGroup}>
                  <label htmlFor="lastName">Last Name:</label>
                  <input value={lastName} onChange={(e) => {setLastName(e.target.value)}} type="text" id="lastName" name="lastName" required />
                </div>
                <div className={classes.formGroup}>
                  <label htmlFor="email">Email:</label>
                  <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" id="email" name="email" required />
                </div>
                <div className={classes.formGroup}>
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input value={phone} onChange={(e) => {setPhone(e.target.value)}} type="tel" id="phoneNumber" name="phoneNumber" />
                </div>
                <div  className={classes.formGroup}>
                  <label htmlFor="support">How can we help you?</label>
                  <textarea value={howCanWeSupport} onChange={(e) => {setHowCanWeSupport(e.target.value)}} id="support" name="support" rows="4" required></textarea>
                </div>
                <button  className="mainButton" type="submit">Submit</button>
              </form>
            </div>
          </div>
      <Footer/>
    </>
  );
}
