import Pusher from 'pusher-js/react-native';

// Initialize Pusher only once
const pusher = new Pusher('ca0c5969f7eba00b9c48', {
  cluster: 'ap2',
  // encrypted: true, // Ensure encrypted is set to true for secure connections
});

const subscribeToChannel = ({channelName, eventName, callback}:any) => {
  const channel = pusher.subscribe(channelName);
  channel.bind(eventName, callback);
  
  return () => {
    channel.unbind_all();
    pusher.unsubscribe(channelName);
  };
};

export default subscribeToChannel;