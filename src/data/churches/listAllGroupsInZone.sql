SELECT TOP (1000) [Id]
      ,[ZoneId]
      ,[Name]
      ,[Pastor]
      ,[Address]
  FROM [TeensMinistryChurchApp].[dbo].[Groups]
  WHERE [ZoneId] = @zoneId