const FormattedDate = ({ value }) => {
  const date = new Date(value);
  // Optional: Handle invalid dates
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return date.toDateString();
};

const FormattedTime = ({ value }) => {
  const date = new Date(value);
  // Optional: Handle invalid dates
  if (isNaN(date.getTime())) {
    return "Invalid Time";
  }
  return date.toLocaleTimeString();
};

export { FormattedDate, FormattedTime };
