import User from "../database/models/User.model"

const UserService = {
  async getUsers() {
    const users = await User.findAll();
    return users;
  }
}
export default UserService