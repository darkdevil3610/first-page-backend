import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

const ensureAdminSeed = async () => {
  const { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_FORCE_SEED } = process.env;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    return null;
  }

  const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  if (!existingAdmin) {
    return Admin.create({
      username: ADMIN_USERNAME,
      password: hashedPassword,
    });
  }

  if (ADMIN_FORCE_SEED === 'true') {
    existingAdmin.password = hashedPassword;
    await existingAdmin.save();
    return existingAdmin;
  }

  const passwordMatches = await bcrypt.compare(ADMIN_PASSWORD, existingAdmin.password);

  if (!passwordMatches) {
    existingAdmin.password = hashedPassword;
    await existingAdmin.save();
  }

  return existingAdmin;
};

export default ensureAdminSeed;