-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Submission" (
    "address" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "discord_id" TEXT NOT NULL,
    "community_name" TEXT NOT NULL,
    "discord_url" TEXT NOT NULL,
    "twitter_url" TEXT NOT NULL,
    "payment_plan" TEXT NOT NULL,
    "status_id" INTEGER NOT NULL DEFAULT 1,
    "link" TEXT DEFAULT '',
    CONSTRAINT "Submission_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Submission" ("address", "community_name", "created_at", "discord_id", "discord_url", "link", "payment_plan", "status_id", "twitter_url", "updated_at") SELECT "address", "community_name", "created_at", "discord_id", "discord_url", "link", "payment_plan", "status_id", "twitter_url", "updated_at" FROM "Submission";
DROP TABLE "Submission";
ALTER TABLE "new_Submission" RENAME TO "Submission";
CREATE INDEX "Submission_address_status_id_idx" ON "Submission"("address", "status_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
