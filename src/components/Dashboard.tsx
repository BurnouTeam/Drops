import { orders } from '../data/orders';
import Header from './Header'
import Column from './Column';

const Dashboard = () => {
  return (
    <div className="bg-gray-100">
      <div className="px-8">
        <div className="grid grid-cols-3 gap-4">
          <Column title="Pedidos Pendentes" color="#4d8bea" orders={orders.pending} kind="pending"/>
          <Column title="Pedidos Enviados" color="#f99236" orders={orders.shipped} kind="shipped" />
          <Column title="Pedidos Concluídos" color="#14B891" orders={orders.completed} kind="completed"/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
