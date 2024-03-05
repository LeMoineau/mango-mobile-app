export default interface IntersiteChapter {
  title: { [src: string]: string };
  number: { [src: string]: string };
  formattedNumber: string;
  image: { [src: string]: string };
  date: { [src: string]: Date };
  id: { [src: string]: string };
  manga: {
    formattedTitle: string;
    title: { [src: string]: string };
    id: { [src: string]: string };
  };
}
