export interface Dealer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  website?: string;
  models: string[];
  hasShowroom: boolean;
  isCertified: boolean;
  territory?: string;
}

export interface DealerWithDistance extends Dealer {
  distance: number;
}

export interface DealerInquiryPayload {
  dealerId: string;
  dealerName: string;
  model: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  message: string | null;
  timestamp: string;
}
