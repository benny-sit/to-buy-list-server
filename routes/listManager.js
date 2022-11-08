const express = require("express");
const List = require("../modules/List.js");
const {getList} = require("../modules/ListActions.js");
const bcrypt = require("bcrypt");

const router = express.Router();

const editor = require("./ListEditor.js");
router.use('/edit', editor);

router.post("/open", getList, (req, res) => {
  return res.json(res.list)
});

router.post("/create", async (req, res) => {

  if (!(req.body.name && req.body.password)) {
    return res.status(400).json({error: "Missing parameters"});
  }

  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(req.body.password, salt);

  const list = new List({
    name: req.body.name,
    password: password,
  });

  try {
    const newList = await list.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});


module.exports = router;
