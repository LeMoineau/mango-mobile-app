import RoutingError from "../errors/RoutingError";

export namespace RoutingUtils {
  /**
   * Convert a query param to string array of undefined if not defined
   * @param queryParam targeted query param
   * @throws RoutingError if cannot convert query param to array
   * @returns the string array or undefined if query param not defined
   */
  export function convertQueryParamToArray(
    queryParam: any
  ): string[] | undefined {
    try {
      if (queryParam) {
        let srcs: string[] = [];
        if (Array.isArray(queryParam)) {
          srcs = queryParam;
        } else if (typeof queryParam === "string") {
          srcs = [queryParam];
        } else {
          srcs = JSON.parse(queryParam as string);
        }
        return srcs;
      }
      return;
    } catch {
      throw new RoutingError(`cannot convert "${queryParam}" to array`);
    }
  }

  /**
   * Convert a query param to string or undefined if not defined
   * @param queryParam targeted query param
   * @throws RoutingError if query param is not a string
   * @returns the string or undefined if query param not defined
   */
  export function convertQueryParamToString(
    queryParam: any
  ): string | undefined {
    if (!queryParam) {
      return;
    }
    if (typeof queryParam === "string") {
      return queryParam as string;
    }
    throw new RoutingError(`"${queryParam}" is not a string`);
  }

  /**
   * Convert a query param to boolean or undefined if not defined
   * @param queryParam targeted query param
   * @throws RoutingError if query param is not a boolean
   * @returns the boolean or undefined if query param not defined
   */
  export function convertQueryParamToBoolean(
    queryParam: any
  ): boolean | undefined {
    if (!queryParam) {
      return;
    }
    if (typeof queryParam === "boolean") {
      return queryParam;
    }
    if (typeof queryParam === "string") {
      return queryParam.toLowerCase() === "true";
    }
    throw new RoutingError(`"${queryParam}" is not a boolean`);
  }

  /**
   * Convert a query param to number or undefined if not defined
   * @param queryParam targeted query param
   * @throws RoutingError if query param is not a boolean
   * @returns the number or undefined if query param not defined
   */
  export function convertQueryParamToNumber(
    queryParam: any
  ): number | undefined {
    try {
      const res = Number(queryParam);
      return isNaN(res) ? undefined : res;
    } catch (err) {
      throw new RoutingError(`"${queryParam}" is not a number`);
    }
  }

  export function tryCatchAndPrint(
    tryCallback: () => void,
    catchCallback: (err: any) => void,
    dontLogError?: boolean
  ) {
    try {
      tryCallback();
    } catch (error: any) {
      if (!dontLogError) console.error(error);
      catchCallback(error);
    }
  }
}
