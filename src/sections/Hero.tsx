import { useRef } from 'react'
import { AnimatedTextLines } from '../components/AnimatedTextLines'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Model as Planet } from '../components/Planet';
const Hero = () => {
    const contextRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const aboutText = `I help growing brand and startups \n to gain an unfair advantage \n through premium results driven webs/apps`

    useGSAP(()=> {
        const tl = gsap.timeline();
        tl.from(contextRef.current, {
            y:"50vh",
            duration:1,
            ease:"circ.out",
        });
        tl.from(headerRef.current,{
            opacity:0,
            duration:1,
            y:"200",
            ease:"circ.out",
        },"<+0.2")
    },[])


    return (
        <section id="home" className='flex flex-col justify-end min-h-screen'>
            <div ref={contextRef}  >
                <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
                    <div ref={headerRef}
                        className='flex flex-col justify-center gap-12 pt-16 sm:gap-16'
                    >
                        <p className="text-sm font-light tracking-[0.5rem] uppercase px-10 text-black">
                            404 No Bugs Found
                        </p>
                        <div className='px-10'>
                            <h1 className="flex flex-col flex-wrap gap-12 text-black uppercase banner-text-responsive sm:gap-16 md:block">Avel Panaligan</h1>
                        </div>
                    </div>

                </div>
                <div className="relative px-10 text-black">
                    <div className="absolute inset-x-0 border-t-2">
                        <div className="py-12 sm:py-16 text-end">
                            <AnimatedTextLines className="font-light uppercase value-text-responsive" text={aboutText} />
                        </div>
                    </div>
                </div>
            </div>
            <figure className="absolute inset-0 -z-"
            style={{width:"100vw",height:"100vh"}}>
                <Canvas shadows camera={{
                    position:[0,0,-10],
                    fov:17.5,
                    near:1,
                    far:20,
                }}>
                    <ambientLight intensity={0.5} /> 
                    <Planet />
                </Canvas>
            </figure>
        </section>
    )
}

export default Hero;