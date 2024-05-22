import { useSettingsStore } from "../../../../common/store/settings.store";
import { AllIconNames } from "../../../../common/types/IconName";
import { ChapterReaderDisplayMode } from "../../../../common/types/settings/SettingsValues";

const useChapterReaderMenu = () => {
  const { get } = useSettingsStore();
  const possibleValues: {
    [key in ChapterReaderDisplayMode]: { icon: AllIconNames; label: string };
  } = {
    stripe: { icon: "panorama-vertical", label: "Stripe" },
    singlePage: { icon: "book-open-variant", label: "Single Page" },
  };

  const getCurrentChapterReaderInfos = (): {
    icon: AllIconNames;
    label: string;
  } => {
    return possibleValues[
      get("chapterReaderDisplayMode") as ChapterReaderDisplayMode
    ];
  };

  const getNextChapterReaderDisplayMode = (): ChapterReaderDisplayMode => {
    const nbPossibleValues = Object.keys(possibleValues).length;
    const newIndex =
      (Object.keys(possibleValues).findIndex(
        (v) => v === get("chapterReaderDisplayMode")
      ) +
        1) %
      nbPossibleValues;

    return Object.keys(possibleValues)[newIndex] as ChapterReaderDisplayMode;
  };

  return { getCurrentChapterReaderInfos, getNextChapterReaderDisplayMode };
};

export default useChapterReaderMenu;
