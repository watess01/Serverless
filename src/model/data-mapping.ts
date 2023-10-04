export interface SupplierMapping {
  supplier: string;
  mapping: string;
}

export interface Characteristic {
  name: string;
  value: string;
}

export interface CharacteristicsMapping {
  from: Characteristic[];
  to: Characteristic[];
}

export interface DataMapping {
  supplier: string;
  mapping: string;
}
