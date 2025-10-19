import BrandName from "@/components/ui";
import Logo from "@/components/ui/logo"
import { Stack } from "@/mui/material";
import { Link } from "react-router-dom";

function LogoAndBrandName({ size = 1 }) {
  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent={"center"}
      spacing={2}
      sx={
        {
          scale: size
        }
      }
    >
      <Link to="/">
        <Logo></Logo>
      </Link>
      <Link to="/">
        <BrandName></BrandName>
      </Link>
    </Stack>
  );
}
export default LogoAndBrandName;
