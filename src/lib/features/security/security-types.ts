export interface IpBlock {
  _id: string;
  id?: string;
  address: string;
  reason: string;
  enabled: boolean;
  expiresAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIpBlockInput {
  address: string;
  reason: string;
  enabled?: boolean;
  expiresAt?: string;
}
