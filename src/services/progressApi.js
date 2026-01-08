export const updateProgress = async (studentId, progress) => {
  const res = await fetch("http://localhost:5000/api/progress/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      studentId,
      progress
    })
  });

  return res.json();
};
