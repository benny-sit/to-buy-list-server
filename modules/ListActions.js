const List = require('./List.js')
const bcrypt = require('bcrypt');

async function getList(req, res, next) {
    let list;
    if (!(req.body.name && req.body.password)) {
      return res.status(400).json({error: 'Missing list name'})
    } 
    try {
      list = await List.findOne({name: req.body.name});
      if (list === undefined || list === null || list.length === 0) { 
        return res.status(404).json({error: 'List not found'});
      }
      const validPassword = await bcrypt.compare(req.body.password, list.password);
      if (!validPassword && req.body.password !== list.password) {
        return res.status(401).json({error: 'Invalid password'});
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
    res.list = list;
    next();
  }

async function saveSender(req, res) {
  try {
      await res.list.save();
      return res.status(res.statusSuccess).json({items: res.list.items, updatedAt: res.list.updatedAt});
  } catch (e) {
      return res.status(500).json({ error: e.message})
  }
}

module.exports =  {
    getList,
    saveSender,
}