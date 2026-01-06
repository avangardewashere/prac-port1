import { useRef } from 'react'
import AnimatedHeader from "../components/AnimatedHeader"
import { servicesData } from "../constants";
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Services = () => {
    const servicesRefs = useRef<(HTMLDivElement | null)[]>([]);
    const text = 'I build secure, high-perfomance full-stack app with the smoothUX to drive growth not headaches'
    const isDesktop = useMediaQuery({minWidth:"48rem"});

    useGSAP(() => {
        servicesRefs.current.forEach((el)=> {
            if(!el) return;
            gsap.from(el,{
                y:200,
                scrollTrigger:{
                    trigger:el,
                    start:"top 80%",
                },
                duration:1,
                ease:"circ.out",
            })
        })
    },[])
    
    return(
        <section id="services" className="bg-black rounded-t-4xl" style={{ minHeight: `${servicesData.length * 100}vh` }}>
            <AnimatedHeader
                subtitle={"Behind the scene, Beyond the screen"}
                title={"Service"}
                text={text}
                TextColor="text-white"
                withScrollTrigger={true}
            />
            {servicesData.map((service, index) => (
                <div
                    ref={(el) => {
                        if (el) {
                            servicesRefs.current[index] = el;
                        }
                    }}
                    key={index}
                    className="sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/38"
                    style={isDesktop ? {
                        top: `calc(10vh + ${index * 5}vh)`,
                        marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                    } : { top: 0 }}
                >
                    <div className="flex items-center justify-between gap-4 font-light">
                        <div className="flex flex-col gap-6">
                            <h2 className="text-4xl lg:text-5xl">
                                {service.title}
                            </h2>
                            <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60 text-pretty">
                                {service.description}
                            </p>
                            <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/60">
                                {service.items.map((item, itemIndex) => (
                                    <div key={`item=${item}-${itemIndex}`}>
                                        <h3 className="flex">
                                            <span className="mr-12 text-lg text-white/30">
                                            0{itemIndex + 1}</span>
                                            {item.title}
                                        </h3>
                                        {itemIndex<service.items.length - 1 && 
                                            <div className="w-full h-px bg-white/30 my-2" />
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default Services;