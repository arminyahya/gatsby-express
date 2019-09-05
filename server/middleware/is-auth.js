const jwt = require('jsonwebtoken');
var { UserList } = require('../user-list');

// module.exports = (req,res,next) => {
//   const authHeader = req.get('Authorization');
//   if(!authHeader) {
//     req.isAuth = false;
//     return next();
//   }
//   const token = authHeader.split(' ')[1];
//   if(!token || token === '') {
//     req.isAuth = false;
//     return next();
//   }
//   let decodedToken;
//   try {
//     decodedToken =  jwt.verify(token, 'secretkey');
//   } catch (err) {
//     req.isAuth = false;
//     return next();
//   }

//   if(!decodedToken) {
//     req.isAuth = false;
//     return next();
//   }
//   req.isAuth = true;
//   req.userId = decodedToken.userId;
//   next();
// }

module.exports = (req, res, next) => {
	const username = req.get('Username');
	const password = req.get('Password');
	console.log(username, password);
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
