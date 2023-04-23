BEGIN
Select  TOP (1000) [dbo].[Users].[Id] as UserId
     ,[UniqueId]
      ,[RoleId]
      ,[ChurchId]
      [dbo].[Churches].[Name] as Church
      ,[FirstName]
      ,[LastName]
      ,[MiddleName]
      ,[Email]
      ,[PhoneNumber]
      ,[dbo].[Users].[Address] as Address
      ,[Gender]

from [dbo].[Users]
inner join [dbo].[UserAccounts] on [dbo].[UserAccounts].[UserId]  = [dbo].[Users].[Id]
inner join [dbo].[Churches] on [dbo].[Users].[ChurchId] = [dbo].[Churches].[Id]
inner join [dbo].[Groups] on [dbo].[Churches].[GroupId] = [dbo].[Groups].[Id]
Where [dbo].[Groups].[ZoneId] = @zoneId  AND  [dbo].[Churches].[GroupId] = @groupId
END