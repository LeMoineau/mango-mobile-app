import { useFavoritesStore } from "../../../store/favorites.store";
import TextInputModal from "../primitives/TextInputModal";

export default function CreateFavoritesListModal({
  visible,
  onRequestClose,
}: {
  visible: boolean;
  onRequestClose: () => void;
}) {
  const { create } = useFavoritesStore();
  return (
    <TextInputModal
      visible={visible}
      label="Enter the new favorites list name :"
      onRequestClose={() => {
        onRequestClose();
      }}
      onSubmit={async (name) => {
        console.log(name);
        if (name.length > 0) {
          await create(name);
        }
      }}
    ></TextInputModal>
  );
}
