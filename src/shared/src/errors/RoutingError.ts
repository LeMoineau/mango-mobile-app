export default class RoutingError extends Error {
  constructor(message?: string) {
    super(
      `a routing error occured during request parsing ${
        message && `: ${message}`
      }`
    );
  }
}
