-- CreateTable
CREATE TABLE "Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Submission" (
    "address" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Submission_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Submission_address_idx" ON "Submission"("address");

INSERT INTO Status (name) VALUES ('Pending');
INSERT INTO Status (name) VALUES ('Approved');
INSERT INTO Status (name) VALUES ('Rejected');