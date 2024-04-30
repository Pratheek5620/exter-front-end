import { getApiUrl } from "@/app/apiConstant";

// apiEndpoints.ts
export interface ApiUrls {
    getCustomerCodes: string;
    getOrderSerialNumber: string;
  }
  
  export const apiUrls: ApiUrls = {
    getCustomerCodes:getApiUrl(window.location.host) + "/Customercode",
    getOrderSerialNumber:getApiUrl(window.location.host) + "/OrderService",
  };
  