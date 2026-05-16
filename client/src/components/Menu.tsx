import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const [jwt, setJwt] = useState<string | null>(null);

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  //Initialize from localStorage directly:
  //const [jwt, setJwt] = useState<string | null>(() => localStorage.getItem("token"));
  //No effect needed at all — super clean

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    if (tkn && tkn !== jwt) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setJwt(tkn);
    }
  }, [jwt]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>

          <Button component={Link} to="/" color="inherit">
            {t("Home")}
          </Button>
          {!jwt ? (
            <>
              <Button component={Link} to="/login" color="inherit">
                {t("Login")}
              </Button>
              <Button component={Link} to="/register" color="inherit">
                {t("Register")}
              </Button>
            </>
          ) : (
            <>
            <Button component={Link} to="/fetchpoems" color="inherit">
                {t("FetchPoems")}
              </Button>
              <Button component={Link} to="/addpoem" color="inherit">
                {t("AddPoem")}
              </Button>
              <Button component={Link} to="/about" color="inherit">
                {t("About")}
              </Button>

              <Button component={Link} to="/posts" color="inherit">
                {t("Posts")}
              </Button>

              <Button component={Link} to="/comments" color="inherit">
                {t("Comments")}
              </Button>

              <Button component={Link} to="/getinput" color="inherit">
                {t("GetInput")}
              </Button>

              <Button component={Link} to="/getforminput" color="inherit">
                {t("GetFormInput")}
              </Button>

              <Button component={Link} to="/use-effect" color="inherit">
                {t("UseEffectDemo")}
              </Button>

              <Button
                component={Link}
                to="/logout"
                color="inherit"
                onClick={logout}
              >
                {t("Logout")}
              </Button>
              <button onClick={() => changeLanguage("fi")}>FI</button>
              <button onClick={() => changeLanguage("en")}>EN</button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Menu;
