import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PaymentCard from "../../components/student/PaymentCard";
import PaymentStepper from "../../components/student/PaymentStepper";
import PaymentGatewayModal from "../../components/student/PaymentGatewayModal";

const Payments = () => {
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showGateway, setShowGateway] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/application/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log("APPLICATION DATA:", data);

      setApplication(data);
    } catch (err) {
      console.error("Payment fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const payNow = async (universityId) => {
    if (processing) return;

    try {
      setProcessing(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/payment/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appId: id,
            universityId: universityId,
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Payment failed");
        return;
      }

      alert(data.message);
      fetchApplication();

    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong");
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

  const uni = application?.appliedUniversity;

  if (!uni) {
    return (
      <div className="p-6 text-amber-600">
        No university applications found yet.
      </div>
    );
  }

  const servicePaid = uni?.paymentStatus === "Service Paid";

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      {/* Stepper */}
      <PaymentStepper />

      {showGateway && (
        <PaymentGatewayModal
          onClose={() => setShowGateway(false)}
          onSuccess={() => {
            payNow(uni._id);
            setShowGateway(false);
          }}
        />
      )}

      {/* Payment Header */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <h2 className="text-lg font-semibold">
          Application Payment
        </h2>
        <p className="text-sm text-slate-500">
          Complete the required payments to continue your
          application process.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Registration Fee */}
        <PaymentCard
          title="Registration Fee"
          amount="₹5,000"
          status="Paid"
          description="Initial registration payment completed."
        />

        {/* Service Fee */}
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

          onPay={() => setShowGateway(true)}
        />

        {/* Visa Fee */}
        <PaymentCard
          title="Visa Fee"
          amount="₹10,000"
          description="Unlocked after service fee payment."
          status={
            servicePaid ? "Pending" : "Locked"
          }
          disabled={!servicePaid}
          buttonText={
            servicePaid ? "Pay Visa Fee" : "Locked"
          }
        />
      </div>

    </div>
  );
};

export default Payments;