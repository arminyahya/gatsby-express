var { buildSchema } = require('graphql');
var { MoviesList } = require('./movie-list');

var schema = buildSchema(`
	type Query {
		movieInfo(id: Int!): Movie
		movieList(rate: String): [Movie]
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


var root = {
	movieInfo: getMovie,
	movieList: getMovies,
};

module.exports = {
 schema: schema,
 root: root
}
