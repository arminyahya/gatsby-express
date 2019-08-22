var { buildSchema } = require('graphql');
var jwt = require('jsonwebtoken');
var { MoviesList } = require('./movie-list');
var { UserList } = require('./user-list');

var schema = buildSchema(`
	type Query {
		movieInfo(id: Int!): Movie
		movieList(rate: String): [Movie]
		login(username: String, password: String): AuthData
	},
	type Movie {
		id: Int
		title: String
		rate: String
		year: Int
}

	type User {
		id: Int
		password: String
	}

	type AuthData {
		userId: Int
		token: String
		tokenExpiration: Int
	}
`);


var getMovie = function(args) { 
	var id = args.id;
	return MoviesList.filter(movie => {
			return movie.id == id;
	})[0];
}
var getMovies = function(args, req) {
	if(!req.isAuth) {
	
		throw new Error('Unauthenticated');
	}
	if (args.rate) {
		var rate = args.rate;
		return MoviesList.filter(movie => movie.rate === rate);
	} else {
		return MoviesList;
	}
}

var login =  function({username, password}) {

	const user = UserList.find((user) => user.username === username);
	if(!user) {
		throw new Error('User does not exist!');
	}

	if(user.password !== password) {
		throw new Error('Password is incorrect!');

	}
	const token = jwt.sign({userId: user.id}, 'secretkey',{
	expiresIn: '1h'});
	return { userId: 1, token: token, tokenExpiration: 1};
}

var root = {
	movieInfo: getMovie,
	movieList: getMovies,
	login: login
};

module.exports = {
 schema: schema,
 root: root
}
