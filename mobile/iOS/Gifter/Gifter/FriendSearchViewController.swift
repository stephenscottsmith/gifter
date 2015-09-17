//
//  FriendSearchViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 5/6/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit

class FriendSearchViewController : UIViewController, UITableViewDataSource, UITableViewDelegate, UISearchBarDelegate {

    @IBOutlet weak var searchBar: UISearchBar!
    @IBOutlet weak var tableView: UITableView!
    var searchResults = [AnyObject]()
    var usernameToSend = ""
    var nameToSend = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        /* Setup delegates */
        tableView.delegate = self
        tableView.dataSource = self
        searchBar.delegate = self
    }
    
    func searchBarTextDidBeginEditing(searchBar: UISearchBar) {
        
    }
    
    func searchBarTextDidEndEditing(searchBar: UISearchBar) {
        GifterHelper.searchForUsers(self.searchBar.text, completion: {(res) in
            self.searchResults = res["data"] as! [AnyObject]
            
            self.tableView.reloadData()
        })
        
    }
    
    func searchBarSearchButtonClicked(searchBar: UISearchBar) {
        self.searchBar.resignFirstResponder()
    }
    
    func searchBar(searchBar: UISearchBar, textDidChange searchText: String) {
        self.tableView.reloadData()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.searchResults.count
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        var cell:UITableViewCell = self.tableView.dequeueReusableCellWithIdentifier("cell") as! UITableViewCell
        
        var email = self.searchResults[indexPath.row]["username"] as! String
        var firstName = self.searchResults[indexPath.row]["firstName"] as! String
        var lastName = self.searchResults[indexPath.row]["lastName"] as! String
        cell.textLabel?.text = "\(email), \(firstName), \(lastName)"
        
        return cell
    }
    
    func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        self.usernameToSend = self.searchResults[indexPath.row]["username"] as! String
        var firstName = self.searchResults[indexPath.row]["firstName"] as! String
        var lastName = self.searchResults[indexPath.row]["lastName"] as! String
        self.nameToSend = "\(firstName), \(lastName)"
        self.performSegueWithIdentifier("friendRequestSegue", sender: self)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "friendRequestSegue" {
            var FriendRequestVC : FriendRequestViewController = segue.destinationViewController as! FriendRequestViewController
            
            FriendRequestVC.username = self.usernameToSend
            FriendRequestVC.name = self.nameToSend
        }
    }
}
