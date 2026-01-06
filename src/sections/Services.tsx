import AnimatedHeader from "../components/AnimatedHeader"

const Services = () => {
    const text = 'I build secure, high-perfomance full-stack app with the smoothUX to drive growth not headaches'
    return(
        <section id="services" className="min-h-screen bg-black rounded-t-4xl">
            <AnimatedHeader
            subtitle={"Behind the scene, Beyond the screen"}
            title={"Service"}
            text={text}
            TextColor="text-white"
            withScrollTrigger={true}
            /
            >
        </section>
    )
}

export default Services;