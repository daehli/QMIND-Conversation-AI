import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const WebChat = props => {

  const [ webchat, setWebChat ] = useState(false)
    // I need to wait for the script to be loaded before executing the webchat .init
    // Creating the webchat. If this thing doesn't work. I will GO to Couche-tard to give my Resume 
    useEffect(() => {
        const webChatScript = document.createElement('script')
        webChatScript.src = `${props.host}/assets/modules/channel-web/inject.js`
        webChatScript.addEventListener('load',() => setWebChat(true))
        document.body.appendChild(webChatScript)
    }, [])

    useEffect(() => {
        if (!webchat) return;
        window.botpressWebChat.init({
            host: props.host,
            botId: props.botID,
            useSessionStorage: true,
            enablePersistHistory: false,
            hideWidget: false,
            avatarUrl: "https://www.nicepng.com/png/full/35-356045_microsoft-windows-compatible-icon-windows-95-logo-png.png",
            botName: "Microsoft - Paper Clip",
            extraStylesheet: `${props.host}/assets/modules/form-module/webchat-style.css`,
        });
        window.addEventListener("message", function (event) {
            if (event.data.name === "webchatReady") {
                window.botpressWebChat.sendEvent({
                    type: "proactive-trigger",
                    channel: "web",
                    payload: { text: "hi" },
                });
            }
        });
    }, [webchat]);
  return (
    <>
    </>
  )
}

WebChat.propTypes = {
  host: PropTypes.string.isRequired,
  botID: PropTypes.string.isRequired,
}

export default WebChat
