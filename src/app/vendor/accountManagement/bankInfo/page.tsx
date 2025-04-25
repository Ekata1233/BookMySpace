"use client";
import React, { useEffect, useState } from "react";
import { useVendorBankDetails } from "@/app/context/BankDetailsContext";
import Sidebar from "../../sidebar/page";

const BankInfo = () => {
  const { addVendorBankDetail, updateVendorBankDetail, vendorBankDetails } =
    useVendorBankDetails();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSpaces, setOpenSpaces] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);

  const [form, setForm] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    accountType: "Savings" as "Savings" | "Current",
    phone: "",
    bankProof: null,
    verification: "Pending" as "Pending" | "Verified",
  });

  const [vendorId, setVendorId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [existingDetails, setExistingDetails] = useState<any | null>(null);

  useEffect(() => {
    const vendorData = localStorage.getItem("vendor");
    if (vendorData) {
      const vendor = JSON.parse(vendorData);
      setVendorId(vendor._id);
    }
  }, []);

  useEffect(() => {
    if (vendorId && vendorBankDetails?.length) {
      const match = vendorBankDetails.find(
        (detail) => detail.vendorId === vendorId,
      );
      if (match) {
        setExistingDetails(match);
        setForm({
          bankName: match.bankName || "",
          accountHolder: match.accountHolder || "",
          accountNumber: match.accountNumber || "",
          ifscCode: match.ifscCode || "",
          branchName: match.branchName || "",
          accountType: match.accountType || "Savings",
          phone: match.phone || "",
          bankProof: null,
          verification: match.verification || "Pending",
        });
      }
    }
  }, [vendorBankDetails, vendorId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, files } = e.target as any;
    if (name === "bankProof") {
      if (files[0]?.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      setForm({ ...form, bankProof: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!vendorId) {
      alert("Vendor ID not found!");
      return;
    }

    try {
      const data = {
        ...form,
        vendorId,
        bankProof: form.bankProof,
      };

      if (existingDetails) {
        await updateVendorBankDetail(existingDetails._id, data);
      } else {
        await addVendorBankDetail(data);
      }

      setShowForm(false);
    } catch (error) {
      console.error("Error saving bank details:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-42 bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        openSpaces={openSpaces}
        setOpenSpaces={setOpenSpaces}
        openBookings={openBookings}
        setOpenBookings={setOpenBookings}
        openReport={openReport} // ✅ Pass this
        setOpenReport={setOpenReport}
        openAccount={openAccount} // ✅ Add this
        setOpenAccount={setOpenAccount} // ✅ Add this
      />
      <main className="flex-1 max-w-4xl mx-auto p-6">
        <div className="my-10 f p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-md border border-[#6BB7BE]">
          <h2 className="text-3xl font-bold text-[#6BB7BE] mb-6 text-center tracking-wide">
            🏦 Bank Information
          </h2>

          {!showForm && existingDetails && (
            <div className="space-y-4 text-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                <div>
                  <strong>Bank Name:</strong> {existingDetails.bankName}
                </div>
                <div>
                  <strong>Account Holder:</strong>{" "}
                  {existingDetails.accountHolder}
                </div>
                <div>
                  <strong>Account Number:</strong>{" "}
                  {existingDetails.accountNumber}
                </div>
                <div>
                  <strong>IFSC Code:</strong> {existingDetails.ifscCode}
                </div>
                <div>
                  <strong>Branch Name:</strong> {existingDetails.branchName}
                </div>
                <div>
                  <strong>Account Type:</strong> {existingDetails.accountType}
                </div>
                <div>
                  <strong>Phone Number:</strong>{" "}
                  {existingDetails.phone || "N/A"}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 text-white rounded-full ${existingDetails.verification === "Verified" ? "bg-green-600" : "bg-yellow-500"}`}
                  >
                    {existingDetails.verification === "Verified"
                      ? "✅ Verified"
                      : "🔄 Pending"}
                  </span>
                </div>
              </div>
              <div className="text-gray-400 text-sm mt-2">
                Last updated: {new Date().toLocaleDateString()}
              </div>

              <div className="text-right">
                <button
                  onClick={() => setShowForm(true)}
                  className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  ✏️ Edit Details
                </button>
              </div>
            </div>
          )}

          {!showForm && !existingDetails && (
            <div className="text-center text-gray-600">
              <p>No bank details added yet.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 px-6 py-2 bg-[#6BB7BE] text-white rounded hover:opacity-90"
              >
                + Add Bank Details
              </button>
            </div>
          )}

          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="bankName"
                  value={form.bankName}
                  onChange={handleChange}
                  placeholder="Bank Name"
                  required
                  className="border border-[#6BB7BE] p-2 rounded"
                />
                <input
                  type="text"
                  name="accountHolder"
                  value={form.accountHolder}
                  onChange={handleChange}
                  placeholder="Account Holder Name"
                  required
                  className="border border-[#6BB7BE] p-2 rounded"
                />
                <input
                  type="text"
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  placeholder="Account Number"
                  required
                  className="border border-[#6BB7BE] p-2 rounded"
                />
                <input
                  type="text"
                  name="ifscCode"
                  value={form.ifscCode}
                  onChange={handleChange}
                  placeholder="IFSC Code"
                  required
                  className="border border-[#6BB7BE] p-2 rounded"
                />
                <input
                  type="text"
                  name="branchName"
                  value={form.branchName}
                  onChange={handleChange}
                  placeholder="Branch Name"
                  className="border border-[#6BB7BE] p-2 rounded"
                />
                <select
                  name="accountType"
                  value={form.accountType}
                  onChange={handleChange}
                  className="border border-[#6BB7BE] p-2 rounded"
                >
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Linked Phone (optional)"
                  className="border border-[#6BB7BE] p-2 rounded"
                />
                <input
                  type="file"
                  name="bankProof"
                  onChange={handleChange}
                  className="border border-[#6BB7BE] p-2 rounded"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="bg-[#6BB7BE] text-white px-6 py-2 rounded hover:opacity-90"
                >
                  💾 Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default BankInfo;
