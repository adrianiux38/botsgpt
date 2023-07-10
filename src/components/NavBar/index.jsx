import { useMediaQuery, useTheme, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import useMyBot from '../../hooks/useMyBot';
import "./navBar.css";

import logo2 from "../../img/LOGO.png";

export const NavBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [myBotData, setMyBotData] = useMyBot();

  return (
    <>
      <div className="navBar">
        <div className="logoName">
          <img className="imgNav" src={logo2} alt="logo" />
          <h1 className="title">GPT CUSTOM</h1>
        </div>
        {!isSmallScreen ? (
          <div className="menu">
            <Link className="menuItem" to="/my-bots">
              My Bots
            </Link>
            {/* <Link className="menuItem" to={tutorialUrl}>
              Tutorial
            </Link> */}
            <Link className="menuItem" to="/account">
              Account
            </Link>
            <div className="addBtn">
              <IconButton onClick={() => navigate("/create-bot")}>
                <AddCircleOutlineIcon
                  className="addIcon"
                  fontSize="large"
                  color="inherit"
                />
              </IconButton>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {isSmallScreen ? (
        <div className="footer">
          <div className="footerBtn">
            <IconButton onClick={() => navigate("/my-bots")}>
              <FontAwesomeIcon
                icon={faRobot}
                className="footerIcon"
                size="lg"
                color="inherit"
              />
            </IconButton>
          </div>
          <div className="footerBtn">
            <IconButton onClick={() => navigate("/account")}>
              <FontAwesomeIcon
                icon={faUser}
                className="footerIcon"
                size="lg"
                color="inherit"
              />
            </IconButton>
          </div>
          <div className="addBtn">
            <IconButton onClick={ () => {setMyBotData(null); navigate("/create-bot");} }>
              <AddCircleOutlineIcon
                className="addIcon"
                fontSize="large"
                color="inherit"
              />
            </IconButton>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
