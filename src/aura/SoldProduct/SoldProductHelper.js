({
	getContactProducts : function(component, event, helper) 
    {
        
        var action = component.get("c.getContactProducts");
        action.setParams({  
            				contactId : component.get("v.recordId") 
                        });
        action.setCallback(this,function(response) {
            console.log('response',response.getReturnValue());
            var state = response.getState();
            if (state === "SUCCESS") 
            {
            	console.log('success state');
                component.set("v.productlist",response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
	},
    
    onProductClick : function(component, event, helper) 
    {
        
    }
    
    
})