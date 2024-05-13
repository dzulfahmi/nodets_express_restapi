import { getPagination, getPagingData, getResponseFormat } from "../utils/helper";

const db = require("../models");
const ContactModel = db.contact;
const Op = db.Sequelize.Op;

// Create and Save a new Product
const createContact = (req: any, res: any) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Product
  const payload = {
    name: req.body.name,
    birthplace: req.body.birthplace,
    birthdate: req.body.birthdate,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    address: req.body.address,
  };
  // Save Product in the database
  ContactModel.create(payload)
    .then((data: any) => {
      const response = getResponseFormat(true, `Data berhasil disimpan.`, data, null, 200)
      res.status(200).send(response);
    })
    .catch((err: any) => {
      const response = getResponseFormat(false, "Some error occurred while creating the Contact.", null, err.response)
      res.status(501).send(response);
    });
};

// Retrieve all Users from the database.
const findAllContact = (req: any, res: any) => {
  const { page, size, nama_produk } = req.query;
  const { limit, offset } = getPagination(page, size);
  console.log('isi page', page, size, limit, offset);
  
  var condition = nama_produk ? { nama_produk: { [Op.like]: `%${nama_produk}%` } } : null;
  
  ContactModel.findAndCountAll({ 
    limit,
    offset,
    where: condition,
    order: [['name', 'ASC']],
  })
    .then((data: any) => {
      const respData = getPagingData(data, page, limit);
      const response = getResponseFormat(true, `Data berhasil diperoleh.`, respData, null)
      res.status(200).send(response);
    })
    .catch((err: any) => {
      const response = getResponseFormat(false, `Some error occurred while retrieving data.`, null, err.response)
      res.status(500).send(response);
    });
};

// Find a single User with an id
const findOneContact = (req: any, res: any) => {
  const id = req.params.id;
  
  ContactModel.findOne({where: {id: id}})
    .then((data: any) => {
      if (data) {
        const response = getResponseFormat(true, `Data berhasil diperoleh.`, data, null)
        res.status(200).send(response);
      } else {
        const response = getResponseFormat(false, `Cannot find data with id=${id}.`, null, null)
        res.status(404).send(response);
      }
    })
    .catch((err: any) => {
      const response = getResponseFormat(false, `Error retrieving data with id=${id}.`, null, err.response)
      res.status(500).send(response);
    });  
};

// Update a User by the id in the request
const updateContact = (req: any, res: any) => {
  const id = req.params.id;
  ContactModel.update(req.body, {
    where: { id: id }
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Data was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Data with id=${id}. Maybe Data was not found or req.body is empty!`
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error updating Data with id=" + id
      });
    });
};
// Delete a User with the specified id in the request
const deleteOneContact = (req: any, res: any) => {
  const id = req.params.id;
  ContactModel.destroy({
    where: { id: id }
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Data was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Data with id=${id}. Maybe Data was not found!`
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Could not delete Data with id=" + id
      });
    });
};

// Delete all Users from the database.
const deleteAllContact = (req: any, res: any) => {
  ContactModel.destroy({
    where: {},
    truncate: false
  })
    .then((nums: any) => {
      res.send({ message: `${nums} data were deleted successfully!` });
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all data."
      });
    });
};

export {
  createContact, 
  updateContact,
  findAllContact,
  findOneContact,
  deleteOneContact,
  deleteAllContact
}