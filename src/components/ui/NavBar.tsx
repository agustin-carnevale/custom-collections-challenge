import { FC } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

interface NavBarProps {
  title: string;
}

export const NavBar: FC<NavBarProps> = ({ title }) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#0E1217" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {isHome ? (
            <NavLink to={"/create"} style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "white" }}>Create</Typography>
            </NavLink>
          ) : (
            <NavLink to={"/"} style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "white" }}>Home</Typography>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
