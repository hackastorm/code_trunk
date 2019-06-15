({
    /*
     * This finction defined column header
     * and calls getContactRecords helper method for column data
     * */
	doInit : function(component, event, helper) {        
         component.set('v.columns', [
                {label: 'Name', fieldName: 'Name', type: 'text'},
                {label: 'Email', fieldName: 'Email', type: 'Email'},
                {label: 'Phone', fieldName: 'Phone', type: 'Phone'},
                {type: "button", typeAttributes: {
                        label: 'View Purchased Product',
                        name: 'productUpselling',
                        title: 'ViewProductForUpselling',
                        disabled: false,
                        value: 'view',
                        iconPosition: 'left'
                    }}
            ]);
        helper.getContactRecords(component, event, helper);
        
    },
    
    viewRecord : function(component, event, helper) {
        var recId = event.getParam('row').Id;
        console.log('Con Id'+recId);
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:SoldProduct",
            componentAttributes: {
                recordId : recId
            }
        });
        evt.fire();
        
    },
    
    onNext : function(component, event, helper) {      
        console.log('onnext called');
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber+1);
        helper.buildData(component, helper);
    },
    
    onPrev : function(component, event, helper) {        
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber-1);
        helper.buildData(component, helper);
    },
    
    processMe : function(component, event, helper) {
        component.set("v.currentPageNumber", parseInt(event.target.name));
        helper.buildData(component, helper);
    },
    
    onFirst : function(component, event, helper) {        
        component.set("v.currentPageNumber", 1);
        helper.buildData(component, helper);
    },
    
    onLast : function(component, event, helper) {        
        component.set("v.currentPageNumber", component.get("v.totalPages"));
        helper.buildData(component, helper);
    },
  
})