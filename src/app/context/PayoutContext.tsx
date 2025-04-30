"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

// Define the structure of a payout
interface Payout {
  _id?: string;
  vendor: string;
  amount: number;
  paymentMethod: "bank_transfer" | "upi";
  transactionId?: string;
  razorpayStatus?: string;
  notes?: string;
  paidAt?: Date;
  razorpayResponse?: any;
}

// Context Type
interface PayoutContextType {
  payouts: Payout[];
  createPayout: (data: {
    vendorId: string;
    amount: number;
    paymentMethod: "bank_transfer" | "upi";
  }) => Promise<void>;
  refreshPayouts: () => Promise<void>;
}

const PayoutContext = createContext<PayoutContextType | undefined>(undefined);

// Provider Component
export const PayoutProvider = ({ children }: { children: ReactNode }) => {
  const [payouts, setPayouts] = useState<Payout[]>([]);

  // Fetch all payouts
  const fetchPayouts = async () => {
    try {
      const res = await axios.get<{ success: boolean; data: Payout[] }>(
        "/api/payout"
      );
      if (res.data.success) {
        setPayouts(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching payouts:", error);
    }
  };

  // Create a new payout
  const createPayout = async ({
    vendorId,
    amount,
    paymentMethod,
  }: {
    vendorId: string;
    amount: number;
    paymentMethod: "bank_transfer" | "upi";
  }) => {
    try {
      const res = await axios.post<{ success: boolean; data: Payout }>(
        "/api/payout",
        { vendorId, amount, paymentMethod }
      );
      if (res.data.success) {
        setPayouts((prev) => [...prev, res.data.data]);
      }
    } catch (error) {
      console.error("Error creating payout:", error);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  return (
    <PayoutContext.Provider
      value={{
        payouts,
        createPayout,
        refreshPayouts: fetchPayouts,
      }}
    >
      {children}
    </PayoutContext.Provider>
  );
};

// Hook to use context
export const usePayouts = (): PayoutContextType => {
  const context = useContext(PayoutContext);
  if (!context) {
    throw new Error("usePayouts must be used within a PayoutProvider");
  }
  return context;
};
