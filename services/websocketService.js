// Initialize and manage the WebSocket connection

export const initializeRoom = async () => {
  try {
    const room = new WebsimSocket();
    
    // Set up event listeners if needed
    room.onmessage = (event) => {
      const data = event.data;
      switch (data.type) {
        case "connected":
          console.log(`Client ${data.clientId} (${data.username}) connected`);
          break;
        case "disconnected":
          console.log(`Client ${data.clientId} (${data.username}) disconnected`);
          break;
        default:
          console.log("Received event:", data);
      }
    };
    
    return room;
  } catch (error) {
    console.error("Failed to initialize WebSocket:", error);
    throw error;
  }
};

