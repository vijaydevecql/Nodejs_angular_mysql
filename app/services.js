var bodyParser = require('body-parser');

var method = routes.prototype;
function routes(app, connection, sessionInfo) {

    var file_path = "";
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());


    /*
     post to handle User registration request
     */
    app.post('/regUser', function (req, res) {
        sessionInfo = req.session;
        var f_name = req.body.fname;
        var l_name = req.body.lname;
        var email = req.body.email;
        var password = req.body.password;
        var phone_no = req.body.phone;
        var address = req.body.address;
        var gender = req.body.gender;
        var query = "INSERT INTO users (first_name, last_name, email_id, passwords, phone, gender, address) "
            + " values('" + f_name + "', '" + l_name + "', '" + email + "', md5('" + password + "'), '" + phone_no + "', '" + gender + "', '" + address + "') ";
        var data = {
            query: query,
            connection: connection
        }
        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result) {
                result_send = {
                    is_inserted: true,
                    id: null,
                    msg: "You have been registered successfully."
                };
            } else {
                result_send = {
                    is_inserted: false,
                    id: null,
                    msg: "You have not been registered. Please try again."
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     post to handle Login request
     */
    app.post('/login', function (req, res) {


        sessionInfo = req.session;

        var email = req.body.email;
        var password = req.body.password;
        var types = req.body.types;
        var query = '';
        if (types == 'user') {
            query = "SELECT * FROM users u where email_id = '" + email + "' and passwords=md5('" + password + "') and isactive = 1";
        } else if (types == 'admin') {
            query = "SELECT * FROM admin where email_id = '" + email + "' and passwords='" + password + "' ";
        }
        var data = {
            query: query,
            connection: connection
        }

        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result.length > 0) {
                result_send = {
                    is_logged: true,
                    record: result,
                    msg: "OK"
                };
            } else {
                result_send = {
                    is_logged: false,
                    id: null,
                    msg: "BAD"
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     post to handle check_availability request
     */
    app.post('/check_availability', function (req, res) {
        sessionInfo = req.session;

        var visit_date = req.body.visit_date;
        var type = req.body.type;
        var query = '';
        if (type == 'seva') {
            query = "select sum(no_of_people) no_of_pos from seva where visit_date = str_to_date('" + visit_date + "', '%m/%d/%Y')";
        } else if (type = 'special') {
            query = "select sum(no_of_people) no_of_pos from special_entry where visit_date = str_to_date('" + visit_date + "', '%m/%d/%Y')";
        }
        var data = {
            query: query,
            connection: connection
        }

        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result.length > 0) {
                result_send = {
                    record: result,
                    msg: "OK"
                };
            } else {
                result_send = {
                    id: null,
                    msg: "BAD"
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     post to handle seva
     */
    app.post('/add_seva', function (req, res) {

        sessionInfo = req.session;

        var seva_name = req.body.sevaes.seva_name;
        var user_id = req.body.user_id;
        var no_of_people = req.body.no_of_people;
        var visit_date = req.body.visit_date;
        var amount = req.body.amount;

        var query = "INSERT INTO seva (user_id, seva_name, visit_date, no_of_people, amount) "
            + " values('" + user_id + "', '" + seva_name + "', str_to_date('" + visit_date + "', '%m/%d/%Y'), '" + no_of_people + "', '" + amount + "') ";
        var data = {
            query: query,
            connection: connection
        }
        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result) {
                result_send = {
                    is_inserted: true
                };
            } else {
                result_send = {
                    is_inserted: false
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     post to handle special entry
     */
    app.post('/add_special', function (req, res) {

        sessionInfo = req.session;
        var user_id = req.body.user_id;
        var no_of_people = req.body.no_of_people;
        var visit_date = req.body.visit_date;
        var amount = req.body.amount;

        var query = "INSERT INTO special_entry (user_id, visit_date, no_of_people, amount) "
            + " values('" + user_id + "', str_to_date('" + visit_date + "', '%m/%d/%Y'), '" + no_of_people + "', '" + amount + "') ";
        var data = {
            query: query,
            connection: connection
        }
        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result) {
                result_send = {
                    is_inserted: true
                };
            } else {
                result_send = {
                    is_inserted: false
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     post to handle add hundi
     */
    app.post('/add_hundi', function (req, res) {

        sessionInfo = req.session;
        var user_id = req.body.user_id;
        var occasion = req.body.occasion;
        var behalf = req.body.behalf;
        var amount = req.body.amount;

        var query = "INSERT INTO hundi (user_id, on_behalf, occasion, amount) "
            + " values('" + user_id + "', '" + behalf + "', '" + occasion + "', '" + amount + "') ";
        var data = {
            query: query,
            connection: connection
        }
        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result) {
                result_send = {
                    is_inserted: true
                };
            } else {
                result_send = {
                    is_inserted: false
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     post to handle getSeva
     */
    app.post('/getSeva', function (req, res) {
        sessionInfo = req.session;

        var user_id = req.body.user_id;
        var query = "SELECT * FROM seva s ";
        if (user_id != null && user_id != '') {
            query += " where user_id = '" + user_id + "' ";
        }
        query += " order by visit_date desc";

        var data = {
            query: query,
            connection: connection
        }

        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result.length > 0) {
                result_send = {
                    records: result,
                    msg: "OK"
                };
            } else {
                result_send = {
                    id: null,
                    msg: "BAD"
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     post to handle get Hundies
     */
    app.post('/getHundi', function (req, res) {
        sessionInfo = req.session;

        var user_id = req.body.user_id;
        var query = "SELECT * FROM hundi ";
        if (user_id != null && user_id != '') {
            query += " where user_id = '" + user_id + "' ";
        }
        query += " order by created_date desc";

        var data = {
            query: query,
            connection: connection
        }

        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result.length > 0) {
                result_send = {
                    records: result,
                    msg: "OK"
                };
            } else {
                result_send = {
                    id: null,
                    msg: "BAD"
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     post to handle get Hundies
     */
    app.post('/getSpecial', function (req, res) {
        sessionInfo = req.session;

        var user_id = req.body.user_id;
        var query = "SELECT * FROM special_entry s";
        if (user_id != null && user_id != '') {
            query += " where user_id = '" + user_id + "' ";
        }
        query += " order by visit_date desc";

        var data = {
            query: query,
            connection: connection
        }

        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result.length > 0) {
                result_send = {
                    records: result,
                    msg: "OK"
                };
            } else {
                result_send = {
                    id: null,
                    msg: "BAD"
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });
    /*
     post to handle get Hundies
     */
    app.post('/getSevaList', function (req, res) {
        sessionInfo = req.session;

        var query = "SELECT seva_name, price, available_days FROM seva_price";

        var data = {
            query: query,
            connection: connection
        }

        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result.length > 0) {
                result_send = {
                    records: result,
                    msg: "OK"
                };
            } else {
                result_send = {
                    id: null,
                    msg: "BAD"
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     post to handle get Hundies
     */
    app.post('/getNoOfTicket', function (req, res) {
        sessionInfo = req.session;

        var query = "SELECT * FROM control_panel where `keys` = 'ticket_per_day'";

        var data = {
            query: query,
            connection: connection
        }

        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result.length > 0) {
                result_send = {
                    records: result,
                    msg: "OK"
                };
            } else {
                result_send = {
                    id: null,
                    msg: "BAD"
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     post to handle get Hundies
     */
    app.post('/getBookedTicket', function (req, res) {
        sessionInfo = req.session;

        var query = "SELECT * FROM control_panel where `keys` = 'booked_ticket'";

        var data = {
            query: query,
            connection: connection
        }

        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result.length > 0) {
                result_send = {
                    records: result,
                    msg: "OK"
                };
            } else {
                result_send = {
                    id: null,
                    msg: "BAD"
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     post to updateCPanel
     */
    app.post('/updateCPanel', function (req, res) {
        sessionInfo = req.session;

        var keys = req.body.keys;
        var values = req.body.values;
        var query = "update control_panel set `value` = " + values + " where `keys` = '" + keys + "'";

        var data = {
            query: query,
            connection: connection
        }

        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result.length > 0) {
                result_send = {
                    records: result,
                    msg: "OK"
                };
            } else {
                result_send = {
                    id: null,
                    msg: "BAD"
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     get all Users
     */
    app.post('/getAllUsers', function (req, res) {
        sessionInfo = req.session;
        var vendor_id = req.body.id;
        var query = " SELECT user_id, first_name, last_name, email_id, phone, isactive, if(isactive = 1, 'Active', 'De-Active') status , if(isactive = 1, 'De-Activate User', 'Active User') show_status FROM users u ";
        var data = {
            query: query,
            connection: connection
        }
        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result.length > 0) {

                result_send = {
                    is_data: true,
                    records: result,
                    msg: "OK"
                };
            } else {
                result_send = {
                    is_data: false,
                    records: result,
                    msg: "BAD"
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });

    /*
     manage user
     */
    app.post('/manageUser', function (req, res) {

        sessionInfo = req.session;
        var user_id = req.body.user_id;
        var isactive = req.body.isactive;

        var query = "UPDATE users SET isactive = " + (isactive == "1" ? "0" : "1") + " WHERE user_id = " + user_id;
        var data = {
            query: query,
            connection: connection
        }
        /*
         Calling query_runner to run  SQL Query
         */
        query_runner(data, function (result) {
            if (result) {
                result_send = {
                    is_inserted: true,
                    id: null,
                    msg: "You have been registered Successfully."
                };
            } else {
                result_send = {
                    is_inserted: false,
                    id: null,
                    msg: "You have not been registered. Please try again."
                };
            }
            /*
             Sending response to client
             */
            res.write(JSON.stringify(result_send));
            res.end();
        });
    });
}

method.getroutes = function () {
    return this;
}

module.exports = routes;


/*
 Making query_runner function to Run mysl queries
 */
var query_runner = function (data, callback) {
    var db_conncetion = data.connection;
    var query = data.query;
    var insert_data = data.insert_data;
    db_conncetion.getConnection(function (err, con) {
        if (err) {
            con.release();
        } else {
            db_conncetion.query(String(query), insert_data, function (err, rows) {
                con.release();
                if (!err) {
                    callback(rows);
                } else {
                    console.log(err);
                    console.log("Query failed");
                }
            });
        }
    });
}