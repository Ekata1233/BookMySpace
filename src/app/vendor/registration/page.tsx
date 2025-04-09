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

const VendorRegistration = () => {
  const { submitVendor } = useVendor();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    companyName: "",
    workEmail: "",
    phone: "",
    address: "",
    website: "",
    businessType: "",
    message: "",
    agreed: false,
    amount: 0,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    if (!formData.agreed) {
      alert("Please agree to terms and conditions");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    try {
      const res = await axios.post("/api/vendor/registration", formData);
      const { id: order_id } = res.data.order_id;

      console.log("order id : ", order_id);

      const options = {
        key: "rzp_test_4IVVmy5cqABEUR",
        amount: 1999 * 100, // Get actual amount from backend
        currency: "INR",
        name: "office registration",
        description: "office registration slot",
        order_id: order_id,
        handler: async function (response: any) {
          alert("Payment successful: " + response.razorpay_payment_id);
          await handlePaymentSuccess();
        },
        prefill: {
          name: formData.name,
          email: formData.workEmail,
          contact: formData.phone,
        },
        theme: {
          color: "#6BB7BE",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      await submitVendor();
      alert("Registration completed!");
    } catch (err) {
      alert("Registration completed!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-40">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 py-5">
        VENDOR REGISTRATION
      </h1>
      <form className="grid grid-cols-1 gap-4">
        <div>
          <Label className="text-[#6BB7BE] my-2">Name</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="rounded-none w-full py-5"
          />
        </div>

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

        <Button
          onClick={handlePayment}
          type="button"
          className="h-10 w-full sm:w-auto flex rounded-none items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-10 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium"
        >
          Proceed to Pay with Razorpay
        </Button>
      </form>
    </div>
  );
};

export default VendorRegistration;
