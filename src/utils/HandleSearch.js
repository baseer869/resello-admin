const __handleSearch = (event) => {
  setSearch(event.target.value);
  if (event.target.value !== "") {
    let search_results = paginationOrder.filter(
      (item) =>
        item.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.orderDate.toLowerCase().includes(search.toLowerCase())
    );
    setOrders(search_results);
  } else {
  }
};
