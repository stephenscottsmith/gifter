//
//  SecondViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 2/9/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit

class FriendsViewController: UITableViewController, UITableViewDelegate, UITableViewDataSource {
    
    var usernameToSend = ""
    var friendsList = [AnyObject]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.refreshFriendsList()
        
        let addItemsButton: UIButton = UIButton.buttonWithType(UIButtonType.Custom) as! UIButton
        addItemsButton.frame = CGRectMake(0, 0, 30, 30)
        addItemsButton.setImage(UIImage(named:"Search_Icon2.png"), forState: UIControlState.Normal)
        addItemsButton.addTarget(self, action: "displayAddItemView:", forControlEvents: UIControlEvents.TouchUpInside)
        var rightBarAddItemsButton: UIBarButtonItem = UIBarButtonItem(customView: addItemsButton)
        
        let addFriendButton : UIButton = UIButton.buttonWithType(UIButtonType.Custom) as! UIButton
        addFriendButton.frame = CGRectMake(0, 0, 30, 30)
        addFriendButton.setImage(UIImage(named:"People_Icon2.png"), forState: UIControlState.Normal)
        addFriendButton.addTarget(self, action: "displayAddFriendView:", forControlEvents: UIControlEvents.TouchUpInside)
        var leftBarAddFriendButton : UIBarButtonItem = UIBarButtonItem(customView: addFriendButton)
        
        self.navigationItem.setRightBarButtonItems([rightBarAddItemsButton], animated: true)
        self.navigationItem.setLeftBarButtonItems([leftBarAddFriendButton], animated: true)
        self.tableView.registerClass(UITableViewCell.self, forCellReuseIdentifier: "cell")
    }
    
    func refreshFriendsList () -> Void {
        GifterHelper.getUserFriends(GifterHelper.getStoredToken()!.value, completion: {(res)->Void in
            println(res)
            if res["statusCode"] as! Int == 200 {
                self.friendsList = res["friends"] as! [AnyObject]
                self.tableView.reloadData()
            }
        })
    }
    
    override func viewDidAppear(animated: Bool) {
        self.refreshFriendsList()
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.friendsList.count;
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        var cell:UITableViewCell = self.tableView.dequeueReusableCellWithIdentifier("cell") as! UITableViewCell
        
        var email = self.friendsList[indexPath.row]["username"] as! String
        var firstName = self.friendsList[indexPath.row]["first_name"] as! String
        var lastName = self.friendsList[indexPath.row]["last_name"] as! String
        cell.textLabel?.text = "\(email), \(firstName), \(lastName)"
        
        return cell
    }
    
    override func tableView(tableView: UITableView!, didSelectRowAtIndexPath indexPath: NSIndexPath!) {
        self.usernameToSend = self.friendsList[indexPath.row]["username"] as! String
        self.performSegueWithIdentifier("friendsWishListSegue", sender: self)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "friendsWishListSegue" {
            var FriendsWishListVC = segue.destinationViewController as! FriendsWishListViewController
            FriendsWishListVC.username = self.usernameToSend
        }
    }
    
    func displayAddItemView (sender: UIButton!) -> Void {
        self.performSegueWithIdentifier("searchItemSegue", sender: self)
    }
    
    func displayAddFriendView (sender: UIButton!) -> Void {
        self.performSegueWithIdentifier("searchFriendsSegue", sender: self)
    }
}
