import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionName = "products";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },

  description: { type: String, required: true },

  price: { type: Number, required: true },

  code: { type: String, required: true, unique: true },

  stock: { type: Number, required: true },

  category: { type: String, required: true },

  status: { type: Boolean, required: true },
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(collectionName, productSchema);

export default productModel;
