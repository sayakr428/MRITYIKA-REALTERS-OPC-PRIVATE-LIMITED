"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CheckCircle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  bullets?: string[];
}
export interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
export interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
export interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 95; // Increased from 45 to 95 for significantly more visible side image thickness on both sides!
  const maxGap = 140;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.05 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  // Color & font config
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "2rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.95rem";
  const fontSizeQuote = fontSizes.quote ?? "1.08rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 7000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.45;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.88) rotateY(18deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.88) rotateY(-18deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants for quote & content
  const contentVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <div className="testimonial-container">
      <div className="testimonial-grid">
        {/* Images with generous padding gap so side images peek out nicely */}
        <div className="image-wrapper">
          <div className="image-container" ref={imageContainerRef}>
            {testimonials.map((testimonial, index) => (
              <img
                key={testimonial.src}
                src={testimonial.src}
                alt={testimonial.name}
                className="testimonial-image"
                data-index={index}
                style={getImageStyle(index)}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="testimonial-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <p
                className="designation"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>
              <h3
                className="name font-display"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>
              
              <motion.p
                className="quote"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      filter: "blur(8px)",
                      opacity: 0,
                      y: 4,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.015 * i,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>

              {activeTestimonial.bullets && activeTestimonial.bullets.length > 0 && (
                <div className="mt-4 mb-6 flex flex-col gap-3">
                  {activeTestimonial.bullets.map((bullet, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.1 + idx * 0.04 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-emerald-600" />
                      <span className="text-sm md:text-[0.95rem] leading-snug text-slate-700">{bullet}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="arrow-buttons">
            <button
              className="arrow-button prev-button"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous slide"
            >
              <FaArrowLeft size={22} color={colorArrowFg} />
            </button>
            <button
              className="arrow-button next-button"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next slide"
            >
              <FaArrowRight size={22} color={colorArrowFg} />
            </button>

            {/* Step indicator */}
            <div className="step-indicator">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`dot ${i === activeIndex ? "active" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-container {
          width: 100%;
          max-width: 90rem;
          padding: 1rem 0.5rem;
          margin: 0 auto;
        }
        .testimonial-grid {
          display: grid;
          gap: 4.5rem;
          align-items: center;
        }
        .image-wrapper {
          width: 100%;
          padding-left: 5.5rem;
          padding-right: 4.5rem;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 28rem;
          perspective: 1000px;
        }
        .testimonial-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1.75rem;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.16);
        }
        .testimonial-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 32rem;
          padding-right: 1.5rem;
        }
        .name {
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.25;
        }
        .designation {
          margin-bottom: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 0.85rem;
        }
        .quote {
          line-height: 1.75;
          margin-bottom: 1.5rem;
        }
        .arrow-buttons {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(15, 42, 29, 0.12);
        }
        .arrow-button {
          width: 3.4rem;
          height: 3.4rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
        }
        .arrow-button:hover {
          transform: scale(1.08);
        }
        .step-indicator {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-left: auto;
        }
        .dot {
          width: 0.65rem;
          height: 0.65rem;
          border-radius: 50%;
          background-color: #d1d5db;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .dot.active {
          width: 2rem;
          border-radius: 1rem;
          background-color: #0f2a1d;
        }
        @media (min-width: 960px) {
          .testimonial-grid {
            grid-template-columns: 0.95fr 1.05fr;
            gap: 5rem;
          }
          .image-container {
            height: 33rem;
          }
        }
        @media (max-width: 959px) {
          .image-wrapper {
            padding-left: 2rem;
            padding-right: 2rem;
          }
          .testimonial-content {
            padding-right: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CircularTestimonials;
