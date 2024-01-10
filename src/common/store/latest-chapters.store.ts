import axios, { AxiosInstance } from "axios";
import { create } from "zustand";
import IntersiteChapter from "../types/IntersiteChapter";

const LATEST_CHAPTER_API_URL =
  process.env.EXPO_PUBLIC_MANGO_SCRAPER_API_ENDPOINT;

interface LatestChaptersStoreState {
  chapters: IntersiteChapter[];
  axiosInstance: AxiosInstance;
  loaded: boolean;
  refresh: () => void;
  fetch: () => void;
  getAll: () => IntersiteChapter[];
}

export const useLatestChaptersStore = create<LatestChaptersStoreState>()(
  (set, get) => {
    const axiosInstance = axios.create({
      baseURL: LATEST_CHAPTER_API_URL,
    });

    const refresh = () => {
      set({ loaded: false });
    };

    const fetch = async () => {
      if (!get().loaded) {
        set({ loaded: true });
        await axiosInstance
          .get("/chapters")
          .then((res) => set({ chapters: res.data }))
          .catch(() => set({ loaded: false }));
      }
    };

    const getAll = () => {
      return get().chapters;
    };

    return {
      chapters: [],
      axiosInstance: axiosInstance,
      loaded: false,
      refresh: refresh,
      fetch: fetch,
      getAll: getAll,
    };
  }
);
