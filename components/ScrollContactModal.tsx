"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, CheckCircle, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { supabase } from "@/lib/supabaseClient";

export function ScrollContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plotType, setPlotType] = useState<"Residential" | "Commercial">("Residential");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const lastScrollY = useRef(0);
  const hasTriggeredRef = useRef(false);

  // Check localStorage if already submitted
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDone = localStorage.getItem("shantiban_contact_submitted") === "true";
      if (isDone) {
        setSubmitted(true);
      }
    }
  }, []);

  // Listen to scroll down events
  useEffect(() => {
    if (submitted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      // Trigger popup when scrolling down past 120px threshold
      if (currentScrollY > 120 && scrollDelta > 15 && !hasTriggeredRef.current && !isOpen) {
        setIsOpen(true);
        hasTriggeredRef.current = true;
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [submitted, isOpen]);

  // Handle closing modal
  const handleClose = () => {
    setIsOpen(false);
    // Allow triggering again on subsequent scroll down
    setTimeout(() => {
      hasTriggeredRef.current = false;
    }, 1000);
  };

  // Form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("Please fill in your name, phone number, and email address.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const formattedPhone = phone.startsWith("+91") ? phone.trim() : `+91 ${phone.trim()}`;

      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name: name.trim(),
        mobile: formattedPhone,
        email: email.trim(),
        plot_type: plotType,
        message: message.trim() ? `[Scroll Popup Lead] ${message.trim()}` : "[Scroll Popup Lead]",
      });

      if (dbError) {
        console.error("Supabase insert error:", dbError);
      }

      // Mark as submitted locally so popup stops bothering the user
      localStorage.setItem("shantiban_contact_submitted", "true");
      setSubmitted(true);
      setShowSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && !showSuccess) return null;

  const fieldCls =
    "w-full rounded-lg border border-green-950/15 bg-paper px-4 py-2.5 text-sm text-green-950 placeholder:text-ink-faint transition-colors focus:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800/15";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-green-950/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-green-950/15 bg-paper-alt p-6 shadow-2xl md:p-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-green-900 transition-colors hover:bg-green-900/10"
              aria-label="Close form"
            >
              <X size={20} weight="bold" />
            </button>

            {showSuccess ? (
              <div className="flex flex-col items-center text-center py-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-800 mb-4">
                  <CheckCircle size={44} weight="fill" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-green-950">
                  Thank You, {name || "Visitor"}!
                </h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  Your details have been registered successfully. Our team at Shantiban City will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mt-6 w-full rounded-lg bg-green-900 py-3 font-medium text-paper transition-colors hover:bg-green-800"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-900/10 text-green-900">
                    <EnvelopeSimple size={22} weight="bold" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-green-950">
                      Get In Touch With Us
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Enter your details to receive full plot details & callback.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3.5">
                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="scroll-name" className="text-xs font-medium text-green-900">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="scroll-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className={fieldCls}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Phone & Email Grid */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="scroll-phone" className="text-xs font-medium text-green-900">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-stretch rounded-lg border border-green-950/15 bg-paper focus-within:border-green-800 focus-within:ring-2 focus-within:ring-green-800/15">
                        <span className="flex shrink-0 items-center px-2 text-xs text-ink-soft border-r border-green-950/15">
                          🇮🇳 +91
                        </span>
                        <input
                          id="scroll-phone"
                          type="tel"
                          required
                          inputMode="numeric"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98300 50189"
                          className="w-full rounded-r-lg bg-transparent px-2.5 py-2.5 text-xs sm:text-sm text-green-950 placeholder:text-ink-faint focus:outline-none"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="scroll-email" className="text-xs font-medium text-green-900">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="scroll-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={fieldCls}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Plot Type */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="scroll-plot-type" className="text-xs font-medium text-green-900">
                      Plot Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="scroll-plot-type"
                      value={plotType}
                      onChange={(e) => setPlotType(e.target.value as "Residential" | "Commercial")}
                      className={`${fieldCls} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%231b4332%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_1rem_center] bg-no-repeat pr-8`}
                      disabled={isSubmitting}
                    >
                      <option value="Residential">Residential Plot</option>
                      <option value="Commercial">Commercial Plot</option>
                    </select>
                  </div>

                  {/* Message (Optional) */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="scroll-message" className="text-xs font-medium text-green-900">
                      Message <span className="text-ink-faint">(optional)</span>
                    </label>
                    <textarea
                      id="scroll-message"
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any specific questions..."
                      className={`resize-none ${fieldCls}`}
                      disabled={isSubmitting}
                    />
                  </div>

                  {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 w-full rounded-lg bg-green-900 py-3 font-medium text-paper transition-colors hover:bg-green-800 active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Details"}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
