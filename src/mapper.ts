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
const mapSupplierCharacteristics: CharacteristicsMapper = async (
  characteristics,
  supplier
) => {
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
