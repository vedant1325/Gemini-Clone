import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, Setinput] = useState("");
  const [recentPrompt, SetRecentPrompt] = useState("");
  const [prevPrompt, SetPrevprompt] = useState([]);
  const [showResult, SetShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delapPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat=()=>{
    setLoading(false);
    SetShowResult(false)
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    SetShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      SetRecentPrompt(prompt);
    } else {
      SetPrevprompt((prev) => [...prev, input]);
      SetRecentPrompt(input);
      response=await run(input)
    }

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    //replacing star with </br> tag
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      let nextWord = newResponseArray[i];
      delapPara(i, nextWord + " ");
    }
    setLoading(false);
    Setinput("");
  };

  const contextValue = {
    prevPrompt,
    SetPrevprompt,
    onSent,
    setLoading,
    setResultData,
    resultData,
    loading,
    showResult,
    recentPrompt,
    SetRecentPrompt,
    input,
    Setinput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
