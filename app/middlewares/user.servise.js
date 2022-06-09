const config = require("../../config/config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const db = require("../../models/merchant");
const modelsUser = require("../../models/index");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ name, password }) {
  const merchant = await modelsUser.Merchant.scope("withProduct_id").findOne({
    where: { name },
  });

  if (!merchant || !(await bcrypt.compare(password, merchant.hash)))
    throw "name or password is incorrect";

  // authentication successful
  const token = jwt.sign({ sub: merchant.id }, config.secret, {
    expiresIn: "7d",
  });
  return { ...omitHash(merchant.get()), token };
}

async function getAll() {
  return await modelsUser.Merchant.findAll();
}

async function getById(id) {
  return await getMerchant(id);
}

async function create(params) {
  // validate
  if (await modelsUser.Merchant.findOne({ where: { name: params.name } })) {
    throw 'Name "' + params.name + '" is already taken';
  }

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // save user
  await modelsUser.Merchant.create(params);
}

async function update(id, params) {
  const merchant = await getMerchant(id);

  // validate
  const usernameChanged = params.name && merchant.name !== params.name;
  if (
    usernameChanged &&
    (await modelsUser.Merchant.findOne({ where: { name: params.name } }))
  ) {
    throw 'name "' + params.name + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(merchant, params);
  await merchant.save();

  return omitHash(merchant.get());
}

async function _delete(id) {
  const merchant = await getMerchant(id);
  await merchant.destroy();
}

// helper functions

async function getMerchant(id) {
  const merchant = await modelsUser.Merchant.findByPk(id);
  if (!merchant) throw "User not found";
  return merchant;
}

function omitHash(merchant) {
  const { hash, ...merchantWithoutHash } = merchant;
  return merchantWithoutHash;
}
