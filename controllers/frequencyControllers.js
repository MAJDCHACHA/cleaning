import db from "../config/index.js";
const { frequency } = db;
const create_frequency = async (req, res) => {
  try {
    const { name, discount } = req.body;
    if (!name || !discount) {
      return res.status(400).json({ message: `Bad Request` });
    }

    const foundFrequency = await frequency.findOne({
      where: {
        name: name,
        discount: discount,
      },
    });

    if (foundFrequency) {
      return res.status(401).json({ message: `Already exists` });
    } else {
      const newFrequency = await frequency.create({
        name,
        discount,
      });
      return res.status(201).json(newFrequency);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getAll = async (req, res) => {
  try {
    const query = await frequency.findAll({
      where:{isDeleted:false}
    });
    if (!query || !query.length === 0) {
      return res.status(203).json({ message: `No Content` });
    }
    return res.status(200).json(query);
  } catch (err) {
    return res.status(500).json({ massage: err.massage });
  }
};
const getByKy = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await frequency.findOne({
      where: { id: id },
    });
    if (!query || query.length === 0) {
      return res.status(203).json({ message: `No Content` });
    }
    return res.status(200).json(query);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, discount } = req.body;
    const query = await frequency.findOne({
      where: { id: id },
    });
    if (!query || query.length === 0) {
      return res.status(203).json({ message: `No Content` });
    } else {
      await frequency.update(
        { name: name, discount: discount },
        { where: { id: id } }
      );
      return res.status(200).json({ message: `Updated` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const delete_frequency = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await frequency.findOne({
      where: { id: id },
    });
    if (!query || query.length === 0) {
      return res.status(203).json({ message: `No Content` });
    } else {
      await frequency.destroy({ where: { id: id } });
      return res.status(200).json({ massage: `success delete` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
        const findOne = await frequency.findOne({
          where: { id: id },
        });
        if (!findOne || findOne.length === 0) {
          return res.status(203).json({ message: `No Content` });
        } else {
          await frequency.update(
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
export default {
  create_frequency,
  getAll,
  getByKy,
  edit,
  delete_frequency,
  editDeleted
};
