/*
*  Name:         UpsellingController
*  Purpose:      Used in lightning component to show Products and Contacts.
*  Author:       CodeTrunk
*  Company:      Eternus
*  Created Date: 15-June-2019
*  Type:         Apex Class
*/
public class UpsellingController {
    
    /*
     * param : contactId
     * return : List of product purchased by contact
	*/
    @AuraEnabled
    public static List<product2> getContactProducts(String contactId) {
        List<product2> contactProducts = new List<product2>();
        for(OrderItem item : [SELECT Id,
                                     OrderId,
                                     Order.Contact__c,
                                     Product2Id,
                                     Product2.Name,
                                     Product2.Family,
                                     Product2.Category__c,
                                     Product2.Company_Brand__c,
                                     Product2.Product_Type__c,
                                     Product2.Product_Image__c,
                                     Product2.Image_URL__c
                              FROM OrderItem 
                              WHERE Order.Contact__c = :contactId])
        {
             product2 conProd = new product2();
             conProd.Id = item.Product2Id;
             conProd.Name = item.Product2.Name;
             conProd.Family = item.Product2.Family;
             conProd.Category__c = item.Product2.Category__c;
             conProd.Company_Brand__c = item.Product2.Company_Brand__c;
             conProd.Product_Image__c = item.Product2.Product_Image__c;
             conProd.Image_URL__c = item.Product2.Image_URL__c;
             contactProducts.add(conProd);                     
        }
        return contactProducts;
    }
    
    /*
     * param : productId
     * return : List of product show to sales representative as suggestion
	*/
    @AuraEnabled
    public static List<UpsellingProductWrapper> getUpsellingProducts(String productId) {
        List<UpsellingProductWrapper> upselWrapList = new List<UpsellingProductWrapper>();
        
        for(Product_Rule__c rule : [SELECT Id,
                                           Name,
                                           Filter_Criteria__c,
                                           Product__c,
                                           Rule_Order__c,
                                           (SELECT Id,
                                                    Upselling_Product__c,
                                                    Upselling_Product__r.Name,
                                                    Upselling_Product__r.ProductCode,
                                                    Upselling_Product__r.Description,
                                                    Upselling_Product__r.Family,
                                                    Upselling_Product__r.Category__c,
                                                    Upselling_Product__r.Company_Brand__c,
                                                    Upselling_Product__r.Product_Type__c,
                                                    Upselling_Product__r.IsActive,
                                                    Upselling_Product__r.Product_Image__c,
                                                    Upselling_Product__r.Image_URL__c
                                            FROM Upselling_Product__r)
                                    FROM Product_Rule__c 
                                    WHERE Product__c = :productId]) 
        {
             UpsellingProductWrapper upselProdWrap = new UpsellingProductWrapper();
             upselProdWrap.order = Integer.ValueOf(rule.Rule_Order__c);
             upselProdWrap.filerCriteria = rule.Filter_Criteria__c;
            system.debug('----rule.Upselling_Product__r----'+rule.Upselling_Product__r);
             if(rule.Upselling_Product__r != null) {
                 List<Product2> productList = new List<Product2>();
                 
                 for(Upselling_Products__c objProd : rule.Upselling_Product__r)
                 {
                     Product2 prodObj = new Product2();
                     prodObj.Id = objProd.Upselling_Product__c;
                     prodObj.Name = objProd.Upselling_Product__r.Name;
                     prodObj.ProductCode = objProd.Upselling_Product__r.ProductCode;
                     prodObj.Company_Brand__c = objProd.Upselling_Product__r.Company_Brand__c;
                     prodObj.Product_Type__c = objProd.Upselling_Product__r.Product_Type__c;
                     prodObj.Category__c = objProd.Upselling_Product__r.Category__c;
                     prodObj.Description = objProd.Upselling_Product__r.Description;
                     prodObj.Family = objProd.Upselling_Product__r.Family;
                     prodObj.isActive = objProd.Upselling_Product__r.isActive;
                     prodObj.Product_Image__c = objProd.Upselling_Product__r.Product_Image__c;
                     prodObj.Image_URL__c = objProd.Upselling_Product__r.Image_URL__c;
                     productList.add(prodObj);
                 }
                 upselProdWrap.upsellingProducts = productList;
             }
            upselWrapList.add(upselProdWrap);
            
        }
        system.debug('----upselWrapList----'+JSON.serialize(upselWrapList));
        return upselWrapList;
    }
    
    public class UpsellingProductWrapper {
        @AuraEnabled public Integer order;
        @AuraEnabled public String filerCriteria;
        @AuraEnabled public List<Product2> upsellingProducts;
        
        public UpsellingProductWrapper() {
            upsellingProducts = new List<Product2>();
        }
    }
}