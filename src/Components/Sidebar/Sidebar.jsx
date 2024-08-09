import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/context";

const Sidebar = () => {
  const{onSent,SetPrevprompt,prevPrompt,SetRecentPrompt,newChat}=useContext(Context)
 
    const[extended,SetExtended]=useState(false)

    const ChangeExtended=()=>{
        SetExtended(prevValue=>!prevValue)
    }
    const loadPrompt=async(prompt)=>{
      SetRecentPrompt(prompt)
      await onSent(prompt)
    }

  return (
    <div className="sidebar">
      <div className="top">
        <img className="menu" onClick={()=>{ChangeExtended()}} src={assets.menu_icon} alt="" />
        <div onClick={()=>{newChat()}} className="new-chat">
          <img src={assets.plus_icon} alt="" />
         {extended===true?<p>New Chat</p>:null} 
        </div>

        {extended===true?
        <div className="recent">
        <p className="recent-title">Recent</p>
        {prevPrompt.map((item,index)=>{
          return (
            <div onClick={()=>{loadPrompt(item)}}className="recent-entry">
            <img src={assets.message_icon} alt="" />
            <p>{item.slice(0,18)}...</p>
          </div>
          )

        })}
       
      </div>
      :null}
        
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
           {extended===true?<p>Help</p>:null} 
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended===true?<p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended===true?<p>Setting</p>:null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
