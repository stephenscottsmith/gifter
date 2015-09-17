var Responses = require('./responses');

var Respond = {
	NeoFailedToExecuteFindUser: function (reply) {
		var resObj = Responses.NeoFailedToExecuteFindUser();
		reply(resObj.body).code(resObj.statusCode);
	},
	UsernameExists: function (reply, username) {
		var resObj = Responses.UsernameExists(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	PasswordsDoNotMatch: function (reply, username) {
		var resObj = Responses.PasswordsDoNotMatch(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	UserNotOldEnough: function (reply, username) {
		var resObj = Responses.UserNotOldEnough(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToCreateUser: function (reply, username) {
		var resObj = Responses.NeoFailedToCreateUser(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToCreateDefaultWishList: function (reply, username) {
		var resObj = Responses.NeoFailedToCreateDefaultWishList(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	UserCreated: function (reply, username) {
		var resObj = Responses.UserCreated(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	UserDoesNotExist: function (reply, username) {
		var resObj = Responses.UserDoesNotExist(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	IncorrectPassword: function (reply, username) {
		var resObj = Responses.IncorrectPassword(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	SessionAlreadyExists: function (reply) {
		var resObj = Responses.SessionAlreadyExists();
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToLogin: function (reply) {
		var resObj = Responses.NeoFailedToLogin();
		reply(resObj.body).code(resObj.statusCode);
	},
	LoggedIn: function (reply, username, token) {
		var resObj = Responses.LoggedIn(username, token);
		reply(resObj.body).code(resObj.statusCode);
	},
	ValidToken: function (reply) {
		var resObj = Responses.ValidToken();
		reply(resObj.body).code(resObj.statusCode);
	},
	InvalidToken: function (reply) {
		var resObj = Responses.InvalidToken();
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToLogout: function (reply) {
		var resObj = Responses.NeoFailedToLogout();
		reply(resObj.body).code(resObj.statusCode);
	},
	LoggedOutUser: function (reply) {
		var resObj = Responses.LoggedOutUser();
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToSearchForUsers: function (reply) {
		var resObj = Responses.NeoFailedToSearchForUsers();
		reply(resObj.body).code(resObj.statusCode);
	},
	ListOfUsers: function (reply, users) {	
		var resObj = Responses.ListOfUsers(users);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToFriendRequest: function (reply, username) {
		var resObj = Responses.NeoFailedToFriendRequest(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	SuccessfulFriendRequest: function (reply, username) {
		var resObj = Responses.SuccessfulFriendRequest(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToCancelFriendRequest: function (reply, username) {
		var resObj = Responses.NeoFailedToCancelFriendRequest(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	CancelledFriendRequest: function (reply, username) {
		var resObj = Responses.CancelledFriendRequest(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToAcceptFriendRequest: function (reply, username) {
		var resObj = Responses.NeoFailedToAcceptFriendRequest(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	AcceptFriendRequest: function (reply, username) {
		var resObj = Responses.AcceptedFriendRequest(username);
		reply(resObj.body).code(resObj.statusCode);
	},
	IllegalAcceptFriendRequest: function (reply) {
		var resObj = Responses.IllegalAcceptFriendRequest();
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToFindFriends: function (reply) {
		var resObj = Responses.NeoFailedToFindFriends();
		reply(resObj.body).code(resObj.statusCode);
	},
	ListOfFriends: function (reply, listOfFriends) {
		var resObj = Responses.ListOfFriends(listOfFriends);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToFindWishListsOfFriend: function (reply) {
		var resObj = Responses.NeoFailedToFindWishListsOfFriend();
		reply(resObj.body).code(resObj.statusCode);
	},
	WishListOfFriend: function (reply, wishLists) {
		var resObj = Responses.WishListOfFriend(wishLists);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToCreateWishList: function (reply) {
		var resObj = Responses.NeoFailedToCreateWishList();
		reply(resObj.body).code(resObj.statusCode);
	},
	SuccessfullyCreatedWishList: function (reply, wishListName) {
		var resObj = Responses.SuccessfullyCreatedWishList(reply, wishListName);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToDetermineNameUnique: function (reply) {
		var resObj = Responses.NeoFailedToDetermineNameUnique();
		reply(resObj.body).code(resObj.statusCode);
	},
	WishListNameNotUnique: function (reply, wishListName) {
		var resObj = Responses.WishListNameNotUnique(wishListName);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToFindFriend: function (reply) {
		var resObj = Responses.NeoFailedToFindFriend();
		reply(resObj.body).code(resObj.statusCode);
	},
	UserDoesNotHaveFriend: function (reply) {
		var resObj = Responses.UserDoesNotHaveFriend();
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToDeFriend: function (reply) {
		var resObj = Responses.NeoFailedToDeFriend();
		reply(resObj.body).code(resObj.statusCode);
	},
	SuccessfullyDeFriended: function (friend, reply) {
		var resObj = Responses.SuccessfullyDeFriended(friend);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToGetUserWishLists: function (reply) {
		var resObj = Responses.NeoFailedToGetUserWishLists();
		reply(resObj.body).code(resObj.statusCode);
	},
	UserWishLists: function (reply, userWishLists) {
		var resObj = Responses.UserWishLists(userWishLists);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToGetUserFriendRequests: function (reply) {
		var resObj = Responses.NeoFailedToGetUserFriendRequests();
		reply(resObj.body).code(resObj.statusCode);
	},
	UserFriendRequests: function (reply, userFriendRequests) {
		var resObj = Responses.UserFriendRequests(userFriendRequests);
		reply(resObj.body).code(resObj.statusCode);
	},
	AmazonSearchResults: function (reply, searchResults) {
		var resObj = Responses.AmazonSearchResults(searchResults);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToGetUserItems: function (reply) {
		var resObj = Responses.NeoFailedToGetUserItems();
		reply(resObj.body).code(resObj.statusCode);
	},
	UserItems: function (reply, items) {
		var resObj = Responses.UserItems(items);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToAddItem: function (reply) {
		var resObj = Responses.NeoFailedToAddItem();
		reply(resObj.body).code(resObj.statusCode);
	},
	CreatedItem: function (reply, itemTitle) {
		var resObj = Responses.CreatedItem(itemTitle);
		reply(resObj.body).code(resObj.statusCode);
	},
	NeoFailedToFindFriendsItems: function (reply) {
		var resObj = Responses.NeoFailedToFindFriendsItems();
		reply(resObj.body).code(resObj.statusCode);
	},
	FriendsItems: function (reply, items) {
		var resObj = Responses.FriendsItems(items);
		reply(resObj.body).code(resObj.statusCode);
	}
};

module.exports = Respond;
