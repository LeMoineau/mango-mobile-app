import { SafeAreaView } from "react-native";
import { SourceName } from "../../../../../shared/src/types/primitives/Identifiers";
import SourceSettingItem from "./SourceSettingItem";
import { useState } from "react";

export default function SourceSettingList({
  srcs,
  srcsEnabled,
  onChange,
}: {
  srcs: SourceName[];
  srcsEnabled?: SourceName[];
  onChange?: (srcs: SourceName[]) => void;
}) {
  const [data, setData] = useState(srcs);

  return (
    <>
      <SafeAreaView style={[{ flex: 1 }]}>
        {data.map((item, index) => (
          <SourceSettingItem
            key={`source-setting-item-${index}`}
            sourceName={item as SourceName}
            online={
              srcsEnabled ? srcsEnabled.includes(item as SourceName) : undefined
            }
            firstChild={index === 0}
            lastChild={index === data.length - 1}
            onUpBtnPress={() => {
              const tmp = [...srcs];
              tmp.splice(index, 1);
              tmp.splice(index - 1, 0, item);
              setData(tmp);
              onChange && onChange(tmp);
            }}
            onDownBtnPress={() => {
              const tmp = [...srcs];
              tmp.splice(index, 1);
              tmp.splice(index + 1, 0, item);
              setData(tmp);
              onChange && onChange(tmp);
            }}
          ></SourceSettingItem>
        ))}
      </SafeAreaView>
    </>
  );
}
