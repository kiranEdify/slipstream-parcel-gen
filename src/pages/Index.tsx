
import { useState } from "react";
import { PackageSlip } from "@/components/PackageSlip";
import { PackageForm } from "@/components/PackageForm";
import { generateDummyData } from "@/utils/dummy-data";
import { PackageData } from "@/types/packing-slip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package } from "lucide-react";

const Index = () => {
  const [packageData, setPackageData] = useState<PackageData>(generateDummyData());
  const [activeTab, setActiveTab] = useState<string>("preview");

  const handleFormSubmit = (data: PackageData) => {
    setPackageData(data);
    setActiveTab("preview");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2 text-center">
            <Package size={28} className="text-shipping-accent" />
            <h1 className="text-3xl font-bold text-shipping-primary">Packing Slip Generator</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview Packing Slip</TabsTrigger>
              <TabsTrigger value="edit">Edit Package Data</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="flex justify-center">
              <PackageSlip data={packageData} />
            </TabsContent>
            <TabsContent value="edit">
              <PackageForm initialData={packageData} onSubmit={handleFormSubmit} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Packing Slip Generator - A simple tool for generating shipping documents</p>
      </footer>
    </div>
  );
};

export default Index;
