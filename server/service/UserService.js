import User from '../model/User.js';

class UserService {
	async getAll() {
		const users = await User.find();
		return users;
	}

	async login(name) {
		if (!name) {
			throw new Error('Invalid name');
		}
		const user = await User.findOne({ name });
		return user;
	}
}

export default new UserService();
