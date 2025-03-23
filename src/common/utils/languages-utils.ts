import { Lang } from "../../shared/src/types/primitives/Identifiers";
import localeEmoji from "locale-emoji";
import locale from "locale-codes";

export namespace LanguagesUtils {
  export function getFlagForLang(lang: Lang): string | undefined {
    const res = localeEmoji(lang);
    if (res.length > 0) return res;
    return;
  }

  export function getNameForLang(lang: Lang): string | undefined {
    const loc = locale.getByTag(lang);
    if (loc) return loc.name;
    return;
  }

  /**
   * Return name and flag from a language code
   * @param lang language code
   * @returns "{name} {flag}" if both defined, "Unknown {flag}" if only {flag} defined,
   * "{name} {flag?}" if {name} defined and undefined if both undefined
   */
  export function getFlagAndNameForLang(lang: Lang): string | undefined {
    const flag = getFlagForLang(lang);
    const name = getNameForLang(lang);
    if (!name) {
      if (!flag) return;
      else return "Unknown " + flag;
    }
    return name + (flag ? " " + flag : "");
  }
}
