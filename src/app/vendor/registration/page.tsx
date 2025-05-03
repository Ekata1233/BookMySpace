
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useVendor } from "@/app/context/VendorContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const VendorRegistration = () => {
  const { submitVendor } = useVendor();
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: "",
    workEmail: "",
    phone: "",
    website: "",
    businessType: "",
    address: "",
    message: "",
    logo: null as File | null,
    contactName: "",
    contactMobile: "",
    contactEmail: "",
    documentType: "",
    documentNo: "",
    documentImage: null as File | null,
    password: "",
    confirmPassword: "",
    agreed: false,
    amount: 1999,
  });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, logo: file }));
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, documentImage: file }));
  };

  const validateForm = () => {
    if (!formData.agreed) {
      setError("Please agree to terms and conditions");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const res = await loadRazorpayScript();
    if (!res) {
      setError("Failed to load Razorpay SDK");
      setIsLoading(false);
      return;
    }

    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "logo" && key !== "documentImage" && key !== "confirmPassword") {
          const value = formData[key as keyof typeof formData];
          if (value !== null && value !== undefined) {
            formPayload.append(key, value instanceof File ? value : String(value));
          }
        }
      });

      if (formData.logo) formPayload.append("logo", formData.logo);
      if (formData.documentImage) formPayload.append("documentImage", formData.documentImage);

      const response = await axios.post("/api/vendor/registration", formPayload);
      const order_id = response.data.order.id;



      // if (!order || !order.id) {
      //   setError("Failed to create payment order");
      //   return;
      // }

      const options = {
        key: "rzp_test_4IVVmy5cqABEUR", // Replace with your Razorpay test/public key
        amount: 1999 * 100,
        currency: "INR",
        name: "Office Registration",
        description: "Office registration slot",
        order_id: order_id,
        handler: async function (razorpayResponse: any) {
          await handlePaymentSuccess(razorpayResponse);
        },
        prefill: {
          name: formData.companyName,
          email: formData.workEmail,
          contact: formData.phone,
        },
        theme: {
          color: "#6BB7BE",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Error in payment:", err);
      setError(err.response?.data?.message || "Payment or registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (razorpayResponse: any) => {
    try {
      
      toast.success("Registration and payment successful!");
      router.push("/");
    } catch (err) {
      toast.error("Payment success but verification failed.");
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };



  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-40">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 py-5 text-center">
        VENDOR REGISTRATION
      </h1>
      <div className="flex justify-center items-center mb-10 mt-5">
        <div className="flex items-center gap-4 text-[#6BB7BE] font-bold text-lg">
          <div
            className={`flex items-center gap-2 ${step >= 1 ? "text-[#6BB7BE]" : "text-gray-400"
              }`}
          >
            <div
              className={`border border-[#6BB7BE] rounded-none w-8 h-8 flex items-center justify-center ${step >= 1 ? "bg-[#6BB7BE] text-white" : ""
                }`}
            >
              1
            </div>
            <span>---</span>
          </div>
          <div
            className={`flex items-center gap-2 ${step >= 2 ? "text-[#6BB7BE]" : "text-gray-400"
              }`}
          >
            <div
              className={`border border-[#6BB7BE] rounded-none w-8 h-8 flex items-center justify-center ${step >= 2 ? "bg-[#6BB7BE] text-white" : ""
                }`}
            >
              2
            </div>
            <span>---</span>
          </div>
          <div
            className={`flex items-center gap-2 ${step === 3 ? "text-[#6BB7BE]" : "text-gray-400"
              }`}
          >
            <div
              className={`border border-[#6BB7BE] rounded-none w-8 h-8 flex items-center justify-center ${step === 3 ? "bg-[#6BB7BE] text-white" : ""
                }`}
            >
              3
            </div>
          </div>
        </div>
      </div>

      <form className="grid grid-cols-1 gap-4">
        {step === 1 && (
          <>
            <div>
              <Label className="text-[#6BB7BE] my-2">Company Name</Label>
              <Input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="ABC Pvt Ltd"
                className="rounded-none w-full py-5"
              />
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">Work Email</Label>
              <Input
                name="workEmail"
                value={formData.workEmail}
                onChange={handleChange}
                placeholder="email@company.com"
                className="rounded-none w-full py-5"
              />
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">Phone Number</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="rounded-none w-full py-5"
              />
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">Website (Optional)</Label>
              <Input
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourcompany.com"
                className="rounded-none w-full py-5"
              />
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">Business Type</Label>
              <Select
                onValueChange={(val) =>
                  setFormData({ ...formData, businessType: val })
                }
              >
                <SelectTrigger className="rounded-none w-full py-5">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">Address</Label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full business address"
                className="rounded-none w-full"
              />
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">Message</Label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your business..."
                className="rounded-none w-full"
              />
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">Company Logo</Label>
              <Input
                type="file"
                name="logo"
                onChange={handleLogoChange}
                className="rounded-none w-full py-1"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <Label className="text-[#6BB7BE] my-2">Contact Person Name</Label>
              <Input
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="John Doe"
                className="rounded-none w-full py-5"
              />
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">Mobile Number</Label>
              <Input
                name="contactMobile"
                value={formData.contactMobile}
                onChange={handleChange}
                placeholder="9876543210"
                className="rounded-none w-full py-5"
              />
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">Email</Label>
              <Input
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="contact@company.com"
                className="rounded-none w-full py-5"
              />
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">
                Business Document Type
              </Label>
              <Select
                onValueChange={(val) =>
                  setFormData({ ...formData, documentType: val })
                }
              >
                <SelectTrigger className="rounded-none w-full py-5">
                  <SelectValue placeholder="Select Document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GST">GST</SelectItem>
                  <SelectItem value="License">License</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">Document Number</Label>
              <Input
                name="documentNo"
                value={formData.documentNo}
                onChange={handleChange}
                placeholder="1234567890"
                className="rounded-none w-full py-5"
              />
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">Upload Document</Label>
              <Input
                type="file"
                name="documentImage"
                onChange={handleDocumentChange}
                className="rounded-none w-full py-1"
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            {/* <div>
              <Label className="text-[#6BB7BE] my-2">Email</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="rounded-none w-full py-5"
              />
            </div> */}
            <div>
              <Label className="text-[#6BB7BE] my-2">Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-none w-full py-5"
              />
            </div>
            <div>
              <Label className="text-[#6BB7BE] my-2">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="rounded-none w-full py-5"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agree"
                checked={formData.agreed}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreed: Boolean(checked) })
                }
              />
              <label htmlFor="agree" className="text-sm text-[#6BB7BE]">
                I agree to the terms and conditions
              </label>
            </div>
            <div className="p-4 border border-dashed rounded-md text-center text-lg font-medium text-[#6BB7BE]">
              Onboarding Fee: ₹1999
            </div>
          </>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button
              onClick={handleBack}
              type="button"
              className="rounded-none px-8 py-2 border border-[#6BB7BE] bg-white text-[#6BB7BE] font-bold hover:bg-[#6BB7BE] hover:text-white"
            >
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button
              onClick={handleNext}
              type="button"
              className="ml-auto rounded-none px-8 py-2 border border-[#6BB7BE] bg-[#6BB7BE] text-white font-bold hover:bg-[#FAFAFA] hover:text-[#6BB7BE]"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handlePayment}
              type="button"
              disabled={isLoading}
              className="ml-auto rounded-none px-8 py-2 border border-[#6BB7BE] bg-[#6BB7BE] text-white font-bold hover:bg-[#FAFAFA] hover:text-[#6BB7BE]"
            >
              {isLoading ? "Processing..." : "Register"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VendorRegistration;
