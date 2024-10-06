-- ALTER TABLE "PlayLists"
--     ADD COLUMN "createBySystem" boolean DEFAULT False;
ALTER TABLE "PlayLists"
    ADD COLUMN "movieCount" integer DEFAULT 0 NOT NULL;
ALTER TABLE "PlayLists"
    ADD COLUMN "posterUrl" varchar(255) DEFAULT '';
