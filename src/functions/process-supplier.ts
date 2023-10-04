import { mapSupplierCharacteristics } from "../mapping/mapper";
import { Characteristic } from "../model/data-mapping";
import { ensureIsArray } from "../utils/json";

export async function processSupplier(event: any): Promise<any> {
  // TODO return type should not be any
  const supplierId = event.pathParameters?.supplier;
  const queryCharacteristics = event.queryStringParameters
    ?.characteristics as string;

  if (queryCharacteristics) {
    console.log(`\nProcess Supplier..1: ${queryCharacteristics}`);
    const characteristics = ensureIsArray(
      JSON.parse(queryCharacteristics)
    ) as Characteristic[];
    console.log(`\nProcess Supplier..2: ${JSON.stringify(characteristics)}`);

    const retCharacteristics = await mapSupplierCharacteristics(
      characteristics,
      supplierId
    );

    console.log(
      `\nProcess Supplier..ret:${JSON.stringify(retCharacteristics)}`
    );

    if (retCharacteristics) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Supplier Characteristics",
          characteristics: retCharacteristics, // TODO this is rather returning all mappings . If it were a many:many, it would need to be sequenced
        }),
      };
    } else {
      return {
        statusCode: 404,
        body: {
          message: "Mapping not found",
        },
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Bad Request",
      }),
    };
  }
}
