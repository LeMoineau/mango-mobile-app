import axios, { AxiosInstance } from "axios";
import Config from "react-native-config";
import { create } from "zustand";
import IntersiteChapter from "../types/IntersiteChapter";

interface BearState {
  latestChapters: IntersiteChapter[];
  axiosInstance: AxiosInstance;
  loading: boolean;
  fetchLatestChapters: () => void;
}

export const useMangoScraperApiStore = create<BearState>()((set) => {
  const axiosInstance = axios.create({
    baseURL: "https://mango-scraper-api.vercel.app",
  });
  console.log(Config);

  const fetchLatestChapters = async () => {
    set({ loading: true });
    console.log(axiosInstance.defaults.baseURL);
    const chapters = await axiosInstance
      .get("/chapters")
      .then((res) => res.data);
    set({
      loading: false,
      latestChapters: chapters ?? [],
    });
  };

  fetchLatestChapters();

  return {
    latestChapters: [],
    axiosInstance: axiosInstance,
    loading: true,
    fetchLatestChapters: fetchLatestChapters,
  };
});
