import React, {useRef}  from 'react'

const Navbar = () => {
    const navRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement[]>([]);
    const contactRef = useRef<HTMLDivElement>(null);
  return (
    <nav ref={navRef} className="fixed z-50 flex flex-col justify-between w-full bg-black h-full px-10 uppercase text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2">
        <div className="flex flex-col text-5xl gap-y-2 md-text-6xl lg:text-8xl">
            {['Home', 'Services', 'About', 'Work', 'Contact'].map((section, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        if (el) {
                            linksRef.current[index] = el;
                        }
                    }}
                >
                    <a href="" className="transition-all duration-300 cursor-pointer hover:text-white">
                        {section}
                    </a>
                </div>
            ))}
        </div><div className="flex flex-col flex-wrap justify-between gap-8 md:flex-row">
            <div className='font-light'>
                <p className="tracking-wider text-white/50">E-mail</p>
                <p className="text-xl tracking-widest lowercase text-pretty">AvelPanaligan@gmail.com</p>
            </div>
            <div className='font-light'>
                <p className="tracking-wider text-white/50">Social Media</p>
                <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
                    {/* Add social media links here */}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar