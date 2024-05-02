import { getApiUrl } from "@/app/apiConstant";

// apiEndpoints.ts

// Optional type safety for clarity
interface ApiUrls {
  getCustomerCodes: string;
  getOrderSerialNumber: string;
}

// Use a function to conditionally determine the hostname
// This allows for flexibility in future environment handling
const getHostname = () => {
  // You can customize this logic to determine the hostname based on your needs
  // (e.g., using a library like `next/router`)
  if (process.env.NODE_ENV === 'development') {
    return 'localhost'; // Assuming localhost for development
  } else {
    // For production or staging, use the actual hostname
    return window.location.host; // Access window.location.host here (only available in the browser)
  }
};

export const apiUrls: ApiUrls = {
  getCustomerCodes: getApiUrl(getHostname()) + "/Customercode",
  getOrderSerialNumber: getApiUrl(getHostname()) + "/OrderService",
};
