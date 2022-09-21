-- CreateTable
CREATE TABLE "Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Submission" (
    "address" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "discord_id" TEXT NOT NULL,
    "community_name" TEXT NOT NULL,
    "discord_url" TEXT NOT NULL,
    "twitter_url" TEXT NOT NULL,
    "payment_plan" TEXT NOT NULL,
    "status_id" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Submission_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Submission_address_status_id_idx" ON "Submission"("address", "status_id");


INSERT INTO Status (name) VALUES ('Pending');
INSERT INTO Status (name) VALUES ('Approved');
INSERT INTO Status (name) VALUES ('Rejected');
