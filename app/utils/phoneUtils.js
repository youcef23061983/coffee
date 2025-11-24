export const isValidPhone = (phone) => {
  // E.164 format validation - stricter check
  return /^\+[1-9]\d{1,14}$/.test(phone);
};

export const formatPhone = (phoneCode, localNumber) => {
  // Add null/undefined check
  if (!localNumber || !phoneCode) {
    return "";
  }

  // Remove ALL non-digit characters (more strict)
  const cleaned = localNumber.replace(/\D/g, "");

  // If after cleaning there are no digits, return empty
  if (cleaned.length === 0) {
    return "";
  }

  // ✅ 1. Already starts with '+213'
  if (cleaned.startsWith(phoneCode)) {
    return `+${cleaned}`;
  }

  // ✅ 2. Starts with one or more leading zeroes
  const local = cleaned.replace(/^0+/, "");

  return `+${phoneCode}${local}`;
};

// Add a new function to validate input in real-time
export const containsOnlyDigits = (input) => {
  return /^\d*$/.test(input);
};
