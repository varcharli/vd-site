-- 创建 PlayList 表
-- Table: public.PlayLists

-- DROP TABLE IF EXISTS public."PlayLists";

CREATE TABLE IF NOT EXISTS public."PlayLists"
(
    id SERIAL PRIMARY KEY,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer,
    CONSTRAINT "PlayLists_UserId_fkey" FOREIGN KEY ("UserId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."PlayLists"
    OWNER to postgres;

-- 创建 PlayListMovies 表，用于多对多关系
-- Table: public.PlayListMovies

-- DROP TABLE IF EXISTS public."PlayListMovies";

CREATE TABLE IF NOT EXISTS public."PlayListMovies"
(
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "PlayListId" integer NOT NULL,
    "MovieId" integer NOT NULL,
    CONSTRAINT "PlayListMovies_pkey" PRIMARY KEY ("PlayListId", "MovieId"),
    CONSTRAINT "PlayListMovies_MovieId_fkey" FOREIGN KEY ("MovieId")
        REFERENCES public."Movies" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "PlayListMovies_PlayListId_fkey" FOREIGN KEY ("PlayListId")
        REFERENCES public."PlayLists" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."PlayListMovies"
    OWNER to postgres;

-- 创建缺省的播放列表
INSERT INTO PlayList (name, UserId)
SELECT 'Favorite', id FROM "User";

-- INSERT INTO PlayList (name, userId)
-- SELECT 'watch later', id FROM "User";