import { NestedApplication } from "../interfaces/Application";

export function mapApplicationToJson(data: any): NestedApplication {
  return {
    id: data.id,
    first_name: data.first_name,
    middle_name: data.middle_name,
    last_name: data.last_name,
    age: data.age,
    sex: data.sex,
    date_of_birth: data.date_of_birth,
    license_number: data.license_number,
    status: data.status,
    height: data.height,
    address: {
      unit_number: data.unit_number || null, // Map empty strings to null
      street_number: data.street_number,
      street_name: data.street_name,
      po_box: data.po_box || null, // Map empty strings to null
      city: data.city,
      province: data.province,
      postal_code: data.postal_code,
    },
  };
}