import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export const initParallax = (element: HTMLElement, yPercentValue: number = 20) => {
	if (!element) return;

	gsap.registerPlugin(ScrollTrigger);

	const container = element.closest(".group") || element.parentElement;
	if (!container) return;

	ScrollTrigger.getAll().forEach((t) => {
		if (t.trigger === container) t.kill();
	});

	console.log("Success: Plugin registered and trigger created!");

	return gsap.fromTo(
		element,
		{ yPercent: -yPercentValue },
		{
			yPercent: yPercentValue,
			ease: "none",
			scrollTrigger: {
				trigger: container,
				start: "top bottom",
				end: "bottom top",
				scrub: true,
				// markers: true,
				invalidateOnRefresh: true,
			},
		},
	);
};
