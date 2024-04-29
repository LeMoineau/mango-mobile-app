import { Linking } from "react-native";
import DotsOptionsItem from "../DotsOptionsItem";
import { ChapterItemDotsParams } from "../../../../common/types/navigation/NavigationDotsParams";

export default function ChapterItemDotsOptions(params: ChapterItemDotsParams) {
  return (
    <>
      <DotsOptionsItem iconName="book" label="READ"></DotsOptionsItem>
      <DotsOptionsItem
        iconName="earth"
        label="OPEN IN BROWSER"
        onPress={() => {
          Linking.openURL(params.url);
        }}
      ></DotsOptionsItem>
      <DotsOptionsItem
        iconName="file-download"
        label="DOWNLOAD"
      ></DotsOptionsItem>
    </>
  );
}
