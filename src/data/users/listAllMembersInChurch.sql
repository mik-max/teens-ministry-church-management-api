BEGIN
Select  TOP (1000) [dbo].[Users].[Id] as UserId
     ,[UniqueId]
      ,[RoleId]
      ,[ChurchId]
      ,[FirstName]
      ,[LastName]
      ,[dbo].[Churches].[Name] as Church
      ,[Email]
      ,[MiddleName]
      ,[PhoneNumber]
      ,[dbo].[Users].[Address] as Address
      ,[Gender]
from [dbo].[Users]
inner join [dbo].[UserAccounts] on [dbo].[UserAccounts].[UserId]  = [dbo].[Users].[Id]
inner join [dbo].[Churches] on [dbo].[Users].[ChurchId] = [dbo].[Churches].[Id]
inner join [dbo].[Groups] on [dbo].[Churches].[GroupId] = [dbo].[Groups].[Id]
inner join [dbo].[Zones] on [dbo].[Groups].[ZoneId] = [dbo].[Zones].[Id]
Where [dbo].[Groups].[ZoneId] = @zoneId AND [dbo].[Churches].[GroupId] = @groupId AND [dbo].[Users].[ChurchId] = @churchId
END