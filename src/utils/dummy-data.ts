
import { PackageData } from "@/types/packing-slip";
import { format } from "date-fns";

export const generateDummyData = (): PackageData => {
  return {
    orderNumber: "740977555",
    trackingNumber: "1ZR4NAU315TH",
    orderDate: "Apr 16, 2025",
    deliveryDate: "Apr 18, 2025",
    customerName: "Sarah Smith",
    shippingAddress: {
      street: "654 Birch Boulevard",
      city: "Seattle",
      state: "TX",
      zipCode: "46720"
    },
    items: [
      {
        name: "Smart Watch",
        sku: "SW582",
        price: 199.99,
        description: "Fitness tracking smartwatch with heart rate monitor",
        quantity: 1
      }
    ]
  };
};
