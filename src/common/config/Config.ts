import { Env } from "../types/Env";

class Config {
  constructor() {}

  public getEnv(): Env {
    return {
      MANGO_SCRAPER_API_ENDPOINT: "https://mango-scraper-api.vercel.app",
      MANGO_BD_API_ENDPOINT: "https://mango-bd-api.vercel.app/",
      MANGO_WEB_APP_ENDPOINT: "https://bigstones.fr/mango/",
      // MANGO_SCRAPER_API_ENDPOINT:
      //   process.env.EXPO_PUBLIC_MANGO_SCRAPER_API_ENDPOINT!,
      // MANGO_BD_API_ENDP OINT: "http://192.168.168.167:3001", //process.env.EXPO_PUBLIC_MANGO_BD_API_ENDPOINT!,
      // MANGO_WEB_APP_ENDPOINT: process.env.EXPO_PUBLIC_MANGO_WEB_APP_ENDPOINT!,
    };
  }
}

export default new Config();
