/**
 * Seed Script — creates a default Principal user so the system can bootstrap.
 *
 * Usage:
 *   1. Make sure .env has MONGO_URI set
 *   2. Run: node seed.js
 *
 * Default credentials:
 *   Email:    principal@college.edu
 *   Password: Principal@123
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');

const seedPrincipal = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if principal already exists
    const existing = await User.findOne({ role: 'principal' });
    if (existing) {
      console.log('Principal already exists:');
      console.log(`  Name:  ${existing.name}`);
      console.log(`  Email: ${existing.email}`);
      console.log('\nSkipping seed. Delete the existing principal to re-seed.');
      process.exit(0);
    }

    const principal = await User.create({
      name: 'Dr. Admin Principal',
      email: 'principal@college.edu',
      password: 'Principal@123',
      role: 'principal',
    });

    console.log('\n✅ Default Principal created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Name:     ${principal.name}`);
    console.log(`  Email:    ${principal.email}`);
    console.log(`  Password: Principal@123`);
    console.log(`  Role:     ${principal.role}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  Change this password after first login!\n');

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seedPrincipal();
