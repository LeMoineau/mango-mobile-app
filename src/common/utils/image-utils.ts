import axios from "axios";

export namespace ImageUtils {
  // TO DECODE IMAGE VIEWER FROM MANGAPLUS -> IN CLIENT SIDE
  export async function getBlobImageURL(
    image_url: string,
    encryption_key: string
  ) {
    return new Promise((t, n) => {
      var r = hex2Bin(encryption_key),
        i = new XMLHttpRequest();
      (i.onreadystatechange = function () {
        if (4 === i.readyState)
          if (200 === i.status) {
            var o = new Uint8Array(i.response);
            if (r)
              for (var a = r.length, s = 0; s < o.length; s++) o[s] ^= r[s % a];
            // const fileReaderInstance = new FileReader();
            // fileReaderInstance.readAsDataURL(
            //   new Blob([o], { type: "images/jpeg" })
            // );
            // fileReaderInstance.onload = () => {
            //   const base64DataImage = fileReaderInstance.result;
            //   t(base64DataImage);
            // };
            var u = URL.createObjectURL(
              new Blob([o], {
                type: "image/jpeg",
              })
            );
            t(u);
          } else n("We can't load file: " + image_url + i);
      }),
        i.open("GET", image_url, !0),
        (i.responseType = "arraybuffer"),
        i.send();
    });
    return new Promise(async (resolve, reject) => {
      axios
        .get(image_url, { responseType: "arraybuffer" })
        .then((res) => {
          const key = hex2Bin(encryption_key);
          const arr = new Uint8Array(res.data);
          const keyLength = key.length;
          console.log("key length", keyLength);
          if (key) {
            for (let s = 0; s < arr.length; s++) arr[s] ^= key[s % keyLength];
          }
          const blob = new Blob([arr], { type: "images/jpeg" });
          console.log(blob.size, blob.type);
          const fileReaderInstance = new FileReader();
          fileReaderInstance.readAsDataURL(
            new Blob([arr], { type: "images/jpeg" })
          );
          fileReaderInstance.onload = () => {
            const base64DataImage = fileReaderInstance.result;
            resolve(base64DataImage);
          };
        })
        .catch((err) => {
          console.error("We can't load file: " + image_url);
          reject(err);
        });
    });
  }
  export function hex2Bin(t: string) {
    return new Uint8Array(
      t.match(/.{1,2}/g)!.map(function (t) {
        return parseInt(t, 16);
      })
    );
    return new Uint8Array(hex.match(/.{1,2}/g)!.map((t) => parseInt(t, 16)));
  }
}
const getBlobImageURL = (src, encryption_key) => {
  return new Promise((t, n) => {
    var r = hex2Bin(encryption_key),
      i = new XMLHttpRequest();
    (i.onreadystatechange = function () {
      if (4 === i.readyState)
        if (200 === i.status) {
          var o = new Uint8Array(i.response);
          if (r)
            for (var a = r.length, s = 0; s < o.length; s++) o[s] ^= r[s % a];
          var u = URL.createObjectURL(
            new Blob([o], {
              type: "image/jpeg",
            })
          );
          t(u);
        } else n("We can't load file: " + src + i);
    }),
      i.open("GET", src, !0),
      (i.responseType = "arraybuffer"),
      i.send();
  });
};

const hex2Bin = function (t) {
  return new Uint8Array(
    t.match(/.{1,2}/g).map(function (t) {
      return parseInt(t, 16);
    })
  );
};

new Promise((e, n) => {
  getBlobImageURL(
    "https://mangaplus.shueisha.co.jp/drm/title/700018/chapter/7001125/manga_page/high/16387757.jpg?key=c1c45914b19648c4817b0e4e49a5338c&duration=86400",
    "043be0f5fe43e62a64331c4961946dce9bdae79e0e9365f12a93de62e81ff2a6af4a71446deb0389b38b7fee59b9bb251fbabacbaa7a9b24c40d6a97e0c65996"
  ).then((r) => {
    let image = new Image();
    document.querySelector("#coucou").appendChild(image);
    image.classList.add("zao-image");
    image.onload = function () {
      e(r);
    };

    image.src = r;
    image.onerror = n;
  });
}).then((res) => console.log(res));
