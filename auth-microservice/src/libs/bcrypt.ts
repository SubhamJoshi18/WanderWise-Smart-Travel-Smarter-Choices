import bcrypt from 'bcrypt';

class BcryptHelper {
  async createSalt() {
    const salt = 10;
    return await bcrypt.genSalt(salt);
  }

  async hashPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, await this.createSalt());
    return hashPassword;
  }

  async comparePassword(password: string, oldPassword: string) {
    const compareStatus = await bcrypt.compare(password, oldPassword);
    return compareStatus;
    }
}

export default new BcryptHelper();