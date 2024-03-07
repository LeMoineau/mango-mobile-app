import { FormattedName } from "@shared/types/primitives/id";
import { create } from "zustand";
import { IntersiteManga } from "@shared/types/intersite/IntersiteManga";

interface MangaModalState {
  mangaAlreadyOpen: { [formattedName: FormattedName]: IntersiteManga };
  modalOpened: boolean;
  currentMangaOpen: IntersiteManga | undefined;
  open: (
    formattedName: FormattedName,
    fetcher: (
      endpoint: string,
      forceRefresh?: boolean | undefined
    ) => Promise<IntersiteManga | undefined>
  ) => void;
  close: () => void;
}

export const useMangaModal = create<MangaModalState>()((set, get) => {
  const open = async (
    formattedName: FormattedName,
    fetcher: (
      endpoint: string,
      forceRefresh?: boolean | undefined
    ) => Promise<IntersiteManga | undefined>
  ) => {
    set({ currentMangaOpen: undefined, modalOpened: true });
    if (_get(formattedName)) {
      set({ currentMangaOpen: _get(formattedName) });
      return;
    }
    const manga = await fetcher(`/mangas/${formattedName}`, true);
    if (manga) {
      set({ currentMangaOpen: manga });
      _set(formattedName, manga);
    }
  };

  const close = () => {
    set({ modalOpened: false });
  };

  const _set = (formattedName: FormattedName, manga: IntersiteManga) => {
    const copy = get().mangaAlreadyOpen;
    copy[formattedName] = manga;
    set({ mangaAlreadyOpen: copy });
  };

  const _get = (formattedName: FormattedName): IntersiteManga | undefined => {
    return get().mangaAlreadyOpen[formattedName];
  };

  return {
    mangaAlreadyOpen: {},
    modalOpened: false,
    currentMangaOpen: undefined,
    open,
    close,
  };
});
