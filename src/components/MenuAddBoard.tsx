import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

interface IMenuAddBoardProps {
  handleOpen: () => void;
}

export const MenuAddBoard = ({
  handleOpen,
}: IMenuAddBoardProps): JSX.Element => {
  const theme: Theme = useTheme();

  const actions = [
    { icon: <AddIcon />, name: "Add New Board", onclick: handleOpen },
  ];

  return (
    <Box>
      <SpeedDial
        ariaLabel="Add new board"
        sx={{
          position: "absolute",
          bottom: "8%",
          right: "8%",
        }}
        icon={<SpeedDialIcon />}
        FabProps={{ style: { backgroundColor: theme.palette.background.main } }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onclick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};
