const Timetable = require('../models/Timetable');

// GET /api/timetable
exports.getTimetables = async (req, res, next) => {
  try {
    const { department, year, semester } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (year) filter.year = year;
    if (semester) filter.semester = semester;

    const timetables = await Timetable.find(filter)
      .populate('department', 'name code')
      .populate('slots.faculty', 'user')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    // Deep populate faculty user names
    await Timetable.populate(timetables, {
      path: 'slots.faculty',
      populate: { path: 'user', select: 'name' },
    });

    res.json({ success: true, data: timetables });
  } catch (err) {
    next(err);
  }
};

// POST /api/timetable
exports.createTimetable = async (req, res, next) => {
  try {
    const data = { ...req.body, createdBy: req.user.id };
    const timetable = await Timetable.create(data);
    res.status(201).json({ success: true, data: timetable });
  } catch (err) {
    next(err);
  }
};

// PUT /api/timetable/:id
exports.updateTimetable = async (req, res, next) => {
  try {
    const timetable = await Timetable.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!timetable) {
      return res.status(404).json({ success: false, error: 'Timetable not found' });
    }
    res.json({ success: true, data: timetable });
  } catch (err) {
    next(err);
  }
};

// PUT /api/timetable/:id/slot  — add or update a single slot
exports.upsertSlot = async (req, res, next) => {
  try {
    const timetable = await Timetable.findById(req.params.id);
    if (!timetable) {
      return res.status(404).json({ success: false, error: 'Timetable not found' });
    }

    const { slotId, ...slotData } = req.body;
    if (slotId) {
      // Update existing slot
      const slot = timetable.slots.id(slotId);
      if (!slot) {
        return res.status(404).json({ success: false, error: 'Slot not found' });
      }
      Object.assign(slot, slotData);
    } else {
      // Add new slot
      timetable.slots.push(slotData);
    }

    await timetable.save();
    res.json({ success: true, data: timetable });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/timetable/:id/slot/:slotId
exports.deleteSlot = async (req, res, next) => {
  try {
    const timetable = await Timetable.findById(req.params.id);
    if (!timetable) {
      return res.status(404).json({ success: false, error: 'Timetable not found' });
    }

    const slot = timetable.slots.id(req.params.slotId);
    if (!slot) {
      return res.status(404).json({ success: false, error: 'Slot not found' });
    }

    slot.deleteOne();
    await timetable.save();
    res.json({ success: true, message: 'Slot removed' });
  } catch (err) {
    next(err);
  }
};

// GET /api/timetable/faculty/:facultyId
exports.getFacultyTimetable = async (req, res, next) => {
  try {
    const timetables = await Timetable.find({ 'slots.faculty': req.params.facultyId })
      .populate('department', 'name code');

    const schedule = [];
    timetables.forEach(tt => {
      tt.slots.forEach(slot => {
        if (slot.faculty && slot.faculty.toString() === req.params.facultyId) {
          schedule.push({
            day: slot.day,
            time: slot.time,
            subject: slot.subject,
            batch: slot.batch,
            room: slot.room,
            type: slot.type,
            department: tt.department,
            year: tt.year,
            semester: tt.semester,
          });
        }
      });
    });

    res.json({ success: true, data: schedule });
  } catch (err) {
    next(err);
  }
};
