import jwt from 'jsonwebtoken';
import UserService from '../service/UserService.js';

class UserController {
	async getAll(req, res) {
		try {
			const users = await UserService.getAll();

			return res.json(users);
		} catch (e) {
			res.status(500).json(e);
		}
	}

	async login(req, res) {
		try {
			const user = await UserService.login(req.body.name);

			if (!user) {
				return res.status(404).json({
					message: 'user not found',
				});
			}

			if (req.body.password !== user.password) {
				return res.status(404).json({
					message: 'wrong login or password',
				});
			}

			return res.json({ ...user._doc });

			// const token = jwt.sign(
			// 	{
			// 		_id: user._id,
			// 	},
			// 	'secret123',
			// 	{
			// 		expiresIn: '30d',
			// 	}
			// );

			// return res.json({
			// 	...user._doc,
			// 	token,
			// });
		} catch (e) {
			res.status(500).json(e);
		}
	}
}

export default new UserController();
