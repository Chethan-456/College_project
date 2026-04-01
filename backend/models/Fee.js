const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true, min: 0 },
  paidOn: { type: Date, default: Date.now },
  method: { type: String, trim: true }, // "cash", "online"
  receipt: { type: String, trim: true },
});

const FeeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: 0,
  },
  paidAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  dueDate: { type: Date },
  academicYear: { type: String, trim: true },
  semester: { type: String, trim: true },
  payments: [PaymentSchema],
  status: {
    type: String,
    enum: ['pending', 'partial', 'paid'],
    default: 'pending',
  },
}, { timestamps: true });

// Auto-update status based on paid vs total
FeeSchema.pre('save', function (next) {
  if (this.paidAmount >= this.totalAmount) {
    this.status = 'paid';
  } else if (this.paidAmount > 0) {
    this.status = 'partial';
  } else {
    this.status = 'pending';
  }
  next();
});

FeeSchema.index({ student: 1, academicYear: 1 });
FeeSchema.index({ status: 1 });

module.exports = mongoose.model('Fee', FeeSchema);
