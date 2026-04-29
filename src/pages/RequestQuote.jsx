import React, { useState } from "react";
import PageHero from "../components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, CheckCircle, Loader2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { saveQuoteRequest } from "@/services/local/requestStore";

const categories = [
  "Consumer Goods", "Business & Office Supplies", "Tools & Hardware",
  "Household Products", "Automotive Accessories", "Apparel & Textiles",
  "Commercial Supplies", "Special-Order Sourcing", "Other",
];

export default function RequestQuote() {
  const [form, setForm] = useState({
    full_name: "", company_name: "", email: "", phone: "", country: "",
    requester_type: "buyer", product_category: "", product_request: "",
    brand_specs: "", estimated_quantity: "", destination: "", timeline: "",
    is_importer_of_record: "", has_import_permits: "", service_type: "",
    message: "", file_name: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const update = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    update("file_name", file.name);
    window.setTimeout(() => {
      setUploading(false);
      toast.success("File captured locally. Backend integration is required for final uploads.");
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.product_request) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    const record = saveQuoteRequest({
      ...form,
      source: "public-request-quote",
      prototypeOnly: true,
      status: "submitted-locally",
    });
    setReferenceId(record.id);
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Quote request saved locally.");
  };

  if (submitted) {
    return (
      <>
        <PageHero headline="Request Submitted" compact />
        <section className="py-24 bg-background">
          <div className="max-w-xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Thank You</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Your sourcing request has been captured in this local prototype. Final sending, file storage, and operator workflow routing require backend integration.
              </p>
              <p className="text-sm text-muted-foreground">Reference: <span className="font-medium text-foreground">{referenceId}</span></p>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        headline="Request a Sourcing Quote"
        subheadline="Tell us what you need and our team will review your requirements."
        compact
      />

      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-4 pb-2 border-b">Contact Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input value={form.company_name} onChange={(e) => update("company_name", e.target.value)} placeholder="Company name" />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@company.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone / WhatsApp</Label>
                  <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 234 567 8900" />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input value={form.country} onChange={(e) => update("country", e.target.value)} placeholder="e.g., Sri Lanka" />
                </div>
                <div className="space-y-2">
                  <Label>You are a...</Label>
                  <Select value={form.requester_type} onValueChange={(v) => update("requester_type", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="supplier">Supplier</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-foreground mb-4 pb-2 border-b">Product Details</h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product Category</Label>
                    <Select value={form.product_category} onValueChange={(v) => update("product_category", v)}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Quantity</Label>
                    <Input value={form.estimated_quantity} onChange={(e) => update("estimated_quantity", e.target.value)} placeholder="e.g., 500 units" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Specific Product Request *</Label>
                  <Textarea value={form.product_request} onChange={(e) => update("product_request", e.target.value)} placeholder="Describe the products you need..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Brand / Specification Details</Label>
                  <Textarea value={form.brand_specs} onChange={(e) => update("brand_specs", e.target.value)} placeholder="Preferred brands, specs, or requirements..." rows={2} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Desired Destination</Label>
                    <Input value={form.destination} onChange={(e) => update("destination", e.target.value)} placeholder="e.g., Colombo, Sri Lanka" />
                  </div>
                  <div className="space-y-2">
                    <Label>Desired Timeline</Label>
                    <Input value={form.timeline} onChange={(e) => update("timeline", e.target.value)} placeholder="e.g., 30–60 days" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-foreground mb-4 pb-2 border-b">Import & Service Details</h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Are you the importer of record in Sri Lanka?</Label>
                  <RadioGroup value={form.is_importer_of_record} onValueChange={(v) => update("is_importer_of_record", v)} className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2"><RadioGroupItem value="yes" id="ior-yes" /><Label htmlFor="ior-yes" className="font-normal">Yes</Label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="no" id="ior-no" /><Label htmlFor="ior-no" className="font-normal">No</Label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="unsure" id="ior-unsure" /><Label htmlFor="ior-unsure" className="font-normal">Unsure</Label></div>
                  </RadioGroup>
                </div>
                <div className="space-y-3">
                  <Label>Do you have required import permits?</Label>
                  <RadioGroup value={form.has_import_permits} onValueChange={(v) => update("has_import_permits", v)} className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2"><RadioGroupItem value="yes" id="ip-yes" /><Label htmlFor="ip-yes" className="font-normal">Yes</Label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="no" id="ip-no" /><Label htmlFor="ip-no" className="font-normal">No</Label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="not_applicable" id="ip-na" /><Label htmlFor="ip-na" className="font-normal">N/A</Label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="unsure" id="ip-unsure" /><Label htmlFor="ip-unsure" className="font-normal">Unsure</Label></div>
                  </RadioGroup>
                </div>
                <div className="space-y-3">
                  <Label>Service needed</Label>
                  <RadioGroup value={form.service_type} onValueChange={(v) => update("service_type", v)} className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2"><RadioGroupItem value="sourcing_only" id="st-so" /><Label htmlFor="st-so" className="font-normal">Sourcing only</Label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="sourcing_and_export" id="st-se" /><Label htmlFor="st-se" className="font-normal">Sourcing + Export coordination</Label></div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-foreground mb-4 pb-2 border-b">Additional Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Additional Message</Label>
                  <Textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Any additional details..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Upload Product List / Spec Sheet</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input type="file" onChange={handleFile} className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      {uploading ? (
                        <Loader2 className="w-6 h-6 text-muted-foreground mx-auto animate-spin" />
                      ) : form.file_name ? (
                        <div className="flex items-center justify-center gap-2 text-accent">
                          <FileText className="w-5 h-5" />
                          <span className="text-sm font-medium">{form.file_name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                          <span className="text-sm text-muted-foreground">Click to capture a file name for this prototype</span>
                        </>
                      )}
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">File upload requires backend integration. This prototype stores the selected filename only.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Submitting a request does not guarantee product availability, export eligibility, import approval, or final pricing. Our team will review your request and respond with next steps.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Final sending, document storage, and operator workflow routing require backend integration.
              </p>
            </div>

            <Button type="submit" disabled={submitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-12 text-base">
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Request"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
