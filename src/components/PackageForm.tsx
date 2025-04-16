
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { useState } from "react";
import { PackageData, PackageItem } from "@/types/packing-slip";
import { Trash2, Plus } from "lucide-react";

interface PackageFormProps {
  initialData: PackageData;
  onSubmit: (data: PackageData) => void;
}

export const PackageForm: React.FC<PackageFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<PackageData>({...initialData});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section?: string,
    index?: number
  ) => {
    const { name, value } = e.target;
    
    if (section === 'shippingAddress') {
      setFormData({
        ...formData,
        shippingAddress: {
          ...formData.shippingAddress,
          [name]: value
        }
      });
    } else if (section === 'items' && index !== undefined) {
      const newItems = [...formData.items];
      newItems[index] = {
        ...newItems[index],
        [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value
      };
      setFormData({
        ...formData,
        items: newItems
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { name: '', quantity: 1, sku: '', price: 0, description: '' }
      ]
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({
      ...formData,
      items: newItems
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>Enter the basic order information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Order Number</Label>
              <Input
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trackingNumber">Tracking Number</Label>
              <Input
                id="trackingNumber"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderDate">Order Date</Label>
              <Input
                id="orderDate"
                name="orderDate"
                value={formData.orderDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <CardDescription>Enter the customer and shipping details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              name="street"
              value={formData.shippingAddress.street}
              onChange={(e) => handleInputChange(e, 'shippingAddress')}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.shippingAddress.city}
                onChange={(e) => handleInputChange(e, 'shippingAddress')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={formData.shippingAddress.state}
                onChange={(e) => handleInputChange(e, 'shippingAddress')}
              />
            </div>
            <div className="space-y-2 col-span-2 md:col-span-1">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.shippingAddress.zipCode}
                onChange={(e) => handleInputChange(e, 'shippingAddress')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Package Items</CardTitle>
            <CardDescription>Add items included in this package</CardDescription>
          </div>
          <Button 
            type="button"
            variant="outline" 
            size="sm" 
            onClick={handleAddItem}
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.items.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg relative">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                onClick={() => handleRemoveItem(index)}
              >
                <Trash2 size={16} />
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`item-name-${index}`}>Item Name</Label>
                  <Input
                    id={`item-name-${index}`}
                    name="name"
                    value={item.name}
                    onChange={(e) => handleInputChange(e, 'items', index)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`item-sku-${index}`}>SKU</Label>
                  <Input
                    id={`item-sku-${index}`}
                    name="sku"
                    value={item.sku}
                    onChange={(e) => handleInputChange(e, 'items', index)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`item-quantity-${index}`}>Quantity</Label>
                  <Input
                    id={`item-quantity-${index}`}
                    name="quantity"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, 'items', index)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`item-price-${index}`}>Price</Label>
                  <Input
                    id={`item-price-${index}`}
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.price}
                    onChange={(e) => handleInputChange(e, 'items', index)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`item-description-${index}`}>Description</Label>
                <Input
                  id={`item-description-${index}`}
                  name="description"
                  value={item.description}
                  onChange={(e) => handleInputChange(e, 'items', index)}
                />
              </div>
            </div>
          ))}
          
          {formData.items.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No items added yet. Click "Add Item" to begin.
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Generate Packing Slip
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
