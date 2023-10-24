export const calculatePrice = (initialPrice: number, quantity: number) => {
  return initialPrice * quantity;
};

export const formatDate = (dateString: string) => {
  // Parse the input date string to create a Date object
  const date = new Date(dateString);

  // Define an array for month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract day, month, and year from the Date object
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear().toString().slice(-2); // Extract last two digits of the year

  // Format the date as 'DD-MMMM-YY' (e.g., '30-July-23')
  const formattedDate = `${day}-${monthNames[monthIndex]}-${year}`;

  return formattedDate;
};
