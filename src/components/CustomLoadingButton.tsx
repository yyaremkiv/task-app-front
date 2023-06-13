import { LoadingButton } from "@mui/lab";
import { useTheme, Theme } from "@mui/material";

interface ICustomLoadingButtonProps {
  text: string;
  isLoading?: boolean;
}

export const CustomLoadingButton = ({
  text,
  isLoading = false,
}: ICustomLoadingButtonProps): JSX.Element => {
  const theme: Theme = useTheme();

  return (
    <LoadingButton
      variant="contained"
      loading={isLoading}
      disabled={isLoading}
      loadingPosition="center"
      type="submit"
      sx={{
        margin: "0 auto 1rem auto",
        padding: "0.25rem 4rem",
        fontSize: "0.9rem",
        color: "#fff",
        textTransform: "none",
        backgroundColor: theme.palette.background.main,
        "&:hover": {
          backgroundColor: theme.palette.background.mainHover,
        },
      }}
    >
      <span>{text}</span>
    </LoadingButton>
  );
};
