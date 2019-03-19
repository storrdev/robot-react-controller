self.isPressed = [];

self.interval;

self.addEventListener('message', e => {
  const { command, data } = e.data;

  switch (command) {
    case 'connect':
      self.socket = new WebSocket('ws://localhost:9001');

      self.socket.addEventListener('open', handleSocketOpen);
      self.socket.addEventListener('message', handleSocketMessage);

      console.log('starting loop worker loop');
      self.interval = self.setInterval(loop, 30);
      break;
    case 'disconnect':
      self.clearInterval(self.interval);
      break;
    case 'keydown':
      if (!self.isPressed.includes(data)) {
        self.isPressed.push(data);
      }
      break;
    case 'keyup':
      self.isPressed.splice(self.isPressed.indexOf(data), 1);
      break;
    default:
      break;
  }
});

const handleSocketOpen = e => {
  postMessage('connected');
  self.socket.send('Hello Server!');
}

const handleSocketMessage = e => {
  console.log('Message from server', e.data);
}

const loop = () => {
  if (self.isPressed.length > 0) {
    self.socket.send(self.isPressed);
  }
};