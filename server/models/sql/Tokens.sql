-- Table: public.Tokens

-- DROP TABLE IF EXISTS public."Tokens";

CREATE TABLE IF NOT EXISTS public."Tokens"
(
    id SERIAL PRIMARY KEY,
    token character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "expiredAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer,
    CONSTRAINT "Tokens_UserId_fkey" FOREIGN KEY ("UserId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Tokens"
    OWNER to postgres;