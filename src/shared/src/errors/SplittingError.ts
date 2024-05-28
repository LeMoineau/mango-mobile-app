export default class SplittingError extends Error {
  constructor(src: string, splitter: string) {
    super(
      `a splitting error occured for string "${src}" with splitter "${splitter}"`
    );
  }
}
