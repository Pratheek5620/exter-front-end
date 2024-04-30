// Function to process IOT parameter
const processIOT = (value: string | undefined): string => {
  if (value) {
    const code = value.slice(0, 1).toUpperCase(); // Ensure uppercase for comparison
    if (code === "Y") {
      return "I"; // Return "I" directly if value starts with "Y"
    } else {
      return code; // Return the first character of the input string
    }
  } else {
    return "Undefined value received"; // Handle the case where value is undefined
  }
};

// Function to process BMS parameter
const processBMS = (value: string | any[]) => {
  return value.slice(0, 1);
};

// Function to process Chemistry parameter
const processChemistry = (value: string | any[]) => {
  return value.slice(0, 1);
};

// Function to process Voltage parameter
const processVoltage = (value: any) => {
  return value;
};

// Function to process Capacity parameter
const processCapacity = (value: any) => {
  return value;
};

// Function to process Year of Manufacturing parameter
const processYearOfManufacturing = (value: any) => {
  return String(value).slice(-2);
};

// Function to process Month of Manufacturing parameter
const processMonthOfManufacturing = (value: any) => {
  return String(value).slice(-2);
};

// Function to process Plant Code parameter
const processPlantCode = (value: string | any[]) => {
  return value.slice(0, 1);
};

// Function to process Customer Code parameter
const processCustomerCode = (value: string | any[]) => {
  return value.slice(0, 2);
};

// Function to process Order Number parameter
const processOrderNumber = (value: any) => {
  return value;
};

// Function to process Serial Number parameter
const processSerialNumber = (value: any) => {
  return value;
};

// Function to generate serial number code based on form data
// Function to generate serial number codes based on form data and bulk input value
const generateSerialNumberCode = (formData: any, bulkInputValue: number): string[] => {
  const {
    IOT,
    BMS,
    Chemistry,
    Voltage,
    Capacity,
    YearofMfg,
    MonthofMfg,
    PlantCode,
    CustomerCode,
    OrderNumber,
    SerialNumber,
  } = formData;

  const encodedIOT = processIOT(IOT);
  const encodedBMS = processBMS(BMS);
  const encodedChemistry = processChemistry(Chemistry);
  const encodedVoltage = processVoltage(Voltage);
  const encodedCapacity = processCapacity(Capacity);
  const encodedYearOfManufacturing = processYearOfManufacturing(YearofMfg);
  const encodedMonthOfManufacturing = processMonthOfManufacturing(MonthofMfg);
  const encodedPlantCode = processPlantCode(PlantCode);
  const encodedCustomerCode = processCustomerCode(CustomerCode);
  const encodedOrderNumber = processOrderNumber(OrderNumber);
  const encodedSerialNumber = processSerialNumber(SerialNumber);

  // Array to store generated serial number codes
  const serialNumberCodes: string[] = [];

  // Loop through the range defined by bulkInputValue
  for (let i = 0; i < bulkInputValue; i++) {
    // Increment the serial number
    const incrementedSerialNumber = parseInt(encodedSerialNumber) + i;

    // Generate the serial number code for the current iteration
    const serialNumberCode = `${encodedIOT}${encodedBMS}${encodedChemistry}${encodedVoltage}${encodedCapacity}${encodedYearOfManufacturing}${encodedMonthOfManufacturing}${encodedPlantCode}${encodedCustomerCode}${encodedOrderNumber}${"00"+incrementedSerialNumber}`;

    // Add the generated serial number code to the array
    serialNumberCodes.push(serialNumberCode);
  }

  return serialNumberCodes;
};


export default generateSerialNumberCode;
