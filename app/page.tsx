"use client";
import { ChakraProvider } from "@chakra-ui/react";

import LoginPage from "./login/page";
import { useEffect } from "react";
import { getApiUrl } from "./apiConstant";


export default function Home() {
  useEffect(() => {
    // Get the host name from the router
    const hostName = window.location.hostname;

    // Get the API URL based on the host name
    const apiUrl = getApiUrl(hostName);

    console.log(apiUrl);

    // You can now use apiUrl to make API requests or other operations
  }, []);
  return (
    <div>
      <ChakraProvider>
        <div>
          <LoginPage />
        </div>

      </ChakraProvider>
    </div>
  );
}
