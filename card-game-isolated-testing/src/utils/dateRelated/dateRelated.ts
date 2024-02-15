export function formatDateString(input: string): string {
  // Parse the input string into a Date object
  const date = new Date(input);

  // Extract the day, month, and year from the Date object
  const day = date.getDate().toString().padStart(2, "0"); // Ensures two digits
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed, add 1
  const year = date.getFullYear();

  // Return the formatted date string in dd-mm-yyyy format
  return `${day}-${month}-${year}`;
}
