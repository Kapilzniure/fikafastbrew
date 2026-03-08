import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const WHATSAPP_NUMBER = "9779800000000";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    // Send via WhatsApp as fallback (real app would POST to API)
    const msg = `Hi Fika Takeaway!\n\nMessage from: ${form.name} (${form.email})\n\n${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-24 md:pt-36 md:pb-32 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase font-body">Contact Us</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-3 text-foreground">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-muted-foreground font-body mt-4 max-w-md mx-auto">
              Have a question, feedback, or want to partner with us? We'd love to hear from you.
            </p>
          </motion.div>

          {/* Info cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { icon: MapPin, label: "Address", value: "Kathmandu, Nepal", href: "https://maps.google.com/?q=Kathmandu,Nepal" },
              { icon: Phone, label: "Phone", value: "+977 98XXXXXXXX", href: "tel:+97798XXXXXXXX" },
              { icon: Mail, label: "Email", value: "hello@fikatakeaway.com", href: "mailto:hello@fikatakeaway.com" },
              { icon: Clock, label: "Hours", value: "Sun–Sat: 7 AM – 8 PM", href: null },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-muted-foreground font-body text-xs uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-foreground font-body font-medium text-sm group-hover:text-primary transition-colors">{item.value}</p>
                  </a>
                ) : (
                  <div className="text-center p-5 rounded-2xl bg-card border border-border">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-muted-foreground font-body text-xs uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-foreground font-body font-medium text-sm">{item.value}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact form + WhatsApp */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <h2 className="font-display font-bold text-xl text-foreground mb-5">Send us a message</h2>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mb-3" />
                  <h3 className="font-display font-bold text-foreground text-lg mb-1">Message Sent!</h3>
                  <p className="text-muted-foreground font-body text-sm">We'll get back to you soon.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 text-primary font-body text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Aarav Sharma"
                      className={`w-full px-4 py-2.5 rounded-xl bg-background border font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.name ? "border-destructive" : "border-border focus:border-primary/50"}`}
                    />
                    {errors.name && <p className="text-destructive text-xs font-body mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-background border font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.email ? "border-destructive" : "border-border focus:border-primary/50"}`}
                    />
                    {errors.email && <p className="text-destructive text-xs font-body mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what's on your mind..."
                      rows={4}
                      className={`w-full px-4 py-2.5 rounded-xl bg-background border font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none ${errors.message ? "border-destructive" : "border-border focus:border-primary/50"}`}
                    />
                    {errors.message && <p className="text-destructive text-xs font-body mt-1">{errors.message}</p>}
                  </div>
                  <Button onClick={handleSubmit} className="w-full rounded-xl font-body font-semibold gap-2" size="lg">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </div>
              )}
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col gap-4"
            >
              <div className="bg-green-600/10 border border-green-600/20 rounded-2xl p-6 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-green-600/20 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">Chat on WhatsApp</h3>
                <p className="text-muted-foreground font-body text-sm mb-5 leading-relaxed">
                  For the fastest response, reach us directly on WhatsApp. We reply within minutes during business hours.
                </p>
                <Button
                  size="lg"
                  className="w-full rounded-xl font-body font-semibold gap-2 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Fika%20Takeaway!%20I%20have%20a%20question.`, "_blank")}
                >
                  <MessageCircle className="w-4 h-4" />
                  Open WhatsApp
                </Button>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Quick response times:</span> We typically reply within 15 minutes on WhatsApp and within 24 hours via email during business hours (7 AM – 8 PM, daily).
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="rounded-3xl overflow-hidden border border-border shadow-lg h-72 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31725433956!2d85.29111305!3d27.70895045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu!5e0!3m2!1sen!2snp!4v1706000000000!5m2!1sen!2snp"
              width="100%" height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Fika Takeaway Location"
            />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ContactPage;
