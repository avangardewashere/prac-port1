import AnimatedHeader from "../components/AnimatedHeader";
import { Icon } from "@iconify/react";
import { projects } from "../constants";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Works = () => {
    const previewRef=useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const text = `Featured projects that have been meticulously
crafted with passion to drive
results and impact.`;

const mouse=useRef<{x:number,y:number}>({x:0,y:0});
const overlayRef=useRef<(HTMLDivElement | null)[]>([]);
const moveX=useRef<((value: number) => void) | null>(null);
const moveY=useRef<((value: number) => void) | null>(null);

useGSAP(()=>{
   if(previewRef.current) {
       moveX.current = gsap.quickTo(previewRef.current,"x",{
           duration:1.5,
           ease:"power3.out",
       });

       moveY.current = gsap.quickTo(previewRef.current,"y",{
           duration:1.5,
           ease:"power3.out",
       });
   }

   gsap.from("#project",{
    y:100,
    opacity:0,
    delay:0.5,
    duration:1,
    stagger:1,
    ease:"back.out",
    scrollTrigger:{
        trigger:"#project",
    }
   })
}, [])

const handleMouseMove = (e:React.MouseEvent<HTMLDivElement>) => {
    if(window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current?.(mouse.current.x);
    moveY.current?.(mouse.current.y);
}

const handleMouseEnter = (index:number) => {
    if(window.innerWidth < 768) return;
    setCurrentIndex(index);


    const el = overlayRef.current[index];
    if(!el) return;;
    gsap.killTweensOf(el);;
    gsap.fromTo(el,
        {
            clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
        },
        {
            clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration:0.15,
            ease:"power2.out",
        }
    )
    if(previewRef.current) {
        gsap.to(previewRef.current,{
            opacity:1,
            scale:1,
            duration:0.3,
            ease:"power2.out",
        })
    }
}
const handleMouseLeave = () => {
    if(window.innerWidth < 768) return;
    setCurrentIndex(null);


    const el = overlayRef.current[currentIndex ?? 0];
    if(!el) return;;
    gsap.killTweensOf(el);;
    gsap.to(el,{
        clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        duration:2,
        ease:"power2.in",
    })
   
    if(previewRef.current) {
        gsap.to(previewRef.current,{
            opacity:0,
            scale:0.85,
            duration:0.3,
            ease:"power2.out",
        })
    }
}

    return (
        <section id="works" className="min-h-screen  rounded-t-4xl">
            <AnimatedHeader
                subtitle="Logix meets Aesthetics, Seamlessly"
                title="Works"
                text={text}
                TextColor={"text-black"}
                withScrollTrigger={true}
            />
            <div className="mt-80 relative flex flex-col font-light" onMouseMove={handleMouseMove}>
                {projects.map((project,index) => (
                    <div key={project.id}
                    id={`project-${project.id}`}
                    className="relative flex flex-col gap-1 cursor-pointer group md:gap-0"
                    onMouseEnter={()=> handleMouseEnter(index)}
                    onMouseLeave={()=> handleMouseLeave()}
                    >

                        {/* overlay */}
                        <div className="absolute inset-0  hidden md:block duration-200 bg-black -z-10 clip-path" ref={el=> {
                            overlayRef.current[index] = el;
                        }}/>
                        {/* title */}
                        <div className="flex  justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
                            <h2 className="text-[26px] lg:text-[32px] font-semibold leading-none ">{project.name}</h2>
                            <Icon icon="lucide:arrow-up-right" width={24} height={24} />
                        </div>

                        {/* divider */}
                        <div className="w-full h-0.5 bg-black"/>

                        {/* frameworks */}
                        <div className="flex px-10 text-xs leading-loose uppercase transition-all duration-599 md:text-sm gap-x-5 md:group-hover:px-12">
                            {
                                project.frameworks.map((framework) => (
                                    <p key={framework.id} className="text-black transition-colors duration-500 md:group-hover text-sm font-medium md:group-hover:text-white">{framework.name}</p>
                                ))
                            }
                        </div>

                        {/* mobile previuew image */}
                        <div className="relative flex items-center justify-center px-10 md:hidden h-[400px]">
                            <img src={project.bgImage} alt={project.name} className="rounded-md brightness-50 w-full h-full object-cover" />
                            <img src={project.image}  alt={`${project.name} mobile preview`} className="absolute bg-center px-14 rounded-xl" />
                        </div>
                    </div>
                ))}
                {/* desktop floating image */}
                <div 
                    ref={previewRef} 
                    className={`hidden fixed top-0 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[960px] opacity-0 ${currentIndex !== null ? 'md:block' : ''}`}
                >
                    <img src={projects[currentIndex ?? 0].image}  alt={"preview"} className="object-cover w-full h-full" />
                </div>
            </div>
        </section>
    )
}

export default Works;