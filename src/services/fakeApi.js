export const getStudentDashboard = () => {
  return Promise.resolve({
    name: "Cereena",
    studentId: "STD1023",
    progress: [
      { step: "Enquiry Submitted", completed: true },
      { step: "Initial Call Done", completed: true },
      { step: "Registration Completed", completed: true },
      { step: "Documents Uploaded", completed: false },
      { step: "Visa Applied", completed: false },
      { step: "Final Approval", completed: false }
    ],
    documents: [
      { name: "Passport", status: "Pending" },
      { name: "Marksheet", status: "Uploaded" },
      { name: "Offer Letter", status: "Pending" }
    ]
  });
};
