export function getTimePeriod() {
  const startDate = new Date(2024, 9, 1); // October 2024 — first dev role at Izaan School
  const today = new Date();
  const diffTime = today - startDate;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const diffMonths = diffDays / 30.44; // Approximate average days per month
  const years = Math.floor(diffMonths / 12);
  const months = Math.floor(diffMonths % 12);

  if (years > 0) {
    return `${years}+ years`;
  } else {
    return `${months} months`;
  }
}