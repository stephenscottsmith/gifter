//
//  SearchItemDetailViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 5/5/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit

class SearchItemDetailViewController: UIViewController {
    var itemTitle = ""
    var itemURL = ""
    var request = NSURLRequest()

    @IBOutlet var webView: UIWebView!
    @IBAction func addToWishListButton(sender: UIButton) {
        GifterHelper.addItemToWishList(self.itemTitle, url: self.itemURL, completion: {(res) in
            if res["statusCode"] as! Int == 200 {
                self.displayMessage("Successfully added a new item!", message: res["message"] as! String)
            } else {
                self.displayMessage("Failed to add the item!", message: "Try again!")
            }
        })
    }
    
    func displayMessage (header: String, message: String) -> Void {
        var alert = UIAlertController(title: header, message: message, preferredStyle: UIAlertControllerStyle.Alert)
        alert.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.Default, handler: nil))
        self.presentViewController(alert, animated: true, completion: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let nsUrl = NSURL (string: self.itemURL)
        self.request = NSURLRequest(URL: nsUrl!)
        self.webView.loadRequest(self.request)
        
    }
    
}
