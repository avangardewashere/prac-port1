import {useRef} from "react";

const ContactSummary = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef}
        className="flex flex-col justify-between min-h-screen gap-12 mt-16">
            {/* marquee */}

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
            </div>
        </section>
    )
}

export default ContactSummary;