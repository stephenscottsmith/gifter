//
//  GifterHelper.swift
//  Gifter
//
//  Created by Stephen Smith on 4/26/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import Foundation

class GifterHelper {
    init () {
        
    }
    
    class func removeStoredTokenAndCredentials() -> () {
        let defaults = NSUserDefaults.standardUserDefaults()
        
        defaults.removeObjectForKey("username")
        defaults.removeObjectForKey("password")
        defaults.removeObjectForKey("token")
    }
    
    class func logout (token: String, completion: (AnyObject)->Void) {
        GifterApi.logout(token, completion: completion)
    }
    
    class func getStoredToken() -> (exists: Bool, value: String)? {
        let defaults = NSUserDefaults.standardUserDefaults()
        
        if let token = defaults.stringForKey("token") as String! {
            return (true, token)
        }
        
        return (false, "")
    }
    
    class func userHasStoredCredentials() -> (exists: Bool, username: String, password: String)? {
        let defaults = NSUserDefaults.standardUserDefaults()
        
        if let username = defaults.stringForKey("username"), password = defaults.stringForKey("password") {
            return (true, username, password)
        }
        
        return (false, "", "")
    }
    
    class func storeCredentials(username: String, password: String) -> Void {
        let defaults = NSUserDefaults.standardUserDefaults()
        
        defaults.setValue(username, forKey: "username")
        defaults.setValue(password, forKey: "password")
    }
    
    class func storeToken (token: String) -> Void {
        let defaults = NSUserDefaults.standardUserDefaults()
        defaults.setValue(token, forKey: "token")
    }
    
    class func validateStoredToken(token: String, completion: (AnyObject) -> Void) -> Void {
        GifterApi.validateStoredToken(token, completion: completion)
    }
    
    class func login(username: String, password: String, completion: (AnyObject)->Void) -> Void {
        GifterApi.login(username, password: password, completion: completion)
    }
    
    class func signup(user: [String : String], completion: (AnyObject)->Void) {
        GifterApi.signup(user, completion: completion)
    }
    
    class func getUserWishLists (token: String, completion: (AnyObject)->Void) -> Void {
        GifterApi.getUserWishLists(token, completion: completion)
    }
    
    class func getUserFriends (token: String, completion: (AnyObject)->Void) -> Void {
        GifterApi.getUserFriends(token, completion: completion)
    }
    
    class func getUserRequests (token: String, completion: (AnyObject)->Void) -> Void {
        GifterApi.getUserRequests(token, completion: completion)
    }
    
    class func searchForItems (searchIndex: String, searchTerm: String, completion: (AnyObject)->Void) {
        GifterApi.searchForItems(self.getStoredToken()!.value, searchIndex: searchIndex, searchTerm: searchTerm, completion: completion)
    }
    
    class func getUserItems (token: String, completion: (AnyObject)->Void) -> Void {
        GifterApi.getUserItems(token, completion: completion)
    }
    
    class func addItemToWishList(title: String, url: String, completion: (AnyObject)->Void) -> Void {
        GifterApi.addItemToWishList(self.getStoredToken()!.value, title: title, url: url, completion: completion)
    }
    
    class func searchForUsers(searchTerm: String, completion: (AnyObject)->Void) -> Void {
        GifterApi.searchForUsers(self.getStoredToken()!.value, searchTerm: searchTerm, completion: completion)
    }
    
    class func friendRequestUser(username: String, completion: (AnyObject)->Void) -> Void {
        GifterApi.friendRequestUser(self.getStoredToken()!.value, username: username, completion: completion)
    }
    
    class func acceptFriendRequest(username: String, completion: (AnyObject)->Void) -> Void {
        GifterApi.acceptFriendRequest(self.getStoredToken()!.value, username: username, completion: completion)
    }
    
    class func deleteFriendRequest(username: String, completion: (AnyObject)->Void) -> Void {
        GifterApi.deleteFriendRequest(self.getStoredToken()!.value, username: username, completion: completion)
    }
    
    class func getFriendsItems(username: String, completion: (AnyObject)->Void) -> Void {
        GifterApi.getFriendsItems(self.getStoredToken()!.value, username: username, completion: completion)
    }

}