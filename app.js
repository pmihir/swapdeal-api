const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/userRouting');
const errorLogger = require('./utilities/errorLogger');
const passport = require('passport');



app.use(cors());
app.use(bodyParser.json());
// app.use(requestLogger);

// passport.authenticate('jwt', { session: false });
// app.use(passport.initialize());

// Definition of variables
// require('./utilities/passport')(passport);

app.use('/user',userRouter);
app.use(errorLogger);


app.listen(3000);
console.log("Server running on 3000");