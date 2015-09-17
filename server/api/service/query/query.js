// Query directly performs queries on the database
var neo4j = require('node-neo4j'),
    db = new neo4j('http://:2cc21d9a8d0faf1450200ee499d8efb4@localhost:7474'),
    Queries = require('./queries');

var Query = {
	FindUserByUsername: function (username, callback) {
		db.cypherQuery(Queries.FindUsersByUsername(username), function (err, result) {
			callback(err, (result.data.length > 0), result.data[0]);
		});
	},
	CreateNewUserNode: function (NewUser, callback) {
		db.cypherQuery(Queries.CreateUserNodeQuery(NewUser), function (err, result) {
			callback(err, result);
		});
	},
	CreateDefaultWishList: function (username, callback) {
		db.cypherQuery(Queries.CreateDefaultWishListForNewUser(username), function (err, result) {
			callback(err, result);
		});
	},
	WipeOutLostTokensByUserAndDevice: function (username, deviceID, callback) {
		db.cypherQuery(Queries.WipeOutLostTokensByUserAndDevice(username, deviceID), function (err, result) {
			callback(err); 
		});
	},
	CreateNewSessionForUser: function (username, session, token, callback) {
		db.cypherQuery(Queries.CreateNewSessionForUser(username, session), function (err, result) {
			callback(err, token); 
		});
	},
	DeleteSessionByToken: function (hash, callback) {
		db.cypherQuery(Queries.DeleteSessionByToken(hash), function (err, result) {
			callback(err);
		});
	},
	ValidateToken: function (hashedToken, isTokenExpired, callback) {
		db.cypherQuery(Queries.HashedTokenEqualsHashStored(hashedToken), function (err, result) {
			if (result.data.length > 1) {
				db.cypherQuery(Queries.DeleteAllSessionsWithToken(hashedToken), function (err, result) {
					callback(err, false);
				});
			} else {
				callback(err, (!isTokenExpired(result.data[0].expiration) && (result.data.length === 1))); 
			}
		});
	},
	SearchForUsers: function (usernameTerm, callback) {
		db.cypherQuery(Queries.SearchForUsers(usernameTerm), function (err, result) {
			callback(err, result.data); 
		});
	},
	FriendRequest: function (hash, username, callback) {
		db.cypherQuery(Queries.FriendRequest(hash, username), function (err, result) {
			callback(err);
		});
	},
	DeleteFriendRequest: function (hash, username, callback) {
		db.cypherQuery(Queries.DeleteFriendRequest(hash, username), function (err, result) {
			callback(err);
		});
	},
	AcceptFriendRequest: function (hash, username, callback) {
		db.cypherQuery(Queries.AcceptFriendRequest(hash, username), function (err, result) {
			callback(err);
		});
	},
	CanUserAcceptFriendRequest: function (hashedToken, username, callback) {
		db.cypherQuery(Queries.CanUserAcceptFriendRequest(hashedToken, username), function (err, result) {
			callback(err, (result.data.length === 1));
		});
	},
	GetFriendsList: function (hashedToken, callback) {
		db.cypherQuery(Queries.GetFriendsList(hashedToken), function (err, result) {
			callback(err, result.data);
		});
	},
	GetWishListsOfFriend: function (hashedToken, friendUsername, callback) {
		db.cypherQuery(Queries.GetWishListsOfFriend(hashedToken, friendUsername), function (err, result) {
			callback(err, result.data);
		});
	},
	DoesWishListExist: function (hashedToken, wishListName, callback) {
		db.cypherQuery(Queries.DoesWishListExist(hashedToken, wishListName), function (err, result) {
			callback(err, (result.data.length > 0));
		});
	},
	CreateWishList: function (hashedToken, wishListName, callback) {
		db.cypherQuery(Queries.CreateWishList(hashedToken, wishListName), function (err, result) {
			callback(err);
		});
	},
	DoesUserHaveFriend: function (hashedToken, friendUsername, callback) {
		db.cypherQuery(Queries.DoesUserHaveFriend(hashedToken, friendUsername), function (err, result) {
			callback(err, (result.data.length === 1));
		});
	},
	DeFriend: function (hashedToken, friendUsername, callback) {
		db.cypherQuery(Queries.DeFriend(hashedToken, friendUsername), function (err, result) {
			console.log(err);
			console.log(result);
			callback(err);
		});
	},
	GetUserWishLists: function (hashedToken, callback) {
		db.cypherQuery(Queries.GetUserWishLists(hashedToken), function (err, result) {
			callback(err, result.data);
		});
	},
	GetUserFriendRequests: function (hashedToken, callback) {
		db.cypherQuery(Queries.GetUserFriendRequests(hashedToken), function (err, result) {
			callback(err, result.data);
		});
	},
	GetUserItems: function (hashedToken, callback) {
		db.cypherQuery(Queries.GetUserItems(hashedToken), function (err, result) {
			callback(err, result.data);
		});
	},
	CreateUserItem: function (hashedToken, title, url, callback) {
		db.cypherQuery(Queries.CreateUserItem(hashedToken, title, url), function (err, result) {
			callback(err, result.data);
		});
	},
	GetFriendsItems: function (hashedToken, username, callback) {
		db.cypherQuery(Queries.GetFriendsItems(hashedToken, username), function (err, result) {
			callback(err, result.data);
		});
	}
};

module.exports = Query;





