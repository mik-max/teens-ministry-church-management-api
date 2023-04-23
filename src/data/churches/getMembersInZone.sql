BEGIN
Select COUNT(dbo.[Users].[Id]) as TotalMembers

from [dbo].[Users]
inner join [dbo].[Churches] on [dbo].[Users].[ChurchId] = [dbo].[Churches].[Id]
inner join [dbo].[Groups] on [dbo].[Churches].[GroupId] = [dbo].[Groups].[Id]
inner join [dbo].[Zones] on [dbo].[Groups].[ZoneId] = [dbo].[Zones].[Id]
Where [dbo].[Groups].[ZoneId] = @zoneId
END