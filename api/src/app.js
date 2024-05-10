const Express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth.route.js')
const postRoute = require('./routes/post.route.js')
const commentRoute = require('./routes/comment.route.js')



const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:8080'] }))

app.use('/posts', postRoute)
app.use('/auth', authRoute)
app.use('/comment', commentRoute)

module.exports = app