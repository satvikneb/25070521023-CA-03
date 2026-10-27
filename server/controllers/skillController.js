const Skill = require('../models/Skill');

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate('user', 'name email bio');
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSkill = async (req, res) => {
  try {
    const { title, description, category, type, proficiency } = req.body;
    if (!title || !description || !category || !type) {
      return res.status(400).json({ message: 'Please fill all mandatory fields' });
    }
    const skill = await Skill.create({
      title,
      description,
      category,
      type,
      proficiency,
      user: req.user._id,
    });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill posting not found' });
    if (skill.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await skill.deleteOne();
    res.status(200).json({ message: 'Skill posting removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSkills, createSkill, deleteSkill };