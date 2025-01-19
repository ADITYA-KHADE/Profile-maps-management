const Profile = require('../models/ProfileModel');


const createProfile = async (req, res) => {
  try {
    const Profile1 = await Profile.create(req.body);
    res.status(201).json({ success: true, data: Profile1 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getProfiles = async (req, res) => {
  try {
    const Profiles = await Profile.find();
    res.status(200).json({ success: true, data: Profiles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getProfileById = async (req, res) => {
  try {
    const Profile1 = await Profile.findById(req.params.id);
    if (!Profile1) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    res.status(200).json({ success: true, data: Profile1 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    const Profile1 = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Profile1) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    res.status(200).json({ success: true, data: Profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteProfile = async (req, res) => {
  try {
    const Profile1 = await Profile.findByIdAndDelete(req.params.id);
    if (!Profile1) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    res.status(200).json({ success: true, data: Profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createProfile, getProfiles, getProfileById, updateProfile, deleteProfile };
