import mongoose from "mongoose"

const schema = new mongoose.Schema({
  date: { type: Date, default: () => new Date() },
  payload: Object,
})

export default mongoose.model("Charge", schema)
