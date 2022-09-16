-- Up
CREATE TABLE Status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

CREATE TABLE Submission (
  address TEXT PRIMARY KEY,
  email TEXT,
  discord TEXT,
  project TEXT,
  statusId INTEGER REFERENCES Status(id)
);

INSERT INTO Status (name) VALUES ('Pending');
INSERT INTO Status (name) VALUES ('Approved');
INSERT INTO Status (name) VALUES ('Rejected');

-- Down
DROP TABLE Status;
DROP TABLE Submission;