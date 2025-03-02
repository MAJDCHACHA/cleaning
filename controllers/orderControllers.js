import initializeDatabase from '../config/index.js';
const db = await initializeDatabase();

const { orders, order_extra, order_need, extras, NeedToBeDone,User } = db;
const Create_order = async (req, res) => {
  const {
    first_name,
    last_name,
    E_mail,
    address,
    country,
    phone,
    name_services,
    id_user,
    frequency,
    date,
    available_time,
    need,
    extras,
  } = req.body;

  // Validate required fields
  if (
    (!first_name ||
      !last_name ||
      !E_mail ||
      !address ||
      !country ||
      !phone ||
      !id_user ||
      !frequency ||
      !date ||
      !available_time,
    !name_services)
  ) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Insert into Orders
    const newOrder = await orders.create({
      first_name,
      last_name,
      E_mail,
      address,
      country,
      phone,
      id_user,
      name_services,
      frequency,
      date,
      available_time,
    });

    // Insert into order_need if `need` array is provided
    if (need && need.length > 0) {
      const orderNeedsData = need.map((n) => ({
        id_order: newOrder.id,
        id_need: n.id,
        option: n.option, // Assuming `option` is a valid field in `order_need`
      }));
      await order_need.bulkCreate(orderNeedsData);
    }

    // Insert into order_extra if `extras` array is provided
    if (extras && extras.length > 0) {
      const orderExtrasData = extras.map((e) => ({
        id_order: newOrder.id,
        id_extra: e.id,
        count:e.count
      }));
      await order_extra.bulkCreate(orderExtrasData);
    }

    // Respond with success
    return res.status(201).json({
      message: "Order created successfully",
      orderId: newOrder.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error creating order: ${error.message}` });
  }
};
const edit_order = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      E_mail,
      address,
      country,
      phone,
      name_services,
      id_user,
      frequency,
      date,
      available_time,
      need,
      extras,
    } = req.body;

    // Validate required fields
    if (
      !first_name ||
      !last_name ||
      !E_mail ||
      !address ||
      !country ||
      !phone ||
      !id_user ||
      !frequency ||
      !date ||
      !available_time ||
      !name_services
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Find the order
    const findOrder = await orders.findByPk(id);
    if (!findOrder) {
      return res.status(203).json({ message: "No Content" });
    }

    // Update the order
    await orders.update(
      {
        first_name,
        last_name,
        E_mail,
        address,
        country,
        phone,
        name_services,
        id_user,
        frequency,
        date,
        available_time,
      },
      { where: { id_user } }
    );

    // Update extras
    if (extras && Array.isArray(extras)) {
      // Delete old extras for this order
      await order_extra.destroy({ where: { id_order: id } });

      // Add new extras
      const extraData = extras.map((extra) => ({
        id_order: id,
        id_extra: extra.id, // Ensure this matches the `order_extra` table schema
      }));
      await order_extra.bulkCreate(extraData);
    }

    // Update needs
    if (need && Array.isArray(need)) {
      // Delete old needs for this order
      await order_need.destroy({ where: { id_order: id } });

      // Add new needs
      const needsData = need.map((needItem) => ({
        id_order: id,
        id_need: needItem.id, // Ensure this matches the `order_need` table schema
        option:needItem.option
      }));
      await order_need.bulkCreate(needsData);
    }

    // Success response
    return res
      .status(200)
      .json({ message: "Order updated successfully", id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const delete_order = async (req, res) => {
  try {
    const { id } = req.params;
    const findOrder = await orders.findByPk(id);
    if (!findOrder) {
      return res.status(203).json({ message: `no content` });
    } else {
      await order_extra.destroy({ where: { id_order: id } });
      await order_need.destroy({ where: { id_order: id } });
      await orders.destroy({ where: { id: id } });
      return res.status(200).json({ message: `delete Success` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// const get_order = async (req, res) => {
//   try {
//     const findAll = await orders.findAll({
//       attributes: [
//         "id",
//         "first_name",
//         "last_name",
//         "E_mail",
//         "phone",
//         "address",
//         "country",
//         "available_time",
//         "date",
//         "frequency",
//         "name_services",
//       ],
//       include: [
//         {
//           model: extras,
//           as: "extras",
//           through: { attributes: [] },
//           attributes: ["id", "name", "image", "price"],
//         },
//         {
//           model: NeedToBeDone,
//           as: "needs", // Use the alias defined in your association
//           through: { attributes: [] },
//           attributes: ["id", "name", "option"],
//         },
//         {
//           model:User,
//           as:'user',
//           through: { attributes: [] },
//           attributes: ["id", "first_name", "last_name"],
//         }
//       ],
//     });

//     const formattedData = findAll.map((order) => ({
//       id_order: order.id,
//       first_name: order.first_name,
//       last_name: order.last_name,
//       E_mail: order.E_mail,
//       phone: order.phone,
//       address: order.address,
//       country: order.country,
//       available_time: order.available_time,
//       date: order.date,
//       frequency: order.frequency,
//       name_services: order.name_services,
//       extras: order.extras.map((extra) => ({
//         id: extra.id,
//         nameExtra: extra.name,
//         img: extra.image,
//         price: extra.price,
//       })),
//       needToBeDone: order.needs.map((done) => ({
//         id: done.id,
//         nameDone: done.name,
//         option: done.option,
//       })),
//       user:order.user.map((user) => ({
//         id:user.id,
//         name:user.first_name 
//       }))
//     }));
//     return res.status(200).json(formattedData);
//   } catch (err) {
//      res.status(500).json({ message: err.message });
//   }
// };
const get_order_Pagination = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 records per page

  const offset = (page - 1) * limit;

  try {
    // Fetch paginated orders
    const { rows: ordersList, count: totalRecords } =
      await orders.findAndCountAll({
        attributes: [
          "id",
          "first_name",
          "last_name",
          "E_mail",
          "phone",
          "address",
          "country",
          "available_time",
          "date",
          "frequency",
          "name_services",
        ],
        include: [
          {
            model: extras,
            as: "extras",
            through: { attributes: [] },
            attributes: ["id", "name", "image", "price"],
          },
          {
            model: NeedToBeDone,
            as: "needs", // Ensure this matches the alias in your association
            through: { attributes: [] },
            attributes: ["id", "name", "option"],
          },
        ],
        limit: parseInt(limit, 10), // Limit the number of records per page
        offset: parseInt(offset, 10), // Skip records for previous pages
      });

    // Format the data
    const formattedData = ordersList.map((order) => ({
      id_order: order.id,
      first_name: order.first_name,
      last_name: order.last_name,
      E_mail: order.E_mail,
      phone: order.phone,
      address: order.address,
      country: order.country,
      available_time: order.available_time,
      date: order.date,
      frequency: order.frequency,
      name_services: order.name_services,
      extras: order.extras.map((extra) => ({
        id: extra.id,
        nameExtra: extra.name,
        img: extra.image,
        price: extra.price,
      })),
      needToBeDone: order.needs.map((done) => ({
        id: done.id,
        nameDone: done.name,
        option: done.option,
      })),
    }));

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / limit);

    // Return the paginated response
    return res.status(200).json({
      totalRecords,
      totalPages,
      currentPage: parseInt(page, 10),
      data: formattedData,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// const get_order = async (req, res) => {
//   try {
//     const findAll = await orders.findAll({
//       attributes: [
//         "id",
//         "first_name",
//         "last_name",
//         "E_mail",
//         "phone",
//         "address",
//         "country",
//         "available_time",
//         "date",
//         "frequency",
//         "name_services",
//       ],
//       include: [
//         {
//           model: extras,
//           as: "extras",
//           through: { attributes: [] },
//           attributes: ["id", "name", "image", "count"],
//         },
//         {
//           model: NeedToBeDone,
//           as: "needs", // Use the alias defined in your association
//           through: { attributes: [] },
//           attributes: ["id", "name", "option"],
//         },
//         {
//           model: User,
//           as: "user", // Use the alias defined in your association
//           attributes: ["id", "first_name", "last_name","email"],
//         },
//       ],
//     });

//     const formattedData = findAll.map((order) => ({
//       id_order: order.id,
//       first_name: order.first_name,
//       last_name: order.last_name,
//       E_mail: order.E_mail,
//       phone: order.phone,
//       address: order.address,
//       country: order.country,
//       available_time: order.available_time,
//       date: order.date,
//       frequency: order.frequency,
//       name_services: order.name_services,
//       extras: order.extras.map((extra) => ({
//         id: extra.id,
//         nameExtra: extra.name,
//         img: extra.image,
//         price: extra.price,
//         count:extra.count
//       })),
//       needToBeDone: order.needs.map((done) => ({
//         id: done.id,
//         nameDone: done.name,
//         option: done.option,
//       })),
//       user: order.user
//         ? {
//             id: order.user.id,
//             email:order.user.email,
//             name: `${order.user.first_name} ${order.user.last_name}`,
//           }
//         : null,
//     }));

//     return res.status(200).json(formattedData);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const get_order_ByID = async (req, res) => {
  try {
    const {id}=req.params;
    const findAll = await orders.findAll({
      where:{id:id},
      attributes: [
        "id",
        "first_name",
        "last_name",
        "E_mail",
        "phone",
        "address",
        "country",
        "available_time",
        "date",
        "frequency",
        "name_services",
      ],
      include: [
        {
          model: extras,
          as: "extras",
          through: { attributes: [] },
          attributes: ["id", "name", "image", "price"],
        },
        {
          model: NeedToBeDone,
          as: "needs", // Use the alias defined in your association
          through: { attributes: [] },
          attributes: ["id", "name", "option"],
        },
        {
          model: User,
          as: "user", // Use the alias defined in your association
          attributes: ["id", "first_name", "last_name","email"],
        },
      ],
    });

    const formattedData = findAll.map((order) => ({
      id_order: order.id,
      first_name: order.first_name,
      last_name: order.last_name,
      E_mail: order.E_mail,
      phone: order.phone,
      address: order.address,
      country: order.country,
      available_time: order.available_time,
      date: order.date,
      frequency: order.frequency,
      name_services: order.name_services,
      extras: order.extras.map((extra) => ({
        id: extra.id,
        nameExtra: extra.name,
        img: extra.image,
        price: extra.price,
      })),
      needToBeDone: order.needs.map((done) => ({
        id: done.id,
        nameDone: done.name,
        option: done.option,
      })),
      user: order.user
        ? {
            id: order.user.id,
            email:order.user.email,
            name: `${order.user.first_name} ${order.user.last_name}`,
          }
        : null,
    }));
    if(findAll && findAll.length > 0) {

      return res.status(200).json(formattedData);
    }
    else {
      return res.status(203).json({message:`No Content`});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getMyOrder = async (req, res) => {
  try {
    const {id}=req.params;
    const findAll = await orders.findAll({
      where:{id_user:id},
      attributes: [
        "id",
        "first_name",
        "last_name",
        "E_mail",
        "phone",
        "address",
        "country",
        "available_time",
        "date",
        "frequency",
        "name_services",
      ],
      include: [
        {
          model: extras,
          as: "extras",
          through: { attributes: [] },
          attributes: ["id", "name", "image", "price"],
        },
        {
          model: NeedToBeDone,
          as: "needs", // Use the alias defined in your association
          through: { attributes: [] },
          attributes: ["id", "name", "option"],
        },
        {
          model: User,
          as: "user", // Use the alias defined in your association
          attributes: ["id", "first_name", "last_name","email"],
        },
      ],
    });

    const formattedData = findAll.map((order) => ({
      id_order: order.id,
      first_name: order.first_name,
      last_name: order.last_name,
      E_mail: order.E_mail,
      phone: order.phone,
      address: order.address,
      country: order.country,
      available_time: order.available_time,
      date: order.date,
      frequency: order.frequency,
      name_services: order.name_services,
      extras: order.extras.map((extra) => ({
        id: extra.id,
        nameExtra: extra.name,
        img: extra.image,
        price: extra.price,
      })),
      needToBeDone: order.needs.map((done) => ({
        id: done.id,
        nameDone: done.name,
        option: done.option,
      })),
      user: order.user
        ? {
            id: order.user.id,
            email:order.user.email,
            name: `${order.user.first_name} ${order.user.last_name}`,
          }
        : null,
    }));
    if(findAll && findAll.length > 0) {

      return res.status(200).json(formattedData);
    }
    else {
      return res.status(203).json({message:`No Content`});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const get_order = async (req, res) => {
  try {
    const findAll = await orders.findAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "E_mail",
        "phone",
        "address",
        "country",
        "available_time",
        "date",
        "frequency",
        "name_services",
        'state'
      ],
      where:{state:'false'},
      include: [
        {
          model: extras,
          as: "extras",
          through: {
            attributes: ["count"], // Include count from order_extra
          },
          attributes: ["id", "name", "image"],
        },
        {
          model: NeedToBeDone,
          as: "needs",
          through: {
            attributes: ["option"], // Include option from order_need
          },
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "first_name", "last_name", "email"],
        },
      ],
    });

    const formattedData = findAll.map((order) => ({
      id_order: order.id,
      first_name: order.first_name,
      last_name: order.last_name,
      E_mail: order.E_mail,
      phone: order.phone,
      address: order.address,
      country: order.country,
      available_time: order.available_time,
      date: order.date,
      frequency: order.frequency,
      state:order.state,
      name_services: order.name_services,
      extras: order.extras.map((extra) => ({
        id: extra.id,
        nameExtra: extra.name,
        img: extra.image,
        count: extra.order_extra ? extra.order_extra.count : null, // Extract count
      })),
      needToBeDone: order.needs.map((done) => ({
        id: done.id,
        nameDone: done.name,
        option: done.order_need ? done.order_need.option : null, // Extract option
      })),
      user: order.user
        ? {
            id: order.user.id,
            email: order.user.email,
            name: `${order.user.first_name} ${order.user.last_name}`,
          }
        : null,
    }));

    return res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const editDeleted=async(req,res)=>{
  try {
    const {id}=req.params;
    const {state}=req.body;
    if(!id || state===undefined){
        return res.status(400).json({ message: `Bad Request` });
    }
    else {
        const findOne = await orders.findOne({
          where: { id: id },
        });
        if (!findOne || findOne.length === 0) {
          return res.status(203).json({ message: `No Content` });
        } else {
          await orders.update(
            { state: state },
            { where: { id: id } }
          );
          return res.status(200).json({ message: `Updated` });
        }
      }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default { Create_order, get_order, edit_order, delete_order,get_order_ByID,getMyOrder,editDeleted };
