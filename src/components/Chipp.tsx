import { LabelItem } from "../interfaces/DataTypes";
import { Close } from "@mui/icons-material";

interface ChipProps {
  el: LabelItem;
  removeLabel?: (label: LabelItem) => void;
}

export const Chipp = (props: ChipProps) => {
  const { el, removeLabel } = props;

  return (
    <label
      style={{
        backgroundColor: el.color,
        color: "#fff",
        width: "fit-content",
        padding: "4px 7px",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "7px",
      }}
    >
      {el.text}
      {removeLabel && (
        <Close
          fontSize="small"
          sx={{
            color: "#fff",
            cursor: "pointer",
            borderRadius: "50%",
            backgroundColor: "#ffffff50",
          }}
          onClick={() => removeLabel(el)}
        />
      )}
    </label>
  );
};
