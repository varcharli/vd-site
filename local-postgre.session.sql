SELECT "Movie".*, "PlayLists"."id" AS "PlayLists.id", "PlayLists"."name" AS "PlayLists.name", 
"PlayLists"."createBySystem" AS "PlayLists.createBySystem", "PlayLists"."movieCount" AS "PlayLists.movieCount", 
"PlayLists"."posterUrl" AS "PlayLists.posterUrl", "PlayLists"."createdAt" AS "PlayLists.createdAt", 
"PlayLists"."updatedAt" AS "PlayLists.updatedAt", "PlayLists"."UserId" AS "PlayLists.UserId" FROM 
(SELECT "Movie"."id", "Movie"."name", "Movie"."releaseDate", "Movie"."posterUrl", "Movie"."bigPosterUrl", "Movie"."serialNumber", 
"Movie"."description", "Movie"."rating", "Movie"."fromUrl", "Movie"."createdAt", "Movie"."updatedAt" FROM "Movies" AS "Movie" 
WHERE ( SELECT "PlayListMovies"."PlayListId" FROM "PlayListMovies" AS "PlayListMovies" INNER JOIN "PlayLists" AS "PlayList" 
ON "PlayListMovies"."PlayListId" = "PlayList"."id" AND "PlayList"."id" = 2 WHERE ("Movie"."id" = "PlayListMovies"."MovieId") 
LIMIT 1 ) IS NOT NULL ORDER BY "PlayListMovies"."createdAt" DESC LIMIT 8 OFFSET 0) AS "Movie" 
INNER JOIN ( "PlayListMovies" AS "PlayLists->PlayListMovies" INNER JOIN "PlayLists" AS "PlayLists" 
ON "PlayLists"."id" = "PlayLists->PlayListMovies"."PlayListId") ON "Movie"."id" = "PlayLists->PlayListMovies"."MovieId" 
AND "PlayLists"."id" = 2 ORDER BY "PlayListMovies"."createdAt" DESC;
