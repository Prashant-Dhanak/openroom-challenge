import { SexEnum } from "../enums/SexEnum";
import { StatusEnum } from "../enums/StatusEnum";
import { Application } from "../interfaces/Application";

export function mapJsonToApplication(data: any): Application {
  return {
    id: data.id,
    first_name: data.first_name || '', // Default to an empty string
    middle_name: data.middle_name || '', // Default to an empty string
    last_name: data.last_name || '',
    age: data.age ?? 0, // Default to 0 for numbers
    height: data.height ?? 0,
    sex: data.sex as SexEnum, // Cast to SexEnum
    date_of_birth: data.date_of_birth || '',
    license_number: data.license_number || '',
    status: data.status as StatusEnum, // Cast to StatusEnum

    // Flattened Address Fields
    unit_number: data.address?.unit_number || '',
    street_number: data.address?.street_number ?? 0,
    street_name: data.address?.street_name || '',
    po_box: data.address?.po_box || '',
    city: data.address?.city || '',
    province: data.address?.province || '',
    postal_code: data.address?.postal_code || '',
  };
}