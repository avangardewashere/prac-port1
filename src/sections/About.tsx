import { useRef } from "react";
import AnimatedHeader from "../components/AnimatedHeader";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const About = () => {
    const text = `Passionate about clean architexture I build scalable, high-perfomance solution from prototype to production`
    const aboutText = `My journey in the world of software development began with a curiosity about how things work. I found myself drawn to the problem-solving aspect of building software, and the opportunity to create something new and useful.`
    const imgRef=useRef<HTMLImageElement>(null);

    useGSAP(()=>{
        gsap.to('#about',{
            scale:0.95,
            scrollTrigger:{
                trigger:'#about',
                start:"bottom 80%",
                end:"bottom 20%",
                scrub:true,
                markers:!true,
            },
            ease:"power1.inOut",
        })

        gsap.set(imgRef.current,{
            clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        });

        gsap.to(imgRef.current,{
            clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration:2,
            ease:"power4.out",
            scrolTrigger:{trigger:imgRef.current}
        })
    })
    return (
        <section id="about" className="min-h-screen bg-black rounded-b-4xl">
            <AnimatedHeader
                subtitle="Code with purpose, Built to scale"
                title="About"
                text={text}
                TextColor={"text-white"}
                withScrollTrigger={true}
            />
            <div className="mt-60 flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
                <img src="images/man.jpg"  alt="man" className="w-md rounded-3xl" />            
                <AnimatedTextLines text={aboutText} className="w-full" /> 
            </div>
        </section>
    )
}

export default About;