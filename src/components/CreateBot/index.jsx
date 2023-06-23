import AdditionalDetails from './AdditionalDetails';
import { React, useState, useEffect, useRef }  from 'react';
import BusinessDescription from './BusinessDescription';
import BusinessName from './BusinessName';
import CategorySelect from './CategorySelect';
import NameBot from './NameBot';
import UploadProducts from './UploadProducts';
import { useNavigate } from 'react-router-dom';
import BusinessUrl from './BusinessUrl';
import WhatsappKeys from './WhatsappKeys';
import TelegramKeys from './TelegramKeys';
import PlatformSelect from './PlatformSelect';
import { isLoggedIn } from '../../utils/auth'
import CreateButton from './CreateButton';
import { NavBar } from '../NavBar';

const CreateBot = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [stepData, setStepData] = useState({});
    const [botId, setBotId] = useState(null);
    const loggedInUserEmail = localStorage.getItem('email');
    const [stepComponent, setStepComponent] = useState(null);
    const [shouldContinue, setShouldContinue] = useState(false);
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
    async function getPlatforms(botId){
        return new Promise(async (resolve, reject) => {
            let platforms = {};
            try {
            const response = await fetch("http://localhost:3001/getPlatforms", {
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
                platforms = { botId: data.botId, whatsappSelected: data.whatsappSelected, telegramSelected: data.telegramSelected };
            } else {
                console.error(
                "Error getting the bot id of a bot the user was creating:",
                data.error
                );
                reject()
            }
            } catch (error) {
                reject()
    
            }
            resolve(platforms);
        });
    }

    function createBot(botId){
        return new Promise(async (resolve, reject) => {
            try {
            const response = await fetch("http://localhost:3001/createPrompt", {
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
                reject()
            }
            } catch (error) {
                reject()
    
            }
            navigate('/my-bots');
            resolve();
        });
    }

  async function updateBotCreationStatus(botId) { 
    return new Promise(async (resolve, reject) => {
        try {
        const response = await fetch("http://localhost:3001/updateBotCreationStatus", {
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
            reject()
        }
        } catch (error) {
            reject()

        }
        resolve();
    });
  }

  async function getCurrentEditingBotInfo(userEmail) {
    return new Promise(async (resolve, reject) => {
        let botInfo = {};
        try {
        const response = await fetch("http://localhost:3001/getBotId", {
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
            botInfo = { botId: data.botId, currentStep: data.currentStep };
        } else {
            console.error(
            "Error getting the bot id of a bot the user was creating:",
            data.error
            );
            reject()
        }
        } catch (error) {
            reject()

        }
        resolve(botInfo);
    });
}



useEffect(() => {
    if (isLoggedIn()) {
      getCurrentEditingBotInfo(loggedInUserEmail).then(async (botInfo) => {
        if (botInfo.botId && botInfo.currentStep && botInfo.botId !== null) {
          setBotId(botInfo.botId);
          const actualStep = parseInt(botInfo.currentStep)
          changeCurrentStep(actualStep)
        } else { 
            setBotId(null);
            changeCurrentStep(1);
        }
      });
    } else {
      // Redirect user to the login page if not logged in
      navigate("/");
    }
  }, []);

    const updateStep = async (currentStep, botId) => {
        try {
            const response = await fetch('http://localhost:3001/updateStep', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ step: currentStep, botId}),
            });

            if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                console.log(`Step ${currentStep} updated successfully`);
            } else {
            console.error(`Error updating current step: ${currentStep} in database:`, data.error);
            }
        } catch (error) {
            console.error(`Error updating current step: ${currentStep} in database:`, error.message);
        }
    }

    const createInitialBotRecord = async () => {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await fetch('http://localhost:3001/createInitialBotRecord', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({userEmail: loggedInUserEmail})
            });
            if (!response.ok) {
              throw new Error(`HTTP error ${response.status}`);
            }
            const data = await response.json();
            if (data.success) {
              resolve(data.botId);
            } else {
              console.error('Error creating initial bot record:', data.error);
              reject(data.error);
            }
          } catch (error) {
            console.error('Error creating initial bot record:', error.message);
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
          if (currentStep == 6 || currentStep == 7){
            const platforms = await getPlatforms(botId);
            if(currentStep == 6){
                if (platforms.telegramSelected == 1){
                    changeCurrentStep(currentStep + 1);
                } else {
                    changeCurrentStep(currentStep + 2);
                }
            } else if (currentStep == 7){
                if (platforms.whatsappSelected == 1){
                    changeCurrentStep(currentStep + 1);
                } else {
                    changeCurrentStep(currentStep + 2);
                }
            }
          } 

          var newBotId;
          if (currentStep === 1 && botId === null) {
            newBotId = await createInitialBotRecord();
            setBotId(newBotId);
          }
    
          const botIdToUse = currentStep === 1 ? (botId === null ? newBotId : botId) : botId;
          try {
            const response = await fetch('http://localhost:3001/saveBotStep', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ step: currentStep, botId: botIdToUse, stepData }),
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
    

    
    const handleCancel = () => {
        setStepData({});
        // Navigate back to the initial step
        changeCurrentStep(1);
        navigate('/my-bots');
    };

    const handleBack = async () => {
        if (currentStep == 8 || currentStep == 9){
            const platforms = await getPlatforms(botId);
            if(currentStep == 9){
                if (platforms.whatsappSelected == 1){
                    changeCurrentStep(currentStep - 1);
                } else {
                    changeCurrentStep(currentStep - 2);
                }
            } else if (currentStep == 8){
                if (platforms.telegramSelected == 1){
                    changeCurrentStep(currentStep - 1);
                } else {
                    changeCurrentStep(currentStep - 2);
                }
            }
        } else {
            changeCurrentStep(currentStep - 1);
        }
    }

    const loadStepContent = async () => {
        if (currentStep === 7 || currentStep === 8) { 
            if (botId !== null){ 
                const platforms = await getPlatforms(botId);
                if (platforms) {
                    if (currentStep === 7 && platforms.telegramSelected == 1) {
                        setStepComponent(
                            <TelegramKeys handleCancel={handleCancel} handleContinue={handleContinue} handleBack={handleBack} updateStepData={updateStepData} botId={botId}/>
                          );
                          
                    } else if (currentStep === 8 && platforms.whatsappSelected ==1){
                        setStepComponent(
                            <WhatsappKeys handleCancel={handleCancel} handleContinue={handleContinue} handleBack={handleBack} updateStepData={updateStepData} botId={botId}/>
                          );
                    }  
                  } else { 
                    alert('Please select a platform to continue!')
                    return;
                  }
            } else {
                alert('There is an error in bot creation --- we are working on updating this as soon as possible')
            }
        } else if (currentStep == 9) {
            setStepComponent(
                <CreateButton handleCancel={handleCancel} handleBack={handleBack} createBot={createBot} botId={botId}/>
                );
                  //hacemos un update al bot, le ponemos creation_status = 1
                await updateBotCreationStatus(botId);
        } else {
            setStepComponent(normalComponentForStep(currentStep));
        }
      };



      useEffect(() => {
        loadStepContent();
      }, [currentStep, botId]);

    const normalComponentForStep = (step) => {
        switch (currentStep) {
            case 1:
                return (
                    <NameBot handleCancel={handleCancel} handleContinue={handleContinue} handleBack={handleBack} updateStepData={updateStepData} botId={botId}/>
                );
            case 2:
                return (
                    <BusinessName handleCancel={handleCancel} handleContinue={handleContinue} handleBack={handleBack} updateStepData={updateStepData} botId={botId}/>
                );
            case 3:
                return (
                    <BusinessDescription handleCancel={handleCancel} handleContinue={handleContinue} handleBack={handleBack} updateStepData={updateStepData} botId={botId}/>
                );
            case 4: 
                return (
                    <BusinessUrl handleCancel={handleCancel} handleContinue={handleContinue} handleBack={handleBack} updateStepData={updateStepData} botId={botId}/>
                );
            case 5: 
                return (
                    <PlatformSelect handleCancel={handleCancel} handleContinue={handleContinue} handleBack={handleBack} updateStepData={updateStepData} botId={botId}/>
                );
            case 6: 
                return (
                    <AdditionalDetails handleCancel={handleCancel} handleContinue={handleContinue} handleBack={handleBack} updateStepData={updateStepData} botId={botId}/>
                );
          default:
            return null;
        }
      };
      return <div><NavBar/>{stepComponent}</div>;
};

export default CreateBot; 
