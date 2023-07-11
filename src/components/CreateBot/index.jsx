import { React, useState, useEffect, useRef } from "react";
import BusinessDescription from "./BusinessDescription";
import useVirtualKeyboard from '../../utils/keyboard';
import {ToastContainer, toast } from 'react-toastify';
import AdditionalDetails from "./AdditionalDetails";
import { useNavigate } from "react-router-dom";
import UploadProducts from "./UploadProducts";
import CategorySelect from "./CategorySelect";
import PlatformSelect from "./PlatformSelect";
import { isLoggedIn } from "../../utils/auth";
import useMyBot from '../../hooks/useMyBot';
import { BACKEND_URL } from "../../config";
import CreateButton from "./CreateButton";
import WhatsappKeys from "./WhatsappKeys";
import BusinessName from "./BusinessName";
import TelegramKeys from "./TelegramKeys";
import BusinessUrl from "./BusinessUrl";
import CallbackURL from "./CallbackURL";
import { NavBar } from "../NavBar";
import NameBot from "./NameBot";

const CreateBot = () => {
  const keyboardOpen = useVirtualKeyboard();
  const navigate = useNavigate();
  const [myBotData, setMyBotData] = useMyBot();

  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState({});
  const [botId, setBotId] = useState((myBotData !== null) ? myBotData.id : null);
  const loggedInUserEmail = localStorage.getItem("email");
  const [stepComponent, setStepComponent] = useState(null);
  const [shouldContinue, setShouldContinue] = useState(false);
  const [textFieldValue1, setTextFieldValue1] = useState("");
  const [textField1, setTextField1] = useState(undefined);
  const [textField2, setTextField2] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const changeCurrentStep = async (newStep) => {
    setCurrentStep(newStep);
    if (botId) {
      await updateStep(newStep, botId);
    }
  };

  //Obtener las plataformas que selecciono el user para poner activo su bot (e.g.whatsapp o telegram)
  async function getPlatforms(botId) {
    return new Promise(async (resolve, reject) => {
      let platforms = {};
      try {
        const response = await fetch(`${BACKEND_URL}/getPlatforms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: loggedInUserEmail, botId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          platforms = {
            botId: data.botId,
            whatsappSelected: data.whatsappSelected,
            telegramSelected: data.telegramSelected,
          };
        } else {
          console.error(
            "Error getting the bot id of a bot the user was creating:",
            data.error
          );
          reject(data.error);
        }
      } catch (error) {
        reject(error.message);
      }
      resolve(platforms);
    });
  }

  function createBot(botId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${BACKEND_URL}/createPrompt`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ botId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          console.log(`Bot creation status updated successfully`);
          navigate("/my-bots");
          resolve();
        } else {
          console.error(
            "Error getting the bot id of a bot the user was creating:",
            data.error
          );
          reject(data.error);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }

  async function updateBotCreationStatus(botId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${BACKEND_URL}/updateBotCreationStatus`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ botId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          console.log(`Bot creation status updated successfully`);
        } else {
          console.error(
            "Error getting the bot id of a bot the user was creating:",
            data.error
          );
          reject(data.error);
        }
      } catch (error) {
        reject(error.message);
      }
      resolve();
    });
  }

  useEffect(() => {
    if (isLoggedIn()) {
      if (myBotData !== null) {
        setBotId(myBotData.id);
        setStepData({...myBotData});
        const actualStep = (myBotData.current_step !== null) ? parseInt(myBotData.current_step) : 1;
        changeCurrentStep(actualStep);
      } else {
        setBotId(null);
        changeCurrentStep(1);
      }
    } else {
      // Redirect user to the login page if not logged in
      navigate("/");
    }
  }, []);

  const updateStep = async (currentStep, botId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/updateStep`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ step: currentStep, botId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        console.log(`Step ${currentStep} updated successfully`);
      } else {
        console.error(
          `Error updating current step: ${currentStep} in database:`,
          data.error
        );
      }
    } catch (error) {
      console.error(
        `Error updating current step: ${currentStep} in database:`,
        error.message
      );
    }
  };

  const createInitialBotRecord = async () => {
    return await new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${BACKEND_URL}/createInitialBotRecord`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: loggedInUserEmail }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          resolve(data.botId);
        } else {
          console.error("Error creating initial bot record:", data.error);
          reject(data.error);
        }
      } catch (error) {
        console.error("Error creating initial bot record:", error.message);
        reject(error.message);
      }
    });
  };

  const updateStepData = (newData) => {
    setStepData((prevData) => ({ ...prevData, ...newData }));
  };

  const handleContinue = () => {
    setShouldContinue(true);
  };

  useEffect(() => {
    const saveData = async () => {
      if (!shouldContinue) return;
      if (currentStep == 6 || currentStep == 7) {
        const platforms = await getPlatforms(botId);
        if (currentStep == 6) {
          if (platforms.telegramSelected == 1) {
            changeCurrentStep(currentStep + 1);
          } else {
            changeCurrentStep(currentStep + 2);
          }
        } else if (currentStep == 7) {
          if (platforms.whatsappSelected == 1) {
            changeCurrentStep(currentStep + 1);
          } else {
            changeCurrentStep(currentStep + 3);
          }
        }
      }

      var newBotId;
      if (currentStep === 1 && botId === null) {
        newBotId = await createInitialBotRecord();
        setBotId(newBotId);
      }

      const botIdToUse = currentStep === 1 && botId === null ? newBotId : botId;

      try {
        const response = await fetch(`${BACKEND_URL}/saveBotStep`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            step: currentStep,
            botId: botIdToUse,
            stepData,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          //console.log(`Step ${currentStep} data stored successfully`);
          changeCurrentStep(currentStep + 1);
        } else {
          console.error(`Error storing step ${currentStep} data:`, data.error);
        }
      } catch (error) {
        console.error(`Error storing step ${currentStep} data:`, error.message);
      }

      setShouldContinue(false);
    };

    saveData();
  }, [stepData, shouldContinue]);

  const handleCancel = async () => {
    setStepData({});
    setMyBotData(null);
    navigate("/my-bots");
  };

  const handleBack = async () => {
    if (currentStep == 10 || currentStep == 9 || currentStep == 8) {
      const platforms = await getPlatforms(botId);
      if (currentStep == 10) {
        if (platforms.whatsappSelected == 1) {
          changeCurrentStep(currentStep - 1);
        } else {
          changeCurrentStep(currentStep - 3);
        }
      } else if (currentStep == 9) {
        if (platforms.telegramSelected == 1) {
          changeCurrentStep(currentStep - 1);
        } else {
          changeCurrentStep(currentStep - 1);
        }
      } else if (currentStep == 8) {
        if (platforms.telegramSelected == 1) {
          changeCurrentStep(currentStep - 1);
        } else {
          changeCurrentStep(currentStep - 2);
        }
      }
    } else {
      changeCurrentStep(currentStep - 1);
    }
  };

  const loadStepContent = async () => {
    try {
      if (currentStep === 7 || currentStep === 8 || currentStep === 9) {
        if (botId !== null) {
          const platforms = await getPlatforms(botId);
          if (platforms) {
            if (currentStep === 7 && platforms.telegramSelected == 1) {
              setStepComponent(
                <TelegramKeys
                  handleCancel={handleCancel}
                  handleContinue={handleContinue}
                  handleBack={handleBack}
                  updateStepData={updateStepData}
                  botId={botId}
                />
              );
            } else if (currentStep === 8 && platforms.whatsappSelected == 1) {
              setStepComponent(
                <WhatsappKeys
                  handleCancel={handleCancel}
                  handleContinue={handleContinue}
                  handleBack={handleBack}
                  updateStepData={updateStepData}
                  botId={botId}
                />
              );
            } else if (currentStep === 9 && platforms.whatsappSelected == 1) {
              setStepComponent(
                <CallbackURL
                  handleCancel={handleCancel}
                  handleContinue={handleContinue}
                  handleBack={handleBack}
                  updateStepData={() => {}}
                  botId={botId}
                />
              );
            }
          } else {
            alert("Please select a platform to continue!");
            return;
          }
        } else {
          alert(
            "There is an error in bot creation --- we are working on updating this as soon as possible"
          );
        }
      } else if (currentStep == 10) {
        setStepComponent(
          <CreateButton
            handleCancel={handleCancel}
            handleBack={handleBack}
            createBot={createBot}
            botId={botId}
          />
        );
        //hacemos un update al bot, le ponemos creation_status = 1
        await updateBotCreationStatus(botId);
      } else {
        setStepComponent(normalComponentForStep(currentStep));
      }
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      // Aquí puedes manejar el error como prefieras. Podrías establecer un estado de error,
      // mostrar un mensaje de error en la interfaz de usuario, etc.
    }
  };

  useEffect(() => {
    loadStepContent();
  }, [currentStep, botId]);

  const normalComponentForStep = (step) => {
    switch (currentStep) {
      case 1:
        return (
          <NameBot
            handleContinue={handleContinue}
            handleCancel={handleCancel}
            handleBack={handleBack}
            updateStepData={updateStepData}
            botId={botId}
          />
        );
      case 2:
        return (
          <BusinessName
            handleCancel={handleCancel}
            handleContinue={handleContinue}
            handleBack={handleBack}
            updateStepData={updateStepData}
            botId={botId}
          />
        );
      case 3:
        return (
          <BusinessDescription
            handleCancel={handleCancel}
            handleContinue={handleContinue}
            handleBack={handleBack}
            updateStepData={updateStepData}
            botId={botId}
          />
        );
      case 4:
        return (
          <BusinessUrl
            handleCancel={handleCancel}
            handleContinue={handleContinue}
            handleBack={handleBack}
            updateStepData={updateStepData}
            botId={botId}
          />
        );
      case 5:
        return (
          <PlatformSelect
            handleCancel={handleCancel}
            handleContinue={handleContinue}
            handleBack={handleBack}
            updateStepData={updateStepData}
            botId={botId}
          />
        );
      case 6:
        return (
          <AdditionalDetails
            handleCancel={handleCancel}
            handleContinue={handleContinue}
            handleBack={handleBack}
            updateStepData={updateStepData}
            botId={botId}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div>
      {!keyboardOpen && <NavBar />}
      {stepComponent}
    </div>
  );
};

export default CreateBot;
