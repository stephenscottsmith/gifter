// Service is a list of helper functions that call on Query functions
var Query = require('./query/query.js'),
    moment = require('moment'),
    uuid = require('uuid'),
    sha1 = require('sha1');

var Service = {
    FindUser: function (username, callback) {
        Query.FindUserByUsername(username, callback);
	},
	CreateNewUser: function (NewUser, callback) {
        NewUser.birth_date = moment(NewUser.birth_date).format('MM/DD/YYYY');
        NewUser.member_since = new moment().format();
		Query.CreateNewUserNode(NewUser, callback);
	},
    CreateDefaultNodesForNewUser: function (username, callback) {
        Query.CreateDefaultWishList(username, callback);
    },
    WipeOutLostTokensByUserAndDevice: function (username, deviceID, callback) {
        Query.WipeOutLostTokensByUserAndDevice(username, deviceID, callback);
    }, 
    Login: function (username, deviceID, callback) {
        var token = uuid.v1();

        var session = {
            token: sha1(token),
            deviceID: deviceID,
            expiration: moment().add(12, 'hours').format()
        };

        Query.CreateNewSessionForUser(username, session, token, callback);
    },
    DeleteSession: function (token, callback) {
        Query.DeleteSessionByToken(sha1(token), callback);
    }, 
    Authenticate: function (token, callback) {
        var isTokenExpired = function (expirationMoment) {
            return moment().isAfter(moment(expirationMoment));
        };

        Query.ValidateToken(sha1(token), isTokenExpired, callback);
    },
    SearchForUsers: function (usernameTerm, callback) {
        Query.SearchForUsers(usernameTerm, callback);
    },
    FriendRequest: function (token, username, callback) {
        Query.FriendRequest(sha1(token), username, callback);
    },
    CancelFriendRequest: function (token, username, callback) {
        Query.DeleteFriendRequest(sha1(token), username, callback);
    },
    AcceptFriendRequest: function (token, username, callback) {
        Query.AcceptFriendRequest(sha1(token), username, callback);
    },
    CanUserAcceptFriendRequest: function (token, username, callback) {
        Query.CanUserAcceptFriendRequest(sha1(token), username, callback);
    },
    GetFriendsList: function (token, callback) {
        Query.GetFriendsList(sha1(token), callback);
    },
    GetWishListsOfFriend: function (token, friendUsername, callback) {
        Query.GetWishListsOfFriend(sha1(token), friendUsername, callback);
    },
    DoesWishListExist: function (token, wishListName, callback) {
        Query.DoesWishListExist(sha1(token), wishListName, callback);
    },
    CreateWishList: function (token, wishListName, callback) {
        Query.CreateWishList(sha1(token), wishListName, callback);
    },
    DoesUserHaveFriend: function (token, friendUsername, callback) {
        Query.DoesUserHaveFriend(sha1(token), friendUsername, callback);
    },
    DeFriend: function (token, friendUsername, callback) {
        Query.DeFriend(sha1(token), friendUsername, callback);
    },
    GetUserWishLists: function (token, callback) {
        Query.GetUserWishLists(sha1(token), callback);
    },
    GetUserFriendRequests: function (token, callback) {
        Query.GetUserFriendRequests(sha1(token), callback);
    },
    GetUserItems: function (token, callback) {
        Query.GetUserItems(sha1(token), callback);
    },
    CreateUserItem: function (token, title, url, callback) {
        Query.CreateUserItem(sha1(token), title, url, callback);
    },
    GetFriendsItems: function (token, username, callback) {
        Query.GetFriendsItems(sha1(token), username, callback);
    }
};

module.exports = Service;