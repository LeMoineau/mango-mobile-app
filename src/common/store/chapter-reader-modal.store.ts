import { create } from "zustand";
import {
  ChapterId,
  FormattedName,
  SourceName,
} from "@shared/types/primitives/id";
import ChapterViewer from "@shared/types/chapterViewer";

interface ChapterReaderModalState {
  chapterAlreadyOpen: {
    [formattedName: FormattedName]: {
      [src in SourceName]?: { [chapterId: ChapterId]: ChapterViewer };
    };
  };
  modalOpened: boolean;
  currentChapterOpen: ChapterViewer | undefined;
  open: (
    formattedName: FormattedName,
    src: SourceName,
    chapterId: ChapterId,
    fetcher: (
      endpoint: string,
      forceRefresh?: boolean | undefined
    ) => Promise<ChapterViewer | undefined>
  ) => void;
  close: () => void;
}

export const useChapterReaderModal = create<ChapterReaderModalState>()(
  (set, get) => {
    const open = async (
      formattedName: FormattedName,
      src: SourceName,
      chapterId: ChapterId,
      fetcher: (
        endpoint: string,
        forceRefresh?: boolean | undefined
      ) => Promise<ChapterViewer | undefined>
    ) => {
      set({ currentChapterOpen: undefined, modalOpened: true });
      if (_hasAlreadyBeenOpened(formattedName, src, chapterId)) {
        set({
          currentChapterOpen: _loadPreviousChapter(
            formattedName,
            src,
            chapterId
          ),
        });
        return;
      }
      const chapter = await fetcher(
        `/mangas/${formattedName}/chapters/${src}/${chapterId}`,
        true
      );
      if (chapter) {
        set({ currentChapterOpen: chapter });
        _saveChapter(formattedName, src, chapterId, chapter);
      }
    };

    const close = () => {
      set({ modalOpened: false });
    };

    const _hasAlreadyBeenOpened = (
      formattedName: FormattedName,
      src: SourceName,
      chapterId: ChapterId
    ): boolean => {
      return (
        get().chapterAlreadyOpen[formattedName] !== undefined &&
        get().chapterAlreadyOpen[formattedName][src] !== undefined &&
        get().chapterAlreadyOpen[formattedName][src]![chapterId] !== undefined
      );
    };

    const _saveChapter = (
      formattedName: FormattedName,
      src: SourceName,
      chapterId: ChapterId,
      chapter: ChapterViewer
    ) => {
      const copy = get().chapterAlreadyOpen;
      if (!copy[formattedName]) {
        copy[formattedName] = {};
      }
      if (!copy[formattedName][src]) {
        copy[formattedName][src] = {};
      }
      copy[formattedName][src]![chapterId] = chapter;
      set({ chapterAlreadyOpen: copy });
    };

    const _loadPreviousChapter = (
      formattedName: FormattedName,
      src: SourceName,
      chapterId: ChapterId
    ): ChapterViewer => {
      return get().chapterAlreadyOpen[formattedName][src]![chapterId];
    };

    return {
      chapterAlreadyOpen: {},
      modalOpened: false,
      currentChapterOpen: undefined,
      open,
      close,
    };
  }
);
