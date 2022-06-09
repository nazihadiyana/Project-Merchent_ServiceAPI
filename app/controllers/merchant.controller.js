const models = require("../../models/index");

function insertMerchant(req, res) {
  let form = req.body;
  models.Merchant.create(form);

  return res.send({ message: "Merchant data has been inserted", data: form });
}

async function listMerchant(req, res) {
  const result = await models.Merchant.findAll();
  if (result.length < 1) {
    return res.status(204).send({ message: "Data is found" });
  }
  return res.send({ message: "Data is found", data: result });
}

function updateMerchant(req, res) {
  let data = req.body;
  models.Merchant.update(data, { where: { id: req.params.id } });

  return res.send({
    message: "Data Merchant has been updated",
    data: req.body,
  });
}

function deleteMerchant(req, res) {
  models.Merchant.destroy({ where: { id: req.params.id } });
  return res.send({ message: "Data Merchant has been deleted" });
}

module.exports = {
  insertMerchant,
  listMerchant,
  updateMerchant,
  deleteMerchant,
};
