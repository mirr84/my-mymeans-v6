const makeToken = (n=200) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-+=";
    for (let i = 0; i < n; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

const auth = ({email, password, res}) => {

    let connection;
    require('../db/db').connector()
        .then(
            (conn) => {
                connection = conn;
                return connection.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`);
            }
        )
        .then(
            (rows) => {
                if (rows.length === 0) throw new Error();
                return connection.query(`INSERT INTO token (user_id, token) VALUES ('${rows[0].id}', '${makeToken()}')`);
            }
        )
        .then(
            (r) => {
                return connection.query(`SELECT token FROM token WHERE id = '${r.insertId}'`);
            }
        )
        .then(
            (rows) => {
                res
                    .set('token', rows[0].token)
                    .sendStatus(200);
                connection.end();
            }
        )
        .catch(
            (error) => {
                res
                    .sendStatus(401);
                if (connection && connection.end) connection.end();
            }
        );

}

const reg = ({login, password, email, res}) => {
    res.send('');
}

const check = ({token, res}) => {
    res.sendStatus(200);
    // res.sendStatus(401);
}

const logout = ({res}) => {
    res.send('');
}

const profile = ({token, res}) => {
    setTimeout(
        () => res.send(''),
        1000
    )
}

const init = (app) => {

    app.post(
        '/auth',
        (req, res) => auth({...req.body, res})
    )

    app.post(
        '/reg',
        (req, res) => reg({...req.body, res})
    )

    app.get(
        '/check',
        (req, res) => check({token: req.headers.token, res})
    )

    app.get(
        '/logout',
        (req, res) => logout({res})
    )

    app.get(
        '/profile',
        (req, res) => profile({token: req.headers.token, res})
    )

}

module.exports = ({init});