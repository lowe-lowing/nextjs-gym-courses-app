INSERT INTO Grades (CourseId, UserId, Grade)
VALUES (1, 1, 'D') ON DUPLICATE KEY
UPDATE CourseId = 1 UserId = 1 Grade = 'D';
INSERT INTO Grades (CourseId, UserId, Grade)
VALUES (1, 2, 'B') ON DUPLICATE KEY
UPDATE CourseId = 1 UserId = 2 Grade = 'B';
INSERT INTO Grades (CourseId, UserId, Grade)
VALUES (1, 7, 'C') ON DUPLICATE KEY
UPDATE CourseId = 1 UserId = 7 Grade = 'C';
INSERT INTO Grades (CourseId, UserId, Grade)
VALUES (1, 13, 'B') ON DUPLICATE KEY
UPDATE CourseId = 1 UserId = 13 Grade = 'B';