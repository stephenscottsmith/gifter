var Responses = {
	InternalServerError: function () {
		return {
			statusCode: 500,
			body:{
				"message": "Interal Server Error!",
				"reason": "Something went wrong, so fix it!"
			}
		};
	},
	NeoFailedToExecuteFindUser: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to determine whether the username provided was already taken!"
			}
		};
	},
	NeoFailedToCreateUser: function (username) {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to create the user: " + username + "!",
				"reason": "Database failure!"
			}
		};
	},
	UsernameExists: function (username) {
		return {
			statusCode: 409,
			body: {
				"statusCode": 409,
				"message": "Failed to create user: " + username + "!",
				"reason": "This username is taken!"
			}
		};
	},
	PasswordsDoNotMatch: function (username) {
		return {
			statusCode: 403,
			body: {
				"statusCode": 403,
				"message": "Failed to create user: " + username + "!",
				"reason": "The password does not match the confirm password!"
			}
		};
	},
	UserCreated: function (username) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": "Successfully signed up new user: " + username,
				"username": username 
			}
		};
	},
	UserNotOldEnough: function (username) {
		return {
			statusCode: 400,
			body: {
				"statusCode": 400,
				"message": "Failed to create user: " + username + "!",
				"reason": "The birth date provided indicated " + username + " was less than 18 years old!"
			}
		};
	},
	NeoFailedToCreateDefaultWishList: function (username) {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "We created the user " + username + ", but we failed to create the default wish list!"
			}
		};
	},
	UserDoesNotExist: function (username) {
		return {
			statusCode: 403,
			body: {
				"statusCode": 403,
				"message": "Failed to login " + username + "!",
				"reason": username + " is not a registered user in the database!"
			}
		};
	},
	IncorrectPassword: function (username) {
		return {
			statusCode: 403,
			body: {
				"statusCode": 403,
				"message": "Failed to login " + username + "!",
				"reason": "The entered password is inccorect!"
			}
		};
	},
	NeoFailedToDetermineIfLoggedInOnDevice: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to determine if the user was already logged in the device!"
			}
		};
	},
	SessionAlreadyExists: function () {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": "User already logged in on specified device!"
			}
		};
	},
	NeoFailedToLogin: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Gifter failed to login!"
			}
		};
	},
	LoggedIn: function (username, token) {
		return {
			statusCode: 201,
			body: {
				"statusCode": 201,
				"message": username + " has successfully logged in!",
				"token": token
			}
		};
	},
	ValidToken: function () {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": "Session token is valid!"
			}
		};
	},
	NeoFailedToLogout: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Gifter failed to log you out! Try again!"
			}
		};
	},
	LoggedOutUser: function () {
		return {
			statusCode: 204,
			body: {
				"statusCode": 204,
				"message": "Successfully logged out the user!"
			}
		};
	},
	InvalidToken: function () {
		return {
			statusCode: 401,
			body: {
				"statusCode": 401,
				"message": "Token is not authentic!"
			}
		};
	},
	NeoFailedToSearchForUsers: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to find users!"
			}
		};
	},
	ListOfUsers: function (users) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": (users.length ? "Found matching user(s)!" : "Unable to find users that match your search term(s)!"),
				"data": users
			}
		};
	},
	NeoFailedToFriendRequest: function (username) {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Gifter failed to friend request " + username + "!"
			}
		};
	},
	SuccessfulFriendRequest: function (username) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": username + " has been friend requested!"
			}
		};
	},
	NeoFailedToCancelFriendRequest: function (username) {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Gifter failed to cancel the friend request for " + username + "!"
			}
		};
	},
	CancelledFriendRequest: function (username) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": "The friend request for " + username + " was cancelled!"
			}
		};
	},
	NeoFailedToAcceptFriendRequest: function (username) {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Gifter failed to accept the friend request for " + username + "!"
			}
		};
	},
	AcceptedFriendRequest: function (username) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": "The friend request for " + username + " was accepted!"
			}
		};
	},
	IllegalAcceptFriendRequest: function () {
		return {
			statusCode: 403,
			body: {
				"statusCode": 403,
				"message": "You are not permitted to accept specified friend request!"
			}
		};
	},
	NeoFailedToFindFriends: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "We were unable to retrieve a list of your friends!"
			}
		};
	},
	ListOfFriends: function (friends) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": (friends.length) ? "We were able to find your friend(s)!" : "You presently do not have friends!",
				"friends": friends
			}
		};
	},
	NeoFailedToFindWishListsOfFriend: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "We failed to find the wish lists of your specified friend!"
			}
		};
	},
	WishListOfFriend: function (wishLists) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": (wishLists.length) ? "Your friend has wish lists!" : "Your friend presently does not have wish lists!",
				"friends": wishLists
			}
		};
	},
	NeoFailedToCreateWishList: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to create wish list!"
			}
		};
	},
	SuccessfullyCreatedWishList: function (reply, wishListName) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": "Successfully created a new wish list!",
				"wishListName": wishListName
			}
		};
	},
	NeoFailedToDetermineNameUnique: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to determine if wish list name was unique!"
			}
		};
	},
	WishListNameNotUnique: function (wishListName) {
		return {
			statusCode: 409,
			body: {
				"statusCode": 409,
				"message": "Failed to create wish list!",
				"reason": wishListName + " already exists!"
			}
		};
	},
	NeoFailedToFindFriend: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to determine if you had the specified friend!"
			}
		};
	},
	UserDoesNotHaveFriend: function () {
		return {
			statusCode: 409,
			body: {
				"statusCode": 409,
				"message": "You are not friends with the specified user!"
			}
		};
	},
	NeoFailedToDeFriend: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to defriend the specified user!"
			}
		};
	},
	SuccessfullyDeFriended: function (friend) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": "Successfully defriended the user!",
				"user": friend
			}
		};
	},
	NeoFailedToGetUserWishLists: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to find user\'s wish lists!"
			}
		};
	},
	UserWishLists: function (userWishLists) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": (userWishLists.length) ? "We found your wish lists!" : "You presently do not have any wish lists!",
				"wishLists": userWishLists
			}
		};
	},
	NeoFailedToGetUserFriendRequests: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to find user\'s friend requests!"
			}
		};
	}, 
	UserFriendRequests: function (userFriendRequests) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": (userFriendRequests.length) ? "We found your friend requests!" : "You presently do not have any friend requests!",
				"friendRequests": userFriendRequests
			}
		};
	},
	AmazonSearchResults: function (searchResults) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": (searchResults.length) ? "We found items that match your search!" : "We were unable to find items that matched your search criteria!",
				"searchResults": searchResults
			}
		};
	},
	NeoFailedToGetUserItems: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to find user\'s items!"
			}
		};
	},
	UserItems: function (items) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": (items.length) ? "We found items that match your search!" : "We were unable to find items that matched your search criteria!",
				"items": items
			}
		};
	},
	NeoFailedToAddItem: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to add item to user\'s wish list!"
			}
		};
	},
	CreatedItem: function (itemTitle) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": "Successfully added item to user\'s wish list!",
				"item": itemTitle
			}
		};
	},
	NeoFailedToFindFriendsItems: function () {
		return {
			statusCode: 500,
			body: {
				"statusCode": 500,
				"message": "Failed to find your friend\'s items!"
			}
		};
	},
	FriendsItems: function (items) {
		return {
			statusCode: 200,
			body: {
				"statusCode": 200,
				"message": "Successfully found your friend\'s items!",
				"items": items
			}
		};
	}
};

module.exports = Responses;