import { SourceName } from "../../../../../../shared/src/types/primitives/Identifiers";
import SelectModal from "../primitives/SelectModal";

export default function SelectSourceModal({
  availablesSources,
  currentSource,
  visible,
  onSelect,
  onRequestClose,
}: {
  availablesSources: SourceName[];
  currentSource?: SourceName;
  visible: boolean;
  onSelect?: (src: SourceName) => void;
  onRequestClose?: () => void;
}) {
  return (
    <SelectModal
      options={availablesSources.map((s) => ({
        label: s,
        iconName: "source-branch",
      }))}
      alreadySelected={currentSource}
      visible={visible}
      onRequestClose={() => onRequestClose && onRequestClose()}
      onSelect={(src) => {
        onSelect && onSelect(src as SourceName);
      }}
    ></SelectModal>
  );
}
