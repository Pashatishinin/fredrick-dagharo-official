import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
(window as any).gsap = gsap;
(window as any).ScrollTrigger = ScrollTrigger;
