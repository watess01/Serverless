import type {
  DynamoDBClientConfig,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDB } from "aws-sdk";

const dynamo = new DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import type {
  DeleteCommandInput,
  GetCommandInput,
  GetCommandOutput,
  PutCommandInput,
  QueryCommandInput,
  QueryCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { DataMapping } from "../model/data-mapping";

export abstract class DynamoDb {
  static dynamodb: DynamoDBDocumentClient | undefined;
  static tableName: string = process.env.DYNAMODB_TABLE;

  /**
   * Handles the put request to DynamoDB - v3
   *
   * @static
   * @param {DynamoDB.DocumentClient.PutItemInput} params
   * @return {*}
   * @memberof DynamoDbService
   */
  static async put(params: PutCommandInput) {
    const dynamodb = await this.init();
    const command = new PutCommand(params);
    return await dynamodb.send(command);
  }

  /**
   * Handles the get request to DynamoDB - v3
   *
   * @static
   * @param {GetCommandInput} params
   * @return {*}
   * @memberof DynamoDb
   */
  static async get(params: GetCommandInput) {
    try {
      const dynamodb = await this.init();
      const command = new GetCommand(params);
      const ret = await dynamodb.send(command);
      return ret;
    } catch (err: unknown) {
      console.log(`caught error`);
      console.log(`get error ${(err as Error).message}`);
      throw err;
    }
  }

  /**
   * Handles the delete request from DynamoDB - v3
   *
   * @static
   * @param {DynamoDB.DocumentClient.DeleteCommandInput} params
   * @return {*}
   * @memberof DynamoDbService
   */
  static async delete(params: DeleteCommandInput) {
    const dynamodb = await this.init();
    const command = new DeleteCommand(params);
    return await dynamodb.send(command);
  }

  /**
   * Handles the scan request to DynamoDB - v3
   *
   * @static
   * @param {QueryCommandInput} params
   * @return {*}
   * @memberof DynamoDb
   */
  static async query(params: QueryCommandInput) {
    const dynamodb = await this.init();
    const command = new QueryCommand(params);
    return await dynamodb.send(command);
  }

  /**
   * Handles the scan request to DynamoDB - v3
   *
   * @static
   * @param {QueryCommandInput} params
   * @return {*}
   * @memberof DynamoDb
   */
  static async scan(params: ScanCommandInput) {
    const dynamodb = await this.init();
    const command = new ScanCommand(params);
    return await dynamodb.send(command);
  }
  /**
   * Initialises DynamoDB
   *
   * @static
   * @memberof DynamoDbService
   */
  static async init() {
    if (!this.dynamodb) {
      const configParams: DynamoDBClientConfig = {
        region: process.env.AWS_REGION,
        ...(process.env.DYNAMODB_URL && { endpoint: process.env.DYNAMODB_URL }),
      };
      console.log(`dynamoDb configParams ${JSON.stringify(configParams)}`);
      const client = new DynamoDBClient(configParams);
      // console.log(`dynamoDb client ${JSON.stringify(client)}`);
      this.dynamodb = DynamoDBDocumentClient.from(client);
    }
    return this.dynamodb;
  }

  static async db(): Promise<DynamoDBClient> {
    const dynamodb = await this.init();
    return dynamodb;
  }
}

export const getParams = (
  supplier: string
): DynamoDB.DocumentClient.GetItemInput => {
  return {
    TableName: DynamoDb.tableName,
    Key: { supplier },
    AttributesToGet: ["supplier", "mapping"],
  };
};

export async function getBySupplier(
  supplier: string
): Promise<DataMapping | undefined> {
  try {
    const params = getParams(supplier);

    const data = await DynamoDb.get(params);

    console.log(`\n getBySupplier data ${JSON.stringify(data)}`);

    const item = data?.Item;
    if (item) {
      console.log(`\n getBySupplier item ${JSON.stringify(item)}`);
      return {
        supplier: item.supplier,
        mapping: item.mapping,
      } as DataMapping;
    } else {
      return undefined;
    }
  } catch (err: unknown) {
    throw new Error(`Error getting supplier data: ${(err as Error).message}`);
  }
}
