function booking(comp, from, to)
{
    var query = "SELECT ROW_NUMBER() over(order by ApplicationId DESC)as SerialNo,\n"+
    "*,\n\n"+
    
    "(SELECT  CompName FROM Company WHERE IsActive=1 AND CompId=cn.CompId) AS BookingCourier ,\n"+
    "(SELECT  State_Name FROM FillState WHERE IsActive=1 AND State_Id=cn.Booking_State_Id) AS BookingState ,\n"+
    "(SELECT City_Name FROM FillCity WHERE IsActive='Y' AND City_Id=cn.Booking_Location_Id) AS BookingCity ,\n\n"+
    
    "(SELECT CompName FROM Company WHERE IsActive=1 AND CompId=cn.Dispatched_CompId) AS DispatchedCourier ,\n"+
    "(SELECT State_Name FROM FillState WHERE IsActive=1 AND State_Id=cn.Dispatched_State_Id) AS DispatchedState ,\n"+
    "(SELECT City_Name FROM FillCity WHERE IsActive='Y' AND City_Id=cn.Dispatched_Location_Id) AS DispatchedCity ,\n\n"+
    
    "(SELECT OrderStatusName FROM OrderStatus WHERE IsActive=1 AND OrderStatusId=cn.OrderStatusId) AS OrderStatus ,\n\n"+
    
    "( SELECT PinCode+','+FlatHouseNoBuildingCompanyApartment+','+ AreaColonyStreetSectorVillage+','+LandMark FROM ConsignorMaster WHERE CreatedBy=cn.ConsignorId AND IsActive=1 AND SetDefault=1 ) AS PickupLocation ,\n\n"+
    
    "( SELECT PinCode+','+FlatHouseNoBuildingCompanyApartment+','+ AreaColonyStreetSectorVillage+','+LandMark FROM ConsigneeMaster WHERE CreatedBy=cn.ConsignorId AND IsActive=1 AND SetDefault=1 ) AS DropLocation ,\n\n\n"+
    
    
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.ConsignorId) AS ConsignorName ,\n\n"+
    
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Received_By) AS ReceivedBy ,\n"+
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Delivered_Head) AS DeliveredHead ,\n"+
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Delivered_By) AS DeliveredBy ,\n\n"+
    
    
    "SUBSTRING(Booking_Date,7,4)+SUBSTRING(Booking_Date,4,2)+SUBSTRING(Booking_Date,0,3)  AS dt \n"+
    "FROM ApplicationEntriesDetails cn \n"+
    "JOIN \n"+
    "AppUserMaster app on app.UserId=cn.CreatedBy \n"+
    "WHERE \n"+
    "cn.IsActive=1 AND  app.IsActive=1 AND cn.CompId="+comp+" \n"+
    "AND convert( datetime,Booking_Date,104) between \n"+
    "convert( datetime,'"+from+"',104)    and  convert( datetime,'"+to+"',104) \n"+
    "ORDER BY dt DESC";

    return query;
}

function dispatched(comp, from, to)
{
    var query = "SELECT ROW_NUMBER() over(order by ApplicationId DESC)as SerialNo,\n"+
    "*,\n\n"+
    
    "(SELECT  CompName FROM Company WHERE IsActive=1 AND CompId=cn.CompId) AS BookingCourier ,\n"+
    "(SELECT  State_Name FROM FillState WHERE IsActive=1 AND State_Id=cn.Booking_State_Id) AS BookingState ,\n"+
    "(SELECT City_Name FROM FillCity WHERE IsActive='Y' AND City_Id=cn.Booking_Location_Id) AS BookingCity ,\n\n"+
    
    "(SELECT CompName FROM Company WHERE IsActive=1 AND CompId=cn.Dispatched_CompId) AS DispatchedCourier ,\n"+
    "(SELECT State_Name FROM FillState WHERE IsActive=1 AND State_Id=cn.Dispatched_State_Id) AS DispatchedState ,\n"+
    "(SELECT City_Name FROM FillCity WHERE IsActive='Y' AND City_Id=cn.Dispatched_Location_Id) AS DispatchedCity ,\n\n"+
    
    "(SELECT OrderStatusName FROM OrderStatus WHERE IsActive=1 AND OrderStatusId=cn.OrderStatusId) AS OrderStatus ,\n\n"+
    
    "( SELECT PinCode+','+FlatHouseNoBuildingCompanyApartment+','+ AreaColonyStreetSectorVillage+','+LandMark FROM ConsignorMaster WHERE CreatedBy=cn.ConsignorId AND IsActive=1 AND SetDefault=1 ) AS PickupLocation ,\n\n"+
    
    "( SELECT PinCode+','+FlatHouseNoBuildingCompanyApartment+','+ AreaColonyStreetSectorVillage+','+LandMark FROM ConsigneeMaster WHERE CreatedBy=cn.ConsignorId AND IsActive=1 AND SetDefault=1 ) AS DropLocation ,\n\n\n"+
    
    
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.ConsignorId) AS ConsignorName ,\n\n"+
    
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Received_By) AS ReceivedBy ,\n"+
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Delivered_Head) AS DeliveredHead ,\n"+
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Delivered_By) AS DeliveredBy ,\n\n"+
    
    
    "SUBSTRING(Dispatched_Date,7,4)+SUBSTRING(Dispatched_Date,4,2)+SUBSTRING(Dispatched_Date,0,3)  AS dt \n"+
    "FROM ApplicationEntriesDetails cn \n"+
    "JOIN \n"+
    "AppUserMaster app on app.UserId=cn.CreatedBy \n"+
    "WHERE \n"+
    "cn.IsActive=1 AND  app.IsActive=1 AND cn.CompId="+comp+" \n"+
    "AND convert( datetime,Dispatched_Date,104) between \n"+
    "convert( datetime,'"+from+"',104)    and  convert( datetime,'"+to+"',104) \n"+
    "ORDER BY dt DESC";

    return query;
}

function received(comp, from, to)
{
    var query = "SELECT ROW_NUMBER() over(order by ApplicationId DESC)as SerialNo,\n"+
    "*,\n\n"+
    
    "(SELECT  CompName FROM Company WHERE IsActive=1 AND CompId=cn.CompId) AS BookingCourier ,\n"+
    "(SELECT  State_Name FROM FillState WHERE IsActive=1 AND State_Id=cn.Booking_State_Id) AS BookingState ,\n"+
    "(SELECT City_Name FROM FillCity WHERE IsActive='Y' AND City_Id=cn.Booking_Location_Id) AS BookingCity ,\n\n"+
    
    "(SELECT CompName FROM Company WHERE IsActive=1 AND CompId=cn.Dispatched_CompId) AS DispatchedCourier ,\n"+
    "(SELECT State_Name FROM FillState WHERE IsActive=1 AND State_Id=cn.Dispatched_State_Id) AS DispatchedState ,\n"+
    "(SELECT City_Name FROM FillCity WHERE IsActive='Y' AND City_Id=cn.Dispatched_Location_Id) AS DispatchedCity ,\n\n"+
    
    "(SELECT OrderStatusName FROM OrderStatus WHERE IsActive=1 AND OrderStatusId=cn.OrderStatusId) AS OrderStatus ,\n\n"+
    
    "( SELECT PinCode+','+FlatHouseNoBuildingCompanyApartment+','+ AreaColonyStreetSectorVillage+','+LandMark FROM ConsignorMaster WHERE CreatedBy=cn.ConsignorId AND IsActive=1 AND SetDefault=1 ) AS PickupLocation ,\n\n"+
    
    "( SELECT PinCode+','+FlatHouseNoBuildingCompanyApartment+','+ AreaColonyStreetSectorVillage+','+LandMark FROM ConsigneeMaster WHERE CreatedBy=cn.ConsignorId AND IsActive=1 AND SetDefault=1 ) AS DropLocation ,\n\n\n"+
    
    
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.ConsignorId) AS ConsignorName ,\n\n"+
    
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Received_By) AS ReceivedBy ,\n"+
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Delivered_Head) AS DeliveredHead ,\n"+
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Delivered_By) AS DeliveredBy ,\n\n"+
    
    
    "SUBSTRING(Received_Date,7,4)+SUBSTRING(Received_Date,4,2)+SUBSTRING(Received_Date,0,3)  AS dt \n"+
    "FROM ApplicationEntriesDetails cn \n"+
    "JOIN \n"+
    "AppUserMaster app on app.UserId=cn.CreatedBy \n"+
    "WHERE \n"+
    "cn.IsActive=1 AND  app.IsActive=1 AND cn.CompId="+comp+" \n"+
    "AND convert( datetime,Received_Date,104) between \n"+
    "convert( datetime,'"+from+"',104)    and  convert( datetime,'"+to+"',104) \n"+
    "ORDER BY dt DESC";
    
    return query;
}

function delivered(comp, from, to)
{
    var query = "SELECT ROW_NUMBER() over(order by ApplicationId DESC)as SerialNo,\n"+
    "*,\n\n"+
    
    "(SELECT  CompName FROM Company WHERE IsActive=1 AND CompId=cn.CompId) AS BookingCourier ,\n"+
    "(SELECT  State_Name FROM FillState WHERE IsActive=1 AND State_Id=cn.Booking_State_Id) AS BookingState ,\n"+
    "(SELECT City_Name FROM FillCity WHERE IsActive='Y' AND City_Id=cn.Booking_Location_Id) AS BookingCity ,\n\n"+
    
    "(SELECT CompName FROM Company WHERE IsActive=1 AND CompId=cn.Dispatched_CompId) AS DispatchedCourier ,\n"+
    "(SELECT State_Name FROM FillState WHERE IsActive=1 AND State_Id=cn.Dispatched_State_Id) AS DispatchedState ,\n"+
    "(SELECT City_Name FROM FillCity WHERE IsActive='Y' AND City_Id=cn.Dispatched_Location_Id) AS DispatchedCity ,\n\n"+
    
    "(SELECT OrderStatusName FROM OrderStatus WHERE IsActive=1 AND OrderStatusId=cn.OrderStatusId) AS OrderStatus ,\n\n"+
    
    "( SELECT PinCode+','+FlatHouseNoBuildingCompanyApartment+','+ AreaColonyStreetSectorVillage+','+LandMark FROM ConsignorMaster WHERE CreatedBy=cn.ConsignorId AND IsActive=1 AND SetDefault=1 ) AS PickupLocation ,\n\n"+
    
    "( SELECT PinCode+','+FlatHouseNoBuildingCompanyApartment+','+ AreaColonyStreetSectorVillage+','+LandMark FROM ConsigneeMaster WHERE CreatedBy=cn.ConsignorId AND IsActive=1 AND SetDefault=1 ) AS DropLocation ,\n\n\n"+
    
    
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.ConsignorId) AS ConsignorName ,\n\n"+
    
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Received_By) AS ReceivedBy ,\n"+
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Delivered_Head) AS DeliveredHead ,\n"+
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Delivered_By) AS DeliveredBy ,\n\n"+
    
    
    "SUBSTRING(Delivery_Date,7,4)+SUBSTRING(Delivery_Date,4,2)+SUBSTRING(Delivery_Date,0,3)  AS dt \n"+
    "FROM ApplicationEntriesDetails cn \n"+
    "JOIN \n"+
    "AppUserMaster app on app.UserId=cn.CreatedBy \n"+
    "WHERE \n"+
    "cn.IsActive=1 AND  app.IsActive=1 AND cn.CompId="+comp+" \n"+
    "AND convert( datetime,Delivery_Date,104) between \n"+
    "convert( datetime,'"+from+"',104)    and  convert( datetime,'"+to+"',104) \n"+
    "ORDER BY dt DESC";
    
    return query;
}

function billNoView(comp, from, to, bill)
{
    var query = "SELECT ROW_NUMBER() over(order by ApplicationId DESC)as SerialNo,\n"+
    "*,\n\n"+
    
    "(SELECT  CompName FROM Company WHERE IsActive=1 AND CompId=cn.CompId) AS BookingCourier ,\n"+
    "(SELECT  State_Name FROM FillState WHERE IsActive=1 AND State_Id=cn.Booking_State_Id) AS BookingState ,\n"+
    "(SELECT City_Name FROM FillCity WHERE IsActive='Y' AND City_Id=cn.Booking_Location_Id) AS BookingCity ,\n\n"+
    
    "(SELECT CompName FROM Company WHERE IsActive=1 AND CompId=cn.Dispatched_CompId) AS DispatchedCourier ,\n"+
    "(SELECT State_Name FROM FillState WHERE IsActive=1 AND State_Id=cn.Dispatched_State_Id) AS DispatchedState ,\n"+
    "(SELECT City_Name FROM FillCity WHERE IsActive='Y' AND City_Id=cn.Dispatched_Location_Id) AS DispatchedCity ,\n\n"+
    
    "(SELECT OrderStatusName FROM OrderStatus WHERE IsActive=1 AND OrderStatusId=cn.OrderStatusId) AS OrderStatus ,\n\n"+
    
    "( SELECT PinCode+','+FlatHouseNoBuildingCompanyApartment+','+ AreaColonyStreetSectorVillage+','+LandMark FROM ConsignorMaster WHERE CreatedBy=cn.ConsignorId AND IsActive=1 AND SetDefault=1 ) AS PickupLocation ,\n\n"+
    
    "( SELECT PinCode+','+FlatHouseNoBuildingCompanyApartment+','+ AreaColonyStreetSectorVillage+','+LandMark FROM ConsigneeMaster WHERE CreatedBy=cn.ConsignorId AND IsActive=1 AND SetDefault=1 ) AS DropLocation ,\n\n\n"+
    
    
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.ConsignorId) AS ConsignorName ,\n\n"+
    
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Received_By) AS ReceivedBy ,\n"+
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Delivered_Head) AS DeliveredHead ,\n"+
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Delivered_By) AS DeliveredBy ,\n\n"+
    
    
    "SUBSTRING(Booking_Date,7,4)+SUBSTRING(Booking_Date,4,2)+SUBSTRING(Booking_Date,0,3)  AS dt \n"+
    "FROM ApplicationEntriesDetails cn \n"+
    "JOIN \n"+
    "AppUserMaster app on app.UserId=cn.CreatedBy \n"+
    "WHERE \n"+
    "cn.IsActive=1 AND  app.IsActive=1 AND cn.BillNO="+bill+" \n"+    
    "ORDER BY dt DESC";
    
    return query;
}

function defaultCase(comp, from, to, bill)
{
    var query = "SELECT ROW_NUMBER() over(order by ApplicationId DESC)as SerialNo,\n"+
    "*,\n\n"+
    
    "(SELECT  CompName FROM Company WHERE IsActive=1 AND CompId=cn.CompId) AS BookingCourier ,\n"+
    "(SELECT  State_Name FROM FillState WHERE IsActive=1 AND State_Id=cn.Booking_State_Id) AS BookingState ,\n"+
    "(SELECT City_Name FROM FillCity WHERE IsActive='Y' AND City_Id=cn.Booking_Location_Id) AS BookingCity ,\n\n"+
    
    "(SELECT CompName FROM Company WHERE IsActive=1 AND CompId=cn.Dispatched_CompId) AS DispatchedCourier ,\n"+
    "(SELECT State_Name FROM FillState WHERE IsActive=1 AND State_Id=cn.Dispatched_State_Id) AS DispatchedState ,\n"+
    "(SELECT City_Name FROM FillCity WHERE IsActive='Y' AND City_Id=cn.Dispatched_Location_Id) AS DispatchedCity ,\n\n"+
    
    "(SELECT OrderStatusName FROM OrderStatus WHERE IsActive=1 AND OrderStatusId=cn.OrderStatusId) AS OrderStatus ,\n\n"+
    
    "( SELECT PinCode+','+FlatHouseNoBuildingCompanyApartment+','+ AreaColonyStreetSectorVillage+','+LandMark FROM ConsignorMaster WHERE CreatedBy=cn.ConsignorId AND IsActive=1 AND SetDefault=1 ) AS PickupLocation ,\n\n"+
    
    "( SELECT PinCode+','+FlatHouseNoBuildingCompanyApartment+','+ AreaColonyStreetSectorVillage+','+LandMark FROM ConsigneeMaster WHERE CreatedBy=cn.ConsignorId AND IsActive=1 AND SetDefault=1 ) AS DropLocation ,\n\n\n"+
    
    
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.ConsignorId) AS ConsignorName ,\n\n"+
    
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Received_By) AS ReceivedBy ,\n"+
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Delivered_Head) AS DeliveredHead ,\n"+
    "(SELECT UserFullName FROM AppUserMaster WHERE IsActive=1 AND UserId=cn.Delivered_By) AS DeliveredBy ,\n\n"+
    
    
    "SUBSTRING(Booking_Date,7,4)+SUBSTRING(Booking_Date,4,2)+SUBSTRING(Booking_Date,0,3)  AS dt \n"+
    "FROM ApplicationEntriesDetails cn \n"+
    "JOIN \n"+
    "AppUserMaster app on app.UserId=cn.CreatedBy \n"+
    "WHERE \n"+
    "cn.IsActive=1 AND  app.IsActive=1 AND cn.CompId="+comp+" \n"+
    "AND convert( datetime,Booking_Date,104) between \n"+
    "convert( datetime,'"+from+"',104)    and  convert( datetime,'"+to+"',104) \n"+
    "ORDER BY dt DESC";
    
    return query;
}

module.exports.booking = booking;
module.exports.dispatched = dispatched;
module.exports.received = received;
module.exports.delivered = delivered;
module.exports.billNoView = billNoView;
module.exports.defaultCase = defaultCase;
