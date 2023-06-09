import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { userSignTheme } from "../../utils/userSignTheme";
import { ArrowLeft } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Slider from "@material-ui/core/Slider";
import useMyBot from "../../hooks/useMyBot";
import { IconButton } from "@mui/material";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { NavBar } from "../NavBar";
import "./Mybots.css";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";

import { ErrorOutlineOutlined } from "@mui/icons-material";
import { BACKEND_URL } from "../../config.js";

export const Mybots = () => {
  const [bots, setBots] = useState([]);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [open, setOpen] = useState(false);
  const [botId, setBotId] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [myBotData, setMyBotData] = useMyBot();

  /* CONSTANTES QUE SE MUESTRAN EN EL FORM DE EDIT */
  const [AdvancedSettings, setAdvancedSettings] = useState(false);
  const [currentBotName, setCurrentBotName] = useState("");
  const [currentBusinessName, setCurrentBusinessName] = useState("");
  const [currentBusinessUrl, setCurrentBusinessUrl] = useState("");
  const [currentPhoneNumberId, setCurrentPhoneNumberId] = useState("");
  const [currentWhatsappApiKey, setCurrentWhatsappApiKey] = useState("");
  const [currentTelegramApiKey, setCurrentTelegramApiKey] = useState("");
  const [currentBusinessDescription, setCurrentBusinessDescription] = useState("");
  const [currentAdditionalDetails, setCurrentAdditionalDetails] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");

  const [telegramSelected, setTelegramSelected] = useState(0);
  const [whatsappSelected, setWhatsappSelected] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [currentTop_p, setCurrentTop_p] = useState(0.5);  // Valor inicial

  const navigate = useNavigate();

  //funcion para abrir el form para hacer edit del bot
  const handleEditButtonClick = async (bot, event) => {
    if (
      event.target.tagName !== "TD" &&
      event.target.tagName !== "svg" &&
      event.target.tagName !== "BUTTON" &&
      event.target.tagName !== "path"
    ) {
      return;
    }
    setBotId(bot.id);
    setTelegramSelected(bot.telegram_selected);
    setWhatsappSelected(bot.whatsapp_selected);
    //consultar en la base de datos los datos de ese bot
    await fetch(`${BACKEND_URL}/getBotData2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ botId: bot.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentBotName(data[0].bot_name ?? "");
        setCurrentBusinessName(data[0].business_name ?? "");
        setCurrentBusinessUrl(data[0].business_url ?? "");
        setCurrentPhoneNumberId(data[0].whatsapp_phone_id ?? "");
        setCurrentWhatsappApiKey(data[0].whatsapp_api_key ?? "");
        setCurrentTelegramApiKey(data[0].telegram_api_key ?? "");
        setCurrentBusinessDescription(data[0].business_description ?? "");
        setCurrentAdditionalDetails(data[0].additional_details ?? "");
        setCurrentPrompt(data[0].gpt_prompt ?? "");
        setCurrentTop_p(data[0].top_p ?? 0.9);
      })
      .catch((err) => console.log(err));

    setEditDialogOpen(true);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "white",
      color: "#059CF1",
      fontSize: 20,
      fontWeight: "bold",
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 20,
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: 24,
      },
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      [theme.breakpoints.down("sm")]: {
        fontSize: 12,
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 14,
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: 16,
      },
    },
  }));

  const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#DAEDFD",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    "&:last-child": {
      borderBottomLeftRadius: "20px",
      borderBottomRightRadius: "20px",
    },
  }));

  const getData = async (userEmail) => {
    fetch(`${BACKEND_URL}/getData2?email=${encodeURIComponent(userEmail)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data = data.map((bot) => ({
          ...bot,
          isLodingTelegram: false,
          isLoadingWhatsapp: false,
        }));
        console.log(data);
        setBots(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      // Redirect user to the login page if not logged in
      navigate("/login");
    }
    const loggedInUserEmail = localStorage.getItem("email");
    getData(loggedInUserEmail);
  }, []);

  if (!isLoggedIn()) {
    return null;
  }

  const updateWhatsappEnable = async (whatsapp_enable, bot) => {
    const botIndex = bots.indexOf(bot);
    let success = false;
    setBots([
      ...bots.slice(0, botIndex),
      { ...bots[botIndex], isLoadingWhatsapp: true },
      ...bots.slice(botIndex + 1),
    ]);
    await fetch(`${BACKEND_URL}/updateWhatsappEnable2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ whatsapp_enable, botId: bot.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        success = true;
        if (whatsapp_enable == 1) {
          toast.success("Whatsapp enable", {
            hideProgressBar: true,
            autoClose: 1000,
          });
        } else {
          toast.success("Whatsapp disable", {
            hideProgressBar: true,
            autoClose: 1000,
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setBots([
          ...bots.slice(0, botIndex),
          {
            ...bots[botIndex],
            isLoadingWhatsapp: false,
            whatsapp_enable: success ? whatsapp_enable : bot.whatsapp_enable,
          },
          ...bots.slice(botIndex + 1),
        ])
      );
  };

  const sendWhatsappNew = async (phoneNumberId, whatsappApiKey) => {
    await fetch(`${BACKEND_URL}/whatsappNew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ botId, phoneNumberId, whatsappApiKey }),
    });
  };

  const updateTelegramEnable = async (telegram_enable, bot) => {
    const botIndex = bots.indexOf(bot);
    let success = false;
    setBots([
      ...bots.slice(0, botIndex),
      { ...bots[botIndex], isLoadingTelegram: true },
      ...bots.slice(botIndex + 1),
    ]);
    await fetch(`${BACKEND_URL}/updateTelegramEnable2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ telegram_enable, botId: bot.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        success = true;
        if (telegram_enable == 1) {
          toast.success("Telegram enabled", {
            hideProgressBar: true,
            autoClose: 1000,
          });
        } else {
          toast.success("Telegram Disable", {
            hideProgressBar: true,
            autoClose: 1000,
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setBots([
          ...bots.slice(0, botIndex),
          {
            ...bots[botIndex],
            isLoadingTelegram: false,
            telegram_enable: success ? telegram_enable : bot.telegram_enable,
          },
          ...bots.slice(botIndex + 1),
        ]);
      });
  };

  const handleChangeTelegram = (bot) => {
    const telegram_enable = bot.telegram_enable == 1 ? 0 : 1;
    updateTelegramEnable(telegram_enable, bot);
  };

  const handleChangeWhatsapp = (bot) => {
    const whatsapp_enable = bot.whatsapp_enable == 1 ? 0 : 1;
    updateWhatsappEnable(whatsapp_enable, bot);
  };

  const handleDeleteButtonClick = (bot) => {
    if (typeof bot === "number") {
      setBotId(bot);
    } else {
      setBotId(bot.id);
    }
    setOpenConfirmationDialog(true);
  };

  const handleConfirmationDialogClose = async (confirmed) => {
    setOpenConfirmationDialog(false);
    console.log(botId);
    if (confirmed) {
      await fetch(`${BACKEND_URL}/deleteBot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ botId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            let newList = bots.filter((bot) => bot.id !== botId);
            setBots(newList);
            toast.success("Bot deleted", {
              hideProgressBar: true,
              autoClose: 1000,
            });
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setEditDialogOpen(false));
    }
  };

  const updateBotInfo = async (botId) => {
    await fetch(`${BACKEND_URL}/updateBotInfo2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        botId,
        isAdvanced: AdvancedSettings,
        values: AdvancedSettings
          ? {
              currentPrompt,
              currentPhoneNumberId,
              currentWhatsappApiKey,
              currentTelegramApiKey,
            }
          : {
              currentBusinessName,
              currentBusinessUrl,
              currentPhoneNumberId,
              currentWhatsappApiKey,
              currentTelegramApiKey,
              currentBotName,
              currentBusinessDescription,
              currentAdditionalDetails,
            },
        currentTop_p,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.success)
          toast.success(data.message, {
            hideProgressBar: true,
            autoClose: 1000,
          });
        else if (data.code === 1)
          toast.warning(data.message, {
            hideProgressBar: false,
            autoClose: 5000,
          });
        else if (data.code === 2)
          toast.error(data.message, {
            hideProgressBar: false,
            autoClose: 3000,
          });

        const index = bots.findIndex((bot) => bot.id === botId);
        setBots([
          ...bots.slice(0, index),
          {
            ...bots[index],
            bot_name: currentBotName,
            business_name: currentBusinessName,
          },
          ...bots.slice(index + 1),
        ]);
      })
      .catch((err) => console.log(err));
  };

  const handleSliderChange = (event, newValue) => {
    setCurrentTop_p(newValue);
  };

  return (
    <div className="mybots">
      <NavBar />
      <div className="marginTop"></div>
      <div className="container2">
        <div className="title2">
          <h2>My bots</h2>
        </div>

        <StyledTableContainer className="tableContainer" component={Paper}>
          <Table
            sx={{ width: "100%" }}
            className="table"
            aria-label="simple table"
          >
            <TableHead className="tableHead" sx={{ backgroundColor: "white" }}>
              <StyledTableRow>
                {!isSmallScreen && (
                  <StyledTableCell align="center">Id</StyledTableCell>
                )}
                <StyledTableCell align="center"> Name&nbsp;</StyledTableCell>
                {!isSmallScreen ? (
                  <>
                    <StyledTableCell align="center">
                      Business Name&nbsp;
                    </StyledTableCell>
                  </>
                ) : (
                  <></>
                )}
                <StyledTableCell align="center">Whatsapp&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Telegram&nbsp;</StyledTableCell>
                {!isSmallScreen ? (
                  <>
                    <StyledTableCell align="center">Edit&nbsp;</StyledTableCell>
                    <StyledTableCell align="center">
                      Delete&nbsp;
                    </StyledTableCell>
                  </>
                ) : (
                  <></>
                )}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {bots.map((bot) => (
                <StyledTableRow
                  onClick={(event) => {
                    if (bot.creation_status == 1)
                      handleEditButtonClick(bot, event);
                  }}
                  key={bot.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {!isSmallScreen && (
                    <StyledTableCell align="center" component="th" scope="row">
                      {bot.id}
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="center">
                    {bot.bot_name}
                  </StyledTableCell>
                  {bot.creation_status == 1 ? (
                    <>
                      {!isSmallScreen ? (
                        <>
                          <StyledTableCell align="center">
                            {bot.business_name}
                          </StyledTableCell>
                        </>
                      ) : (
                        <></>
                      )}
                      <StyledTableCell align="center">
                        {bot.whatsapp_selected != 1 ? (
                          <></>
                        ) : !bot.isLoadingWhatsapp ? (
                          <Switch
                            {...label}
                            checked={bot.whatsapp_enable == "1" ? true : false}
                            onChange={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleChangeWhatsapp(bot);
                              //handleClickOpen(bot.id);
                            }}
                          />
                        ) : (
                          <CircularProgress />
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {bot.telegram_selected != 1 ? (
                          <></>
                        ) : !bot.isLoadingTelegram ? (
                          <Switch
                            {...label}
                            checked={bot.telegram_enable == "1" ? true : false}
                            onChange={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleChangeTelegram(bot);
                            }}
                          />
                        ) : (
                          <CircularProgress />
                        )}
                      </StyledTableCell>

                      {!isSmallScreen ? (
                        <>
                          <StyledTableCell align="center">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditButtonClick(bot, e);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteButtonClick(bot);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </StyledTableCell>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      <ThemeProvider theme={userSignTheme}>
                        <StyledTableCell
                          align="center"
                          colSpan={isSmallScreen ? 1 : 2}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              setMyBotData(bot);
                              navigate("/create-bot");
                            }}
                          >
                            {isSmallScreen ? (
                              <ArrowLeft
                                style={{ fontSize: "30px", height: "25px" }}
                              />
                            ) : (
                              <>
                                {" "}
                                <ArrowLeft /> {"Continuar creando"}{" "}
                              </>
                            )}
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          colSpan={isSmallScreen ? 1 : 3}
                        >
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteButtonClick(bot)}
                          >
                            {isSmallScreen ? "" : "Delete Bot"}
                            <DeleteIcon
                              style={{ fontSize: "17px", height: "25px" }}
                            />
                          </Button>
                        </StyledTableCell>
                      </ThemeProvider>
                    </>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </div>

      <Dialog open={editDialogOpen} className="myDialog">
        <div className="closeBtn">
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setEditDialogOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle
          fontWeight={"700"}
          fontSize={"1.5em"}
          className="myDialogTitle"
        >
          Edit My Bot
        </DialogTitle>
        <DialogContent color="black">
          {!AdvancedSettings ? (
            <>
              <DialogContentText
                color={"#42A5F6"}
                fontWeight={"700"}
                paddingY={"10px"}
              >
                Business information.
              </DialogContentText>
              <TextField
                className="myTextField"
                margin="dense"
                id="userTraining1"
                label="Bot Name"
                type="text"
                fullWidth
                value={currentBotName}
                onChange={(e) => {
                  setCurrentBotName(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                className="myTextField"
                margin="dense"
                id="whatsappApiKey"
                label="Business Name"
                type="text"
                fullWidth
                value={currentBusinessName}
                onChange={(e) => setCurrentBusinessName(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                className="myTextField"
                margin="dense"
                id="bussines"
                label="Business Description"
                type="text"
                multiline
                fullWidth
                value={currentBusinessDescription}
                inputProps={{ maxLength: 300 }}
                rows={3}
                onChange={(e) => {
                  setCurrentBusinessDescription(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                className="myTextField"
                margin="dense"
                id="details"
                label="Additional Details"
                type="text"
                fullWidth
                value={currentAdditionalDetails}
                inputProps={{ maxLength: 300 }}
                rows={3}
                multiline
                onChange={(e) => {
                  setCurrentAdditionalDetails(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                className="myTextField"
                margin="dense"
                id="whatsappPhoneNumberId"
                label="Busines URL"
                type="text"
                fullWidth
                value={currentBusinessUrl}
                onChange={(e) => setCurrentBusinessUrl(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </>
          ) : (
            <>
              <DialogContentText
                color={"#42A5F6"}
                fontWeight={"700"}
                paddingY={"10px"}
              >
                Advanced options
              </DialogContentText>

              <TextField
                className="myTextField2"
                margin="dense"
                id="prompt"
                label="Bot Prompt"
                type="text"
                fontSize="5px"
                sx={{ fontSize: "5px" }}
                fullWidth
                disabled={!AdvancedSettings}
                value={currentPrompt}
                inputProps={{ maxLength: 3072, style: { fontSize: "12px" } }}
                rows={10}
                multiline
                onChange={(e) => setCurrentPrompt(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </>
          )}

          <DialogContentText
            color={"#42A5F6"}
            fontWeight={"700"}
            paddingY={"10px"}
          >
            Parameters
          </DialogContentText>

          <div className="sliderDiv">
            <p className="sliderP">Bot's imagination: {currentTop_p}</p>
            <p className="sliderP2">Ability to invent information </p>
            <Slider  className="slider"
              value={currentTop_p}
              min={0} // Valor mínimo
              max={1} // Valor máximo
              step={0.05} // Incremento mínimo
              
              onChange={handleSliderChange}
              classes={{
                root: 'roots', 
                thumb: 'thumb', 
                track: 'track', 
                rail: 'rail' 
              }}
            />
          </div>

          <DialogContentText
            color={"#42A5F6"}
            fontWeight={"700"}
            paddingY={"10px"}
          >
            APIs information
          </DialogContentText>

          <TextField
            className="myTextField"
            margin="dense"
            id="whatsappCallBack"
            label="Whatsapp Callback URL"
            type="text"
            fullWidth
            value={"url"}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {
            (whatsappSelected == 1)
            ?
            <>
            <TextField
              className="myTextField"
              margin="dense"
              id="phoneNumberId"
              label="Phone Number Id"
              type="text"
              fullWidth
              value={currentPhoneNumberId}
              onChange={(e) => setCurrentPhoneNumberId(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className="myTextField"
              margin="dense"
              id="whatsappApiKey"
              label="Whatsapp Api Key"
              type="text"
              fullWidth
              value={currentWhatsappApiKey}
              onChange={(e) => setCurrentWhatsappApiKey(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            </>
            :<></>
          }

          {
            (telegramSelected == 1)
            ?
            <TextField
              className="myTextField"
              margin="dense"
              id="Bussines description"
              label="Telegram Api Key"
              type="text"
              fullWidth
              value={currentTelegramApiKey}
              onChange={(e) => {
                setCurrentTelegramApiKey(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            :
            <></>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdvancedSettings(!AdvancedSettings)}>
            {!AdvancedSettings ? "Advanced options" : "Simplified options"}
          </Button>

          <Button
            onClick={() => {
              handleDeleteButtonClick(botId);
            }}
            style={{ color: "red" }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              // Call your fetch function here to save the edited data
              updateBotInfo(botId);
              setEditDialogOpen(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmationDialog}
        onClose={() => handleConfirmationDialogClose(false)}
        className="myDialogDelete"
      >
        <DialogContent style={{ background: "#F4F9FD", borderRadius: "20px" }}>
          <ErrorOutlineOutlined
            color="error"
            style={{ fontSize: "72px", width: "100%" }}
          />
          <DialogContentText style={{ color: "#42A5F6", textAlign: 'center' }}>
            Are you sure you want to delete this bot?
          </DialogContentText>
          <hr style={{ borderColor: "#059CF1", borderWidth: "0.2px" }} />
        </DialogContent>
        <DialogActions style={{ background: "#F4F9FD" }}>
          <Button onClick={() => handleConfirmationDialogClose(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmationDialogClose(true)}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="bottom-left" />
    </div>
  );
};
