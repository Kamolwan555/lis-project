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

export const updateMember = async (req, res) => {
    const {
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