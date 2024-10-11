select b."createdAt", a.* from "Movies" a
  INNER JOIN "PlayListMovies" b ON a."id" = b."MovieId"
  WHERE b."PlayListId" = 1 
  
  Order by b."createdAt" desc
  limit 10 offset 2