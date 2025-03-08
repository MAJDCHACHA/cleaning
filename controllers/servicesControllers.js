
import initializeDatabase from '../config/index.js';
const db = await initializeDatabase();
const { Services, services_extra, services_need, extras, NeedToBeDone, frequency } = db;
//   const { name, extras, need } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: "Bad Request" });
//   }

//   try {
//     // Step 1: Create a new service
//     const newService = await services.create({
//       name: name,
//     });
//     const id_services = newService.id;

//     // Step 2: Insert extras associated with this service
//     if (extras && extras.length > 0) {
//       const extrasData = extras.map((extra) => ({
//         id_services: id_services,
//         id_extras: extra.id_extras,
//       }));

//       // Bulk create records in services_extra
//       await services_extra.bulkCreate(extrasData);
//     }

//     // Step 3: Insert needs associated with this service
//     if (need && need.length > 0) {
//       const needsData = need.map((needItem) => ({
//         id_services: id_services,
//         id_need: needItem.id_need,
//       }));

//       // Bulk create records in services_need
//       await services_need.bulkCreate(needsData);
//     }

//     res.status(200).json({ message: "Order created successfully", id: id_services });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: `Error creating order: ${error.message}` });
//   }
// };
const create_services = async (req, res) => {
  const { name, need, extras } = req.body;

  try {
    // Create a new service
    const newService = await Services.create({ name });

    const id_services = newService.id;

    // Insert extras associated with this service
    if (extras && extras.length > 0) {
      const extrasData = extras.map(extra => ({
        id_services: id_services,
        id_extras: extra.id_extras,
      }));

      await services_extra.bulkCreate(extrasData);
    }

    // Insert needs associated with this service
    if (need && need.length > 0) {
      const needsData = need.map(needItem => ({
        id_services: id_services,
        id_need: needItem.id_need,
      }));

      await services_need.bulkCreate(needsData);
    }

    res.status(200).json({ message: "Order created successfully", id: id_services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error creating : ${error.message}` });
  }
};
const get = async (req, res) => {
  try {
    const servicesData = await Services.findAll({
        where:{isDeleted:false},
      attributes: ['id', 'name'],
      include: [
        {
          model: extras,
          as: 'extras',
          through: { attributes: [] },
          attributes: ['id', 'name', 'image', 'price'],
          where:{isDeleted:false}
        },
        {
          model: NeedToBeDone,
          as: 'needToBeDone',
          through: { attributes: [] },
          attributes: ['id', 'name', 'option','price'],
          where:{isDeleted:false}
        },
      ],
    });
    const get_frequency = await frequency.findAll({where:{isDeleted:false}});
    const formattedData = servicesData.map(service => ({
      id_services: service.id,
      services: service.name,
      extras: service.extras.map(extra => ({
        id: extra.id,
        nameExtra: extra.name,
        img: extra.image,
        price: extra.price,
      })),
      needToBeDone: service.needToBeDone.map(done => ({
        id: done.id,
        nameDone: done.name,
        option: done.option,
        price: done.price
      })),
      frequency: get_frequency.map(frequency => ({
        id: frequency.id,
        name: frequency.name,
        discount: frequency.discount
      })),
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving data", error: error.message });
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const findServices = await Services.findAll({
      where: { id: id },
      attributes: ['id', 'name'],
      include: [
        {
          model: extras,
          as: 'extras',
          through: { attributes: [] },
          attributes: ['id', 'name', 'image', 'price'],
        },
        {
          model: NeedToBeDone,
          as: 'needToBeDone',
          through: { attributes: [] },
          attributes: ['id', 'name', 'option'],
        },
      ],
    }, { where: { id: id } });
    if (findServices && findServices.length > 0) {
      return res.status(200).json(findServices)
    }
    else {
      return res.status(203).json({ message: `No Content` })
    }
  }
  catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
const edit_service = async (req, res) => {
  const { id } = req.params; // Get service ID from request parameters
  const { name, need, extras } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Bad Request: Name is required" });
  }

  try {
    // Find the existing service by ID
    const existingService = await Services.findByPk(id);
    if (!existingService) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Update the service name
    await existingService.update({ name });

    // Update extras associated with this service
    if (extras && Array.isArray(extras)) {
      // Delete old extras for this service
      await services_extra.destroy({ where: { id_services: id } });

      // Add new extras
      const extrasData = extras.map(extra => ({
        id_services: id,
        id_extras: extra.id_extras,
      }));
      await services_extra.bulkCreate(extrasData);
    }

    // Update needs associated with this service
    if (need && Array.isArray(need)) {
      // Delete old needs for this service
      await services_need.destroy({ where: { id_services: id } });

      // Add new needs
      const needsData = need.map(needItem => ({
        id_services: id,
        id_need: needItem.id_need,
      }));
      await services_need.bulkCreate(needsData);
    }

    return res.status(200).json({ message: "Service updated successfully", id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error updating service: ${error.message}` });
  }
};
const delete_service = async (req, res) => {
  const { id } = req.params; // Get service ID from request parameters

  try {
    // Check if the service exists
    const existingService = await Services.findByPk(id);
    if (!existingService) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Start deletion process
    // Delete associations in services_extra
    await services_extra.destroy({ where: { id_services: id } });

    // Delete associations in services_need
    await services_need.destroy({ where: { id_services: id } });

    // Delete the service itself
    await services.destroy({ where: { id } });

    return res.status(200).json({ message: "Service and related records deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error deleting service: ${error.message}` });
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
        const findOne = await services.findOne({
          where: { id: id },
        });
        if (!findOne || findOne.length === 0) {
          return res.status(203).json({ message: `No Content` });
        } else {
          await services.update(
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


export default { get, create_services, edit_service, getById, delete_service ,editDeleted};

