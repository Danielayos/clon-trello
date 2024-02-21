import  {useState, useEffect} from "react";
import TrelloLogo from "../components/trello";
import Icons2 from "../components/icons2"
import { google } from "../firebase/auth"
import { useNavigate } from "react-router-dom";
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function LoginPages() {
  
    const [currentImage, setCurrentImage] = useState(
      "https://images.ctfassets.net/rz1oowkt5gyp/3N2U3C71rApm61cGFxnc2E/970b010002488a09a420282df5e7b43a/Carousel_Image_Boards_2x.png?w=1140&fm=webp"
    );   
   
    const navigate = useNavigate();
    const handleLogin = async () => {
      const result = await google();
      const token = await result.user.getIdToken(true);
      sessionStorage.setItem("token", JSON.stringify(token));
      navigate("/");
    };
    useEffect(() => {
      const handleClick = (e) => {
        e.preventDefault();
        const clickedButton = e.target.closest("button");
        if (clickedButton) {
          setCurrentImage(clickedButton.dataset.image); 
        }
      };
      document.body.addEventListener("click", handleClick);
  
      return () => {
        document.body.removeEventListener("click", handleClick);
      };
    }, []);
  
    return (
        <>
        <div className="flex gap-4">
            <div className="ml-5 mt-3 mb-4">
                <TrelloLogo />
            </div>
            <div className="mb-4">
                <ul className="flex gap-10 mt-5 ml-6 font-medium">
                    <li>Funciones</li>
                    <li>Soluciones</li>
                    <li>Planes</li>
                    <li>Precios</li>
                    <li>Recursos</li>
                </ul>
            </div>
            <div className="flex inicia">
                <button onClick={handleLogin} className="mt-1 mr-5 font-medium">
                 iniciar sesión
                </button>
                <div className="bg-blue-500 text-white text-center gratis">
                    <p className="font-medium mt-5 ">Obtener Trello gratis</p>
                </div>
            </div>
        </div>
        <nav className="bg-gray-200 text-center p-4 font-medium ">
        <p>
            Accelerate your teams work with Atlassian Intelligence (AI) features 🤖 now in beta! <a href="https://community.atlassian.com/t5/Trello-articles/Accelerate-your-teams-work-with-Atlassian-Intelligence-AI/ba-p/2499009" className="underline text-blue-600">learn more</a>
        </p>
        </nav>
            <section className="colores bg-gradient flex">
                <div className="ml-24 mt-36 w-8/12">
                        <span className="letras font-medium text-white">Trello unifica tus tareas, </span>
                        <span className="letras1 font-medium text-white">compañeros de equipo y</span>
                        <span className="letras2 font-medium text-white"> herramientas</span>
                        <div className="grid w-[97%]">
                        <span className=" font-sans text-white mt-4 letras3">Mantenlo todo en el mismo lugar, aunque tu equipo no </span>
                        <span className="font-sans text-white letras3"> lo esté.</span>
                        </div>
                    <div className="flex mt-8 gap-3">
                        <input type="text" className="p-2  rounded-lg border hover:border-b-white" placeholder="correo electrónico"/>
                        <button className="p-2 text-white rounded-lg font-medium w-56 h-14 bg-blue-500 hover:bg-blue-800">Regístrate,¡es gratis!</button>
                    </div>
                    <div className="mt-9">
                        <span className="underline text-white font-medium ">Ver el vídeo</span>
                    </div>
                </div>
                <div>
                    <img className=" mt-32 w-[94%] ml-10" src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp" alt="" />
                </div>
            </section>
            <section className="div3">
                <div className="ml-24 mt-10 w-[50%] ">
                    <span className="font-sans text-black letras4">EL ABC DE TRELLO</span>
                    <span className="font-sans text-black letras5 block">Un centro neurálgico de productividad</span>
                    <div className="mt-5">
                    <span className="font-sans text-black letras4 block">Sencillo, flexible y potente. Todo lo que necesitas son tableros,</span>
                    <span className="font-sans text-black letras4 block">listas y tarjetas para poder ver de forma clara quién está haciendo</span>
                    <span className="font-sans text-black letras4">qué y las tareas pendientes. Más información en nuestra <a href="" className="underline text-blue-600" >guía de inicio.</a></span>
                    </div>
                </div>
                <div className="flex div2 w-[90%] ml-24" >
                    <div className="w-[30%]">
                    <button 
                        className="button font-medium h-[26%] rounded-lg text-left mt-10 hover:bg-gray-100 p-7 duration-700" 
                        data-image={'https://images.ctfassets.net/rz1oowkt5gyp/3N2U3C71rApm61cGFxnc2E/970b010002488a09a420282df5e7b43a/Carousel_Image_Boards_2x.png?w=1140&fm=webp'}>
                        Tableros
                        <br />
                        Los tableros de Trello mantienen las tareas organizadas y ayudan a que el trabajo avance. Podrás verlo todo de un solo vistazo, desde las cosas pendientes a las que ya están terminadas.
                    </button>

                    <button 
                        className="button font-medium h-[28%] text-left rounded-lg mt-3 hover:bg-gray-100 p-7 duration-700" 
                        data-image={'https://images.ctfassets.net/rz1oowkt5gyp/4U0VUZYX2tQmB5KVGxBabp/7321ac088fe8ec39dbe3069c47d7df99/Carousel_Image_Lists_2x.png?w=1140&fm=webp'}>
                        listas
                        <br />
                        Las diferentes fases de una tarea. Empieza con algo sencillo como Pendiente, En curso o Listo, o crea un flujo de trabajo a medida de las necesidades de tu equipo. No hay posibilidad de equivocarse con Trello.
                    </button>

                    <button 
                        className=" button font-medium h-[28%] text-left rounded-lg mt-3 hover:bg-gray-100 p-7 duration-700" 
                        data-image={'https://images.ctfassets.net/rz1oowkt5gyp/26CA6JZeRgoOK4nuRHnIlY/060702a80cf7c3be3651d9297d196267/Carousel_Image_Cards_2x.png?w=1140&fm=webp'}>
                        Tableros
                        <br />
                        Las tarjetas representan las tareas y las ideas e incluyen toda la información necesaria para hacer el trabajo. A medida que avances, mueve las tarjetas de una lista a otra para mostrar su estado.
                        
                    </button>
                    </div>
                    
                <img className="w-[60%] h-[30%] ml-7 mt-10" src={currentImage} alt="Current Image" />
                </div>
            </section>
            <section className="mt-14 ml-32">
        <span className="block font-medium">TRELLO EN ACCIÓN</span>
        <span className="block mt-4 font-medium text-slate-800 text-3xl">
          Flujos de trabajo para cualquier
        </span>
        <span className="font-medium mt-10 text-3xl text-slate-800">
          proyecto, grande o pequeño
        </span>
        <div>
          
            <button>Izquierda</button>
            <button>Derecha</button>
          
            <Swiper
      modules={[Virtual, Navigation, Pagination]}
      className="overflow-hidden"
      spaceBetween={30}
      slidesPerView={3}
      slidesOffsetBefore={1}
      
      
    >
      <SwiperSlide className="h-64 w-[50%] rounded-lg shadow-xl hover:shadow-2xl">
        <div className="bg-red-300 rounded-t-lg h-12">
          e
        </div>
        <div className="bg-white h-full mt-5">
          <h3 className="text-2xl ml-6">Gestión de proyecto</h3>
          <p className=" ml-6 mt-3 w-[80%] letras6">Trello te permite mantener las tareas en orden, los pasos controlados y los miembros del equipo coordinado.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="h-64 w-[50%] rounded-lg shadow-xl hover:shadow-2xl">
      <div className="bg-blue-300 rounded-t-lg h-12">
          e
        </div>
        <div className="bg-white  h-full mt-5">
          <h3 className="text-2xl ml-6">Reuniones</h3>
          <p className=" ml-6 mt-3 w-[80%] letras6">Consigue que las reuniones en equipo sean mas productivas, motivadoras e incluso divertidas</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className=" h-64 w-[50%] rounded-lg shadow-xl hover:shadow-2xl">
      <div className="bg-green-300 rounded-t-lg h-12">
          e
        </div>
        <div className="bg-white h-full mt-5">
          <h3 className="text-2xl ml-6">La incorporación</h3>
          <p className=" ml-6 mt-3 w-[80%] letras6">La incorporación a una nueva empresa o proyecto no podría ser más sencilla con el diseño visual de Trello, que muestra las tareas pendientes, los recursos y el seguimiento del progreso.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className=" h-64 w-[50%] rounded-lg shadow-xl hover:shadow-2xl">
      <div className="bg-orange-300 rounded-t-lg h-12">
          e
        </div>
        <div className="bg-white h-full mt-5">
          <h3 className="text-2xl ml-6">Gestion de tareas</h3>
          <p className=" ml-6 mt-3 w-[80%] letras6">Usa Trello para rastrear, gestionar, llevar a cabo y unir tareas como las piezas de un rompecabezas, y hacer que los proyectos de tu equipo tengan resultados positivos y constantes.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className=" h-64 w-[50%] rounded-lg shadow-xl hover:shadow-2xl">
      <div className="bg-blue-100 rounded-t-lg h-12">
          e
        </div>
        <div className="bg-white h-full mt-5">
          <h3 className="text-2xl ml-6">Lluvia de ideas</h3>
          <p className=" ml-6 mt-3 w-[80%] letras6">Da rienda suelta a la creatividad de tu equipo y mantén la visibilidad de las ideas, la colaboración en ellas y su utilidad práctica.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className=" h-64 w-[50%] rounded-lg shadow-xl hover:shadow-2xl">
      <div className="bg-purple-300 rounded-t-lg h-12">
          e
        </div>
        <div className="bg-white h-full mt-5">
          <h3 className="text-2xl ml-6">Centros de Recursos</h3>
          <p className=" ml-6 mt-3 w-[80%] letras6">Ahorra tiempo con un centro bien diseñado que ayuda a los equipos a encontrar información de forma sencilla y rápida.</p>
        </div>
      </SwiperSlide>
    </Swiper>
      </div>
      <div className="flex mt-10">
        <p className=" w-[70%] letras7 font-medium">No hace falta que partas de cero. Pon en marcha tu flujo de trabajo con un manual de estrategias probado y diseñado para distintos equipos. Dale tu toque personal.</p>
        <button className="border border-blue-500 hover:bg-blue-100 duration-500 rounded-lg w-[21%] p-[1%]">Consultar todos los casos prácticos</button>
      </div>
      </section>
      <section className="hola mt-20">
        <div className="text-center">
         <h2 className="text-3xl font-medium letras9">Verás el trabajo de otra manera</h2>
         <span className="font-medium letras8 block">Visualiza los proyectos de tu equipo desde todos los ángulos y aporta una </span>
         <span className="font-medium block letras8 ">nueva perspectiva a la tarea en cuestión.</span>
         <button className="bg-slate-100 text-black p-2 hover:bg-blue-100 duration-700 rounded-lg">Descubre todas las vistas de trello</button>
        </div>
        <div className="bg-slate-100 rounded-lg w-[80%] shadow-2xl flex mt-5 ml-32">
            <div className="">
              <img className=" h-[78%] w-full mt-14 ml-5" src="https://images.ctfassets.net/rz1oowkt5gyp/5Hb09iiMrK6mSpThW5HS89/f5683a167ad3f74bed4dc7592ae5a002/TrelloBoard_Timeline_2x.png?w=1140&fm=webp"/>
            </div>
            <div className="text-black w-[95%] ml-16 mt-10">
              <p className="font-bold">{Icons2}Cumple todos los plazos</p>
              <span className="block letras9 font-medium">Con la vista de Cronograma llevarás al</span>
              <span className="block letras9 font-medium">día todas las tareas, desde los sprints</span>
              <span className="block letras9 font-medium">semanales a la planificación anual. Echa</span>
              <span className="block letras9 font-medium">un vistazo a las próximas fases de la</span>
              <span className="block letras9 font-medium">canalización e identifica las carencias</span>
              <span className="block letras9 font-medium">que puedan impedir el progreso de tu</span>
              <span className="block letras9 font-medium">equipo.</span>
              <a href="#" className="underline text-blue-600 font-medium letras9">
                <span className="block">Mas información sobre la vista de </span>
                <span>Cronograma</span>
                </a>
            </div>
        </div>
        <div className="bg-slate-100 rounded-lg w-[80%] shadow-2xl flex mt-16 ml-32">
            <div className="text-black w-[80%] ml-16 mt-10">
              <p className="font-bold">CONTROLA LAS TAREAS</p>
              <span className="block letras9 font-medium">Empieza cada día sin sorpresas. Tanto si</span>
              <span className="block letras9 font-medium">tienes que programar una planificación </span>
              <span className="block letras9 font-medium">editorial o simplemente mantenerte al </span>
              <span className="block letras9 font-medium">tanto de las tareas, la vista de Calendario </span>
              <span className="block letras9 font-medium">es como una bola de cristal que te da una </span>
              <span className="block letras9 font-medium">visión clara del trabajo que hay por </span>
              <span className="block letras9 font-medium">delante.</span>
              <a href="#" className="underline text-blue-600 font-medium letras9">
                <span className="block">Mas información sobre la vista de </span>
                <span>Calendario</span>
                </a>
            </div>
            <div className="">
              <img className=" h-[78%] w-[87%] mt-14" src="https://images.ctfassets.net/rz1oowkt5gyp/7sxChS4x6XAcUgDpp4VAZk/25377d162e964f4243e329c447bfd7dc/TrelloBoard_Calendar_2x.png?w=1140&fm=webp"/>
            </div>
        </div>
      </section>
      <section>
        <div className=" mt-48 ml-32">
          <p className="text-slate-800 font-medium text-1xl">
          FORMAS EFICACES DE CRECER
          </p>
          <h1 className="text-slate-800 mt-3 font-medium text-4xl">
          Haz más con Trello
          </h1>
          <p className="text-slate-800 mt-6 font-medium letras10 w-[50%]">Con las intuitivas funciones de Trello cualquier equipo puede configurar y personalizar rápidamente flujos de trabajo para casi todo.</p>
        </div>
        <div className="flex ml-28 mt-10 justify-around mr-28  text-slate-800">
          <div className="bg-slate-100 rounded-lg w-[30%]">
            <img className="p-5" src="//images.ctfassets.net/rz1oowkt5gyp/gMfkjoA3yWYG3kat3qjpW/3902bfdfccf08869e33d63bbc9d1969b/Integrations_Puzzle.svg"/>
            <h1 className="ml-5 letras12">Integraciones</h1>
            <p className="p-6 font-medium letras11">Integra las aplicaciones que tu equipo ya usa en tu flujo de trabajo de Trello o añade un Power-Up que te ayude con necesidades concretas.</p>
            <button className="border border-blue-500 w-[50%] p-[3%] mb-5 ml-5 mt-10 bg-white hover:bg-blue-100 duration-500 rounded-lg">Busca integraciones</button>
          </div>
          <div className="bg-slate-100 rounded-lg w-[30%]">
            <img className="p-5" src="//images.ctfassets.net/rz1oowkt5gyp/7wxRW93hvb7858bMsK4LSs/f6fc44fb23dbc6ee9bc6a7f6e2af0fb7/Gears.svg"/>
            <h1 className="ml-5 letras12">Automatización de Butler</h1>
            <p className="p-6 font-medium letras11">En cada tablero de Trello se crea una automatización sin código. Céntrate en el trabajo que es más importante y deja que los robots hagan todo lo demás.</p>
            <button className="border border-blue-500 hover:bg-blue-100 duration-500 rounded-lg w-[70%] p-[3%] mb-5 ml-5 mt-10 bg-white">Conoce la automatización</button>
          </div>
          <div className="bg-slate-100 rounded-lg w-[30%]">
            <img className="p-5" src="//images.ctfassets.net/rz1oowkt5gyp/mNa3Mi7T6ga2OTrNxJx1D/8991b8d57cd6ec7330398c7a8757b4dc/Search_Value.svg"/>
           <h1 className="ml-5 letras12">Trello Enterprise</h1> 
           <p className="p-6 font-medium letras11">La herramienta de productividad que hace las delicias de los equipos, con todas las funciones y la seguridad necesarias para el escalado.</p>
           <button className="border border-blue-500 hover:bg-blue-100 duration-500 rounded-lg w-[50%] p-[3%] mb-5 ml-5 mt-10 bg-white">Eplora Enterprise</button>
          </div>
        </div>
      </section>
      <section className="div3">
     
        
      <Swiper
        rewind={true}
        slidesPerView={1}
        modules={[Navigation]}
        className="border bg-white mySwiper ml-32 mt-10 w-[81%] rounded-lg shadow-2xl border-gray-200"
      >
       <SwiperSlide className="w-[80%] flex swiper rounded-lg">
          <div className="w-[67%] swiper1">
            <p className="letras13 w-[94%] mt-6 p-7">[Trello es] fabuloso para simplificar procesos complejos. Como directora, puedo dividirlos [los procesos] en partes pequeñas para el equipo y luego delegarlos, sin perder la perspectiva global.</p>
            <hr className="mt-10 w-[20%] bg-black ml-8" />
            <p className="letras11 ml-7 mt-3">Joey Rosenberg</p>
            <p className="letras11 ml-7">Directora de Liderazgo Global de Women Who Code</p>
            <div className="flex">
            <img className="ml-7 mt-2" src="//images.ctfassets.net/rz1oowkt5gyp/2f3keSvy7vtldV4YDFKkE2/5ed788fb5257c342995d25ba8e8e313d/WomenWhoCode_logo.svg" alt="" />
            <a href="#" className="underline text-blue-600 font-medium letras11 ml-96 mt-5">Leer caso práctico</a>
            </div>
          </div>
          <div className="w-[33%] bg-purple-400 rounded-e-lg colores">
            <h3 className="text-white p-8 text-3xl letras14 mt-6 mb-20">Según el 75 % de las organizaciones, Trello aporta valor a su negocio en 30 días.</h3>
            <a href="#" className="underline text-gray-600 font-medium letras11 p-8">Encuste sobre Trello  de TechValidate</a>
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-[80%] flex">
         <div className="w-[67%] swiper1">
          <p className="letras13 w-[94%] mt-6 p-7">Todos los empleados pueden compartir contexto e información a través de Trello, tanto si trabajan en la oficina o desde casa como con un cliente in situ.</p>
          <hr className="mt-16 w-[20%] bg-black ml-8" />
            <p className="letras11 ml-7 mt-5">Sumeet Moghe</p>
            <p className="letras11 ml-7">Director de Productos en ThoughtWorks</p>
            <div className="flex">
            <img className="ml-7 mt-6 w-[28%] h-[3%]" src="//images.ctfassets.net/rz1oowkt5gyp/2kIh1cWqsxjtHwWHWJJPsJ/d8436f3979be6cab7931f4d276c2d5ce/thoughtworks.svg" alt="" />
            <a href="#" className="underline text-blue-600 font-medium letras11 ml-72 mt-5">Leer caso práctico</a>
            </div>
          </div>
          <div className="w-[33%] bg-purple-400 rounded-e-lg colores">
          <h3 className="text-white p-8 text-3xl letras14 mt-6 mb-28">El 81 % de los clientes eligió Trello por su facilidad de uso.</h3>
            <a href="#" className="underline text-gray-600 font-medium letras11 p-8 ">Encuste sobre Trello  de TechValidate</a>
          </div>
          </SwiperSlide>
          <SwiperSlide className="w-[80%]  flex">
         <div className="w-[67%] swiper1 ">
          <p className="letras13 w-[94%] mt-6 p-7">Usamos Trello para aclarar los pasos, los requisitos y los procedimientos. Esto supuso algo excepcional a la hora de comunicarnos con equipos que presentaban profundas diferencias culturales y lingüísticas.</p>
          <hr className="mt-8 w-[20%] bg-black ml-8" />
            <p className="letras11 ml-7 mt-5">Jefferson Scomacao</p>
            <p className="letras11 ml-7">Jefe de Desarrollo en IKEA/PTC</p>
            <div className="flex">
            <img className="ml-7 mt-3 w-[14%] h-[3%]" src="//images.ctfassets.net/rz1oowkt5gyp/3X64fxSs4ek9A0ex45BUNI/911daed79127cb2f8a021da93fb68b9f/ptc-logo.svg" alt="" />
            <a href="#" className="underline text-blue-600 font-medium letras11 ml-96 mt-5">Leer caso práctico</a>
            </div>
          </div>
          <div className="w-[33%] rounded-e-lg colores">
          <h3 className="text-white p-8 text-3xl letras14 mt-6 mb-[12%]">El 74 % de los clientes afirma que Trello ha mejorado la comunicación con sus equipos y compañeros.</h3>
            <a href="#" className="underline text-gray-600 font-medium letras11 p-8">Encuste sobre Trello  de TechValidate</a>
          </div>
          </SwiperSlide>
      </Swiper>
      <div className="text-center mt-20">
      <h2 className="text-3xl font-medium letras15">El precio de trello a tu manera</h2>
         <span className="letras15 block">Trello infunde confianza a millones de personas y da alas a equipos de todo</span>
         <span className="block letras15 ">el mundo</span>
         <button className="bg-blue-600 mt-5 hover:bg-blue-800 text-white p-3 letras11 duration-700 rounded-lg">Comparar planes</button>
        </div>
        <div className="bg-white flex mt-16 justify-center ml-32 w-[80%]">
          <div className="border border-slate-400 w-[25%] p-4">
            <p className="font-medium">FREE</p>
            <div className="flex items-end">
              <p className="text-xl">$</p>
              <p className="text-5xl">o</p>
              <p className="text-xl">USD</p>
            </div>
            <p className="letras16 text-gray-600 mt-3">Gratuito para todo el equipo</p>
            <p className="mt-10 text-base/6 letras17">Para personas o equipos que quieren organizar cualquier proyecto que se les ocurra.</p>
            <button className="border border-blue-500 p-3 hover:bg-blue-100 duration-500 rounded-lg mt-44 bg-white letras16">Empezar ahora mismo</button>
          </div>
          <div className="border border-slate-400 w-[25%] p-4">
            <p className="font-medium">STANDARD</p>
            <div className="flex items-end">
              <p className="text-xl">$</p>
              <p className="text-5xl">5</p>
              <p className="text-xl">USD</p>
            </div>
            <p className="letras16 text-gray-600 mt-3">por usuario al mes con facturación anual ($6 con facturación mensual)</p>
            <p className="mt-10 text-base/6 letras17">Para los equipos pequeños que necesitan gestionar el trabajo y escalar la colaboración.</p>
            <button className="border border-blue-500 p-3 hover:bg-blue-100 duration-500 rounded-lg mt-40 bg-white letras16">Registrate ahora</button>
            <a href="#" className="underline text-blue-600 font-medium letras11 mt-5">Mas informacion sobre Standrad</a>
          </div>
          <div className="border border-slate-400 w-[25%] p-4">
            <p className="font-medium">PREMIUM</p>
            <div className="flex items-end">
              <p className="text-xl">$</p>
              <p className="text-5xl">10</p>
              <p className="text-xl">USD</p>
            </div>
            <p className="letras16 text-gray-600 mt-3">por usuario al mes con facturación anual ($12.50 con facturación mensual)</p>
            <p className="mt-10 text-base/6 letras17">Para equipos que necesiten supervisar y visualizar varios proyectos de varias maneras, como en tableros, cronogramas, calendarios, etc.</p>
            <button className="border border-blue-500 p-3 bg-blue-50 duration-500 rounded-lg mt-24 hover:bg-white letras16">Probar gratis</button>
            <a href="#" className="underline text-blue-600 font-medium letras11 mt-5">Mas informacion sobre Premium</a>
          </div>
          <div className="border border-slate-400 w-[25%] p-4">
            <p className="font-medium">ENTERPRISE</p>
            <div className="flex items-end">
              <p className="text-xl">$</p>
              <p className="text-5xl">17.50</p>
              <p className="text-xl">USD</p>
            </div>
            <p className="letras16 text-gray-600 mt-3">por usuario al mes con facturación anual ($210.00 precio anual por usuario)</p>
            <p className="mt-10 text-base/6 letras17">Para organizaciones que necesitan conectar el trabajo de distintos equipos con mayor seguridad y más controles.</p>
            <button className="border border-blue-500 p-3 hover:bg-blue-100 duration-500 rounded-lg mt-28 bg-white letras16">Contacto del departamento de ventas</button>
            <a href="#" className="underline text-blue-600 font-medium letras11 mt-24">Mas informacion sobre Enterprise</a>
          </div>
        </div>
      </section>
      <section>
      
      </section>
        </>
    );
}