import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CreateIcon from "@mui/icons-material/Create";

interface IMenuAddBoardProps {
  handleOpen: () => void;
}

export const MenuAddBoard = ({ handleOpen }: IMenuAddBoardProps) => {
  const actions = [
    { icon: <CreateIcon />, name: "Add New Board", onclick: handleOpen },
  ];

  return (
    <Box sx={{ height: -100, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
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
