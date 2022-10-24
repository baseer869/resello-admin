const calculateRange = (products, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(products.length / rowsPerPage);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (products, page, rowsPerPage) => {
  return products.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

export { calculateRange, sliceData };
