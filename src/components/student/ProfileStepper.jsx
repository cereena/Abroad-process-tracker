import { Check } from "lucide-react";

export default function ProfileStepper({ step, setStep }) {
  const steps = [
    { id: 1, label: "Personal" },
    { id: 2, label: "Academics" },
    { id: 3, label: "Work Experience" },
  ];

  return (
    <div className="flex items-center justify-between mb-10">
      {steps.map((s, index) => {
        const isCompleted = step > s.id;
        const isActive = step === s.id;

        return (
          <div key={s.id} className="flex-1 flex items-center">
            {/* Circle */}
            <div
              onClick={() => setStep(s.id)}
              className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition
                ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
            >
              {isCompleted ? <Check size={18} /> : s.id}
            </div>

            {/* Label */}
            <div className="ml-3">
              <p
                className={`text-sm font-semibold ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {s.label}
              </p>
            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-4 ${
                  step > s.id ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
