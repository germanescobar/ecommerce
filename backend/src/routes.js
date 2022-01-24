import express from "express"
import mongoose from "mongoose"
import Product from "./models/product.js"
import Order from "./models/order.js"
import mercadopago from "mercadopago"
mercadopago.configure({
  access_token: process.env.ACCESS_MP_TOKEN,
})
const router = express.Router()

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (e) {
    next(e)
  }
})

router.post("/products", async (req, res, next) => {
  try {
    const { name, description, price, image } = req.body
    const product = await Product.create({ name, description, price, image })
    res.json(product)
  } catch (e) {
    next(e)
  }
})

router.post("/orders", async (req, res, next) => {
  const { products } = req.body
  try {
    for (let i = 0; i < products.length; i++) {
      products[i] = await Product.findById(new mongoose.Types.ObjectId(products[i])).lean()
    }
    const order = await Order.create({ products })
    const items = products.map((p) => ({ title: p.name, unit_price: p.price, quantity: 1 }))

    // crear la preferencia de MercadoPago
    const { response } = await mercadopago.preferences.create({ items })
    res.json({ order, preferenceId: response.id })
  } catch (e) {
    next(e)
  }
})

export default router
