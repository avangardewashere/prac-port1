const ServiceSummary = () => {
    return (
        <section className="mt-60 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive ">
            <div id="title-service-1">
                <p>Architecture</p>
            </div>
            <div id="title-service-2" className="flex items-center justify-center gap-3 translate-x-16">
                <p className="font-semibold">Development</p>
                <div className="w-10 h-1 md:w-32 bg-gold"/>
                    <p>Deployment</p> 
            </div>
            <div className="flex items-center justify-center gap-3 -translate-x-48" id="title-service-3">
               <p>APIs</p>
               <div className="w-10 h-1 md:w-23 bg-gold"/>
               <p className="italic">Frontends</p>
               <div className="w-10 h-1 md:w-23 bg-gold"/>
               <p className="italic">Scalability</p>
            </div>
            <div id="title-service-4">
                <p>Databases</p>
            </div>
        </section>
    )
}

export default ServiceSummary;