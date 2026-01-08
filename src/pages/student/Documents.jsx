import { useState } from "react";

const beforeDocs = [
  "10th Certificate",
  "12th Certificate",
  "Passport",
  "Degree Certificate (if any)",
  "LOR (if any)",
  "MOI (if any)",
  "IELTS / English Test (if any)",
  "Work Experience (if any)",
  "Resume / CV (if any)",
];

const afterDocs = [
  "Offer Letter",
  "Covering Letter",
  "Payment Proof",

  "Sponsor 1 – Aadhaar Card",
  "Sponsor 1 – Bank Statement (3 months)",
  "Sponsor 1 – Sponsorship Affidavit",

  "Sponsor 2 – Aadhaar Card",
  "Sponsor 2 – Bank Statement (3 months)",
  "Sponsor 2 – Sponsorship Affidavit",

  "Relationship Certificate",
  "Self Affidavit",
];

function Documents() {
  // 🔴 Later this comes from backend
  const hasOfferLetter = false;

  const DocCard = ({ name, locked }) => (
    <div
      className={`border rounded-lg p-4 bg-white shadow-sm space-y-2
      ${locked ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="flex justify-between items-center">
        <p className="font-medium text-blue-900">{name}</p>

        <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-600">
          Pending
        </span>
      </div>

      <div className="flex gap-3 items-center">
        <input
          type="file"
          className="border rounded-md px-3 py-2 text-sm w-full"
          disabled={locked}
        />

        <a
          href="#"
          className="text-xs text-blue-600 underline whitespace-nowrap"
        >
          Sample
        </a>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-blue-900">Documents</h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload documents as per your application stage
        </p>
      </div>

      {/* BEFORE APPLICATION */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-blue-800">
          Before Application
        </h2>

        {beforeDocs.map((doc, i) => (
          <DocCard key={i} name={doc} />
        ))}
      </section>

      {/* AFTER OFFER LETTER */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-blue-800">
            After Receiving Offer Letter
          </h2>

          {!hasOfferLetter && (
            <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
              Locked
            </span>
          )}
        </div>

        {!hasOfferLetter && (
          <div className="text-sm text-orange-600 bg-orange-50 border border-orange-200 p-3 rounded-lg">
            Upload of these documents will be enabled after you receive an
            official offer letter.
          </div>
        )}

        {afterDocs.map((doc, i) => (
          <DocCard key={i} name={doc} locked={!hasOfferLetter} />
        ))}
      </section>
    </div>
  );
}

export default Documents;
