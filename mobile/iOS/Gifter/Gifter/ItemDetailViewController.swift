//
//  ItemDetailViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 5/4/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit
import Alamofire

class ItemDetailViewController: UIViewController {
    @IBOutlet weak var webView: UIWebView!
    var request = NSURLRequest()
    var itemURL : String = ""
    var itemTitle: String = ""
    
    override func viewDidLoad() {
        let nsUrl = NSURL (string: self.itemURL)
        self.request = NSURLRequest(URL: nsUrl!)
        self.webView.loadRequest(self.request)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
}
