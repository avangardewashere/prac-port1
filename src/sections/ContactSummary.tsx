import {useRef} from "react";

const ContactSummary = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef}
        className="flex flex-col justify-between min-h-screen gap-12 mt-16">
            {/* marquee */}
        </section>
    )
}

export default ContactSummary;