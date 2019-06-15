({
	doInit : function(component, event, helper) 
    {
        /*var myPageRef = component.get("v.pageReference");
        var contactID = myPageRef.state.c__contactID;
        */
		console.log('contactID ',component.get("v.recordId"));
        helper.getContactProducts(component, event, helper);
	},
    
    onProductClick : function(component, event, helper) {
        console.log('----onProductClick----');
        /*var modalBody;
        $A.createComponent("c:UpsellingproductSuggestion", 
                           {productList : component.get("v.productlist")},
           function(content, status) {
               console.log('----status----',status);
               if (status === "SUCCESS") {
                   modalBody = content;
                   component.find('overlayLib').showCustomModal({
                       header: "Upselling Products",
                       body: modalBody,
                       showCloseButton: true,
                       closeCallback: function() {
                           alert('You closed the alert!');
                       }
                   })
               }
           });*/
        component.set("v.showUpsellingProducts",true);
    }
})