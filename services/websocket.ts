// Usage: instantiate if one doesn't exist -> setupConnection

export default class ChatroomWebsocket {
  websocket: WebSocket | null;

  constructor() {
    this.websocket = null;
  }

  setupConnection = () => {
    this.websocket = new WebSocket('ws://localhost:3123/websocket');
    this.websocket.onopen = () => {
      console.log('Websocket connected');
    };

    this.websocket.onclose = () => {
      console.log('Websocket closed');
    };

    this.websocket.onmessage = (res) => {
      console.log('Message received from server:', res.data);
      // Possible fixes: 
        // returnMessage below
        // messages as context
        // state here (refactor to functional .tsx) 
    };

    this.websocket.onerror = (err) => {
      console.log(err, 'err');
    };
  };

  closeConnection = () => {
    this.websocket?.close();
  };

  // returnMessage = () => {
  //   console.log('george');
  //   if (this.websocket) {
  //     this.websocket.onmessage = (res) => {
  //       return res.data.toString();
  //     };
  //   }
  //   return '';
  // };

  sendMessage = (message: string) => {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(message);
    } else {
      console.log('Websocket not open or not ready');
    }
  };
}
