import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../config';
const useTextFieldData = (botId, step) => {
    const [textFieldValue1, setTextFieldValue1] = useState("");
    const [textFieldValue2, setTextFieldValue2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextField1Change = (event) => {
    if(event.target.value !== null) setTextFieldValue1(event.target.value);
  };

  const handleTextField2Change = (event) => {
    if(event.target.value !== null) setTextFieldValue2(event.target.value);
  };

  useEffect(() => {
    const getTextFieldData = async (botId, step) => {
        return await new Promise(async (resolve, reject) => {
        setIsLoading(true);
              let textFieldData = {};
              try {
                  const response = await fetch(`${BACKEND_URL}/getTextFieldData`, {
                      method: "POST",
                      headers: {
                      "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ step: step, botId }),
                  });

                  if (!response.ok) {
                    setTextFieldValue1('');
                    setTextFieldValue2('');
                    resolve()
                  }

                  const data = await response.json();

                  if (data.success) {
                      console.log(data);
                      if (data.textFieldData1 !== undefined && data.textFieldData1 !== null){
                        setTextFieldValue1(data.textFieldData1);
                      }
                      if (data.textFieldData2 !== undefined  && data.textFieldData2 !== null) { 
                        setTextFieldValue2(data.textFieldData2);
                      }
                      resolve()
                  } else {
                      console.error(
                      "Error getting the bot id of a bot the user was creating:",
                      data.error
                      );
                      reject(data.error)
                  }
              } catch (error) {
                //alert('hubo un error al obtener los datos de tu bot -- getTextFieldData')   
                reject(error.message)       
              }
              setIsLoading(false);	
            });
          } 
          
      getTextFieldData(botId, step);
        
    }, [botId, step]);
  return { textFieldValue1, textFieldValue2, handleTextField1Change, handleTextField2Change, isLoading };
}

export default useTextFieldData;