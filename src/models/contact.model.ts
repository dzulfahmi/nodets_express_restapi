module.exports = (sequelize: any, Sequelize: any) => {
  const Contact = sequelize.define("contact", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    birthplace: {
      type: Sequelize.STRING
    },
    birthdate: {
      type: Sequelize.DATE
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING,  
    },
    address: {
      type: Sequelize.STRING,  
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
  });
  return Contact;
};