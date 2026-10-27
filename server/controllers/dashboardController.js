const Skill = require('../models/Skill');
const Session = require('../models/Session');

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const mySkills = await Skill.find({ user: userId });
    const mySessions = await Session.find({ user: userId });

    res.status(200).json({
      totalSkillsShared: mySkills.filter(s => s.type === 'Offering').length,
      skillsLearning: mySkills.filter(s => s.type === 'Looking For').length,
      upcomingSessions: mySessions.filter(s => s.status === 'Scheduled').length,
      earnedCredits: req.user.coins,
      recentSkills: mySkills.slice(-4).reverse(),
      upcomingList: mySessions.filter(s => s.status === 'Scheduled').slice(-3)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };