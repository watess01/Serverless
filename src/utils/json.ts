// function to ensure a json object is always an array
export function ensureIsArray<T>(
  json: Array<T> | T | null | undefined
): Array<T> {
  console.log(`\nensureIsArray..json: ${JSON.stringify(json)}`);
  if (json && !Array.isArray(json)) {
    json = [json];
  } else if (!json) {
    json = [];
  }
  return json as Array<T>;
}
