import initializeDatabase from '../config/index.js';
const db = await initializeDatabase();
const { NeedToBeDone } = db;
const Create_needToBeDone = async (req, res) => {
  try {
    const { name, price, option } = req.body;
    if (!name || !price || !option) {
      return res.status(400).json({ massage: `pad request` });
    }
    const found = await NeedToBeDone.findOne({
      where: {
        name: name,
        price: price,
        option: option,
      },
    });
    if (found) {
      return res.status(401).json({ massage: `already exists` });
    } else {
      const created = await NeedToBeDone.create({
        name: name,
        price: price,
        option: option,
      });
      return res.status(201).json(created);
    }
  } catch (err) {
    return res.status(500).json({ massage: err.massage });
  }
};
const getAll = async (req, res) => {
  try {
    const query = await NeedToBeDone.findAll({
      where:{isDeleted:false}
    });
    if (!query || query.length === 0) {
      return res.status(203).json({ massage: `No Content` });
    }
    return res.status(200).json(query);
  } catch (err) {
    return res.status(500).json({ massage: err.massage });
  }
};
const getByKy = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await NeedToBeDone.findOne({
      where: {
        id: id,
      },
    });
    if (!query || query.length === 0) {
      return res.status(203).json({ massage: "No Content" });
    } else {
      return res.status(200).json(query);
    }
  } catch (err) {
    return res.status(500).json({ massage: err.massage });
  }
};
const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, option } = req.body;
    const findOne = await NeedToBeDone.findOne({
      where: {
        id: id,
      },
    });
    if (!findOne) {
      return res.status(203).json({ massage: `no content` });
    } else {
      const updateValue = await NeedToBeDone.update(
        {
          name: name,
          price: price,
          option: option,
        },
        { where: { id: id } }
      );
     if(updateValue) return res.status(200).json({massage:`edit Success `});
    }
  } catch (err) {
    return res.status(500).json({ massage: err.massage });
  }
};
const delete_need = async (req, res) => {
  try {
    const { id } = req.params;
    const find = await NeedToBeDone.findOne({
      where: {
        id: id,
      },
    });
    if (!find) {
      return res.status(203).json({ massage: `no content` });
    } else {
      await NeedToBeDone.destroy({ where: { id: id } });
      return res.status(200).json({ massage: `success delete` });
    }
  } catch (err) {
    return res.status(500).json({ massage: err.massage });
  }
};
const editDeleted=async(req,res)=>{
  try {
    const {id}=req.params;
    const {isDeleted}=req.body;
    if(!id || isDeleted===undefined){
        return res.status(400).json({ message: `Bad Request` });
    }
    else {
        const findOne = await NeedToBeDone.findOne({
          where: { id: id },
        });
        if (!findOne || findOne.length === 0) {
          return res.status(203).json({ message: `No Content` });
        } else {
          await NeedToBeDone.update(
            { isDeleted: isDeleted },
            { where: { id: id } }
          );
          return res.status(200).json({ message: `Updated` });
        }
      }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
export default { Create_needToBeDone, getAll, getByKy, edit, delete_need ,editDeleted};
