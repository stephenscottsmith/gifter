//
//  TableViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 5/5/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit

class SearchIndexViewController: UITableViewController {

    @IBOutlet var searchIndexesTableView: UITableView!
    var indexToSend = ""
    
    var searchIndexes = [String](arrayLiteral: "Apparel", "Automotive", "Books", "DVD", "Electronics", "Gourmet Food", "Grocery", "Personal Health Care", "Home and Garden", "Kitchen", "Music", "PC Hardware", "Shoes", "Software", "Sporting Goods", "Tools", "Toys", "VHS", "Video Games")
    
    override func viewDidLoad() {
        super.viewDidLoad()

        self.tableView.registerClass(UITableViewCell.self, forCellReuseIdentifier: "cell")
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.searchIndexes.count;
    }

    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        var cell:UITableViewCell = self.tableView.dequeueReusableCellWithIdentifier("cell") as! UITableViewCell
        
        cell.textLabel?.text = self.searchIndexes[indexPath.row]
        
        return cell
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        self.indexToSend = self.searchIndexes[indexPath.row]
        self.performSegueWithIdentifier("showSearchItemView", sender: self)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "showSearchItemView" {
            var SearchItemVC : SearchItemViewController = segue.destinationViewController as! SearchItemViewController
            SearchItemVC.indexToSearch = self.indexToSend
        }
    }


}
