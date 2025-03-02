import initializeDatabase from '../config/index.js';
const db = await initializeDatabase();
const { available_time } = db;
const create_available_time = async (req, res) => {
  try {
    const { text, isBlocked } = req.body;

    // Check for missing fields
    if (!text || isBlocked === undefined) {
      return res.status(400).json({ message: `Bad Request` });
    }

    // Create the record
    const created_time = await available_time.create({ text, isBlocked });
    return res.status(200).json(created_time);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getAll = async (req, res) => {
  try {
    const foundAll = await available_time.findAll({
      where:{isDeleted:false}
    });
    if (foundAll && foundAll.length > 0) {
      return res.status(200).json(foundAll);
    } else {
      return res.status(203).json({ message: `No Content` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await available_time.findOne({
      where: {
        id: id,
      },
    });
    if (!query || query.length === 0) {
      return res.status(203).json({ message: `No Content` });
    } else {
      return res.status(200).json(query);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, isBlocked } = req.body;
    if (!id || !text || isBlocked===undefined) {
      return res.status(400).json({ message: `Bad Request` });
    } else {
      const findOne = await available_time.findOne({
        where: { id: id },
      });
      if (!findOne || findOne.length === 0) {
        return res.status(203).json({ message: `No Content` });
      } else {
        await available_time.update(
          { text: text, isBlocked: isBlocked },
          { where: { id: id } }
        );
        return res.status(200).json({ message: `Updated` });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const editBlocked = async (req, res) => {
  try {
    const {id}=req.params;
    const {isBlocked}=req.body;
    if(!id || isBlocked===undefined){
        return res.status(400).json({ message: `Bad Request` });
    }
    else {
        const findOne = await available_time.findOne({
          where: { id: id },
        });
        if (!findOne || findOne.length === 0) {
          return res.status(203).json({ message: `No Content` });
        } else {
          await available_time.update(
            { isBlocked: isBlocked },
            { where: { id: id } }
          );
          return res.status(200).json({ message: `Updated` });
        }
      }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const delete_time = await available_time.destroy({
      where: { id: id },
    });
    if (delete_time) {
      return res.status(200).json({ message: `Deleted` });
    } else {
      return res.status(203).json({ message: `No Content` });
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
        const findOne = await available_time.findOne({
          where: { id: id },
        });
        if (!findOne || findOne.length === 0) {
          return res.status(203).json({ message: `No Content` });
        } else {
          await available_time.update(
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
  create_available_time,
  getAll,
  getById,
  edit,
  editBlocked,
  deleteById,
  editDeleted
};
