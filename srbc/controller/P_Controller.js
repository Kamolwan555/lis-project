import pool from '../../db.js';

export const getOrders = async (req,res) =>{
    try {
        const client = await pool.connect();
        const result = await client.query(`
            SELECT *
            FROM OrderLab
          `);
        
        const OrderLabID = result.rows.map(row => row.orderlab_id);
        const DoctorID = result.rows.map(row => row.physician_id);
        const CardID = result.rows.map(row => row.card_id);
        const Emergency = result.rows.map(row => row.emergency_case);
        const OrderDate = result.rows.map(row => row.orderdate);
        const OrderStatus = result.rows.map(row => row.orderstatus);

        const MemberTable = {
            OrderLabID,
            DoctorID,
            CardID,
            Emergency,
            OrderDate,
            OrderStatus
        }
        
        res.json(MemberTable);
        client.release();
    
      } catch (err) {
        console.error(err);
        res.send('Error ' + err);
      }
}

export const createOrderLab = async (req,res) =>{
    const {
        physician_id,
        card_id,
        physician_name ,
        emergency_case,
        orderdate,
        orderstatus
    } = req.body;

    try {
        const client = await pool.connect();
        console.log('Connected to database');  // ตรวจสอบการเชื่อมต่อ

        const ress = await client.query('SELECT MAX(orderlab_id) AS latest_id FROM orderlab');
        const latestId = ress.rows[0].latest_id;
        const newId = (latestId || 0) + 1;
        const cardId = card_id;

        const query = `
            INSERT INTO orderlab (
                order_id,
                physician_id,
                card_id,
                physician_name,
                emergency_case,
                orderdate,
                orderstatus
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
        `;

        // Log the values being inserted
        const values = [
            newId,
            physician_id,
            card_id,
            physician_name || null,
            emergency_case || "N",
            orderdate,
            orderstatus || "Create OrderLab"
        ];
        console.log('Inserting values:', values);
        
        const result = await client.query(query, values);
        res.status(201).json({
            success: true,
            data: result.rows[0],  // คืนค่าข้อมูลสมาชิกที่ถูกสร้าง
        });

        client.release();
        return { newId,card_id };

    } catch (error) {
        console.error('Error creating order:', error);  // ตรวจสอบข้อผิดพลาดจากการ insert ข้อมูล
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message,
        });
    }
}

export const createOrderSelection = async (req,res,newId,card_id) => {

    try {
        const client = await pool.connect();
        console.log('Connected to database');  // ตรวจสอบการเชื่อมต่อ

        const query = `
            INSERT INTO orderselection (
                order_id,
                card_id,
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
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
        `;

        // Log the values being inserted
        const values = [
            newId,
            card_id,
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F"

        ];
        console.log('Inserting values:', values);

        const result = await client.query(query, values);
        res.status(201).json({
            success: true,
            data: result.rows[0],  // คืนค่าข้อมูลสมาชิกที่ถูกสร้าง
        });
    } catch (error) {
        console.error('Error creating orderselection:', error);  // ตรวจสอบข้อผิดพลาดจากการ insert ข้อมูล
        res.status(500).json({
            success: false,
            message: 'Error creating orderselection',
            error: error.message,
        });
    }
}

export const handleCreateOrder = async () => {
    try {
      // เรียกใช้ createOrderLab ก่อน
      await createOrderLab();
      console.log('createOrderLab เสร็จแล้ว');
  
      // หลังจาก createOrderLab เสร็จเรียก createOrderSelection
      await createOrderSelection();
      console.log('createOrderSelection เสร็จแล้ว');

    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
    }
  };

  export const editorderselection = async (req,res) => {
    
  }