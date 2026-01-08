import PaymentCard from "../../components/student/PaymentCard";
import PaymentStepper from "../../components/student/PaymentStepper";

const Payments = () => {
  return (
    <div className="space-y-6">
      <PaymentStepper />

      <div className="grid md:grid-cols-3 gap-6">
        <PaymentCard title="Registration Fee" amount="₹5,000" status="Paid" />
        <PaymentCard title="Service Fee" amount="₹15,000" status="Pending" />
        <PaymentCard title="Visa Fee" amount="₹10,000" status="Locked" />
      </div>
    </div>
  );
};

export default Payments;
