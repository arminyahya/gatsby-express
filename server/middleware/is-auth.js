var { UserList } = require('../user-list');
module.exports = (req, res, next) => {
	const username = req.get('username');
	const password = req.get('password');
	const user = UserList.find(user => user.username === username);
	if (!user) {
		req.isAuth = false;
		return next();
	}

	if (user.password !== password) {
		req.isAuth = false;
		return next();
	}

	req.isAuth = true;
	next();
};
