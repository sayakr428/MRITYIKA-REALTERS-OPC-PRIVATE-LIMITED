"use client";

import React from "react";
import { CircularTestimonials, Testimonial } from "@/components/ui/circular-testimonials";

const overviewData: Testimonial[] = [
  {
    name: "An address you can move into, not just plan around.",
    designation: "Ready to Move Campus",
    quote:
      "Mrityika Shantiban City in Tapna, Baruipur, South 24 Parganas is finished and occupied today, not a promise on paper. You get the comfort of a planned, secured campus with the everyday convenience of banks, schools and markets already close by.",
    bullets: [
      "Ready to move, so you can start living here right away",
      "Choose from 220 residential and commercial plots, roomy enough for a joint family",
      "Step out to a landscaped lake and clubhouse for evening adda, not just a road",
      "Stay close to the city, 20 km out on the Baruipur Bypass",
    ],
    src: "/images/overview-1.jpg",
  },
  {
    name: "Invest today, in a neighbourhood already taking shape.",
    designation: "High Future Appreciation",
    quote:
      "The strongest angle is that buyers aren't investing in an isolated plot and waiting for development to happen. They’re entering a community where infrastructure, occupancy, and surrounding conveniences are already establishing the location’s value.",
    bullets: [
      "Buy into an established community, rather than waiting years for basic development to arrive",
      "220 residential and commercial plots create a planned neighbourhood with its own ecosystem",
      "Existing connectivity and nearby essentials support both residential demand and future resale potential",
      "Residential + commercial use gives investors more flexibility in how they use the property over time",
    ],
    src: "/images/overview-2.jpg",
  },
  {
    name: "Where everyday convenience meets everyday calm.",
    designation: "Peaceful Environment",
    quote:
      "A peaceful neighbourhood where you can slow down without giving up the conveniences that make everyday life easy. With essential amenities close at hand and a calm, well-planned setting, Shantiban City brings together the best of both worlds—quiet living and everyday convenience.",
    bullets: [
      "Enjoy the calm of a less crowded neighbourhood, away from the noise and congestion of the city",
      "Banks, schools, markets and everyday essentials are close by, keeping daily life convenient",
      "Landscaped surroundings, a lake and clubhouse give you space to slow down after a busy day",
      "Stay connected to Baruipur and Kolkata, while coming home to a more peaceful environment",
    ],
    src: "/images/overview-3.jpg",
  },
];

export function Overview() {
  return (
    <section id="overview" className="bg-paper py-14 md:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-12">
        <div className="w-full bg-white/85 backdrop-blur-md rounded-3xl border border-green-950/10 shadow-lifted p-4 md:p-10 lg:p-12">
          <CircularTestimonials
            testimonials={overviewData}
            autoplay={true}
            colors={{
              name: "#0a1a12",
              designation: "#2c6642",
              testimony: "#47554c",
              arrowBackground: "#0f2a1d",
              arrowForeground: "#f5f7f1",
              arrowHoverBackground: "#c29b45",
            }}
            fontSizes={{
              name: "2.25rem",
              designation: "0.875rem",
              quote: "1.08rem",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Overview;
