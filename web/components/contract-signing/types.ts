export type ContractParty = {
  id: string;
  name: string;
  role: 'user' | 'vendor' | 'witness';
  status: 'pending' | 'signed' | 'rejected';
  signedAt?: Date;
};

export type SigningMarker = {
  id: string;
  type: 'signature' | 'initial' | 'date';
  partyId: string;
  position: number; // Scroll position percentage
  label: string;
  required: boolean;
};

export type Contract = {
  id: string;
  title: string;
  content: string;
  parties: ContractParty[];
  markers: SigningMarker[];
  createdAt: Date;
  expiresAt: Date;
};
