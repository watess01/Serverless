import { getBySupplier } from "../data/dynamodb";
import { CharacteristicsMapping } from "../model/data-mapping";

interface Characteristic {
  name: string;
  value: string;
}
type CharacteristicsMapper = (
  characteristics: Characteristic[],
  supplier: string
) => Promise<Characteristic[]>;

const mapGatewayCharacteristics: CharacteristicsMapper = async (
  characteristics,
  supplier
) => {
  // TODO
  // this function returns supplier characteristics
  // create prototype return value
  const mappedCharacteristics: Characteristic[] = [];
  // iterate over characteristics
  for (const characteristic of characteristics) {
    // create prototype mapping
    const mapping: Characteristic = {
      name: characteristic.name,
      value: characteristic.value,
    };
    // push mapping to return value
    mappedCharacteristics.push(mapping);
  }
  return mappedCharacteristics;
};
export const mapSupplierCharacteristics: CharacteristicsMapper = async (
  characteristics,
  supplier
) => {
  console.log(`\nProcess Supplier..ret:${JSON.stringify(characteristics)}`);
  console.log(`\nProcess Supplier..ret:${supplier}`);
  const mappedCharacteristics: Characteristic[] = [];

  // get supplier mapping
  const ret = await getBySupplier(supplier);

  if (ret && ret.mapping) {
    const mapping = JSON.parse(ret.mapping);
    for (const from of characteristics) {
      console.log(`\nProcess Supplier.. check:${JSON.stringify(from)}...`);
      for (const mapped of mapping.from) {
        console.log(`...against:${JSON.stringify(mapped)}`);
        if (mapped.name === from.name && mapped.value === from.value) {
          console.log(`...matched:${JSON.stringify(mapped)}`);
          mappedCharacteristics.push(mapped);
        }
      }
    }
  }
  return mappedCharacteristics;
};
