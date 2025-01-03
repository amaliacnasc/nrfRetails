import { useCallback } from "react";

const useFormatPhone = () => {
  const formatPhone = useCallback((phone: string): string => {
    if (!phone) return ""; 
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    }
    return phone; 
  }, []);

  return { formatPhone };
};

export default useFormatPhone;