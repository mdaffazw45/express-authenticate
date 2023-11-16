const { Admin } = require('../models'); // Assuming you have an Admin model
const { adminSchema } = require('../helpers/validateAttribute'); // Your Joi validation schema for admins
const {generateAdminAuthToken} = require('../utils/generateAuthToken'); // Import the generateAuthToken function
const { comparePasswords, hashPassword  } = require('../utils/bcrypt'); // Import the comparePasswords function


// Controller methods for admin-related operations
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json({ data: admins, message: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ data: admin, message: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.registerAdmin = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const { error } = adminSchema.validate({ firstName, lastName, email, phoneNumber, password });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if the email is already in use
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new admin with the hashed password
    const newAdmin = await Admin.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword, // Use the hashed password here
    });

    const token = generateAdminAuthToken(newAdmin);

    res.status(201).json({ message: 'Admin registered successfully', token, data: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: 'Authentication failed. Admin not found' });
    }

    // Verify the password
    const isPasswordMatch = await comparePasswords(password, admin.password);
    console.log('isPasswordMatch:', isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Authentication failed. Incorrect password' });
    }

    // Generate and send a JWT token
    const token = generateAdminAuthToken(admin);
    res.status(200).json({ message: 'Authentication successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { firstName , lastName , email , phoneNumber, password } = req.body;

  const { error } = adminSchema.validate({ firstName , lastName , email , phoneNumber, password });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update admin data
    await admin.update({ firstName , lastName , email , phoneNumber, email, password });
    res.status(200).json({ message: 'Admin updated successfully', data: admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Delete the admin
    await admin.destroy();
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.params; // Use email from req.params
  const { password } = req.body;

  try {
    // Find the user by email
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password);

    // Update the admin's password
    await admin.update({ password: hashedPassword });
    res.status(200).json({ message: 'Password reset successfully', data: admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

