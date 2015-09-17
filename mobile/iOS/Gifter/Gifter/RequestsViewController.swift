//
//  RequestsViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 5/1/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit

class RequestsViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet var tableView: UITableView!
    var requests = [String]()
    var usernameToSend = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.refreshRequests()
        
        self.tableView.registerClass(UITableViewCell.self, forCellReuseIdentifier: "cell")
    }
    
    override func viewDidAppear(animated: Bool) {
        self.refreshRequests()
    }
    
    func refreshRequests () -> Void {
        GifterHelper.getUserRequests(GifterHelper.getStoredToken()!.value, completion: {(res)->Void in
            println(res)
            if res["statusCode"] as! Int == 200 {
                self.requests = res["friendRequests"] as! [String]
                self.tableView.reloadData()
            }
        })
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.requests.count;
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        var cell:UITableViewCell = self.tableView.dequeueReusableCellWithIdentifier("cell") as! UITableViewCell
        
        cell.textLabel?.text = self.requests[indexPath.row]
        
        return cell
    }
    
    func tableView(tableView: UITableView!, didSelectRowAtIndexPath indexPath: NSIndexPath!) {
        self.usernameToSend = self.requests[indexPath.row]
        self.performSegueWithIdentifier("responseSegue", sender: self)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "responseSegue" {
            var ResponseVC = segue.destinationViewController as! ResponseViewController
            ResponseVC.username = self.usernameToSend
        }
    }
}