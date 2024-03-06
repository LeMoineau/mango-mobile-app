import { Text, TouchableOpacity, View, VirtualizedList } from "react-native";
import { SourceName } from "../../../common/types/primitives/Ids";
import SourceSettingItem from "./SourceSettingItem";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import { useEffect, useState } from "react";

export default function SourceSettingList({
  srcs,
  srcsEnabled,
  onChange,
}: {
  srcs: SourceName[];
  srcsEnabled?: SourceName[];
  onChange?: (srcs: SourceName[]) => void;
}) {
  const [firstPass, setFirstPass] = useState(true);
  const [data, setData] = useState(srcs);

  useEffect(() => {
    if (!firstPass) {
      onChange && onChange(data);
    }
    setFirstPass(false);
  }, [data]);

  return (
    <>
      <View>
        <DragList
          data={data ?? []}
          keyExtractor={(str: string) => str}
          onReordered={async (fromIndex: number, toIndex: number) => {
            const copy = [...data]; // Don't modify react data in-place
            const removed = copy.splice(fromIndex, 1);

            copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
            setData(copy);
          }}
          renderItem={(info: DragListRenderItemInfo<string>) => {
            const { item, onDragStart, onDragEnd, isActive } = info;

            return (
              <TouchableOpacity
                key={item}
                onPressIn={onDragStart}
                onPressOut={onDragEnd}
              >
                <SourceSettingItem
                  sourceName={item}
                  online={srcsEnabled ? srcsEnabled.includes(item) : undefined}
                ></SourceSettingItem>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
}
