const pool = require('../databases/db');

// TODO (everyone): Registration...
// user_id, user_created, user_name, user_email, user_role, user_pass
// INSERT INTO users VALUES (NULL, now(), 'bill', 'bill@bill.bill', 'USER', sha2(concat(now(), 'billpass'), 224) );

// TODO (optional): Edit user... Change Password...

// TODO  (not now): Email verification... User activation... Better hash (bcrypt, pbkdf2, argon2)... Password rules...

module.exports = {
    async getOneUser(username) {
        try {
            let sql = "SELECT user_name, user_role FROM user WHERE user_name = ? ";
            // must leave out the password+hash info from result!
            const [rows, fields] = await pool.execute(sql, [ username ]);
            if (rows.length === 1) {
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async areValidCredentials(username, password) {
        try {
            let sql = "SELECT * FROM user WHERE user_name = ? AND user_password = sha2(concat(user_created, ?), 224)";
            // TODO: better salt + pw hash (bcrypt, pbkdf2, argon2)
            // COLLATE usually not needed (mariaDb compatibility)
            const [rows, fields] = await pool.execute(sql, [username, password]);
            return rows.length === 1 && rows[0].user_name === username;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async createUser(username, email, password) {
        try {
            let sql = "INSERT INTO user (user_name, user_email, user_password, user_created, user_firstname, user_lastname, user_birthdate, user_employee, user_salary, user_role, user_address) VALUES (?, ?, sha2(concat(now(), ?), 224), now(), NULL, NULL, NULL, 0, NULL, 'USER', NULL)";
            const [result] = await pool.execute(sql, [username, email, password]);

            return result.affectedRows === 1;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

};