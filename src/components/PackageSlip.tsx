import { PackageSlipProps } from "@/types/packing-slip";
import { Card } from "@/components/ui/card";
import { Barcode, Copy, Check, Package, RefreshCcw, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, transformToGtParseFormat } from "@/utils/format";

export const PackageSlip: React.FC<PackageSlipProps> = ({ data, onGenerateNew }) => {
  const [copied, setCopied] = useState(false);
  
  const calculateTotal = () => {
    return data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCopyJson = () => {
    const transformedData = transformToGtParseFormat(data);
    navigator.clipboard.writeText(JSON.stringify(transformedData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-[800px] p-8 print:shadow-none bg-white">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <Package size={32} className="text-shipping-primary" />
            <h1 className="font-bold text-2xl text-shipping-primary">Amazon.com</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onGenerateNew}
              className="print:hidden flex items-center gap-2"
            >
              <RefreshCcw size={16} />
              Generate New
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="print:hidden"
              onClick={() => window.print()}
            >
              <Printer size={16} className="mr-2" />
              Print
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-shipping-primary mb-2">Order Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Order Total:</p>
              <p className="font-medium">{formatCurrency(calculateTotal())}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Items:</p>
              <p className="font-medium">{data.items.length}</p>
            </div>
          </div>
        </div>

        {/* Customer Info and Items */}
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-shipping-primary">Order Details</h3>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-medium">{data.orderNumber}</span>
              
              <span className="text-muted-foreground">Order Date:</span>
              <span>{data.orderDate}</span>
              
              <span className="text-muted-foreground">Est. Delivery:</span>
              <span>{data.deliveryDate}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-shipping-primary">Customer</h3>
            <div className="text-sm">
              <p className="font-medium">{data.customerName}</p>
              <p>{data.shippingAddress.street}</p>
              <p>
                {data.shippingAddress.city}, {data.shippingAddress.state} {data.shippingAddress.zipCode}
              </p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div>
          <h3 className="font-semibold text-shipping-primary mb-2">Package Contents</h3>
          <div className="rounded-lg overflow-hidden border border-gray-100">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[180px]">Item</TableHead>
                  <TableHead className="text-right w-[80px]">Qty</TableHead>
                  <TableHead className="w-[100px]">SKU</TableHead>
                  <TableHead className="text-right w-[100px]">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Tracking Number */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col items-center space-y-2">
            <h3 className="font-semibold text-shipping-primary">Tracking Number</h3>
            <div className="flex items-center gap-2">
              <Barcode size={20} className="text-shipping-primary" />
              <span className="font-mono font-medium">{data.trackingNumber}</span>
            </div>
          </div>
        </div>

        {/* Package Details JSON */}
        <div className="border-t border-gray-200 pt-4 space-y-2 print:hidden">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-shipping-primary">Package Details (JSON)</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyJson}
              className="flex items-center gap-2"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy JSON"}
            </Button>
          </div>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(transformToGtParseFormat(data), null, 2)}
          </pre>
        </div>
      </div>
    </Card>
  );
};
