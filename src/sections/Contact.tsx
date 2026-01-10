import AnimatedHeader from "../components/AnimatedHeader"
import { socials } from "../constants";

const Contact = () => {
    const text = `Got a question? Need a custom solution? \n Let's talk and discuss your project!`
    return (
        <section id="contact"
            className="flex flex-col justify-between min-h-screen bg-black">
            <div>
                <AnimatedHeader
                    subtitle="You Dream it, I Code it!"
                    title="Contact"
                    text={text}
                    TextColor={"text-black"}
                    withScrollTrigger={true}
                />
                <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10">
                    <div className="flex flex-col w-full gap-10">
                        <div className="social-link">
                            <h2>E-mail</h2>
                            <div className="w-full h-px my-2 bg-white/30" />
                            <p className="text-xl tracking-wider lowercase md:texdt-2xl lg:text-3xl">AvelPanaligan@gmail.com</p>
                        </div>
                        <div className="social-link">
                            <h2>Phone</h2>
                            <div className="w-full h-px my-2 bg-white/30" />\
                            <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                                +33 7 12 12 32 12
                            </p>
                        </div>
                        <div className="social-link">
                            <h2>Social Media</h2>
                            <div className="w-full h-px my-2 bg-white/30" />
                            <div className="flex flex-wrap gap-2">
                                {socials.map((social,index)=>(
                                    <a href={social.href} key={index} className="text-xs
                                    leading-loose tracking-widest uppercase md:text-sm hover:text-white/80 transition-colors duration-300">
                                    {"{ "}
                                    {social.name}
                                    {" }"}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;