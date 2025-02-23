// import user from "../models/user.js";
// const getAll = async (req, res) => {
//   try {
//     const foundAll = await user.find();
//     // const foundAll=await user.find().select('-password')
//     if (!foundAll || foundAll.length === 0) {
//       return res.status(203).json({ massage: `is empty` });
//     } else {
//       return res.status(200).json(foundAll);
//     }
//   } catch (err) {
//     return res.status(500).json({massage:err.message});
//   }
// };
// export default  {getAll};
import db from '../config/index.js';
const { User } = db;

const getAll = async (req, res) => {
  try {
    // Fetch all users from the database
    const foundAll = await User.findAll({
      // Exclude the password field from the results
      attributes: { exclude: ['password'] },
    });

    if (!foundAll || foundAll.length === 0) {
      return res.status(203).json({ message: `No users found` });
    } else {
      return res.status(200).json(foundAll);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default { getAll };