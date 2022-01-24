import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import Product from "./models/product.js"
import Order from "./models/order.js"
import mercadopago from "mercadopago"

const router = express.Router()

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find({})
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

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
})

router.post("/orders", async (req, res, next) => {
  const products = req.body
  try {
    for (let i = 0; i < products.length; i++) {
      const product = await Product.findById(new mongoose.Types.ObjectId(products[i])).lean()
      products[i] = product
    }
    const items = products.map((product) => ({ title: product.name, unit_price: product.price, quantity: 1 }))
    const { response } = await mercadopago.preferences.create({ items })
    const order = await Order.create({ products })
    res.json({ order, preferenceId: response.id })
  } catch (error) {
    next(error)
  }
})

export default router
