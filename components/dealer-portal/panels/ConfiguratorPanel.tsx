"use client";

import { useState, useMemo } from "react";
import { mockConfigOptions } from "@/lib/salesforce/mock/configurator.mock";
import SwatchSelector from "../SwatchSelector";
import type { ProductConfigOptions } from "@/lib/salesforce/types";

type ConfigStep = "select" | "configure" | "quote";

export default function ConfiguratorPanel() {
  const [step, setStep] = useState<ConfigStep>("select");
  const [selectedProduct, setSelectedProduct] = useState<ProductConfigOptions | null>(null);
  const [selectedFinish, setSelectedFinish] = useState("");
  const [selectedFelt, setSelectedFelt] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [dealerNote, setDealerNote] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [installationFee, setInstallationFee] = useState("");

  const configs = mockConfigOptions;

  const handleSelectProduct = (config: ProductConfigOptions) => {
    setSelectedProduct(config);
    setSelectedFinish(config.finishes[0]?.id ?? "");
    setSelectedFelt(config.feltColors[0]?.id ?? "");
    setSelectedSize(config.sizes[0] ?? "");
    setSelectedAccessories([]);
    setStep("configure");
  };

  const toggleAccessory = (id: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const pricing = useMemo(() => {
    if (!selectedProduct || !selectedSize) return { dealer: 0, msrp: 0 };
    const baseDealerCost = selectedProduct.dealerCost[selectedSize] ?? 0;
    const baseMsrp = selectedProduct.msrp[selectedSize] ?? 0;
    const accessoryCost = selectedProduct.accessories
      .filter((a) => selectedAccessories.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    return {
      dealer: baseDealerCost + accessoryCost,
      msrp: baseMsrp + Math.round(accessoryCost * 1.6),
    };
  }, [selectedProduct, selectedSize, selectedAccessories]);

  const resetConfigurator = () => {
    setStep("select");
    setSelectedProduct(null);
    setShowQuoteForm(false);
    setCustomerName("");
    setCustomerEmail("");
    setDealerNote("");
    setDeliveryFee("");
    setInstallationFee("");
  };

  /* ─── Product Selection Grid ─── */
  if (step === "select") {
    return (
      <div>
        <p className="section-label mb-6">Select a Product to Configure</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {configs.map((config) => (
            <button
              key={config.productSlug}
              onClick={() => handleSelectProduct(config)}
              className="border border-cloud p-5 text-left hover:border-silver transition-colors duration-300"
            >
              <div className="aspect-square bg-off-white mb-3 flex items-center justify-center">
                <span className="text-silver text-xs">Product Image</span>
              </div>
              <p className="heading-card text-sm">
                {config.productSlug
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              </p>
              <p className="text-[11px] text-body mt-1">
                From ${Object.values(config.msrp)[0]?.toLocaleString()} MSRP
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ─── Configuration View ─── */
  if (!selectedProduct) return null;

  const productName = selectedProduct.productSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div>
      <button
        onClick={resetConfigurator}
        className="metadata text-mid-gray hover:text-primary transition-colors duration-200 mb-6"
      >
        &larr; Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Preview */}
        <div>
          <div className="aspect-[4/3] bg-off-white flex items-center justify-center border border-cloud mb-4">
            <div className="text-center">
              <p className="text-silver text-sm mb-2">Configuration Preview</p>
              <p className="heading-card">{productName}</p>
              <p className="text-xs text-body mt-1">
                {selectedProduct.finishes.find((f) => f.id === selectedFinish)?.name} /{" "}
                {selectedProduct.feltColors.find((f) => f.id === selectedFelt)?.name} /{" "}
                {selectedSize}
              </p>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="border border-cloud p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="section-label">Dealer Cost</span>
              <span className="font-[family-name:var(--font-display)] text-2xl font-light text-primary">
                ${pricing.dealer.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-cloud pt-3">
              <span className="section-label">MSRP</span>
              <span className="font-[family-name:var(--font-display)] text-lg font-light text-mid-gray">
                ${pricing.msrp.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-cloud pt-3 mt-3">
              <span className="section-label">Margin</span>
              <span className="metadata text-primary">
                ${(pricing.msrp - pricing.dealer).toLocaleString()} ({Math.round(((pricing.msrp - pricing.dealer) / pricing.msrp) * 100)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Configuration Options */}
        <div className="space-y-8">
          {/* Size */}
          <div>
            <p className="section-label mb-3">Size</p>
            <div className="flex gap-3">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2 border transition-colors duration-200 ${
                    selectedSize === size
                      ? "border-primary bg-primary text-white"
                      : "border-cloud text-body hover:border-silver"
                  } metadata`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Finish */}
          <SwatchSelector
            label="Wood Finish"
            options={selectedProduct.finishes}
            selected={selectedFinish}
            onSelect={setSelectedFinish}
          />

          {/* Felt Color */}
          <SwatchSelector
            label="Felt Color"
            options={selectedProduct.feltColors}
            selected={selectedFelt}
            onSelect={setSelectedFelt}
          />

          {/* Accessories */}
          <div>
            <p className="section-label mb-3">Accessories</p>
            <div className="space-y-2">
              {selectedProduct.accessories.map((acc) => (
                <label
                  key={acc.id}
                  className="flex items-center gap-3 p-3 border border-cloud hover:border-silver transition-colors duration-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedAccessories.includes(acc.id)}
                    onChange={() => toggleAccessory(acc.id)}
                    className="w-4 h-4 accent-[#231f20]"
                  />
                  <span className="text-xs text-primary flex-1">{acc.name}</span>
                  <span className="text-xs text-body">+${acc.price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowQuoteForm(true)}
              className="btn-primary"
            >
              Generate Customer Quote
            </button>
            <button className="btn-outline">
              Add to Order
            </button>
          </div>
        </div>
      </div>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-card text-lg">Generate Customer Quote</h3>
              <button
                onClick={() => setShowQuoteForm(false)}
                className="text-mid-gray hover:text-primary text-xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="border border-cloud p-4 mb-4">
                <p className="metadata mb-2">Configuration</p>
                <p className="text-xs text-primary">{productName} / {selectedSize}</p>
                <p className="text-xs text-body">
                  {selectedProduct.finishes.find((f) => f.id === selectedFinish)?.name} /{" "}
                  {selectedProduct.feltColors.find((f) => f.id === selectedFelt)?.name}
                </p>
                {selectedAccessories.length > 0 && (
                  <p className="text-xs text-body mt-1">
                    + {selectedProduct.accessories
                      .filter((a) => selectedAccessories.includes(a.id))
                      .map((a) => a.name)
                      .join(", ")}
                  </p>
                )}
                <p className="metadata mt-2">MSRP: ${pricing.msrp.toLocaleString()}</p>
              </div>

              <div>
                <label className="section-label block mb-1">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="input-modern"
                  placeholder="Customer full name"
                />
              </div>
              <div>
                <label className="section-label block mb-1">Customer Email (optional)</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="input-modern"
                  placeholder="customer@email.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="section-label block mb-1">Delivery Fee</label>
                  <input
                    type="number"
                    value={deliveryFee}
                    onChange={(e) => setDeliveryFee(e.target.value)}
                    className="input-modern"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="section-label block mb-1">Installation Fee</label>
                  <input
                    type="number"
                    value={installationFee}
                    onChange={(e) => setInstallationFee(e.target.value)}
                    className="input-modern"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="section-label block mb-1">Note to Customer (optional)</label>
                <textarea
                  value={dealerNote}
                  onChange={(e) => setDealerNote(e.target.value)}
                  className="input-modern min-h-[80px] resize-y"
                  placeholder="Personalized message for the quote..."
                />
              </div>

              {/* Quote Total */}
              <div className="border-t border-cloud pt-4 mt-4">
                <div className="flex justify-between text-xs text-body mb-1">
                  <span>Product MSRP</span>
                  <span>${pricing.msrp.toLocaleString()}</span>
                </div>
                {deliveryFee && Number(deliveryFee) > 0 && (
                  <div className="flex justify-between text-xs text-body mb-1">
                    <span>Delivery</span>
                    <span>${Number(deliveryFee).toLocaleString()}</span>
                  </div>
                )}
                {installationFee && Number(installationFee) > 0 && (
                  <div className="flex justify-between text-xs text-body mb-1">
                    <span>Installation</span>
                    <span>${Number(installationFee).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-cloud mt-2">
                  <span className="metadata">Quote Total</span>
                  <span className="font-[family-name:var(--font-display)] text-lg text-primary">
                    ${(
                      pricing.msrp +
                      (Number(deliveryFee) || 0) +
                      (Number(installationFee) || 0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="btn-primary flex-1">
                  Download PDF Quote
                </button>
                <button className="btn-outline flex-1">
                  Email to Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
