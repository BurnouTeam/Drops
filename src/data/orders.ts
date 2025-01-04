import clients from "./clients";
import products from "./products";

function createRandomOrders(
  quantity: number,
  products: Product[],
  clients: Client[]
): Order[] {
  const paymentMethods = ["Pix", "Cartão de Crédito", "Dinheiro"];
  const orders: Order[] = [];

  for (let i = 0; i < quantity; i++) {
    // Randomly select a product with available stock
    const availableProducts = products.filter((product) => product.quantity > 0);
    if (availableProducts.length === 0) {
      throw new Error("No products with stock available.");
    }
    const product = availableProducts[Math.floor(Math.random() * availableProducts.length)];

    // Randomly select a client
    const client = clients[Math.floor(Math.random() * clients.length)];

    // Generate random payment method and time
    const randomPayment = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const randomTime = `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(
      Math.floor(Math.random() * 60)
    ).padStart(2, "0")}`;
    const orderId = `${Math.floor(10000 + Math.random() * 90000)}`;

    const quantity = 1 + Math.floor(Math.random() * 10);

    // Create the order
    orders.push({
      orderId,
      quantity: quantity,
      product: `${product.name} ${product.type}`,
      customer: client.name,
      phone: client.phone,
      address: client.address,
      price: product.value * quantity,
      payment: randomPayment,
      time: randomTime,
    });

    // Decrement stock
    product.quantity -= 1;
  }

  return orders;
}

export const orders: OrderContainer = {
  pending: createRandomOrders(10, products, clients),
  shipped: createRandomOrders(2, products, clients),
  completed: createRandomOrders(1, products, clients),
};
