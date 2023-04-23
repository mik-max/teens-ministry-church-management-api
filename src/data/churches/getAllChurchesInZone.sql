BEGIN
Select COUNT(dbo.[Churches].[Id]) as TotalChurches

from [dbo].[Churches]
inner join [dbo].[Groups] on [dbo].[Churches].[GroupId] = [dbo].[Groups].[Id]
inner join [dbo].[Zones] on [dbo].[Groups].[ZoneId] = [dbo].[Zones].[Id]
Where [dbo].[Groups].[ZoneId] = @zoneId





END