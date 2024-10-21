import pool from '../../db.js';

export const RegisterMember = async (req,res) =>{
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * From Appointment WHERE app_id = ');

        res.json(result.rows);
        client.release();
    
      } catch (err) {
        console.error(err);
        res.send('Error ' + err);
      }
}

export const loginMember = async (req,res) =>{
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * From Appointment WHERE app_id = ');

        res.json(result.rows);
        client.release();
    
      } catch (err) {
        console.error(err);
        res.send('Error ' + err);
      }
}