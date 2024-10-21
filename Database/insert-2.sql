-- Insert data into AuthPhysician
INSERT INTO AuthPhysician (AuthPh_ID, Physician_ID, AuPh_Username, AuPh_Password)
VALUES
(1, 1, 'john.doe', 'password1'),
(2, 2, 'jane.smith', 'password2'),
(3, 3, 'mike.brown', 'password3'),
(4, 4, 'emma.davis', 'password4'),
(5, 5, 'liam.wilson', 'password5');

-- Insert data into AuthEmployees
INSERT INTO AuthEmployees (AuthEm_ID, Employee_ID, AuEm_Username, AuEm_Password)
VALUES
(1, 1, 'mary.johnson', 'password1'),
(2, 2, 'james.williams', 'password2'),
(3, 3, 'sophia.taylor', 'password3'),
(4, 4, 'noah.anderson', 'password4'),
(5, 5, 'olivia.thomas', 'password5');

-- Insert data into AuthReception
INSERT INTO AuthReception (AuthRe_ID, Reception_ID, AuRe_Username, AuRe_Password)
VALUES
(1, 1, 'reception1', 'password1'),
(2, 2, 'reception2', 'password2'),
(3, 3, 'reception3', 'password3'),
(4, 4, 'reception4', 'password4'),
(5, 5, 'reception5', 'password5');

-- Insert data into AuthMember
INSERT INTO AuthMember (AuthMe_ID, Member_ID, AuMe_Username, AuMe_Password)
VALUES
(1, 1, 'mark.twain', 'password1'),
(2, 2, 'harriet.beecher', 'password2'),
(3, 3, 'tom.sawyer', 'password3'),
(4, 4, 'becky.thatcher', 'password4'),
(5, 5, 'huckleberry.finn', 'password5');

-- Insert data into OrderLab
INSERT INTO OrderLab (OrderLab_ID, Physician_ID, Card_ID, Physician_Name, Emergency_Case, OrderDate, OrderLabStatus)
VALUES
(1, 1, '1234567890123', 'Dr. Adams', FALSE, CURRENT_TIMESTAMP, 'Pending'),
(2, 2, '1234567890124', 'Dr. Baker', TRUE, CURRENT_TIMESTAMP, 'Completed'),
(3, 3, '1234567890125', 'Dr. Clark', FALSE, CURRENT_TIMESTAMP, 'Pending'),
(4, 4, '1234567890126', 'Dr. Thompson', TRUE, CURRENT_TIMESTAMP, 'In Progress'),
(5, 5, '1234567890127', 'Dr. Scott', FALSE, CURRENT_TIMESTAMP, 'Pending');

-- Insert data into Appointment
INSERT INTO Appointment (App_ID, OrderLab_ID, Member_ID, App_AppointDate, App_AppointTime, App_AcceptDate)
VALUES
(1, 1, 1, '2024-10-20', '10:00:00', CURRENT_TIMESTAMP),
(2, 2, 2, '2024-10-21', '11:00:00', CURRENT_TIMESTAMP),
(3, 3, 3, '2024-10-22', '09:00:00', CURRENT_TIMESTAMP),
(4, 4, 4, '2024-10-23', '14:00:00', CURRENT_TIMESTAMP),
(5, 5, 5, '2024-10-24', '15:00:00', CURRENT_TIMESTAMP);

-- Insert data into Accept_Appointment
INSERT INTO Accept_Appointment (Acp_ID, App_ID, Acp_Status, Acp_AcceptDate)
VALUES
(1, 1, 'Accepted', CURRENT_TIMESTAMP),
(2, 2, 'Rejected', CURRENT_TIMESTAMP),
(3, 3, 'Accepted', CURRENT_TIMESTAMP),
(4, 4, 'Pending', CURRENT_TIMESTAMP),
(5, 5, 'Accepted', CURRENT_TIMESTAMP);

-- Insert data into QRCodeSample
INSERT INTO QRCodeSample (QRCode_ID, Acp_ID, QRCode_image, QRCode_Date)
VALUES
(1, 1, 'qrcode1.png', CURRENT_TIMESTAMP),
(2, 2, 'qrcode2.png', CURRENT_TIMESTAMP),
(3, 3, 'qrcode3.png', CURRENT_TIMESTAMP),
(4, 4, 'qrcode4.png', CURRENT_TIMESTAMP),
(5, 5, 'qrcode5.png', CURRENT_TIMESTAMP);

-- Insert data into SelectedItems
INSERT INTO SelectedItems (SelectedItems_ID, QRCode_ID, Item_ID, SelectedItems_amount, SelectedItems_Date)
VALUES
(1, 1, 1, 5.00, CURRENT_TIMESTAMP),
(2, 2, 2, 10.00, CURRENT_TIMESTAMP),
(3, 3, 3, 15.00, CURRENT_TIMESTAMP),
(4, 4, 4, 20.00, CURRENT_TIMESTAMP),
(5, 5, 5, 25.00, CURRENT_TIMESTAMP);

-- Insert data into RecordLab
INSERT INTO RecordLab 
(RecordLab_ID,
Acp_ID,
CBC,
Hematocrit,
ESR,
PT_INR,
aPTT,
TT,
ABO_gr,
Rh_gr,
Urine_Analysis,
Pregnancy_Test,
Stool_Exam,
Occult_Blood,
Wet_Smear,
RPR,
TPHA,
HIV_Ag_Ab,
HBsAg,
Anti_HBs,
Anti_HCV,
Anti_HBc_Total,
Anti_HBc_IgM,
Anti_HAV_IgM,
HBeAg,
Melioid_titer,
CA_125,
Ca_15_3,
CA_19_9,
AFP,
CEA,
PSA,
B_HCG,
Free_T4,
Free_T3,
TSH,
Cortisol,
Blood_Sugar,
BUN,
Creatinine,
GFR,
Uric_acid,
Electrolyte_Na_Cl_K_CO2,
HbAlC,
Calcium,
Phosphorus,
Magnesium,
Serum_Iron,
TIBC,
Ferritin,
GGT,
Cholesterol_LFT,
Total_protein,
Albumin,
Direct_bilirubin,
Total_bilirubin,
AST_SGOT,
ALT_SGPT,
Alkaline_Phosphatase,
Cholesterol_Lupid_Profile,
Triglyceride,
HDL_Cholesterol,
LDL_Cholesterol,
LDL_Direct,
Creatinine_24_hrs,
Protein_24_hrs,
Creatinine_random,
Protein_random,
Microalbumin,
Urine_Na_K_Cl,
AFB_stain,
Gram_stain,
Hemo_I,
Hemo_II,
Sputum,
PUS,
Urine,
RSC,
Fluid,
CSF,
LDH,
CPK,
Amylase_Urine,
Amylase_Serum,
ADA_Urine,
ADA_Serum,
Osmolarity_Urine,
Osmolarity_Serum,
Ketone,
Lipase,
Transferin,
Parathyroid,
L_Lactate,
Troponin_I,
Prolactin,
LH,
FSH,
Estradiol_E2,
Insulin,
Testosterone,
Thyroglobulin,
Anti_Thyroglobulin,
Microsomal_Ab,
Phenobarbital,
PhenyItoin,
Digoxin,
Valproic,
Carbamazepine,
Vancomycin,
NT_ProBNP,
Chromosome_Study,
Aldosterone,
Renin,
Anti_Smooth_Muscle,
C_peptide,
JAK2_gene_Mutation,
HLA_B_5801,
TSH_Recceptor_Ab,
ANA_Profile,
Vitamin_B12,
Folate,
Urine_VMA,
Chikungunya_IgG_IgM,
Rheumatoid_factor,
C_Reactive_Protein,
ASO,
ANA_ANF_FANA,
Anti_ds_DNA,
Anti_Smith,
Beta_1_C_C3c,
C4_Complement,
Crypto_Ag,
Dengue_Ag_Ab,
Scrub_typhus,
Vitamin_D,
HBV_Viral_load,
HCV_Viral_load,
HSV_PCR,
CMV_PCR,
TB_PCR,
Anti_CCP,
Anti_Car_IgG_IgM,
Beta2_IgG_IgM,
VDRL_CSF,
D_dimer,
Lupus_anticoagulant,
LE_cell,
Fetal_cell,
OF_Test,
DCIP,
G_6_PD,
Reticulocyte,
Inclusion_body,
Heinz_body,
Hb_Typing,
Anti_Cardiolipin_IgA,
Beta2Glycoprotein_IgA,
Anti_HAV_Total,
Anti_HAB_IgG,
Anti_HBe,
Anti_thrombin_III,
Protein_C,
Protein_S,
Anti_DNaseB,
TB_culture,
 RecordLab_Date)
VALUES ();

-- Insert data into Billing
INSERT INTO Billing (BillID, Member_ID, OrderLab_ID, Total_amount, Date_of_Billing)
VALUES
(1, 1, 1, 1000.00, CURRENT_TIMESTAMP),
(2, 2, 2, 2000.00, CURRENT_TIMESTAMP),
(3, 3, 3, 1500.00, CURRENT_TIMESTAMP),
(4, 4, 4, 2500.00, CURRENT_TIMESTAMP),
(5, 5, 5, 3000.00, CURRENT_TIMESTAMP);

-- Insert data into Summary
INSERT INTO Summary (Summary_ID, Acp_ID, Total_amount, Summary_Date)
VALUES
(1, 1, 1000.00, CURRENT_TIMESTAMP),
(2, 2, 2000.00, CURRENT_TIMESTAMP),
(3, 3, 1500.00, CURRENT_TIMESTAMP),
(4, 4, 2500.00, CURRENT_TIMESTAMP),
(5, 5, 3000.00, CURRENT_TIMESTAMP);

-- Insert data into LabAccept
INSERT INTO LabAccept (LabAccept_ID, Employee_ID, OrderLab_ID, AcceptDate) VALUES
(1, 1, 1, CURRENT_TIMESTAMP),
(2, 2, 2, CURRENT_TIMESTAMP),
(3, 1, 3, CURRENT_TIMESTAMP),
(4, 3, 4, CURRENT_TIMESTAMP),
(5, 2, 5, CURRENT_TIMESTAMP);


-- Insert data into ReportLab
INSERT INTO ReportLab (ReportLab_ID, Employee_ID, OrderLab_ID, ReportDate) VALUES
(1, 1, 1, CURRENT_TIMESTAMP),
(2, 2, 2, CURRENT_TIMESTAMP),
(3, 1, 3, CURRENT_TIMESTAMP),
(4, 3, 4, CURRENT_TIMESTAMP),
(5, 2, 5, CURRENT_TIMESTAMP);

