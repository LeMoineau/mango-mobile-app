import { encode } from "base-64";

export namespace ImageUtils {
  export function arrayBufferToBase64(buffer: Buffer) {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return encode(binary);
  }

  export function getImgExtFromURL(url: string): string {
    const res = url.match(/([\w-]+)(\.[\w-]+)+(?!.*\/)/gm);
    if (res && res?.length > 0 && res[0].includes(".")) {
      const ext = res[0].split(".")[1];
      if (ext === "jpg") {
        return "jpeg";
      }
      if (ext === "xml" || ext === "svg") {
        return "svg+xml";
      }
      return ext;
    }
    return "jpeg";
  }

  export function generateBase64UrlFromBuffer(
    url: string,
    buffer: Buffer
  ): string {
    return `data:image/${ImageUtils.getImgExtFromURL(
      url
    )};base64,${ImageUtils.arrayBufferToBase64(buffer)}`;
  }
}
