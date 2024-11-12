import { SexEnum } from "../enums/SexEnum";
import { StatusEnum } from "../enums/StatusEnum";

// Unified Application Interface
export interface Application {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  age?: number;
  sex?: SexEnum;
  date_of_birth: string; // Dates are often handled as strings in TypeScript, assuming ISO format
  license_number?: string;
  status: StatusEnum;
  height?: number;
  
  unit_number? : string;
  street_number? : number;
  street_name? : string;
  po_box? : string;
  city? : string;
  province? : string;
  postal_code? : string;
}

export interface NestedApplication {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  age: number;
  sex: string;
  date_of_birth: string;
  license_number: string;
  status: string;
  height: number;
  address: {
    unit_number: string | null;
    street_number: number;
    street_name: string;
    po_box: string | null;
    city: string;
    province: string;
    postal_code: string;
  };
}