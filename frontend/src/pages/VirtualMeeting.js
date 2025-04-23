import React, { useEffect } from "react";

function VirtualMeeting({ roomName = "PetConnectMeeting" }) {
  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName,
      width: "100%",
      height: 500,
      parentNode: document.getElementById("jitsi-container"),
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        DEFAULT_BACKGROUND: "#1f1f1f",
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_CHROME_EXTENSION_BANNER: false,
      },
      configOverwrite: {
        disableDeepLinking: true,
      },
    };

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.onload = () => {
      new window.JitsiMeetExternalAPI(domain, options);
    };
    document.body.appendChild(script);

    return () => {
      document.getElementById("jitsi-container").innerHTML = "";
    };
  }, [roomName]);

  return (
    <div style={{ padding: "30px", backgroundColor: "#111", color: "#f5c518" }}>
      <h2>🔗 Join Virtual Appointment</h2>
      <p>Connecting securely via Jitsi Meet...</p>
      <div id="jitsi-container" style={{ borderRadius: "8px", overflow: "hidden" }}></div>
    </div>
  );
}

export default VirtualMeeting;
