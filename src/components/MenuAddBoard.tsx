import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";

interface IMenuAddBoardProps {
  handleOpen: () => void;
}

export const MenuAddBoard = ({
  handleOpen,
}: IMenuAddBoardProps): JSX.Element => {
  const theme: Theme = useTheme();

  const actions = [
    { icon: <CreateIcon />, name: "Add New Board", onclick: handleOpen },
  ];

  return (
    <Box
      sx={{
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <SpeedDial
        ariaLabel="Add new board"
        sx={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
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
