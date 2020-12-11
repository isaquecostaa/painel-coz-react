import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
} from 'reactstrap';
import CardPedido from './CardPedido';
import { ActionBox } from '~/components/Styled';

import api from '~/services/api';

export default function Dashboard() {
  const [cards, setCards] = useState([]);

  async function UpdateListing() {
    const { data } = await api.get('getPedidosQueue.php');

    setCards(data);
  }

  useEffect(() => {
    UpdateListing();
  }, []);

  return (
    <>
      {cards.map((card) => (
        <div key={card.time}>
          <Row className="mb-3">
            <Col size="12">
              <Card>
                <CardHeader className="hi_bg-danger">
                  {card.time}

                  <ActionBox>{card.pedidos.length.toString().padStart(2, '0')} Pedidos</ActionBox>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          <Row>
            {card.pedidos.map((pedido) => (
              <CardPedido key={pedido.id} pedido={pedido} update={UpdateListing}/>
            ))}
          </Row>
        </div>
      ))}
    </>
  );
}
