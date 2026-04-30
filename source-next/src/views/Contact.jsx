"use client";
import React, { useState } from "react";
import PageHero from "../components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Handshake, ShoppingBag, HelpCircle, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { saveContactMessage } from "@/services/local/requestStore";

const contactTypes = [
  { icon: Search, title: "Sourcing Requests", desc: "Looking to source U.S. products for your business.", value: "sourcing" },
  { icon: Handshake, title: "Supplier Partnerships", desc: "U.S. suppliers interested in working with us.", value: "supplier_partnership" },
  { icon: ShoppingBag, title: "Wholesale Opportunities", desc: "Wholesale buyers interested in Sri Lankan products.", value: "wholesale" },
  { icon: HelpCircle, title: "General Inquiries", desc: "Questions about our services or process.", value: "general" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", inquiry_type: "general", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    saveContactMessage({
      ...form,
      source: "public-contact",
      prototypeOnly: true,
      status: "saved-locally",
    });
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Contact message saved locally.");
  };

  return (
    <>
      <PageHero
        headline="Contact Our Trade Coordination Team"
        subheadline="Whether you're a buyer, supplier, or partner — we'd like to hear from you."
        compact
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contactTypes.map((ct, i) => (
              <motion.div
                key={ct.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`bg-card rounded-xl border p-5 cursor-pointer transition-all ${
                  form.inquiry_type === ct.value ? "border-accent shadow-md" : "border-border hover:border-accent/30"
                }`}
                onClick={() => update("inquiry_type", ct.value)}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <ct.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{ct.title}</h3>
                <p className="text-xs text-muted-foreground">{ct.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">Message Saved</h3>
                  <p className="text-muted-foreground">This prototype stored your message locally. Final delivery requires backend integration.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name *</Label>
                      <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 234 567 8900" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Inquiry Type</Label>
                    <Select value={form.inquiry_type} onValueChange={(v) => update("inquiry_type", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sourcing">Sourcing Request</SelectItem>
                        <SelectItem value="supplier_partnership">Supplier Partnership</SelectItem>
                        <SelectItem value="wholesale">Wholesale Opportunity</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Message *</Label>
                    <Textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your inquiry..." rows={5} />
                  </div>
                  <p className="text-xs text-muted-foreground">Prototype only. Final message delivery requires backend integration.</p>
                  <Button type="submit" disabled={submitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-12">
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            <div>
              <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
                <h3 className="font-display text-xl font-bold mb-4">Location</h3>
                <div className="flex items-start gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Houston, Texas</p>
                    <p className="text-sm text-primary-foreground/60 mt-1">Serving U.S. ↔ Sri Lanka trade relationships</p>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-sm text-primary-foreground/60 leading-relaxed">
                    Our Houston-based team coordinates sourcing, supplier communication, and export logistics for the U.S.–Sri Lanka trade lane.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
