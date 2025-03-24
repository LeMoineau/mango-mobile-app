import {
  deleteAsync,
  documentDirectory,
  readAsStringAsync,
  writeAsStringAsync,
} from "expo-file-system";

const useFileSystem = () => {
  const _createFileURI = (filename: string, ext: string) => {
    return `${documentDirectory}${encodeURI(filename)}.${ext}`;
  };

  const downloadString = async (
    filename: string,
    ext: string,
    content: string
  ): Promise<string> => {
    const fileURI = _createFileURI(filename, ext);
    await writeAsStringAsync(fileURI, content);
    return fileURI;
  };

  const readString = async (fileURI: string): Promise<string> => {
    return await readAsStringAsync(fileURI);
  };

  const deleteFile = async (fileURI: string): Promise<void> => {
    await deleteAsync(fileURI);
  };

  return { downloadString, readString, deleteFile };
};

export default useFileSystem;
