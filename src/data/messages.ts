import clients from "./clients";


type Message = {
  text: string,
  sender: string,
  timestamp: string,
  // TODO: Destination should be mandatory it is not for testing
  destination?: string,
}
type ChatMessages = {
  id: number,
  name: string,
  phone: string,
  address: string,
  messages: Message[]
}

const generateChatMessages = (clients: Client[]): ChatMessages[] => {
  return clients.map((client, index) => ({
    id: index + 1,
    name: client.name,
    phone: client.phone,
    address: client.address,
    messages: generateMessagesForClient(client)
  }));
};
const generateMessagesForClient = (client: Client): Message[] => {
  return [
    { text: "Oi!", sender: client.name, timestamp: "10:00 AM" },
    { text: "Quero comprar meu pedido recorrente", sender: client.name, timestamp: "10:01 AM" },
    { text: "Aqui está o código pix para pagamento", sender: "Drops", timestamp: "10:02 AM" },
  ];
};

const chatMessages = generateChatMessages(clients);

export default chatMessages;
