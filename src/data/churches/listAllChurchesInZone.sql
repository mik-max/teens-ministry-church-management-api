SELECT TOP (1000) [dbo].[Churches].[Id] as ChurchId
      ,[dbo].[Groups].[Name] as GroupChurch
      ,[dbo].[Churches].[Name] as Name
      ,[dbo].[Churches].[Pastor] as Pastor
      ,[dbo].[Churches].[Address] as Address
FROM [TeensMinistryChurchApp].[dbo].[Churches]
inner join [dbo].[Groups] on [dbo].[Churches].[GroupId] = [dbo].[Groups].[Id]
inner join [dbo].[Zones] on [dbo].[Groups].[ZoneId] = [dbo].[Zones].[Id]
Where [dbo].[Groups].[ZoneId] = @zoneId 