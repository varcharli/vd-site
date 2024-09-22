-- Table: public.PlayLinks

-- DROP TABLE IF EXISTS public."RelatedPictures";

CREATE TABLE IF NOT EXISTS public."RelatedPictures"
(
    id integer NOT NULL DEFAULT nextval('"RelatedPictures_id_seq"'::regclass),
    "movieId" integer NOT NULL,
    link character varying(255) COLLATE pg_catalog."default" NOT NULL,
    memo character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "MovieId" integer,
    CONSTRAINT "RelatedPictures_pkey" PRIMARY KEY (id),
    CONSTRAINT "RelatedPictures_MovieId_fkey" FOREIGN KEY ("MovieId")
        REFERENCES public."Movies" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."RelatedPictures"
    OWNER to postgres;