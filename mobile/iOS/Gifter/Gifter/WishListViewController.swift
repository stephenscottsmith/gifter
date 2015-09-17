//
//  WishListViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 5/4/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit
import Alamofire

class WishListViewController: UITableViewController, UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet var wishListTable: UITableView!
    var items = [AnyObject]()
    var titleToSend = ""
    var urlToSend = ""
    var titles = [String]()
    var urls = [String]()
    
    required init!(coder aDecoder: NSCoder!) {
        super.init(coder: aDecoder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.refreshWishList()
        
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
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.items.count;
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        var cell:UITableViewCell = self.tableView.dequeueReusableCellWithIdentifier("cell") as! UITableViewCell
        
        cell.textLabel?.text = self.items[indexPath.row]["title"] as! String
        
        return cell
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        self.urlToSend = self.urls[indexPath.row]
        self.titleToSend = self.titles[indexPath.row]
        self.performSegueWithIdentifier("showItemDetailView", sender: self)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "showItemDetailView" {
            var ItemDetailVC : ItemDetailViewController = segue.destinationViewController as! ItemDetailViewController
            ItemDetailVC.itemURL = self.urlToSend
            ItemDetailVC.itemTitle = self.titleToSend
        } else if segue.identifier == "searchIndexViewSegue" {
            var SearchItemVC : SearchIndexViewController = segue.destinationViewController as! SearchIndexViewController
            SearchItemVC.title = "Choose Category"
        } else if segue.identifier == "friendSearchSegue" {
            var FriendSearchVC : FriendSearchViewController = segue.destinationViewController as! FriendSearchViewController
            FriendSearchVC.title = "Find Friends"
        }
    }
    
    func refreshWishList () -> Void {
        GifterHelper.getUserItems(GifterHelper.getStoredToken()!.value, completion: {(res)->Void in
            if res["statusCode"] as! Int == 200 {
                self.items = res["items"] as! [AnyObject]
                self.titles = [String]()
                self.urls = [String]()
                for item in self.items {
                    self.titles.append(item["title"] as! String)
                    self.urls.append(item["url"] as! String)
                }
                self.tableView.reloadData()
            }
        })
    }
    
    override func viewDidAppear(animated: Bool) {
        self.refreshWishList()
    }
    
    func displayAddItemView (sender: UIButton!) -> Void {
        self.performSegueWithIdentifier("searchIndexViewSegue", sender: self)
    }
    
    func displayAddFriendView (sender: UIButton!) -> Void {
        println("ADD FRIEEENNDDS!")
        self.performSegueWithIdentifier("friendSearchSegue", sender: self)
    }
}