import { useEffect } from "react";
import { useSettingsStore } from "../../../common/store/settings.store";
import useApi from "../../../shared/src/hooks/use-api";
import { ApiSettings } from "../../../shared/src/types/config/ApiSettings";
import Config from "../../../common/config/Config";
import {
  Lang,
  SourceName,
} from "../../../shared/src/types/primitives/Identifiers";

export default function useSettingsPage() {
  const { get, set } = useSettingsStore();
  const {
    fetch,
    get: getApiSettings,
    loading,
  } = useApi<ApiSettings>(Config.getEnv().MANGO_BD_API_ENDPOINT);

  const srcsFromServDifferentFromStored = (scrapersOnServ: SourceName[]) => {
    return scrapersOnServ.filter(
      (src) => !(get("srcs") as SourceName[]).find((s) => s === src)
    );
  };

  const langsFromServDifferentFromStored = (langsOnServ: Lang[]) => {
    return langsOnServ.filter(
      (lang) => !(get("langs") as Lang[]).find((l) => l === lang)
    );
  };

  useEffect(() => {
    fetch("/settings").then((res) => {
      console.log("api res", res);
      if (res) {
        const newSrcs = srcsFromServDifferentFromStored(res.scrapersEnabled);
        if (newSrcs.length > 0) {
          set("srcs", [...(get("srcs") as SourceName[]), ...newSrcs]);
        }
        const newLangs = langsFromServDifferentFromStored(
          res.languagesSupported
        );
        if (newLangs.length > 0) {
          set("langs", [...(get("langs") as Lang[]), ...newLangs]);
        }
      }
    });
  }, []);

  return {
    apiSettings: getApiSettings(),
    apiLoading: loading,
  };
}
