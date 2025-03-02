import initializeDatabase from '../config/index.js';
const db = await initializeDatabase();

import path from "path";
import multer from "multer";

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  },
});
const upload = multer({ storage: storage });
const { extras } = db;
const Create_extras = async (req, res) => {
  const image = req.file ? req.file.filename : null;
  const { name, price, isMulti } = req.body;
  try {
    console.log(name);
    // Validate required fields
    if (!name || !price || !isMulti || !image) {
      return res.status(400).json({ message: "Pad req" });
    }
    // Create the new Extras entry in the database
    const newExtra = await extras.create({
      name: name,
      price: price,
      isMulti: isMulti, // Convert string to boolean if needed
      image: image, // Save filename of uploaded image
    });

    // Return the created entry
    return res.status(201).json(newExtra);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getAll = async (req, res) => {
  try {
    const query = await extras.findAll({ where: { isDeleted: false } });
    if (!query || query.length === 0) {
      return res.status(204).json({ message: `No content` });
    } else {
      return res.status(200).json(query);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getByKy = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await extras.findOne({
      where: { id: id },
    });
    if (!query || query.length === 0) {
      return res.status(204).json({ message: `No content` });
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
    const { name, price, isMulti } = req.body;
    // const image = req.file ? req.file.filename : null;
    const findExtra = await extras.findOne({ where: { id: id } });
    if (!findExtra || findExtra.length === 0) {
      return res.status(204).json({ message: `No Content` });
    } else {
      await extras.update(
        { name: name, price: price, isMulti: isMulti },
        { where: { id: id } }
      );
      return res.status(200).json({ message: `Updated` })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const delete_extra = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await extras.findOne({
      where: {
        id: id,
      },
    });
    if (!query || query.length === 0) {
      return res.status(204).json({ message: `No Content` });
    } else {
      await extras.destroy({ where: { id: id } });
      return res.status(200).json({ message: `success delete` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const editDeleted = async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    if (!id || isDeleted === undefined) {
      return res.status(400).json({ message: `Bad Request` });
    }
    else {
      const findOne = await extras.findOne({
        where: { id: id },
      });
      if (!findOne || findOne.length === 0) {
        return res.status(203).json({ message: `No Content` });
      } else {
        await extras.update(
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
export default { Create_extras, upload, getAll, getByKy, delete_extra, edit, editDeleted };
