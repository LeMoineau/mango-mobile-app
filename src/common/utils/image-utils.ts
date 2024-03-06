import axios from "axios";

export namespace ImageUtils {
  // TO DECODE IMAGE VIEWER FROM MANGAPLUS -> IN CLIENT SIDE
  export async function getBlobImageURL(
    image_url: string,
    encryption_key: string
  ) {
    return new Promise(async (resolve, reject) => {
      axios
        .get(image_url, { responseType: "arraybuffer" })
        .then((res) => {
          const key = hex2Bin(encryption_key);
          const arr = new Uint8Array(res.data);
          if (key) {
            for (var a = key.length, s = 0; s < arr.length; s++)
              arr[s] ^= key[s % a];
          }
          const blob = new Blob([arr], {
            type: "image/jpeg",
          });
          const fileReaderInstance = new FileReader();
          fileReaderInstance.readAsDataURL(blob);
          fileReaderInstance.onload = () => {
            const base64DataImage = fileReaderInstance.result;
            console.log("salut");
            resolve(base64DataImage);
          };
        })
        .catch((err) => {
          console.error("We can't load file: " + image_url);
          reject(err);
        });
    });
  }
  export function hex2Bin(hex: string) {
    return new Uint8Array(hex.match(/.{1,2}/g)!.map((t) => parseInt(t, 16)));
  }
}
