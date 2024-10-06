-- Table: public.PlayLinks

-- DROP TABLE IF EXISTS public."PlayLinks";

CREATE TABLE IF NOT EXISTS public."PlayLinks"
(
    id SERIAL PRIMARY KEY,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    link character varying(255) COLLATE pg_catalog."default" NOT NULL,
    memo character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "MovieId" integer,
    CONSTRAINT "PlayLinks_MovieId_fkey" FOREIGN KEY ("MovieId")
        REFERENCES public."Movies" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."PlayLinks"
    OWNER to postgres;