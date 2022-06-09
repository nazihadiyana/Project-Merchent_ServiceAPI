const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../../models/index");

async function login(req, res) {
  try {
    const results = await models.Merchant.findOne({
      where: { name: req.body.name },
    });
    if (results.length < 1) {
      return res.status(204).send({ message: "Data not found" });
    }

    if (!bcrypt.compareSync(req.body.password, results.password)) {
      return res.status(204).send({ message: "Name or password is wrong" });
    }
    const payload = {
      id: results.id,
      name: results.name,
    };
    const token = jwt.sign(payload, "secret", { expiresIn: "7d" });

    return res.send({ message: "Data is found", data: { token: token } });
  } catch (error) {
    return res.status(204).send({ message: "Data not found " });
  }
}

module.exports = {
  login,
};
