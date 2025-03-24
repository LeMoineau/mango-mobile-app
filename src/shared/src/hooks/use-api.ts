import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { JsonObject } from "../types/primitives/jsonObject";

const useApi = <DATA>(baseURL: string) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const axiosInstance = axios.create({
    baseURL,
  });

  useEffect(() => {
    if (data) {
      setLoaded(true);
      setLoading(false);
    }
  }, [data]);

  const refresh = () => {
    setLoaded(false);
    setLoading(false);
    setData(undefined);
  };

  const fetch = async <T extends DATA>(
    endpoint: string,
    options?: {
      forceRefresh?: boolean;
      config?: AxiosRequestConfig;
    }
  ): Promise<T | undefined> => {
    if (loaded && !options?.forceRefresh) {
      return data;
    }
    setLoading(true);
    return await axiosInstance
      .get(endpoint, options?.config)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        return;
      });
  };

  const post = async <T extends DATA>(
    endpoint: string,
    data: JsonObject,
    options?: {
      config?: AxiosRequestConfig;
    }
  ): Promise<T | undefined> => {
    setLoading(true);
    return await axiosInstance
      .post(endpoint, data, options?.config)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        return;
      });
  };

  const get = (): DATA | undefined => {
    return data;
  };

  return {
    loaded,
    loading,
    refresh,
    fetch,
    post,
    get,
  };
};

export default useApi;
