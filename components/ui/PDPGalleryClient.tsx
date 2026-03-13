"use client";

import { useState } from "react";
import StickyGallery from "@/components/ui/StickyGallery";
import ImageLightbox from "@/components/ui/ImageLightbox";

interface PDPGalleryClientProps {
  images: string[];
  productName: string;
}

const PDPGalleryClient = ({ images, productName }: PDPGalleryClientProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <StickyGallery
        images={images}
        productName={productName}
        onImageClick={handleImageClick}
      />
      <ImageLightbox
        images={images}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        productName={productName}
      />
    </>
  );
};

export default PDPGalleryClient;
