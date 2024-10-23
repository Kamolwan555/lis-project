import pool from '../../db.js';

export const getUsers = async (req,res) =>{
    try {
        const client = await pool.connect();
        const result = await client.query(`
            SELECT *, 
              me_firstname || ' ' || me_lastname AS me_name, 
              me_address || ' ' || me_subdistric || ' ' || me_province || ' ' || me_postalcode AS me_contact 
            FROM member
          `);
        
        const card_id = result.rows.map(row => row.card_id);
        const name = result.rows.map(row => row.me_name);
        const birthday = result.rows.map(row => row.me_birthday);
        const gender = result.rows.map(row => row.me_gender);
        const contact_infromation = result.rows.map(row => row.me_phone);

        const MemberTable = {
            card_id,
            name,
            birthday,
            gender,
            contact_infromation
        }
        
        res.json(MemberTable);
        client.release();
    
      } catch (err) {
        console.error(err);
        res.send('Error ' + err);
      }
}

export const getLabTest = async (req,res) =>{
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * From LabTest');
        
        const TESTID = result.rows.map(row => row.labtest_id); 
        const TestName = result.rows.map(row => row.labtest_name); 
        const TestType = result.rows.map(row => row.labtest_type); 
        const TestPrice = result.rows.map(row => row.labtest_price);


        const LabTest = {
            TESTID,
            TestName,
            TestType,
            TestPrice
        }

        res.json(LabTest);
        client.release();
    
      } catch (err) {
        console.error(err);
        res.send('Error ' + err);
      }
}

export const createLabTest = async (req, res) => {
    const {
        labTest_name,
        labTest_default,
        labTest_unit,
        labTest_type,
        labTest_category,
        labTest_price,
    } = req.body;

    try {
        const client = await pool.connect();
        const ress = await client.query('SELECT MAX(labTest_id) AS latest_id FROM LabTest');
        const latestId = ress.rows[0].latest_id;

        // ถ้าไม่มี ID ในตารางให้ใช้ 0
        const newId = (latestId || 0) + 1;

        const query = `
            INSERT INTO LabTest (
                labTest_id,
                LabTest_Name,
                LabTest_Default,
                LabTest_Unit,
                LabTest_Type,
                LabTest_Catagory,
                LabTest_Price
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
        `;

        const values = [
            newId,
            labTest_name,
            labTest_default,
            labTest_unit,
            labTest_type,
            labTest_category,
            labTest_price,
        ];
        
        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            data: result.rows[0], // คืนค่าข้อมูล LabTest ที่ถูกสร้าง
        });
    } catch (error) {
        console.error('Error creating LabTest:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating LabTest',
            error: error.message,
        });
    }
}

export const updateLabTest = async (req, res) => {
    const { labTest_id } = req.params; // รับ labTest_id จาก URL parameters
    const {
        labTest_name,
        labTest_default,
        labTest_unit,
        labTest_type,
        labTest_category,
        labTest_price,
    } = req.body;

    try {
        const query = `
            UPDATE LabTest
            SET
                LabTest_Name = $1,
                LabTest_Default = $2,
                LabTest_Unit = $3,
                LabTest_Type = $4,
                LabTest_Catagory = $5,
                LabTest_Price = $6
            WHERE LabTest_ID = $7
            RETURNING *;
        `;

        const values = [
            labTest_name,
            labTest_default,
            labTest_unit,
            labTest_type,
            labTest_category,
            labTest_price,
            labTest_id,
        ];

        const result = await pool.query(query, values);
        
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'LabTest not found',
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0], // คืนค่าข้อมูล LabTest ที่ถูกอัปเดต
        });
    } catch (error) {
        console.error('Error updating LabTest:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating LabTest',
            error: error.message,
        });
    }
}

export const deleteLabTest = async (req, res) => {
    const { labTest_id } = req.params; // รับ labTest_id จาก URL parameters

    try {
        const query = `
            DELETE FROM LabTest
            WHERE LabTest_ID = $1
            RETURNING *;
        `;

        const result = await pool.query(query, [labTest_id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'LabTest not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'LabTest deleted successfully',
            data: result.rows[0], // คืนค่าข้อมูล LabTest ที่ถูกลบ
        });
    } catch (error) {
        console.error('Error deleting LabTest:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting LabTest',
            error: error.message,
        });
    }
}

//ต้นแบบ createMember
export const createMember = async (req, res) => {
  const {
      card_id,
      me_prefix,
      me_firstname,
      me_lastname,
      me_birthday,
      me_religion,
      me_ethnicity,
      me_nationality,
      me_gender,
      me_status,
      me_blood,
      me_address,
      me_subdistric,
      me_distric,
      me_province,
      me_postalcode,
      me_phone,
      me_email,
      me_drug,
      me_disease
  } = req.body; // คาดหวังว่า request body จะมีข้อมูลที่ต้องการ



  try {

    const client = await pool.connect();
    const ress = await client.query('SELECT MAX(Member_id) AS latest_id FROM member');
    const latestId = ress.rows[0].latest_id;

    // ถ้าไม่มี ID ในตารางให้ใช้ 0
    const newId = (latestId || 0) + 1;

      const query = `
          INSERT INTO member (
              member_id,
              card_id,
              me_prefix,
              me_firstname,
              me_lastname,
              me_birthday,
              me_religion,
              me_ethnicity,
              me_nationality,
              me_gender,
              me_status,
              me_blood,
              me_address,
              me_subdistric,
              me_distric,
              me_province,
              me_postalcode,
              me_phone,
              me_email,
              me_drug,
              me_disease
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *;
      `  // ตั้งค่าข้อมูลที่ไม่ได้กรอกเป็น NULL
            const values = [
                newId,
                card_id,
                me_prefix,
                me_firstname,
                me_lastname,
                me_birthday || null,
                me_religion,
                me_ethnicity || null,
                me_nationality || null,
                me_gender,
                me_status,
                me_blood,
                me_address || null,
                me_subdistric || null,
                me_distric || null,
                me_province || null,
                me_postalcode || null,
                me_phone,
                me_email || null,
                me_drug || null,
                me_disease || null
            ]

      const result = await pool.query(query, values);
      res.status(201).json({
          success: true,
          data: result.rows[0], // คืนค่าข้อมูลสมาชิกที่ถูกสร้าง
      });
  } catch (error) {
      console.error('Error inserting member:', error);
      res.status(500).json({
          success: false,
          message: 'Error inserting member',
          error: error.message,
      });
  }
}

//createMember for font
export const createMemberr = async (req, res) => {
    // Log request body
    console.log('Received request body:', req.body);

    const {
        card_id,
        me_prefix = "mr.",
        me_firstname,
        me_lastname,
        me_birthday = null,
        me_religion = null,
        me_ethnicity = null,
        me_nationality = null,
        me_gender,
        me_status = "single",
        me_blood = "A",
        me_address = null,
        me_subdistric = null,
        me_distric = null,
        me_province = null,
        me_postalcode = null,
        me_phone,
        me_email = null,
        me_drug = null,
        me_disease = null
    } = req.body;

    try {
        const client = await pool.connect();
        console.log('Connected to database');  // ตรวจสอบการเชื่อมต่อ

        const ress = await client.query('SELECT MAX(Member_id) AS latest_id FROM member');
        const latestId = ress.rows[0].latest_id;
        const newId = (latestId || 0) + 1;

        const query = `
            INSERT INTO member (
                member_id,
                card_id,
                me_prefix,
                me_firstname,
                me_lastname,
                me_birthday,
                me_religion,
                me_ethnicity,
                me_nationality,
                me_gender,
                me_status,
                me_blood,
                me_address,
                me_subdistric,
                me_distric,
                me_province,
                me_postalcode,
                me_phone,
                me_email,
                me_drug,
                me_disease
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *;
        `;

        // Log the values being inserted
        const values = [
            newId,
            card_id,
            me_prefix,
            me_firstname,
            me_lastname,
            me_birthday || null,
            me_religion,
            me_ethnicity || null,
            me_nationality || null,
            me_gender,
            me_status,
            me_blood,
            me_address || null,
            me_subdistric || null,
            me_distric || null,
            me_province || null,
            me_postalcode || null,
            me_phone,
            me_email || null,
            me_drug || null,
            me_disease || null
        ];
        console.log('Inserting values:', values);

        const result = await client.query(query, values);
        res.status(201).json({
            success: true,
            data: result.rows[0],  // คืนค่าข้อมูลสมาชิกที่ถูกสร้าง
        });
    } catch (error) {
        console.error('Error inserting member:', error);  // ตรวจสอบข้อผิดพลาดจากการ insert ข้อมูล
        res.status(500).json({
            success: false,
            message: 'Error inserting member',
            error: error.message,
        });
    }
}

export const updateMember = async (req, res) => {
    const { member_id } = req.params;
    const {
        card_id,
        me_prefix,
        me_firstname,
        me_lastname,
        me_birthday,
        me_religion,
        me_ethnicity,
        me_nationality,
        me_gender,
        me_status,
        me_blood,
        me_address,
        me_subdistric,
        me_distric,
        me_province,
        me_postalcode,
        me_phone,
        me_email,
        me_drug,
        me_disease
    } = req.body; // คาดหวังว่า request body จะมีข้อมูลที่ต้องการ

    // ตั้งค่าข้อมูลที่ไม่ได้กรอกเป็น NULL
    const values = [
        card_id,
        me_prefix,
        me_firstname,
        me_lastname,
        me_birthday || null,
        me_religion,
        me_ethnicity || null,
        me_nationality || null,
        me_gender,
        me_status,
        me_blood,
        me_address || null,
        me_subdistric || null,
        me_distric || null,
        me_province || null,
        me_postalcode || null,
        me_phone,
        me_email || null,
        me_drug || null,
        me_disease || null,
        member_id // member_id จะอยู่ในตำแหน่งสุดท้ายเพื่อใช้ใน WHERE
    ];

    try {
        const query = `
            UPDATE member
            SET
                card_id = $1,
                me_prefix = $2,
                me_firstname = $3,
                me_lastname = $4,
                me_birthday = $5,
                me_religion = $6,
                me_ethnicity = $7,
                me_nationality = $8,
                me_gender = $9,
                me_status = $10,
                me_blood = $11,
                me_address = $12,
                me_subdistric = $13,
                me_distric = $14,
                me_province = $15,
                me_postalcode = $16,
                me_phone = $17,
                me_email = $18,
                me_drug = $19,
                me_disease = $20
            WHERE member_id = $21
            RETURNING *;
        `;

        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Member not found',
            });
        }
        res.status(200).json({
            success: true,
            data: result.rows[0], // คืนค่าข้อมูลสมาชิกที่ถูกแก้ไข
        });
    } catch (error) {
        console.error('Error updating member:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating member',
            error: error.message,
        });
    }
}

export const deleteMember = async (req, res) => {
    const { member_id } = req.params; // คาดหวังว่า member_id จะถูกส่งใน URL parameter

    try {
        const query = `
            DELETE FROM member
            WHERE member_id = $1
            RETURNING *; 
        `;

        const result = await pool.query(query, [member_id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Member not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Member deleted successfully',
            data: result.rows[0], // คืนค่าข้อมูลสมาชิกที่ถูกลบ
        });
    } catch (error) {
        console.error('Error deleting member:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting member',
            error: error.message,
        });
    }
}

export const getAppointment = async (req,res) =>{
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * From Appointment');

        res.json(result.rows);
        client.release();
    
      } catch (err) {
        console.error(err);
        res.send('Error ' + err);
      }
}

export const Appointment = async (req,res) =>{
    const {
        orderlab_id,
        member_id,
        cardd_id,
        app_appointdate,
        app_appointtime
    } = req.body;

    try {
        const client = await pool.connect();
        console.log('Connected to database');  // ตรวจสอบการเชื่อมต่อ

        const ress = await client.query('SELECT MAX(app_id) AS latest_id FROM appointment');
        const latestId = ress.rows[0].latest_id;
        const newId = (latestId || 0) + 1;

        const query = `
            INSERT INTO appointment (
                app_id,
                orderlab_id,
                member_id,
                card_id,
                app_appointdate,
                app_appointtime,
                app_acceptdate
            ) VALUES ($1, $2, $3, $4, $5, $6, current_timestamp ) RETURNING *;
        `;

        // Log the values being inserted
        const values = [
            newId,
            orderlab_id,
            member_id || null,
            cardd_id,
            app_appointdate,
            app_appointtime
        ];
        console.log('Inserting values:', values);
        
        const result = await client.query(query, values);
        res.status(201).json({
            success: true,
            data: result.rows[0],  // คืนค่าข้อมูลสมาชิกที่ถูกสร้าง
        });
        client.release();

    } catch (error) {
        console.error('Error creating appoinment:', error);  // ตรวจสอบข้อผิดพลาดจากการ insert ข้อมูล
        res.status(500).json({
            success: false,
            message: 'Error creating appoinment',
            error: error.message,
        });
    }
}

//สร้างการยืนยัน + สร้างฟอร์ม record ไว้รอกรอกผล
export const AccepetAppointment = async (req,res) => {
    const { app_id } = req.params;
    const {
        Accept
    } = req.body;

    try {
        const client = await pool.connect();
        console.log('Connected to database');  // ตรวจสอบการเชื่อมต่อ

        const ress = await client.query('SELECT MAX(acp_id) AS latest_id FROM accept_appointment');
        const latestId = ress.rows[0].latest_id;
        const newId = (latestId || 0) + 1;

        const query = `
            INSERT INTO accept_appointment (
                acp_id,
                app_id,
                acp_status,
                acp_acceptdate
            ) VALUES ($1, $2, $3, current_timestamp ) RETURNING *;
        `;

        // Log the values being inserted
        const values = [
            newId,
            app_id,
            Accept
        ];
        console.log('Inserting Acception Appointment:', values);
        
        const result = await client.query(query, values);
        const acp_id = result.rows[0].acp_id

        const ressRecord = await client.query('SELECT MAX(recordlab_id) AS latest_id FROM recordlab');
        const latestIdRecord = ressRecord.rows[0].latest_id;
        const newIdRecord = (latestIdRecord || 0) + 1;

        const recordLabQuery = `
            INSERT INTO RecordLab (
                RecordLab_ID,
                acp_id
                
            ) VALUES ($1, $2) RETURNING *;
        `;

        const recordLabValues = [
            newIdRecord, 
            acp_id 
        ];
        
        console.log('Inserting into RecordLab:', recordLabValues);
        const recordLabResult = await client.query(recordLabQuery, recordLabValues);

        // ส่งผลลัพธ์ทั้งหมดกลับไป
        res.status(201).json({
            success: true,
            data: {
                appointment: result.rows[0],  // ข้อมูลที่สร้างใน accept_appointment
                recordLab: recordLabResult.rows[0] // ข้อมูลที่สร้างใน RecordLab
            },
        });
        
    } catch (error) {
        console.error('Error creating appointment:', error);  // ตรวจสอบข้อผิดพลาดจากการ insert ข้อมูล
        res.status(500).json({
            success: false,
            message: 'Error creating appointment',
            error: error.message,
        });
    } finally {
        client.release(); // ปล่อยการเชื่อมต่อ
    }
}

//แบบแก้ไขผลแลป put
export const editrecordlab = async (req,res) => {
    const { recordlab_id } = req.params; // รับ labTest_id จาก URL parameters
    const {
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
        TB_culture
    } = req.body;

    try {
        const query = `
            UPDATE recordlab
            SET
                CBC = $1,
                Hematocrit = $2,
                ESR = $3,
                PT_INR = $4,
                aPTT = $5,
                TT = $6,
                ABO_gr = $7,
                Rh_gr = $8,
                Urine_Analysis = $9,
                Pregnancy_Test = $10,
                Stool_Exam = $11,
                Occult_Blood = $12,
                Wet_Smear = $13,
                RPR = $14,
                TPHA = $15,
                HIV_Ag_Ab = $16,
                HBsAg = $17,
                Anti_HBs = $18,
                Anti_HCV = $19 ,
                Anti_HBc_Total = $20,
                Anti_HBc_IgM = $21,
                Anti_HAV_IgM = $22,
                HBeAg = $23,
                Melioid_titer = $24,
                CA_125 = $25,
                Ca_15_3 = $26,
                CA_19_9 = $27,
                AFP = $28,
                CEA = $29,
                PSA = $30,
                B_HCG = $31,
                Free_T4 = $32,
                Free_T3 = $33,
                TSH = $34,
                Cortisol = $35,
                Blood_Sugar = $36,
                BUN = $37,
                Creatinine = $38,
                GFR = $39,
                Uric_acid = $40,
                Electrolyte_Na_Cl_K_CO2 = $41,
                HbAlC = $42,
                Calcium = $43,
                Phosphorus = $44,
                Magnesium = $45,
                Serum_Iron = $46,
                TIBC = $47,
                Ferritin = $48,
                GGT = $49,
                Cholesterol_LFT = $50,
                Total_protein = $51,
                Albumin = $52,
                Direct_bilirubin = $53,
                Total_bilirubin = $54,
                AST_SGOT = $55,
                ALT_SGPT = $56,
                Alkaline_Phosphatase = $57,
                Cholesterol_Lupid_Profile = $58,
                Triglyceride = $59,
                HDL_Cholesterol = $60,
                LDL_Cholesterol = $61,
                LDL_Direct = $62,
                Creatinine_24_hrs = $63,
                Protein_24_hrs = $64,
                Creatinine_random = $65,
                Protein_random = $66,
                Microalbumin = $67,
                Urine_Na_K_Cl = $68,
                AFB_stain = $69,
                Gram_stain = $70,
                Hemo_I = $71,
                Hemo_II = $72,
                Sputum = $73,
                PUS = $74,
                Urine = $75,
                RSC = $76,
                Fluid = $77,
                CSF = $78,
                LDH = $79,
                CPK = $80,
                Amylase_Urine = $81,
                Amylase_Serum = $82,
                ADA_Urine = $83,
                ADA_Serum = $84,
                Osmolarity_Urine = $85,
                Osmolarity_Serum = $86,
                Ketone = $87,
                Lipase = $88,
                Transferin = $89,
                Parathyroid = $90,
                L_Lactate = $91,
                Troponin_I = $92,
                Prolactin = $93,
                LH = $94,
                FSH = $95,
                Estradiol_E2 = $96,
                Insulin = $97,
                Testosterone = $98,
                Thyroglobulin = $99,
                Anti_Thyroglobulin = $100,
                Microsomal_Ab = $101,
                Phenobarbital = $102,
                PhenyItoin_Dilantin = $103,
                Digoxin = $104,
                Valproic_Depakin = $105,
                Carbamazepine = $106,
                Vancomycin = $107,
                NT_ProBNP = $108,
                Chromosome_Study = $109,
                Aldosterone = $110,
                Renin = $111,
                Anti_Smooth_Muscle = $112,
                C_peptide = $113,
                JAK2_gene_Mutation = $114,
                HLA_B_5801 = $115,
                TSH_Recceptor_Ab = $116,
                ANA_Profile = $117,
                Vitamin_B12 = $118,
                Folate = $119,
                Urine_VMA = $120,
                Chikungunya_IgG_IgM = $121,
                Rheumatoid_factor = $122,
                C_Reactive_Protein = $123,
                ASO = $124,
                ANA_ANF_FANA = $125,
                Anti_ds_DNA = $126,
                Anti_Smith = $127,
                Beta_1_C_C3c = $128,
                C4_Complement = $129,
                Crypto_Ag = $130,
                Dengue_Ag_Ab = $131,
                Scrub_typhus = $132,
                Vitamin_D = $133,
                HBV_Viral_load = $134,
                HCV_Viral_load = $135,
                HSV_PCR = $136,
                CMV_PCR = $137,
                TB_PCR = $138,
                Anti_CCP = $139,
                Anti_Car_IgG_IgM = $140,
                Beta2_IgG_IgM = $141,
                VDRL_CSF = $142,
                D_dimer = $143,
                Lupus_anticoagulant = $144,
                LE_cell = $145,
                Fetal_cell = $146,
                OF_Test = $147,
                DCIP = $148,
                G_6_PD = $149,
                Reticulocyte = $150,
                Inclusion_body = $151,
                Heinz_body = $152,
                Hb_Typing = $153,
                Anti_Cardiolipin_IgA = $154,
                Beta2Glycoprotein_IgA = $155,
                Anti_HAV_Total = $156,
                Anti_HAB_IgG = $157,
                Anti_HBe = $158,
                Anti_thrombin_III = $159,
                Protein_C = $160,
                Protein_S = $161,
                Anti_DNaseB = $162,
                TB_culture = $163,
                recordlab_date = current_timestamp
            WHERE recordlab_id = $164
            RETURNING *;
        `;

        const values = [
            CBC || null,
            Hematocrit || null,
            ESR || null,
            PT_INR || null,
            aPTT || null,
            TT || null,
            ABO_gr || null,
            Rh_gr || null,
            Urine_Analysis || null,
            Pregnancy_Test || null,
            Stool_Exam || null,
            Occult_Blood || null,
            Wet_Smear || null,
            RPR || null,
            TPHA || null,
            HIV_Ag_Ab || null,
            HBsAg || null,
            Anti_HBs || null,
            Anti_HCV || null,
            Anti_HBc_Total || null,
            Anti_HBc_IgM || null,
            Anti_HAV_IgM || null,
            HBeAg || null,
            Melioid_titer || null,
            CA_125 || null,
            Ca_15_3 || null,
            CA_19_9 || null,
            AFP || null,
            CEA || null,
            PSA || null,
            B_HCG || null,
            Free_T4 || null,
            Free_T3 || null,
            TSH || null,
            Cortisol || null,
            Blood_Sugar || null,
            BUN || null,
            Creatinine || null,
            GFR || null,
            Uric_acid || null,
            Electrolyte_Na_Cl_K_CO2 || null,
            HbAlC || null,
            Calcium || null,
            Phosphorus || null,
            Magnesium || null,
            Serum_Iron || null,
            TIBC || null,
            Ferritin || null,
            GGT || null,
            Cholesterol_LFT || null,
            Total_protein || null,
            Albumin || null,
            Direct_bilirubin || null,
            Total_bilirubin || null,
            AST_SGOT || null,
            ALT_SGPT || null,
            Alkaline_Phosphatase || null,
            Cholesterol_Lupid_Profile || null,
            Triglyceride || null,
            HDL_Cholesterol || null,
            LDL_Cholesterol || null,
            LDL_Direct || null,
            Creatinine_24_hrs || null,
            Protein_24_hrs || null,
            Creatinine_random || null,
            Protein_random || null,
            Microalbumin || null,
            Urine_Na_K_Cl || null,
            AFB_stain || null,
            Gram_stain || null,
            Hemo_I || null,
            Hemo_II || null,
            Sputum || null,
            PUS || null,
            Urine || null,
            RSC || null,
            Fluid || null,
            CSF || null,
            LDH || null,
            CPK || null,
            Amylase_Urine || null,
            Amylase_Serum || null,
            ADA_Urine || null,
            ADA_Serum || null,
            Osmolarity_Urine || null,
            Osmolarity_Serum || null,
            Ketone || null,
            Lipase || null,
            Transferin || null,
            Parathyroid || null,
            L_Lactate || null,
            Troponin_I || null,
            Prolactin || null,
            LH || null,
            FSH || null,
            Estradiol_E2 || null,
            Insulin || null,
            Testosterone || null,
            Thyroglobulin || null,
            Anti_Thyroglobulin || null,
            Microsomal_Ab || null,
            Phenobarbital || null,
            PhenyItoin || null,
            Digoxin || null,
            Valproic || null,
            Carbamazepine || null,
            Vancomycin || null,
            NT_ProBNP || null,
            Chromosome_Study || null,
            Aldosterone || null,
            Renin || null,
            Anti_Smooth_Muscle || null,
            C_peptide || null,
            JAK2_gene_Mutation || null,
            HLA_B_5801 || null,
            TSH_Recceptor_Ab || null,
            ANA_Profile || null,
            Vitamin_B12 || null,
            Folate || null,
            Urine_VMA || null,
            Chikungunya_IgG_IgM || null,
            Rheumatoid_factor || null,
            C_Reactive_Protein || null,
            ASO || null,
            ANA_ANF_FANA || null,
            Anti_ds_DNA || null,
            Anti_Smith || null,
            Beta_1_C_C3c || null,
            C4_Complement || null,
            Crypto_Ag || null,
            Dengue_Ag_Ab || null,
            Scrub_typhus || null,
            Vitamin_D || null,
            HBV_Viral_load || null,
            HCV_Viral_load || null,
            HSV_PCR || null,
            CMV_PCR || null,
            TB_PCR || null,
            Anti_CCP || null,
            Anti_Car_IgG_IgM || null,
            Beta2_IgG_IgM || null,
            VDRL_CSF || null,
            D_dimer || null,
            Lupus_anticoagulant || null,
            LE_cell || null,
            Fetal_cell || null,
            OF_Test || null,
            DCIP || null,
            G_6_PD || null,
            Reticulocyte || null,
            Inclusion_body || null,
            Heinz_body || null,
            Hb_Typing || null,
            Anti_Cardiolipin_IgA || null,
            Beta2Glycoprotein_IgA || null,
            Anti_HAV_Total || null,
            Anti_HAB_IgG || null,
            Anti_HBe || null,
            Anti_thrombin_III || null,
            Protein_C || null,
            Protein_S || null,
            Anti_DNaseB || null,
            TB_culture || null,
            recordlab_id
        ];

        const result = await pool.query(query, values);
        
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'LabTest not found',
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0], // คืนค่าข้อมูล LabTest ที่ถูกอัปเดต
        });
    } catch (error) {
        console.error('Error updating LabTest:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating LabTest',
            error: error.message,
        });
    }
}

export const createLabAccept = async (req,res) => {
    const { recordlab_id, employee_id } = req.params; 
    const {
        labaccept_descrip
    } = req.body

    try {
        const client = await pool.connect();
        console.log('Connected to database');  // ตรวจสอบการเชื่อมต่อ

        const ress = await client.query('SELECT MAX(labaccept_id) AS latest_id FROM labaccept');
        const latestId = ress.rows[0].latest_id;
        const newId = (latestId || 0) + 1;

        const query = `
            INSERT INTO labaccept (
                labaccept_id,
                recordlab_id,
                labaccept_descrip,
                employee_id,
                employee_name,
                labaccept_date
            ) VALUES ($1, $2, $3, $4, $5, current_timestamp ) RETURNING *;
        `;

        // Log the values being inserted
        const values = [
            newId,
            recordlab_id,
            labaccept_descrip,
            employee_id,
            "Mister A"
        ];
        console.log('Inserting values:', values);

        const result = await client.query(query, values);
        res.status(201).json({
            success: true,
            data: result.rows[0],  // คืนค่าข้อมูลสมาชิกที่ถูกสร้าง
        });
    } catch (error) {
        console.error('Error inserting LabAccept:', error);  // ตรวจสอบข้อผิดพลาดจากการ insert ข้อมูล
        res.status(500).json({
            success: false,
            message: 'Error inserting member',
            error: error.message,
        });
    }
}

export const createLabReport = async (req,res) => {
    const { employee_id, labaccept_id } = req.params; 
    const {
        reportlab_descrip
    } = req.body

    try {
        const client = await pool.connect();
        console.log('Connected to database');  // ตรวจสอบการเชื่อมต่อ

        const ress = await client.query('SELECT MAX(reportlab_id) AS latest_id FROM reportlab');
        const latestId = ress.rows[0].latest_id;
        const newId = (latestId || 0) + 1;

        const query = `
            INSERT INTO reportlab (
                reportlab_id,
                labaccept_id,
                reportlab_descrip,
                employee_id,
                employee_name,
                reportlab_date
            ) VALUES ($1, $2, $3, $4, $5, current_timestamp ) RETURNING *;
        `;

        // Log the values being inserted
        const values = [
            newId,
            labaccept_id,
            reportlab_descrip,
            employee_id,
            "Mister B"
        ];
        console.log('Inserting values:', values);

        const result = await client.query(query, values);
        res.status(201).json({
            success: true,
            data: result.rows[0],  // คืนค่าข้อมูลสมาชิกที่ถูกสร้าง
        });
    } catch (error) {
        console.error('Error inserting LabAccept:', error);  // ตรวจสอบข้อผิดพลาดจากการ insert ข้อมูล
        res.status(500).json({
            success: false,
            message: 'Error inserting member',
            error: error.message,
        });
    }
}

export const getLabAccept = async (req,res) =>{
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * From labaccept');

        res.json(result.rows);
        client.release();
    
      } catch (err) {
        console.error(err);
        res.send('Error ' + err);
      }
}

export const getReportLab = async (req,res) =>{
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * From reportlab');

        res.json(result.rows);
        client.release();
    
      } catch (err) {
        console.error(err);
        res.send('Error ' + err);
      }
}