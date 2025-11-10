import { styles } from "@/app/styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
type Props = {
  setOpen: (open: boolean) => void;
  data: any;
  user: any;
};

const CheckoutForm = ({ setOpen, data, user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  // Stripe element appearance based on theme
  const appearance = {
    theme: theme === "dark" ? ("night" as const) : ("stripe" as const),
    variables: {
      colorPrimary: theme === "dark" ? "#3b82f6" : "#2563eb",
      colorBackground: theme === "dark" ? "#374151" : "#ffffff",
      colorText: theme === "dark" ? "#ffffff" : "#1f2937",
      colorTextSecondary: theme === "dark" ? "#ffffff" : "#6b7280",
      colorTextPlaceholder: theme === "dark" ? "#9ca3af" : "#9ca3af",
      colorDanger: "#ef4444",
      fontFamily: "Poppins, system-ui, sans-serif",
      spacingUnit: "6px",
      borderRadius: "8px",
    },
    rules: {
      ".Tab": {
        backgroundColor: theme === "dark" ? "#374151" : "#f9fafb",
        border: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}`,
        borderRadius: "8px",
        color: theme === "dark" ? "#ffffff" : "#374151",
        padding: "12px 16px",
        marginBottom: "8px",
        transition: "all 0.2s ease",
      },
      ".Tab:hover": {
        backgroundColor: theme === "dark" ? "#4b5563" : "#f3f4f6",
        borderColor: theme === "dark" ? "#6b7280" : "#d1d5db",
      },
      ".Tab--selected": {
        backgroundColor: theme === "dark" ? "#3b82f6" : "#2563eb",
        borderColor: theme === "dark" ? "#3b82f6" : "#2563eb",
        color: "#ffffff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      ".Input": {
        backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
        border: `1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"}`,
        borderRadius: "6px",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        padding: "12px",
        fontSize: "14px",
      },
      ".Input:focus": {
        borderColor: theme === "dark" ? "#3b82f6" : "#2563eb",
        boxShadow: `0 0 0 2px ${
          theme === "dark"
            ? "rgba(59, 130, 246, 0.3)"
            : "rgba(37, 99, 235, 0.3)"
        }`,
        outline: "none",
      },
      ".Label": {
        color: theme === "dark" ? "#ffffff !important" : "#1f2937 !important",
        fontSize: "14px",
        fontWeight: "500",
        marginBottom: "6px",
      },
      ".Text": {
        color: theme === "dark" ? "#ffffff" : "#1f2937",
      },
      ".Text--secondary": {
        color: theme === "dark" ? "#ffffff" : "#6b7280",
      },
      ".Error": {
        color: "#ef4444",
        fontSize: "13px",
      },
      // Additional selectors for better coverage
      label: {
        color: theme === "dark" ? "#ffffff !important" : "#1f2937 !important",
      },
      ".p-Label": {
        color: theme === "dark" ? "#ffffff !important" : "#1f2937 !important",
      },
      ".p-Input-label": {
        color: theme === "dark" ? "#ffffff !important" : "#1f2937 !important",
      },
    },
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Payment system is not ready. Please try again.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message);
        toast.error(error.message || "Payment failed");
        setIsLoading(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setIsLoading(false);
        createOrder({ courseId: data._id, payment_info: paymentIntent });
      }
    } catch (err) {
      console.error("Payment error:", err);
      setMessage("An unexpected error occurred");
      toast.error("Payment failed. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      toast.success("Order successful!");
      socketId.emit("notification", {
        title: "New Order",
        message: `You got a new order of ${data.name}`,
        userId: user?._id,
      });
      setOpen(false);
      setIsLoading(false);
      redirect(`/course-access/${data._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
      setIsLoading(false);
    }
  }, [orderData, error, setOpen, data._id]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800">
      {/* Add custom styles for Stripe elements */}
      <style jsx global>{`
        .p-Label,
        .p-Input-label,
        [data-testid="payment-element"] label {
          color: ${theme === "dark" ? "#ffffff" : "#1f2937"} !important;
        }

        .p-Text,
        .p-Text--secondary {
          color: ${theme === "dark" ? "#ffffff" : "#1f2937"} !important;
        }

        [data-testid="payment-element"] .Input {
          background-color: ${theme === "dark"
            ? "#374151"
            : "#ffffff"} !important;
          color: ${theme === "dark" ? "#ffffff" : "#1f2937"} !important;
        }
      `}</style>

      <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Email for receipts */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email for receipt
          </label>
          <LinkAuthenticationElement id="link-authentication-element" />
        </div>

        {/* Payment Methods */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Payment method
          </label>
          <PaymentElement
            id="payment-element"
            options={{
              ...appearance,
              layout: {
                type: "tabs",
                defaultCollapsed: false,
                radios: false,
                spacedAccordionItems: true,
              },
              paymentMethodOrder: ["card", "apple_pay", "google_pay"],
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="w-full"
          type="submit"
        >
          <span
            className={`${
              styles.button
            } mt-2 !h-[48px] w-full flex items-center justify-center text-[16px] font-[600] ${
              isLoading || !stripe || !elements
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            ) : (
              `Pay $${data.price}`
            )}
          </span>
        </button>

        {/* Error Messages */}
        {message && (
          <div className="text-red-500 dark:text-red-400 font-Poppins text-sm text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
