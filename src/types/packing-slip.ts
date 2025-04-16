
export interface PackageItem {
  name: string;
  quantity: number;
  sku: string;
  price: number;
  description: string;
}

export interface PackageData {
  orderNumber: string;
  trackingNumber: string;
  orderDate: string;
  deliveryDate: string;
  customerName: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: PackageItem[];
}

export interface PackageSlipProps {
  data: PackageData;
  onGenerateNew: () => void;
}
