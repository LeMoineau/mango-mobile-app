import { Lang } from "../../shared/src/types/primitives/Identifiers";
import localeEmoji from "locale-emoji";

export namespace LanguagesUtils {
  export function getFlagForLang(lang: Lang): string | undefined {
    const res = localeEmoji(lang);
    if (res.length > 0) return res;
    return;
  }

  export function getNameForLang(lang: Lang) {}
}
