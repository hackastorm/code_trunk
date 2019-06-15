({
	doInit : function(component, event, helper) {
		let defaultJSON = [
              {
                "upsellingProducts": [
                  {
                    "attributes": {
                      "type": "Product2",
                      "url": "/services/data/v45.0/sobjects/Product2/01t2v000005xCOvAAM"
                    },
                    "Id": "01t2v000005xCOvAAM",
                    "Name": "Nine Hills Shiraz",
                    "ProductCode": "W-005",
                    "Company_Brand__c": "Nine",
                    "Product_Type__c": "Wine",
                    "Category__c": "Alcohol content < 40%",
                    "Description": "Nine Hills is a favourite at bars and lounges all over the country. Their Shiraz is a reliable option that is full bodied and packs in the intriguing notes of cherry, strawberry and peppery spice. This is the kind of wine that you could pair with an indulgent Mughlai meal and it would work very well.",
                    "Family": "Alcohol",
                    "IsActive": true
                  },
                  {
                    "attributes": {
                      "type": "Product2",
                      "url": "/services/data/v45.0/sobjects/Product2/01t2v000005xCOqAAM"
                    },
                    "Id": "01t2v000005xCOqAAM",
                    "Name": "Chianti Classico 2012 Riserva DOCG",
                    "ProductCode": "W-004",
                    "Company_Brand__c": "Chianti",
                    "Product_Type__c": "Wine",
                    "Category__c": "Alcohol content > 50%",
                    "Description": "With prominent tasting notes of red berry fruits like red currant and raspberries, this one is mellow and even packs in a whiff of toasted oak. Best enjoyed with everything Italian, including handcrafted pasta or a comforting bowl of risotto.",
                    "Family": "Alcohol",
                    "IsActive": true
                  }
                ],
                "order": 1,
                "filerCriteria": "Type"
              }
		];
        
        component.set("v.suggestedProductList", defaultJSON);
        let abc = component.get("v.suggestedProductList");
        console.log('abc:',JSON.stringify(abc));
	}
})