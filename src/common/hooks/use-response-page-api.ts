import { useRef, useState } from "react";
import useApi from "../../shared/src/hooks/use-api";
import { ResponsePage } from "../../shared/src/types/responses/ResponsePage";
import { Identified } from "../../shared/src/types/attributes/Identified";

const useResponsePageApi = <T>(
  baseURL: string,
  defaultProps?: {
    defaultPage?: number;
    defaultLimit?: number;
  }
) => {
  const page = useRef(defaultProps?.defaultPage ?? 1);
  const limit = useRef(defaultProps?.defaultLimit ?? 20);
  const [elements, setElements] = useState<T[]>([]);
  const { fetch } = useApi(baseURL);
  const previousEndpoint = useRef<string | undefined>();
  const previousParams = useRef<any>();
  const [fullyLoaded, setFullyLoaded] = useState(false);

  const _fetch = async (
    endpoint: string,
    props?: {
      page?: number;
      limit?: number;
      notIncrementPage?: boolean;
      resetElementsIfSuceed?: boolean;
      saveParamsStateForNextFetching?: boolean;
      params?: any;
    }
  ): Promise<ResponsePage<T> | undefined> => {
    if (previousEndpoint.current !== endpoint) {
      previousEndpoint.current = endpoint;
    }
    if (props && props.saveParamsStateForNextFetching) {
      previousParams.current = props.params;
    }
    console.log(
      JSON.stringify({
        forceRefresh: true,
        config: {
          params: {
            page: props?.page ?? page.current,
            limit: props?.limit ?? limit.current,
            ...props?.params,
            ...previousParams.current,
          },
        },
      })
    );
    return await fetch<ResponsePage<T>>(previousEndpoint.current, {
      forceRefresh: true,
      config: {
        params: {
          page: props?.page ?? page.current,
          limit: props?.limit ?? limit.current,
          ...props?.params,
          ...previousParams.current,
        },
      },
    })
      .then((res) => {
        if (!res || res.elements.length <= 0) {
          setFullyLoaded(true);
          return undefined;
        }
        setElements([
          ...(props?.resetElementsIfSuceed ? [] : elements),
          ...res.elements,
        ]);
        if (props?.notIncrementPage) return res;
        page.current = props?.page ? props.page + 1 : page.current + 1;
        return res;
      })
      .catch((err) => {
        console.error(err);
        return undefined;
      });
  };

  const reset = () => {
    setElements([]);
    setFullyLoaded(false);
    page.current = 1;
  };

  const refresh = async () => {
    if (!previousEndpoint.current) return;
    await _fetch(previousEndpoint.current, {
      page: 1,
      resetElementsIfSuceed: true,
    });
  };

  return {
    page: page.current,
    elements,
    fullyLoaded,
    fetch: _fetch,
    reset,
    refresh,
  };
};

export default useResponsePageApi;
