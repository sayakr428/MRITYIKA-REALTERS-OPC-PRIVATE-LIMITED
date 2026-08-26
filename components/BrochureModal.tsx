"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, DownloadSimple, CheckCircle, FilePpt } from "@phosphor-icons/react/dist/ssr";
import { supabase } from "@/lib/supabaseClient";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plotType, setPlotType] = useState<"Residential" | "Commercial">("Residential");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("Please fill in your name, phone number, and email address.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      // 1. Store user details in Supabase
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name: name.trim(),
        mobile: phone.startsWith("+91") ? phone.trim() : `+91 ${phone.trim()}`,
        email: email.trim(),
        plot_type: plotType,
        message: message.trim() ? `[Brochure Download Request] ${message.trim()}` : "[Brochure Download Request]",
      });

      if (dbError) {
        console.error("Supabase insert error:", dbError);
        // Continue with download even if db log has an issue, but show notice
      }

      // 2. Trigger automatic brochure download/view from Google Drive
      const googleDriveUrl =
        "https://drive.google.com/file/d/1QhcpaaHmugR7HkxGzZsrHGXCijnxf0fc/view?usp=sharing";
      
      const link = document.createElement("a");
      link.href = googleDriveUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloaded(true);
    } catch (err) {
      console.error("Brochure form error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const resetAndClose = () => {
    setDownloaded(false);
    setError("");
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    onClose();
  };

  const fieldCls =
    "w-full rounded-lg border border-green-950/15 bg-paper px-4 py-3 text-green-950 placeholder:text-ink-faint transition-colors focus:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800/15";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-green-950/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-green-950/10 bg-paper-alt p-6 shadow-2xl md:p-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={resetAndClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-green-900 transition-colors hover:bg-green-900/10"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            {downloaded ? (
              <div className="flex flex-col items-center text-center py-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-800 mb-4">
                  <CheckCircle size={40} weight="fill" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-green-950">
                  Thank You, {name || "there"}!
                </h3>
                <p className="mt-2 text-ink-soft leading-relaxed">
                  Your <strong className="text-green-900">Shantiban City Presentation</strong> is downloading directly from Google Drive. Our team will get in touch with you shortly.
                </p>
                <a
                  href="https://drive.google.com/file/d/1QhcpaaHmugR7HkxGzZsrHGXCijnxf0fc/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-900/10 px-4 py-3 text-sm font-medium text-green-900 transition-colors hover:bg-green-900/20"
                >
                  <FilePpt size={20} className="text-green-800 shrink-0" />
                  <span>View Brochure on Google Drive</span>
                </a>

                <button
                  type="button"
                  onClick={resetAndClose}
                  className="mt-6 w-full rounded-lg bg-green-900 px-6 py-3 font-medium text-paper transition-colors hover:bg-green-800"
                >
                  Done
                </button>

              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-900/10 text-green-900">
                    <DownloadSimple size={22} weight="bold" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-green-950 md:text-2xl">
                      Download Presentation Brochure
                    </h3>
                    <p className="text-xs text-ink-soft md:text-sm">
                      Please enter your details to receive the official PPT brochure.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="modal-name" className="text-xs font-medium text-green-900">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className={fieldCls}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Mobile & Email Row */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="modal-phone" className="text-xs font-medium text-green-900">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-stretch rounded-lg border border-green-950/15 bg-paper focus-within:border-green-800 focus-within:ring-2 focus-within:ring-green-800/15">
                        <span className="flex shrink-0 items-center px-2.5 text-xs text-ink-soft border-r border-green-950/15">
                          🇮🇳 +91
                        </span>
                        <input
                          id="modal-phone"
                          type="tel"
                          required
                          inputMode="numeric"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98300 50189"
                          className="w-full rounded-r-lg bg-transparent px-3 py-3 text-sm text-green-950 placeholder:text-ink-faint focus:outline-none"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="modal-email" className="text-xs font-medium text-green-900">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="modal-email"
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

                  {/* Dropdown: What are you looking for */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="modal-plot-type" className="text-xs font-medium text-green-900">
                      What are you looking for? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="modal-plot-type"
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
                    <label htmlFor="modal-message" className="text-xs font-medium text-green-900">
                      Message <span className="text-ink-faint">(optional)</span>
                    </label>
                    <textarea
                      id="modal-message"
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any specific questions or requirements..."
                      className={`resize-none ${fieldCls}`}
                      disabled={isSubmitting}
                    />
                  </div>

                  {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-green-900 py-3.5 font-medium text-paper transition-colors hover:bg-green-800 active:scale-[0.99] disabled:opacity-50"
                  >
                    <DownloadSimple size={18} weight="bold" />
                    <span>{isSubmitting ? "Submitting & Downloading..." : "Submit & Download Brochure"}</span>
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
