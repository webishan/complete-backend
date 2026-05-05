// In-memory store (replace with a real database later)
let users = [];
let nextId = 1;

const getAllUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
};

const updateUser = (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { name, email } = req.body;
  users[index] = { ...users[index], name: name ?? users[index].name, email: email ?? users[index].email };
  res.json(users[index]);
};

const deleteUser = (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(index, 1);
  res.status(204).send();
};

// Exported for test resets
const _reset = () => {
  users = [];
  nextId = 1;
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, _reset };
