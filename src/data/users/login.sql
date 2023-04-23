select
	[FirstName]
      ,[LastName]
      ,[dbo].[UserAccounts].[Email] 
      ,[dbo].[Roles].[Name] as UserRole
      ,[dbo].[Churches].[Name] as Church
	  ,[dbo].[Groups].[Name] as GroupName
	  ,[dbo].[Zones].[Name] as  ZoneName
	  ,[UserId]
	  ,[Gender] 
 FROM [dbo].[Users]
 inner join [dbo].[UserAccounts] on [dbo].[Users].[Id] = [dbo].[UserAccounts].[UserId]
 inner join [dbo].[Roles] on [dbo].[Users].[RoleId] = [dbo].[Roles].[Id]
 inner join [dbo].[Churches] on [dbo].[Users].[ChurchId] = [dbo].[Churches].[Id]
 inner join [dbo].[Groups] on [dbo].[Churches].[GroupId] = [dbo].[Groups].[Id]
 inner join [dbo].[Zones] on [dbo].[Groups].[ZoneId] = [dbo].[Zones].[Id]
 Where [dbo].[UserAccounts].[Email] = @email AND [dbo].[UserAccounts].[Password] = @password AND [dbo].[UserAccounts].[IsDeleted] = 0