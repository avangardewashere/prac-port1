import { Icon } from "@iconify/react/dist/iconify.cjs";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/dist/Observer";

gsap.registerPlugin(Observer);

interface MarqueeProps {
    items: string[];
    className?: string;
    icon?: string;
    iconClassName?: string;
    reverse?: boolean;
}

interface HorizontalLoopConfig {
    repeat?: number;
    paused?: boolean;
    speed?: number;
    snap?: number | false;
    paddingRight?: string | number;
    reversed?: boolean;
}

interface ExtendedTimeline extends gsap.core.Timeline {
    next?: (vars?: gsap.TweenVars) => gsap.core.Tween;
    previous?: (vars?: gsap.TweenVars) => gsap.core.Tween;
    current?: () => number;
    toIndex?: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
    times?: number[];
}

const Marquee = ({ items, className = "text-white bg-black", iconClassName = '', reverse = false , icon="mdi:star-four-points"}: MarqueeProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLSpanElement[]>([]);
    
    function horizontalLoop(items: Element[] | HTMLSpanElement[], config?: HorizontalLoopConfig): ExtendedTimeline {
        const itemsArray = gsap.utils.toArray(items) as HTMLElement[];
        config = config || {};
        const times: number[] = [];
        const widths: number[] = [];
        const xPercents: number[] = [];
        let curIndex = 0;
        const pixelsPerSecond = (config.speed || 1) * 100;
        const snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1);
        
        const tl = gsap.timeline({
            repeat: config.repeat, 
            paused: config.paused, 
            defaults: {ease: "none"}, 
            onReverseComplete: () => {
                if (tl) {
                    tl.totalTime(tl.rawTime() + tl.duration() * 100);
                }
            }
        }) as ExtendedTimeline;
        
        const length = itemsArray.length;
        if (length === 0) {
            throw new Error("Items array is empty");
        }
        const startX = itemsArray[0].offsetLeft;
        let totalWidth: number;
        let curX: number;
        let distanceToStart: number;
        let distanceToLoop: number;
        let item: HTMLElement;
        let i: number;
        gsap.set(itemsArray, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
          xPercent: (i: number, el: Element) => {
            const widthValue = gsap.getProperty(el, "width", "px");
            const w = widths[i] = parseFloat(String(widthValue || 0));
            const xValue = gsap.getProperty(el, "x", "px");
            const xPercentValue = gsap.getProperty(el, "xPercent");
            const xPercent = parseFloat(String(xValue || 0)) / w * 100 + parseFloat(String(xPercentValue || 0));
            xPercents[i] = snap(xPercent);
            return xPercents[i];
          }
        });
        gsap.set(itemsArray, {x: 0});
        
        const lastItem = itemsArray[length-1];
        const lastXPercent = xPercents[length-1];
        const lastWidth = widths[length-1];
        const lastScaleX = parseFloat(String(gsap.getProperty(lastItem, "scaleX") || 1));
        const paddingRight = typeof config.paddingRight === 'string' ? parseFloat(config.paddingRight) : (config.paddingRight || 0);
        
        totalWidth = lastItem.offsetLeft + lastXPercent / 100 * lastWidth - startX + lastItem.offsetWidth * lastScaleX + paddingRight;
        
        for (i = 0; i < length; i++) {
          item = itemsArray[i];
          curX = xPercents[i] / 100 * widths[i];
          distanceToStart = item.offsetLeft + curX - startX;
          const scaleX = parseFloat(String(gsap.getProperty(item, "scaleX") || 1));
          distanceToLoop = distanceToStart + widths[i] * scaleX;
          tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
            .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        
        function toIndex(index: number, vars?: gsap.TweenVars): gsap.core.Tween {
          vars = vars || {};
          let adjustedIndex = index;
          (Math.abs(adjustedIndex - curIndex) > length / 2) && (adjustedIndex += adjustedIndex > curIndex ? -length : length); // always go in the shortest direction
          const newIndex = gsap.utils.wrap(0, length, adjustedIndex);
          let time = times[newIndex];
          if ((time > tl.time()) !== (adjustedIndex > curIndex)) { // if we're wrapping the timeline's playhead, make the proper adjustments
            vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
            time += tl.duration() * (adjustedIndex > curIndex ? 1 : -1);
          }
          curIndex = newIndex;
          vars.overwrite = true;
          return tl.tweenTo(time, vars);
        }
        
        tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex+1, vars);
        tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex-1, vars);
        tl.current = () => curIndex;
        tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
        tl.times = times;
        tl.progress(1, true).progress(0, true); // pre-render for performance
        if (config.reversed) {
          if (tl.vars && typeof tl.vars.onReverseComplete === 'function') {
            tl.vars.onReverseComplete();
          }
          tl.reverse();
        }
        return tl;
      }


      useEffect(()=>{
        const tl = horizontalLoop(itemsRef.current, {
            repeat: -1,
            paddingRight: 30,
            reversed: reverse,
          });
          
          const observer = Observer.create({
            onChangeY(self) {
              let factor = 2.5;
              if ((!reverse && self.deltaY < 0) || (reverse && self.deltaY > 0)) {
                factor *= -1;
              } 
              gsap.timeline({
                defaults: {
                  ease: "none",
                }
              })
                .to(tl, { timeScale: factor * 2.5, duration: 0.2, overwrite: true, })
                .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
            }
          });
          
          return () => {
            tl.kill();
            observer?.kill();
          };
      },[items,reverse])


 
    return <div ref={containerRef} className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive  font-light uppercase whitespace-nowrap ${className}`}>
        <div className="flex">
            {items.map((text, index) => (
                <span key={index} ref={(el) =>{
                    if(el) {
                        itemsRef.current[index] = el;
                    }
                }} className="flex items-center px-16 gap-x-32">
                    {text} <Icon icon={icon || "mdi:arrow-right"} className={iconClassName} />
                </span>
            ))}
        </div>
    </div>
}

export default Marquee;