export function formatDate(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-based
    const day = date.getDate().toString().padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  }