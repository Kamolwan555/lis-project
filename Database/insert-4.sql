INSERT INTO Loc_Items (LocItem_ID, Item_ID, Employee_ID, Reception_ID, Loc_Status, LocItems_DateUpdate) VALUES
(1, 101, 201, 301, 'Available', CURRENT_TIMESTAMP),
(2, 102, 202, 302, 'Checked Out', CURRENT_TIMESTAMP),
(3, 103, 203, 303, 'In Maintenance', CURRENT_TIMESTAMP),
(4, 104, 204, 304, 'Available', CURRENT_TIMESTAMP),
(5, 105, 205, 305, 'Checked Out', CURRENT_TIMESTAMP);

INSERT INTO PackageLabDetail (PackageLabDetail_ID, PackageLab_ID, LabTest_ID) VALUES
(1, 101, 501),
(2, 102, 502),
(3, 103, 503),
(4, 104, 504),
(5, 105, 505);

INSERT INTO Loc_PacIDetail (Loc_PacIDetail_ID, PackageI_ID, Item_ID, Reception_ID, Employee_ID, Loc_Status, LocRegi_DateUpdate) VALUES
(1, 201, 101, 301, 201, 'Available', CURRENT_TIMESTAMP),
(2, 202, 102, 302, 202, 'Checked Out', CURRENT_TIMESTAMP),
(3, 203, 103, 303, 203, 'In Maintenance', CURRENT_TIMESTAMP),
(4, 204, 104, 304, 204, 'Available', CURRENT_TIMESTAMP),
(5, 205, 105, 305, 205, 'Checked Out', CURRENT_TIMESTAMP);

INSERT INTO LocRecordLab (locRecordLab_ID, RecordLab_ID, Reception_ID, locRecordLab_Date) VALUES
(1, 301, 301, CURRENT_TIMESTAMP),
(2, 302, 302, CURRENT_TIMESTAMP),
(3, 303, 303, CURRENT_TIMESTAMP),
(4, 304, 304, CURRENT_TIMESTAMP),
(5, 305, 305, CURRENT_TIMESTAMP);

INSERT INTO Loc_PackLab (Loc_PacLab_ID, PackageLab_ID, Reception_ID, Employee_ID, Loc_Status, LocRegi_DateUpdate) VALUES
(1, 401, 301, 201, 'Available', CURRENT_TIMESTAMP),
(2, 402, 302, 202, 'Checked Out', CURRENT_TIMESTAMP),
(3, 403, 303, 203, 'In Maintenance', CURRENT_TIMESTAMP),
(4, 404, 304, 204, 'Available', CURRENT_TIMESTAMP),
(5, 405, 305, 205, 'Checked Out', CURRENT_TIMESTAMP);

INSERT INTO Loc_RegisLab (LocRegis_ID, LabTest_ID, Reception_ID, Loc_Status, LocRegi_DateUpdate) VALUES
(1, 501, 301, 'Available', CURRENT_TIMESTAMP),
(2, 502, 302, 'Checked Out', CURRENT_TIMESTAMP),
(3, 503, 303, 'In Maintenance', CURRENT_TIMESTAMP),
(4, 504, 304, 'Available', CURRENT_TIMESTAMP),
(5, 505, 305, 'Checked Out', CURRENT_TIMESTAMP);

INSERT INTO Loc_AcceptApp (LocAcp_ID, Reception_ID, Acp_ID, Loc_Status, LocAcp_AcceptDate) VALUES
(1, 301, 601, 'Accepted', CURRENT_TIMESTAMP),
(2, 302, 602, 'Pending', CURRENT_TIMESTAMP),
(3, 303, 603, 'Accepted', CURRENT_TIMESTAMP),
(4, 304, 604, 'Rejected', CURRENT_TIMESTAMP),
(5, 305, 605, 'Accepted', CURRENT_TIMESTAMP);

INSERT INTO Loc_PacDetail (Loc_PackageDetail_ID, PackageLabDetail_ID, Reception_ID, Employee_ID, Loc_Status, LocRegi_DateUpdate) VALUES
(1, 701, 301, 201, 'Available', CURRENT_TIMESTAMP),
(2, 702, 302, 202, 'Checked Out', CURRENT_TIMESTAMP),
(3, 703, 303, 203, 'In Maintenance', CURRENT_TIMESTAMP),
(4, 704, 304, 204, 'Available', CURRENT_TIMESTAMP),
(5, 705, 305, 205, 'Checked Out', CURRENT_TIMESTAMP);
