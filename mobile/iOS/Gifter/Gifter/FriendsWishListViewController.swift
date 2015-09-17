//
//  FriendsWishListViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 5/6/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit

class FriendsWishListViewController: UITableViewController {
    var userItems = [AnyObject]()
    var username = ""
    var urlToSend = ""
    var titleToSend = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.refreshTableView()
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func refreshTableView () {
        GifterHelper.getFriendsItems(self.username, completion: {(res) in
            if res["statusCode"] as! Int == 200 {
                self.userItems = res["items"] as! [AnyObject]
                self.tableView.reloadData()
            }
        })
    }
    
    override func viewDidAppear(animated: Bool) {
        self.refreshTableView()
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.userItems.count;
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        var cell:UITableViewCell = self.tableView.dequeueReusableCellWithIdentifier("cell") as! UITableViewCell
        
        cell.textLabel?.text = self.userItems[indexPath.row]["title"] as! String
        
        return cell
    }
    
    override func tableView(tableView: UITableView!, didSelectRowAtIndexPath indexPath: NSIndexPath!) {
        self.urlToSend = self.userItems[indexPath.row]["url"] as! String
        self.titleToSend = self.userItems[indexPath.row]["title"] as! String
        self.performSegueWithIdentifier("friendsWishListItemSegue", sender: self)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "friendsWishListItemSegue" {
            var SearchItemDetailVC : SearchItemDetailViewController = segue.destinationViewController as! SearchItemDetailViewController
            SearchItemDetailVC.itemTitle = self.titleToSend
            SearchItemDetailVC.itemURL = self.urlToSend
        }
    }

}
