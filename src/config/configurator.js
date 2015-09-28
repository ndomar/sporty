var config = {
	"development": {
		"mysql": {
			"host": "localhost",
			"database": "sporty",
			"user": "root",
			"password": "",
		},
		"elasticsearch": {
			"host": {
				"host": "localhost",
				"port": 9200
			}
		},
		"node": {
			"PORT": 3000
		}
	}
}

// check for environment.
var env = process.env.NODE_ENV || process.argv[2];
env = env? env : 'development';
var k = config[env]
global.config = k;
process.env.PORT = k.node.PORT;


