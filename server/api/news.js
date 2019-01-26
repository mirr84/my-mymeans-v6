const get = ({id, res}) => {

    let connection;
    require('../db/db').connector()
        .then(
            (conn) => {
                connection = conn;
                return connection.query(`SELECT a.id, a.title, a.description, b.avatar FROM news a LEFT JOIN users b ON (a.user_id=b.id) WHERE a.id='${id}'`);
            }
        )
        .then(
            (rows) => {
                if (rows && Array.isArray(rows) && rows.length > 0) {
                    res
                        .send(rows[0]);
                    connection.end();
                } else {
                    throw new Error();
                }
            }
        )
        .catch(
            (error) => {
                res
                    .send({});
                if (connection && connection.end) connection.end();
            }
        );

}

const list = ({res}) => {

    let connection;
    require('../db/db').connector()
        .then(
            (conn) => {
                connection = conn;
                return connection.query(`SELECT a.id, a.title, RPAD(RPAD(LEFT(a.description, 500), 501, ' '), 504, '.') as description, b.avatar, (SELECT count(*) from news_like c WHERE c.news_id = a.id) as count_like FROM news a LEFT JOIN users b ON (a.user_id=b.id)`);
            }
        )
        .then(
            (rows) => {
                res
                    .send(rows);
                connection.end();
            }
        )
        .catch(
            (error) => {
                res
                    .send([]);
                if (connection && connection.end) connection.end();
            }
        );

}

const like = ({id, res}) => {
    setTimeout(
        () => res.send(`like id = ${id}`),
        1000
    )
}

const init = (app) => {

    app.get(
        '/news/get',
        (req, res) => get({...req.query, res})
    )

    app.get(
        '/news/list',
        (req, res) => list({...req.query, res})
    )

    app.get(
        '/news/like',
        (req, res) => like({...req.query, res})
    )

}

module.exports = ({init});