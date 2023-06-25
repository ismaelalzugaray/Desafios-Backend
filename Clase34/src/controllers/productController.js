import * as productServices from "../services/mongoDB/productsServices.js";
import { generateProducts } from "../../utils.js";

//OBTENEMOS TODOS LOS PRODUCTOS
export async function getProducts(req, res) {
  try {
    let { limit, page, sort, query } = req.query;
    const response = await productServices.getAll(limit, page, sort, query);
    res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    res.status(400).json(error.message);
  }
}

//OBTENEMOS PRODUCTOS POR ID
export async function getProductById(req, res) {
  try {
    const id = req.params.pid;
    const response = await productServices.getById(id);
    res.status(200).render("oneProduct", { response });
  } catch (error) {
    req.logger.error(error);
    res.status(400).json(error.message);
  }
}

//CREAMOS UN PRODUCTO
export async function createProduct(req, res) {
  try {
    const { body } = req;

    const response = await productServices.saveProduct(body);
    res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    res.status(400).json(error.message);
  }
}

//ACTUALIZAMOS UN PRODUCTO
export async function updateOne(req, res) {
  try {
    let id = req.params.pid;
    let body = req.body;
    const response = await productServices.updateProduct(id, body);
    res.status(200).send({
      status: "Success",
      message: "Producto actualizado con exito",
      payload: response,
    });
  } catch (error) {
    req.logger.error(error);
    res.status(400).json(error.message);
  }
}

//ELIMINAMOS UN PRODUCTO
export async function deleteOne(req, res) {
  try {
    let id = req.params.pid;
    let response = await productServices.deleteProduct(id);
    res.status(200).send({
      status: "Success",
      message: "Producto eliminado con exito",
      payload: response,
    });
  } catch (error) {
    req.logger.error(error);
    res.status(400).json(error.message);
  }
}

//GENERAMOS PRODUCTOS MOCKEADOS
export async function getMockingProducts(req, res) {
  try {
    let users = [];
    for (let i = 0; i < 100; i++) {
      users.push(generateProducts());
    }
    res.send({ status: "success", payload: users });
  } catch (error) {
    req.logger.error(error);
    res
      .status(500)
      .send({ error: error, message: "No se pudo obtener los usuarios:" });
  }
}
