var Queries = {
	FindUsersByUsername: function (username) {
		return 'MATCH (user:USER) ' +
			   'WHERE user.username = "' + username + '" ' +
			   'RETURN user';
	},
	CreateUserNodeQuery: function (NewUser) {
		return 	'CREATE (user:USER { ' +
					'first_name: "' + NewUser.first_name + '", ' +
					'last_name: "' + NewUser.last_name + '", ' +
					'username: "' + NewUser.username + '", ' +
					'password: "' + NewUser.password + '", ' +
					'country_code: "' + NewUser.country_code + '", ' +
					'phone_number: "' + NewUser.phone_number + '", ' +
					'birth_date: "' + NewUser.birth_date + '", ' +
					'member_since: "' + NewUser.member_since + '" ' +
				'})';
	},
	CreateDefaultWishListForNewUser: function (username) {
		return 'MATCH (a:USER) ' +
			   'WHERE a.username = "' + username + '" ' +
			   'CREATE (a)-[:HAS_WISH_LIST]->(b:WISH_LIST { ' +
			   		'name: "My Wish List" ' + 
			   '})'; 
	},
	WipeOutLostTokensByUserAndDevice: function (username, deviceID) {
		return 'MATCH (user:USER)-[r:HAS_SESSION]->(session:SESSION) ' + 
			   'WHERE user.username = "' + username + '" ' +
			   		'AND session.deviceID = "' + deviceID + '" ' +
			   'DELETE r, session';
	},
	CreateNewSessionForUser: function (username, session) {
		return 	'MATCH (user:USER) ' +
			   	'WHERE user.username = "' + username + '" ' +
			   	'CREATE (user)-[:HAS_SESSION]->(session:SESSION {' +
			   		'token: "' + session.token + '", ' +
			   		'deviceID: "' + session.deviceID + '", ' +
			   		'expiration: "' + session.expiration + '" ' +
			   	'}) ' + 
			   	'RETURN session';
	},
	DeleteSessionByToken: function (token) {
		return 'MATCH (session:SESSION)-[r]-(:USER) ' +
			   'WHERE session.token = "' + token + '" ' +
			   'DELETE r, session';
	},
	HashedTokenEqualsHashStored: function (hash) {
		return 'MATCH (session:SESSION)-[r]-(:USER) ' +
			   'WHERE session.token = "' + hash + '" ' +
			   'RETURN session';
	},
	SearchForUsers: function (usernameTerm) {
		return 'MATCH (user:USER) ' +
			   'WHERE user.username =~ "' + usernameTerm + '" ' +
			   'RETURN user.first_name, user.last_name, user.username';
	},
	FriendRequest: function (token, username) {
		return 'MATCH (session:SESSION)-[:HAS_SESSION]-(user:USER), (friend:USER) ' +
			   'WHERE session.token = "' + token + '" ' +
			   		'AND friend.username = "' + username + '" ' +
			   'CREATE (user)-[r:FRIEND_REQUESTED]->(friend) ' + 
			   'SET r.canAccept = friend.username';// ADD: could store date requested with moment
	},
	DeleteFriendRequest: function (token, username) { // This can be done by either user or friend (user can cancel, friend can decline)
		return 'MATCH (session:SESSION)-[:HAS_SESSION]-(user:USER)-[r:FRIEND_REQUESTED]-(friend:USER) ' +
			   'WHERE session.token = "' + token + '" ' +
			   		'AND friend.username = "' + username + '" ' +
			   'DELETE r';
	},
	AcceptFriendRequest: function (token, username) {
		return 'MATCH (session:SESSION)-[:HAS_SESSION]-(user:USER)-[r:FRIEND_REQUESTED]-(friend:USER) ' +
			   'WHERE session.token = "' + token + '" ' +
			   		'AND friend.username = "' + username + '" ' +
			   		'AND r.canAccept = user.username ' +
			   'CREATE (user)-[nr:FRIEND_OF]->(friend) ' + 
			   'DELETE r';// ADD: could store date accepted with moment
	},
	DeleteAllSessionsWithToken: function (hashedToken) {
		return 'MATCH (session:SESSION)-[r:HAS_SESSION]-(user:USER) ' +
			   'WHERE session.token = "' + hashedToken + '" '
			   'DELETE session, r';
	},
	CanUserAcceptFriendRequest: function (hashedToken, username) {
		return 'MATCH (session:SESSION)-[:HAS_SESSION]-(user:USER)-[r:FRIEND_REQUESTED]-(friend:USER) ' +
			   'WHERE session.token = "' + hashedToken + '" ' +
			   		'AND friend.username = "' + username + '" ' +
			   		'AND r.canAccept = user.username ' +
			   'RETURN user';
	},
	GetFriendsList: function (hashedToken) {
		return 'MATCH (session: SESSION)-[:HAS_SESSION]-(user:USER)-[r:FRIEND_OF]-(friend:USER) ' +
			   'WHERE session.token = "' + hashedToken + '" ' +
			   'RETURN friend';
	},
	GetWishListsOfFriend: function (hashedToken, friendUsername) {
		return 'MATCH (session: SESSION)-[:HAS_SESSION]-(user:USER)-[r:FRIEND_OF]-(friend:USER)-[:HAS_WISH_LIST]-(w:WISH_LIST) ' +
			   'WHERE session.token = "' + hashedToken + '" ' +
			   		'AND friend.username = "' + friendUsername + '" ' +
			   'RETURN w';
	},
	DoesWishListExist: function (hashedToken, wishListName) {
		return 'MATCH (session: SESSION)-[:HAS_SESSION]-(user:USER)-[:HAS_WISH_LIST]-(w:WISH_LIST) ' +
			   'WHERE session.token = "' + hashedToken + '" ' +
			   		'AND w.name = "' + wishListName + '" ' +
			   'RETURN w';
	},
	CreateWishList: function (hashedToken, wishListName) {
		return 'MATCH (session: SESSION)-[:HAS_SESSION]-(user:USER) ' +
			   'WHERE session.token = "' + hashedToken + '" ' +
			   'CREATE user-[:HAS_WISH_LIST]->(w:WISH_LIST {name: "' + wishListName + '"})';
	},
	DoesUserHaveFriend: function (hashedToken, friendUsername) {
		return 'MATCH (session: SESSION)-[:HAS_SESSION]-(user:USER)-[r:FRIEND_OF]-(friend:USER) ' +
			   'WHERE session.token = "' + hashedToken + '" ' +
			   		'AND friend.username = "' + friendUsername + '" ' +
			   'RETURN friend'
	},
	DeFriend: function (hashedToken, friendUsername) {
		return 'MATCH (session: SESSION)-[:HAS_SESSION]-(user:USER)-[r:FRIEND_OF]-(friend:USER) ' +
			   'WHERE session.token = "' + hashedToken + '" ' +
			   		'AND friend.username = "' + friendUsername + '" ' +
			   'DELETE r'
	},
	GetUserWishLists: function (hashedToken) {
		return 'MATCH (session: SESSION)-[:HAS_SESSION]-(user:USER)-[:HAS_WISH_LIST]-(w:WISH_LIST) ' +
			   'WHERE session.token = "' + hashedToken + '" ' +
			   'RETURN w';
	},
	GetUserFriendRequests: function (hashedToken) {
		return 'MATCH (session: SESSION)-[:HAS_SESSION]-(user:USER)-[f:FRIEND_REQUESTED]-(r:USER) ' +
			   'WHERE session.token = "' + hashedToken + '" ' +
			   		'AND f.canAccept = user.username ' + 
			   'RETURN r';
	},
	GetUserItems: function (hashedToken) {
		return 'MATCH (session: SESSION)-[:HAS_SESSION]-(user:USER)-[:WISHES_FOR]-(w:ITEM) ' +
			   'WHERE session.token = "' + hashedToken + '" ' +
			   'RETURN w';
	},
	CreateUserItem: function (hashedToken, title, url) {
		return 'MATCH (session: SESSION)-[:HAS_SESSION]-(user:USER) ' +
			   'WHERE session.token = "' + hashedToken + '" ' +
			   'CREATE user-[:WISHES_FOR]->(w:ITEM {title: "' + title + '", ' +
			   'url: "' + url +	'"})';
	},
	GetFriendsItems: function (hashedToken, friendUsername) {
		return 'MATCH (session: SESSION)-[:HAS_SESSION]-(user:USER)-[FRIEND_OF]-(friend:USER)-[:WISHES_FOR]-(w:ITEM) ' +
			   'WHERE session.token = "' + hashedToken + '" ' +
			   		'AND friend.username = "' + friendUsername + '" ' +
			   'RETURN w';
	}
};

module.exports = Queries;