import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SellerProductUploadProps {
  onSubmit?: (product: any) => void;
}

const SellerProductUpload = ({ onSubmit }: SellerProductUploadProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [images, setImages] = useState({
    main: "",
    gallery: [] as string[],
  });

  const { toast } = useToast();

  // Add new gallery image field
  const addGalleryImage = () => {
    setImages((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ""],
    }));
  };

  // Handle gallery image change
  const updateGalleryImage = (index: number, url: string) => {
    const newGallery = [...images.gallery];
    newGallery[index] = url;
    setImages((prev) => ({ ...prev, gallery: newGallery }));
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const product = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      images,
    };

    toast({
      title: "Product Added",
      description: `${formData.name} has been uploaded successfully.`,
    });

    if (onSubmit) onSubmit(product);
    setFormData({ name: "", description: "", price: "", category: "", stock: "" });
    setImages({ main: "", gallery: [] });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-lg space-y-6 animate-fade-in"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-slide-in-right">
        Upload New Product
      </h2>

      {/* Basic Info */}
      <Card className="p-4 space-y-4 border border-border/50">
        <div className="space-y-2">
          <Label>Product Name</Label>
          <Input
            placeholder="Enter product name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Describe your product"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Price (₹)</Label>
            <Input
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Stock</Label>
            <Input
              type="number"
              placeholder="Available stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Input
            placeholder="e.g., Electronics, Fashion, Grocery"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
      </Card>

      {/* Image Upload Section */}
      <Card className="p-4 space-y-4 border border-border/50">
        <div className="space-y-2">
          <Label>Main Image URL</Label>
          <Input
            placeholder="Enter main product image URL"
            value={images.main}
            onChange={(e) => setImages({ ...images, main: e.target.value })}
          />
          {images.main && (
            <img
              src={images.main}
              alt="Main product"
              className="w-full h-40 object-cover rounded-md shadow-sm mt-2"
            />
          )}
        </div>

        {/* Gallery Images */}
        <div className="space-y-2">
          <Label>Gallery Images</Label>
          <Button
            type="button"
            onClick={addGalleryImage}
            variant="outline"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Gallery Image
          </Button>

          <div className="grid grid-cols-3 gap-2">
            {images.gallery.map((url, index) => (
              <div key={index} className="relative group">
                <Input
                  placeholder="Image URL"
                  value={url}
                  onChange={(e) => updateGalleryImage(index, e.target.value)}
                  className="mb-1"
                />
                {url && (
                  <img
                    src={url}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md border border-border shadow-sm"
                  />
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() =>
                    setImages({
                      ...images,
                      gallery: images.gallery.filter((_, i) => i !== index),
                    })
                  }
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button type="submit" className="flex-1">
          Add Product
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => window.location.reload()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default SellerProductUpload;
