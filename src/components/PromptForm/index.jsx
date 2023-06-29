import { useMediaQuery, useTheme } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Header } from "../Header";
import { NavBar } from "../NavBar";
import "./PromptForm.css";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { isLoggedIn } from "../../utils/auth";
import { BACKEND_URL } from "../../config.js";
import { green } from "@mui/material/colors";

export const PromptForm = ({ showBot }) => {
  const [step, setStep] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [botGoal, setBotGoal] = useState("");
  const [userContent1, setUserContent1] = useState("");
  const [userContent2, setUserContent2] = useState("");
  const [userContent3, setUserContent3] = useState("");
  const [assistantContent1, setAssistantContent1] = useState("");
  const [assistantContent2, setAssistantContent2] = useState("");
  const [assistantContent3, setAssistantContent3] = useState("");
  const navigate = useNavigate();

  const changeBotGoal = (e) => setBotGoal(e.target.value);
  const changeUserContent1 = (e) => setUserContent1(e.target.value);
  const changeUserContent2 = (e) => setUserContent2(e.target.value);
  const changeUserContent3 = (e) => setUserContent3(e.target.value);
  const changeAssistantContent1 = (e) => setAssistantContent1(e.target.value);
  const changeAssistantContent2 = (e) => setAssistantContent2(e.target.value);
  const changeAssistantContent3 = (e) => setAssistantContent3(e.target.value);

  const validateFields = () => {
    const fields = [
      botGoal,
      userContent1,
      userContent2,
      userContent3,
      assistantContent1,
      assistantContent2,
      assistantContent3,
    ];
    //console.log("los campos son: " + fields)

    return fields.every(
      (field) => field && field.trim() !== "" && field !== null
    );
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      // Redirect user to the login page if not logged in
      navigate("/login");
    }
  }, []);

  if (!isLoggedIn()) {
    return null;
  }

  const handleSendButton = () => {
    if (step > 2) {
      const loggedInUserEmail = localStorage.getItem("email");
      if (validateFields() && loggedInUserEmail) {
        fetch(`${BACKEND_URL}/createBot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: loggedInUserEmail,
            botGoal: botGoal,
            userContent1: userContent1,
            userContent2: userContent2,
            userContent3: userContent3,
            assistantContent1: assistantContent1,
            assistantContent2: assistantContent2,
            assistantContent3: assistantContent3,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            try {
              alert(data);
              navigate("/my-bots");
              //Ahora si mostramos que su bot ya se pudo crear
              showBot();
            } catch (error) {
              console.log("OpenAI no mandó un formato JSON válido");
            }
          })
          .catch((err) => console.log(err));
      } else {
        alert("All the fields must be filled to create your bot");
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleBackButton = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="promptForm">
      <NavBar />
      <Box id="box" className="boxContainer">
        <h1 className="promptFormTitle">
          Create your own ChatGPT for your business
        </h1>

        <Box component="form" className="form" noValidate autoComplete="off">
          <div className="formContent">
            {step == 0 ? (
              <TextField
                
                className ="myTextField"
                id="outlined-multiline-flexible"
                label="Describe what your AI has to do"
                type="text"
                value={botGoal}
                onChange={changeBotGoal}
                multiline
                minRows={10}
                maxRows={10}
                variant="outlined"
                sx={{
                  width: { xs: "90%", sm: "90%", md: "90%" },                 

                }}
              />
            ) : step == 1 ? (
              <>
                <TextField
                  className ="myTextField"
                  id="outlined-multiline-flexible"
                  label="Training user query 1"
                  type="text"
                  value={userContent1}
                  onChange={changeUserContent1}
                  multiline
                  maxRows={4}
                  style={{ width: isSmallScreen ? "90%" : "60%" }}
                />
                <div className="space" />
                <TextField
                  className ="myTextField"
                  id="outlined-multiline-flexible"
                  label="Training agent response 1"
                  type="text"
                  value={assistantContent1}
                  onChange={changeAssistantContent1}
                  multiline
                  minRows={5}
                  maxRows={10}
                  style={{ width: isSmallScreen ? "90%" : "60%" }}
                />
              </>
            ) : step == 2 ? (
              <>
                <TextField
                  className ="myTextField"
                  id="outlined-multiline-flexible"
                  label="Training user query 2"
                  type="text"
                  value={userContent2}
                  onChange={changeUserContent2}
                  multiline
                  maxRows={4}
                  style={{ width: isSmallScreen ? "90%" : "60%" }}
                />
                <div className="space" />
                <TextField
                  className ="myTextField"
                  id="outlined-multiline-flexible"
                  label="Training agent response 2"
                  type="text"
                  value={assistantContent2}
                  onChange={changeAssistantContent2}
                  multiline
                  minRows={5}
                  maxRows={10}
                  style={{ width: isSmallScreen ? "90%" : "60%" }}
                />
              </>
            ) : (
              <>
                <TextField
                  className ="myTextField"
                  id="outlined-multiline-flexible"
                  label="Training user query 3"
                  type="text"
                  value={userContent3}
                  onChange={changeUserContent3}
                  multiline
                  maxRows={4}
                  style={{ width: isSmallScreen ? "90%" : "60%" }}
                />
                <div className="space" />
                <TextField
                  className ="myTextField"
                  id="outlined-multiline-flexible"
                  label="Training agent response 3"
                  type="text"
                  value={assistantContent3}
                  onChange={changeAssistantContent3}
                  multiline
                  minRows={5}
                  maxRows={10}
                  style={{ width: isSmallScreen ? "90%" : "60%" }}
                />
              </>
            )}
          </div>
        </Box>

        <div className={step !== 0 ? "buttonsRow" : "buttonRow"}>
          {step > 0 ? (
            <Button
              id="webcreateBack"
              variant="contained"
              onClick={() => {
                handleBackButton();
              }}
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            id="webcreateNext"
            variant="contained"
            onClick={() => {
              handleSendButton();
            }}
          >
            {step > 2 ? "Create" : "Next"}
          </Button>
        </div>
      </Box>
    </div>
  );
};
