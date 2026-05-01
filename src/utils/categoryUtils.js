export const getCategory = (marks, max = 100) => {
  const percentage = (marks / max) * 100;

  if (percentage >= 85) return "Great";
  if (percentage >= 75) return "Good";
  if (percentage >= 60) return "Decent";
  if (percentage >= 50) return "Improvement Needed";
  if (percentage >= 36) return "Improvement Necessary";
  return "Fail";
};

export const getColor = (category) => {
  switch (category) {
    case "Great":
      return "bg-green-500";
    case "Good":
      return "bg-blue-500";
    case "Decent":
      return "bg-yellow-500";
    case "Improvement Needed":
      return "bg-orange-400";
    case "Improvement Necessary":
      return "bg-orange-600";
    default:
      return "bg-red-500";
  }
};