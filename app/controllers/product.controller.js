const models = require("../../models/index");

function insertProduct(req, res) {
  let form = req.body;
  models.Product.create(form);

  return res.send({ message: "Product data has been inserted", data: form });
}

async function listProduct(req, res) {
  const result = await models.Product.findAll();
  if (result.length < 1) {
    return res.status(204).send({ message: "List Product is empty" });
  }
  return res.send({ message: "Product is found", data: result });
}

function updateProduct(req, res) {
  let data = req.body;
  models.Product.update(data, { where: { id: req.params.id } });

  return res.send({ message: "Product has been updated", data: req.body });
}

function deleteProduct(req, res) {
  models.Product.destroy({ where: { id: req.params.id } });
  return res.send({ message: "Data Product has been deleted" });
}

module.exports = {
  insertProduct,
  listProduct,
  updateProduct,
  deleteProduct,
};
