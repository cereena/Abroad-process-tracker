import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PaymentCard from "../../components/student/PaymentCard";
import PaymentStepper from "../../components/student/PaymentStepper";

const Payments = () => {
  const { id } = useParams();

  const [application, setApplication] = useState(null);

  useEffect(() => {
    fetchApplication();
  }, []);



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
      setApplication(data);
    } catch (err) {
      console.error("Payment fetch error", err);
    }
  };

  const payNow = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/payment/service-fee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ appId }),
    });

    window.location.reload();
  };

  if (!application) return <p>Loading payment details...</p>;

  return (
    <div className="space-y-6">
      <PaymentStepper />

      <div className="grid md:grid-cols-3 gap-6">
        <PaymentCard
          title="Registration Fee"
          amount="₹5,000"
          status="Paid"
        />

        <PaymentCard
          title="Service Fee (Second Payment)"
          amount="₹15,000"
          status={application.paymentStatus === "Paid" ? "Paid" : "Pending"}
          appId={application._id}
        />

        <PaymentCard
          title="Visa Fee"
          amount="₹10,000"
          status={application.paymentStatus === "Paid" ? "Pending" : "Locked"}
        />
      </div>
    </div>
  );
};

export default Payments;