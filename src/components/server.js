const mesaChannel = io => {
    io.on("connection", socket => {
      console.log("New client connected to mesa channel");
  
      socket.on("mesa:update", mesa => {
        io.emit("mesa:update", mesa);
      });
  
      socket.on("disconnect", () => {
        console.log("Client disconnected from mesa channel");
      });
    });
  };
  
  module.exports = {
    mesaChannel
  };
  