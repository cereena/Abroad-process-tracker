import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PaymentCard from "../../components/student/PaymentCard";
import PaymentStepper from "../../components/student/PaymentStepper";
import PaymentGatewayModal from "../../components/student/PaymentGatewayModal";

const Payments = () => {
  const { appliedId } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showGateway, setShowGateway] = useState(false);


  const navigate = useNavigate();

  const fetchApplication = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/application/${appliedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log("APPLICATION DATA:", data);

      if (!res.ok) {
        console.error("Backend error:", data);
        return;
      }
      console.log("Applied ID:", appliedId);
      setApplication(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (appliedId) {
      fetchApplication();
    }
  }, [appliedId]);

  const payNow = async () => {
    try {
      setProcessing(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/payment/service-fee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appliedId: appliedId
          }),
        }
      );

      const data = await res.json();

      if (!data.url) {
        console.error("Stripe URL missing:", data);
        return;
      }

      window.location.href = data.url;

    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-slate-500">
        Loading payment details...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-6 text-red-500">
        Failed to load payment details
      </div>
    );
  }

  const uni = application;

  if (!uni) {
    return (
      <div className="p-6 text-amber-600">
        No university applications found yet.
      </div>
    );
  }

  const servicePaid = uni?.paymentStatus === "Service Paid";

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <PaymentCard
        title="Registration Fee"
        amount="₹5,000"
        status="Paid"
        description="Initial registration payment completed."
      />

      <PaymentCard
        title="Service Fee"
        amount="₹15,000"
        description="Required to unlock your offer letter."
        status={servicePaid ? "Paid" : "Pending"}
        buttonText={
          servicePaid
            ? "Payment Completed"
            : processing
              ? "Processing..."
              : "Pay Now"
        }
        disabled={!uni || servicePaid || processing}
        onPay={payNow}
      />

      <PaymentCard
        title="Visa Fee"
        amount="₹10,000"
        description="Unlocked after service fee payment."
        status={servicePaid ? "Pending" : "Locked"}
        disabled={!servicePaid}
        buttonText={servicePaid ? "Pay Visa Fee" : "Locked"}
      />
    </div>
  );
};

export default Payments;