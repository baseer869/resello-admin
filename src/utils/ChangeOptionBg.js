function bgStatusStyleHandler(status) {
  let styleColor;
  switch (status) {
    case "Completed":
      styleColor = "completed";
      break;
    case "Pending":
      styleColor = "pending";
      break;
    case "Partially_Completed":
      styleColor = "partially_completed";
      break;
    case "Cancelled":
      styleColor = "canceled";
      break;
    case "Shipped":
      styleColor = "shipped";
      break;
    default:
      styleColor = "rejected";
  }
  return styleColor;
}

export { bgStatusStyleHandler };
