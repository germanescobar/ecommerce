import { Button } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import { useSelector } from "react-redux"
import { useMercadoPago } from "../hooks"

function Cart() {
  const mercadopago = useMercadoPago(import.meta.env.VITE_MERCADOPAGO_KEY)
  const products = useSelector((state) => state.cart)
  const total = products.reduce((sum, p) => sum + p.price, 0)

  async function pay() {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: products.map((p) => p._id) }),
    })
    const data = await response.json()

    const checkout = mercadopago.checkout({
      preference: {
        id: data.preferenceId,
      },
      autoOpen: true,
    })
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>Carro de Compras</Card.Header>
      <ListGroup variant="flush">
        {products.map((product) => (
          <ListGroup.Item key={product._id} className="d-flex justify-content-between">
            {product.name}
            <span>${product.price}</span>
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <div className="d-flex justify-content-between fw-bold">
            Total: <span>${total}</span>
          </div>
          {total > 0 ? (
            <div className="text-center mt-3">
              <Button variant="primary" onClick={pay}>
                Ir a Pagar
              </Button>
            </div>
          ) : null}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default Cart
