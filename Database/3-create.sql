CREATE TABLE PackageLabDetail (
    PackageLabDetail_ID INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    PackageLab_ID INT NOT NULL,
    LabTest_ID INT NOT NULL,
    FOREIGN KEY (PackageLab_ID) REFERENCES PackageLab(PackageLab_ID),
    FOREIGN KEY (LabTest_ID) REFERENCES LabTest(LabTest_ID)
);

CREATE TABLE OrderSelection (
    OrderLab_ID INT NOT NULL,
    Member_ID INT,
    Card_ID CHAR(13) NOT NULL,
    CBC BOOLEAN NOT NULL,
    Hematocrit BOOLEAN NOT NULL,
    ESR BOOLEAN NOT NULL,
    PT_INR BOOLEAN NOT NULL,
    aPTT BOOLEAN NOT NULL,
    TT BOOLEAN NOT NULL,
    ABO_gr BOOLEAN NOT NULL,
    Rh_gr BOOLEAN NOT NULL,
    Urine_Analysis BOOLEAN NOT NULL,
    Pregnancy_Test BOOLEAN NOT NULL,
    Stool_Exam BOOLEAN NOT NULL,
    Occult_Blood BOOLEAN NOT NULL,
    Wet_Smear BOOLEAN NOT NULL,
    RPR BOOLEAN NOT NULL,
    TPHA BOOLEAN NOT NULL,
    HIV_Ag_Ab BOOLEAN NOT NULL,
    HBsAg BOOLEAN NOT NULL,
    Anti_HBs BOOLEAN NOT NULL,
    Anti_HCV BOOLEAN NOT NULL,
    Anti_HBc_Total BOOLEAN NOT NULL,
    Anti_HBc_IgM BOOLEAN NOT NULL,
    Anti_HAV_IgM BOOLEAN NOT NULL,
    HBeAg BOOLEAN NOT NULL,
    Melioid_titer BOOLEAN NOT NULL,
    CA_125 BOOLEAN NOT NULL,
    Ca_15_3 BOOLEAN NOT NULL,
    CA_19_9 BOOLEAN NOT NULL,
    AFP BOOLEAN NOT NULL,
    CEA BOOLEAN NOT NULL,
    PSA BOOLEAN NOT NULL,
    B_HCG BOOLEAN NOT NULL,
    Free_T4 BOOLEAN NOT NULL,
    Free_T3 BOOLEAN NOT NULL,
    TSH BOOLEAN NOT NULL,
    Cortisol BOOLEAN NOT NULL,
    Blood_Sugar BOOLEAN NOT NULL,
    BUN BOOLEAN NOT NULL,
    Creatinine BOOLEAN NOT NULL,
    GFR BOOLEAN NOT NULL,
    Uric_acid BOOLEAN NOT NULL,
    Electrolyte_Na_Cl_K_CO2 BOOLEAN NOT NULL,
    HbAlC BOOLEAN NOT NULL,
    Calcium BOOLEAN NOT NULL,
    Phosphorus BOOLEAN NOT NULL,
    Magnesium BOOLEAN NOT NULL,
    Serum_Iron BOOLEAN NOT NULL,
    TIBC BOOLEAN NOT NULL,
    Ferritin BOOLEAN NOT NULL,
    GGT BOOLEAN NOT NULL,
    Cholesterol_LFT BOOLEAN NOT NULL,
    Total_protein BOOLEAN NOT NULL,
    Albumin BOOLEAN NOT NULL,
    Direct_bilirubin BOOLEAN NOT NULL,
    Total_bilirubin BOOLEAN NOT NULL,
    AST_SGOT BOOLEAN NOT NULL,
    ALT_SGPT BOOLEAN NOT NULL,
    Alkaline_Phosphatase BOOLEAN NOT NULL,
    Cholesterol_Lupid_Profile BOOLEAN NOT NULL,
    Triglyceride BOOLEAN NOT NULL,
    HDL_Cholesterol BOOLEAN NOT NULL,
    LDL_Cholesterol BOOLEAN NOT NULL,
    LDL_Direct BOOLEAN NOT NULL,
    Creatinine_24_hrs BOOLEAN NOT NULL,
    Protein_24_hrs BOOLEAN NOT NULL,
    Creatinine_random BOOLEAN NOT NULL,
    Protein_random BOOLEAN NOT NULL,
    Microalbumin BOOLEAN NOT NULL,
    Urine_Na_K_Cl BOOLEAN NOT NULL,
    AFB_stain BOOLEAN NOT NULL,
    Gram_stain BOOLEAN NOT NULL,
    Hemo_I BOOLEAN NOT NULL,
    Hemo_II BOOLEAN NOT NULL,
    Sputum BOOLEAN NOT NULL,
    PUS BOOLEAN NOT NULL,
    Urine BOOLEAN NOT NULL,
    RSC BOOLEAN NOT NULL,
    Fluid BOOLEAN NOT NULL,
    CSF BOOLEAN NOT NULL,
    LDH BOOLEAN NOT NULL,
    CPK BOOLEAN NOT NULL,
    Amylase_Urine BOOLEAN NOT NULL,
    Amylase_Serum BOOLEAN NOT NULL,
    ADA_Urine BOOLEAN NOT NULL,
    ADA_Serum BOOLEAN NOT NULL,
    Osmolarity_Urine BOOLEAN NOT NULL,
    Osmolarity_Serum BOOLEAN NOT NULL,
    Ketone BOOLEAN NOT NULL,
    Lipase BOOLEAN NOT NULL,
    Transferin BOOLEAN NOT NULL,
    Parathyroid BOOLEAN NOT NULL,
    L_Lactate BOOLEAN NOT NULL,
    Troponin_I BOOLEAN NOT NULL,
    Prolactin BOOLEAN NOT NULL,
    LH BOOLEAN NOT NULL,
    FSH BOOLEAN NOT NULL,
    Estradiol_E2 BOOLEAN NOT NULL,
    Insulin BOOLEAN NOT NULL,
    Testosterone BOOLEAN NOT NULL,
    Thyroglobulin BOOLEAN NOT NULL,
    Anti_Thyroglobulin BOOLEAN NOT NULL,
    Microsomal_Ab BOOLEAN NOT NULL,
    Phenobarbital BOOLEAN NOT NULL,
    PhenyItoin BOOLEAN NOT NULL,
    Digoxin BOOLEAN NOT NULL,
    Valproic BOOLEAN NOT NULL,
    Carbamazepine BOOLEAN NOT NULL,
    Vancomycin BOOLEAN NOT NULL,
    NT_ProBNP BOOLEAN NOT NULL,
    Chromosome_Study BOOLEAN NOT NULL,
    Aldosterone BOOLEAN NOT NULL,
    Renin BOOLEAN NOT NULL,
    Anti_Smooth_Muscle BOOLEAN NOT NULL,
    C_peptide BOOLEAN NOT NULL,
    JAK2_gene_Mutation BOOLEAN NOT NULL,
    HLA_B_5801 BOOLEAN NOT NULL,
    TSH_Recceptor_Ab BOOLEAN NOT NULL,
    ANA_Profile BOOLEAN NOT NULL,
    Vitamin_B12 BOOLEAN NOT NULL,
    Folate BOOLEAN NOT NULL,
    Urine_VMA BOOLEAN NOT NULL,
    Chikungunya_IgG_IgM BOOLEAN NOT NULL,
    Rheumatoid_factor BOOLEAN NOT NULL,
    C_Reactive_Protein BOOLEAN NOT NULL,
    ASO BOOLEAN NOT NULL,
    ANA_ANF_FANA BOOLEAN NOT NULL,
    Anti_ds_DNA BOOLEAN NOT NULL,
    Anti_Smith BOOLEAN NOT NULL,
    Beta_1_C_C3c BOOLEAN NOT NULL,
    C4_Complement BOOLEAN NOT NULL,
    Crypto_Ag BOOLEAN NOT NULL,
    Dengue_Ag_Ab BOOLEAN NOT NULL,
    Scrub_typhus BOOLEAN NOT NULL,
    Vitamin_D BOOLEAN NOT NULL,
    HBV_Viral_load BOOLEAN NOT NULL,
    HCV_Viral_load BOOLEAN NOT NULL,
    HSV_PCR BOOLEAN NOT NULL,
    CMV_PCR BOOLEAN NOT NULL,
    TB_PCR BOOLEAN NOT NULL,
    Anti_CCP BOOLEAN NOT NULL,
    Anti_Car_IgG_IgM BOOLEAN NOT NULL,
    Beta2_IgG_IgM BOOLEAN NOT NULL,
    VDRL_CSF BOOLEAN NOT NULL,
    D_dimer BOOLEAN NOT NULL,
    Lupus_anticoagulant BOOLEAN NOT NULL,
    LE_cell BOOLEAN NOT NULL,
    Fetal_cell BOOLEAN NOT NULL,
    OF_Test BOOLEAN NOT NULL,
    DCIP BOOLEAN NOT NULL,
    G_6_PD BOOLEAN NOT NULL,
    Reticulocyte BOOLEAN NOT NULL,
    Inclusion_body BOOLEAN NOT NULL,
    Heinz_body BOOLEAN NOT NULL,
    Hb_Typing BOOLEAN NOT NULL,
    Anti_Cardiolipin_IgA BOOLEAN NOT NULL,
    Beta2Glycoprotein_IgA BOOLEAN NOT NULL,
    Anti_HAV_Total BOOLEAN NOT NULL,
    Anti_HAB_IgG BOOLEAN NOT NULL,
    Anti_HBe BOOLEAN NOT NULL,
    Anti_thrombin_III BOOLEAN NOT NULL,
    Protein_C BOOLEAN NOT NULL,
    Protein_S BOOLEAN NOT NULL,
    Anti_DNaseB BOOLEAN NOT NULL,
    TB_culture BOOLEAN NOT NULL,
    FOREIGN KEY (OrderLab_ID) REFERENCES OrderLab(OrderLab_ID),
    FOREIGN KEY (Member_ID) REFERENCES Member(Member_ID)
);