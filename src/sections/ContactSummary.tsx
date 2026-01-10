import {useRef} from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const ContactSummary = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const items = [
        "Innocation",
        "Precision",
        "Trust",
        "Collaboration",
        "Excellence",
    ]

    const items2= [
        "Contact Us",
        "Contact Us",
        "Contact Us",
        "Contact Us",
        "Contact Us",
    ]

    useGSAP(()=>{
        gsap.to(containerRef.current, {
            scrollTrigger:{
                trigger:containerRef.current,
                start:"center center",
                end:"+=800 center",
                scrub:0.5,
                pin:true,
                pinSpacing:true,
            }
        })
    })

    return (
        <section ref={containerRef}
        className="flex flex-col justify-between min-h-screen gap-12 mt-16">
            {/* marquee */}
            <Marquee items={items} />
            <div className="overflow-hidden font-light text-center contact-text-responsive">
                <p>
                    " Let's build a "
                    <br />
                    <span className="font-normal">memorable</span> &{" "}
                    <span className="italic">inspiring</span>
                    <br />
                    web application 
                    <span className="text-gold">togoether</span>
                </p>
                <br />
                {/* Marquee */}
                <Marquee items={items2} reverse
                className="text-black bg-transparent border-y-2"
                iconClassName="stroke-gold stroke-2 text-primary"
                icon="material-symbols-light:square"
                />
            </div>
        </section>
    )
}

export default ContactSummary;