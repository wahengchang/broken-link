var express = require('express');
var _ = require("underscore");
var blc = require("broken-link-checker")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




var brokenlinkMsg="-1";

var checkbrokenlink1=function(checklinkarray,callback){


    var html;
    var htmlChecker;
    var brokenlink=[];

	var gcounter=-1;
	var totallink=checklinkarray.length;

    if(gcounter==-2){
      console.log("gcounter==-2 / msg:"+brokenlinkMsg);
    }
    else{
    	var temp = _(checklinkarray).map(function (value){return "<a href='"+value+"'></a>"});

		html = temp.join();

        htmlChecker = new blc.HtmlChecker({}, {
          link: function(result) {
            gcounter++;

            if(result.broken){
              brokenlinkMsg+=result.html.text+" is broken :"+result.url.resolved+"\n";
              brokenlink.push(result.url.resolved);
              // console.log(result.html.index, result.broken, result.html.text, result.url.resolved);
              console.log(result.html.index, result.broken, result.html.text, result.url.resolved);
            }
              console.log(gcounter+" links have been checked . ......");

            if(gcounter==totallink){
              gcount =-2;
            }
          },
          complete: function() {
            console.log("done checking!");
            gcounter=-2;

            callback(brokenlink);

          }
        });
        htmlChecker.scan(html, "https://mywebsite.com");
    }

}


router.get('/brokenlink', function(req, res, next) {

	// var android=_.pluck(result, 'android_object_url');

	var links=["www.abc.com","www.abc.com1","www.abc.com2"];

    checkbrokenlink1(links,function(brokenlinkarr){
 		 res.render('brokenlink', { title: 'Express',result: brokenlinkarr });
    });

});

module.exports = router;
