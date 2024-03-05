export interface ChapterInfos {
  id: string;
  title: string;
  number: string;
  image?: string;
  releaseDate?: Date;
  expirationDate?: Date;
}

export default interface Chapter extends ChapterInfos {
  manga: {
    title: string;
    id: string;
  };
}
