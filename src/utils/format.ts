export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const transformToGtParseFormat = (data: PackageData) => {
  const totalAmount = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipTo = `${data.shippingAddress.street}, ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.zipCode}`;

  return {
    gt_parse: {
      package_slip_details: [
        { company_name: "Jane Jones" },
        { order_id: data.orderNumber },
        { order_date: data.orderDate },
        { estimated_delivery_date: data.deliveryDate },
        { total_amount: totalAmount },
        { ship_to: shipTo },
        { item: data.items[0]?.name || "N/A" },
        { description: data.items[0]?.description || "N/A" },
        { account_number: "N/A" },
        { cheque_number: "N/A" },
        { bank_name: "N/A" }
      ]
    }
  };
};
