({    
      getContactRecords : function(component, event, helper) {
        var action = component.get("c.fetchContacts");
       // action.setStorable();
        action.setCallback(this,function(response) {
            console.log('rsponse'+JSON.stringify(response));
            var state = response.getState();
            console.log('state'+state);
            if (state === "SUCCESS") {
                console.log('Response Time: '+((new Date().getTime())-requestInitiatedTime));
                var pageSize = component.get("v.pageSize");
                var contactListSize = response.getReturnValue().length;
                console.log('pageSize: '+pageSize);
                console.log('length: '+response.getReturnValue().length);
                var cal = Math.ceil(1.4);
                console.log('cal: '+cal);
                var page = contactListSize/pageSize;
                var totalPage = Math.ceil(page);
                component.set("v.totalPages", totalPage);
                var c = component.get("v.totalPages");
                component.set("v.allData", response.getReturnValue());
                component.set("v.currentPageNumber",1);
                this.buildData(component, event, helper);
            }
        });
        var requestInitiatedTime = new Date().getTime();
        $A.enqueueAction(action);
    },
    
    /*
     * this function will build table data
     * based on current page selection
     * */
    buildData : function(component, event, helper) {
        var data = [];
        var pageNumber = component.get("v.currentPageNumber");
        var pageSize = component.get("v.pageSize");
        var allData = component.get("v.allData");
        var x = (pageNumber-1)*pageSize;
        
        //creating data-table data
        for(; x<=(pageNumber)*pageSize; x++){
            if(allData[x]){
            	data.push(allData[x]);
            }
        }
        component.set("v.data", data);
        //console.log('data'+JSON.Parse(JSON.stringfy(data)));
        
        console.log('pageNumber'+pageNumber);
        console.log('pageSize'+pageSize);
        
        this.generatePageList(component, pageNumber);
    },
    
    /*
     * this function generate page list
     * */
    generatePageList : function(component, pageNumber){
        console.log('generatePageList');
        pageNumber = parseInt(pageNumber);
        var pageList = [];
        var totalPages = component.get("v.totalPages");
        console.log('totalPages'+totalPages);
        console.log('pageNumber'+pageNumber);
        if(totalPages > 1){
            if(totalPages <= 10){
                var counter = 2;
                for(; counter < (totalPages); counter++){
                    pageList.push(counter);
                } 
            } else{
                if(pageNumber < 5){
                    pageList.push(2, 3, 4, 5, 6);
                } else{
                    if(pageNumber>(totalPages-5)){
                        pageList.push(totalPages-5, totalPages-4, totalPages-3, totalPages-2, totalPages-1);
                    } else{
                        pageList.push(pageNumber-2, pageNumber-1, pageNumber, pageNumber+1, pageNumber+2);
                    }
                }
            }
        }
        component.set("v.pageList", pageList);
    }
})