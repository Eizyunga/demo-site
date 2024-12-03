export interface FolioBody {
  name: string;
  email?: string;
  folioData: Folio[];
}

export interface Folio {
  folioNumber: number;
  name: string;
  itemDetails: FolioItem[];
}

export interface FolioItem {
  itemName: string;
  itemFee: number | string;
}

export enum FolioState {
  VIEW = 'view',
  CREATE = 'create',
}
