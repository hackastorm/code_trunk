/*
*  Class Name:   UserComponent_Ctrl
*  Purpose:      Used in Lightning Component for Showing Contact Details
*  Author:       CodeTrunk
*  Company:      Eternus
*  Created Date: 15-June-2019
*  Type:         Controller
*/
public class UserComponent_Ctrl {
    @AuraEnabled
    public static List<Contact> fetchContacts() {
        List<Contact> conList = [Select
                                 	Id,
                                 	Name,
                                 	Email,
                                 	Phone
                                 From Contact];
        //return list of conList
        System.debug('test'+conList.size());
        return conList;
    }
}