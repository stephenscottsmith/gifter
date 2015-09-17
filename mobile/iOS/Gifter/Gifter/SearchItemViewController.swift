//
//  SearchItemViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 5/5/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit

class SearchItemViewController: UIViewController, UITableViewDataSource, UITableViewDelegate, UISearchBarDelegate {
    @IBOutlet weak var searchBar: UISearchBar!
    @IBOutlet weak var tableView: UITableView!
    var searchActive : Bool = false
    var indexToSearch = ""
    var titleToSend = ""
    var urlToSend = ""
    var searchResults = [AnyObject]()
    var searchResultTitles = [String]()
    var searchResultURLs = [String]()
    
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
        GifterHelper.searchForItems(self.indexToSearch, searchTerm: self.searchBar.text, completion: {(res) in
            self.searchResults = res["searchResults"] as! [AnyObject]
            self.searchResultTitles = [String]()
            for result in self.searchResults {
                self.searchResultTitles.append(result["title"] as! String)
                self.searchResultURLs.append(result["url"] as! String)
            }
            
            self.tableView.reloadData()
        })
        
    }
    
    func searchBarCancelButtonClicked(searchBar: UISearchBar) {
        
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

        
        cell.textLabel?.text = self.searchResultTitles[indexPath.row]
        
        return cell
    }
    
    func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        self.urlToSend = self.searchResultURLs[indexPath.row]
        self.titleToSend = self.searchResultTitles[indexPath.row]
        self.performSegueWithIdentifier("showSearchDetailItemView", sender: self)
    }

    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "showSearchDetailItemView" {
            var SearchItemDetailVC : SearchItemDetailViewController = segue.destinationViewController as! SearchItemDetailViewController
            SearchItemDetailVC.itemTitle = self.titleToSend
            SearchItemDetailVC.itemURL = self.urlToSend
        }
    }
}