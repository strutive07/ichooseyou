
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

var express = require('express');
const router = express.Router();

const db = require('../util/db');
const register = require('../functions/register');
const login = require('../functions/login');
const user_quest_bool = require('../functions/user_quest_bool');
const elder_user_quest_accept_list= require('../functions/elder_user_quest_accept_list');
const profile = require('../functions/profile');
const quest_complete_flow = require('../functions/quest_complete_flow');
const password = require('../functions/password');
const config = require('../config/config');



    router.get('/', (req, res) => res.end('I choose you! (Server)\nMade by ssu.software.17.Wonjun Jang'));

    router.post('/authenticate', (req, res) => {
        var id = req.body.id;
        var password = req.body.password;

        if (id && password) {
            db.connectDB().then(login.LoginUser(id, password)
                .then(result => {
                    const token = jwt.sign(result, config.secret, {expiresIn: 144000});
                    console.log('token : ' + token);
                    res.status(result.status).json({id: result.message, token: token});
                })
                .catch(err => {
                    res.status(err.status).json({message: err.message})
                })
            )
        } else {
            res.status(400).json({message: 'Invalid Request !'});
        }
    });

    router.post('/register', (req, res) => {
        const name = req.body.name;
        var id = req.body.id;
        const password = req.body.password;
        const phone_number = req.body.phone_number;
        var quest_size = req.body.quest_size;
        console.log('name : ' + name);
        console.log('id : ' + id);
        console.log('password : ' + password);
        console.log('phone_number : ' + phone_number);
        console.log('quest_size : ' + quest_size);
        if (!name || !id || !password || !name.trim() || !id.trim() || !password.trim()) {
            res.status(400).json({message: 'Invalid Request !'});
        } else {

            db.connectDB().then(register.RegisterUser(name, id, password, phone_number)
                .then(result => user_quest_bool.register_user_quest_bool(id, quest_size))
                .then(result => {
                    console.log('name->' + name);
                    console.log('email->' + id);
                    res.setHeader('Location', '/users' + id);
                    res.status(result.status).json({message: result.message});
                })
                .catch(err => {
                    res.status(err.status).json({message: err.message});
                })
            );
        }
    });

    // 해야할 일
    // 퀘스트 리스트
    // 선배쪽 퀘스트 받은사람 정보 보여주기
    // 퀘스트 시작하기
    // 퀘스트 1개 정보 + 의뢰자 정보 합쳐서 보내주기
    // 랭킹
    // 첫 로그인시 선배 정하기
    // 활약의 발자취

    router.post('/older_register', (req, res) => {
        const name = req.body.name;
        var id = req.body.id;
        const password = req.body.password;
        const phone_number = req.body.phone_number;
        const quest_id = req.body.quest_id;
        console.log("quest_id : "+ quest_id);
        if (!name || !id || !password || !name.trim() || !id.trim() || !password.trim()) {
            res.status(400).json({message: 'Invalid Request !'});
        } else {

            db.connectDB().then(register.register_elder_user(name, id, password, phone_number, quest_id)
                .then(result => elder_user_quest_accept_list.register_user_quest_bool(id))
                .then(result => {
                    console.log('name->' + name);
                    console.log('email->' + id);
                    res.setHeader('Location', '/users' + id);
                    res.status(result.status).json({message: result.message});
                })
                .catch(err => {
                    res.status(err.status).json({message: err.message});
                })
            );
        }
    });


    router.get('/:id', (req, res) => {
        if (checkToken(req)) {
            db.connectDB().then(
                profile.GetProfile(req.params.id)
                    .then(result => {
                        console.log('result : ' + result);
                        res.json(result);
                    })
                    .catch(err => {console.log('err : ' + err);
                        res.status(err.status).json({message: err.message});
                    })
            );

        } else {
            res.status(401).json({message: 'Invalid Token! '});
        }
    });

    router.get('/users_test/:id', (req, res) => {
        var id = req.params.id;
        // if (checkToken(req)) {
        db.connectDB().then(
            profile.GetProfile(id)
                .then(result => {
                    console.log('result : ' + result);
                    res.json(result);
                })
                .catch(err => {
                    console.log('err : ' + err);
                    res.status(err.status).json({message: err.message});
                })
        );
    });

    router.post('/changepassword/:id', (req, res) => {
        if (checkToken(req)) {
            const oldPassword = req.body.password;
            const new_password = req.body.new_password;

            if (!oldPassword || !new_password || !oldPassword.trim() || !new_password.trim()) {
                res.status(400).json({message: 'Invalid Token! '});
            } else {
                db.connectDB().then( password.ChangePassword(req.params.id, oldPassword, new_password)
                    .then(result => {
                        res.status(result.status).json({message: result.message});
                    })
                    .catch(err => {
                        res.status(err.status).json({message: err.message});
                    })
                );
            }
        } else {
            res.status(401).json({message: 'Invalid Token! '});
        }
    });

    router.get('/questtable/:id', (req, res) => {
        if (checkToken(req)) {
            db.connectDB().then(
                user_quest_bool.get_one_quest_bool(req.params.id)
                    .then(result => {
                        console.log('result : ' + result);
                        res.status(200).json({result : result});
                    })
                    .catch(err => {console.log('err : ' + err);
                        res.status(err.status).json({message: err.message});
                    })
            );

        } else {
            res.status(401).json({message: 'Invalid Token! '});
        }
    });

    router.post('/:email/password', (req, res) => {
        const email = req.params.email;
        const token = req.body.token;
        const newPassword = req.body.password;

        if (!token || !newPassword || !token.trim() || !newPassword.trim()) {
            password.ResetPasswordInit(email)
                .then(result => res.status(result.status).json({message: result.message}))
                .catch(err => res.status(err.status).json({message: err.message}));
        } else {
            password.ResetPasswordFinish(email, token, newPassword)
                .then(result => res.status(result.status).json({message: result.message}))
                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

    router.post('/first_connection/:id/:older_id', (req, res) => {
        if (checkToken(req)) {
            const id = req.params.id;
            const older_id = req.params.older_id;

            if (!id || !older_id || !id.trim() || !older_id.trim()) {
                res.status(400).json({message: 'Invalid Token! '});
            } else {
                db.connectDB().then(
                    register.set_first_connection(id, older_id)
                        .then(result =>
                            res.status(result.status).json({message: result.message, user : result.user})
                        )
                        .catch(err =>
                            res.status(err.status).json({message: err.message}))
                );
            }
        } else {
            res.status(401).json({message: 'Invalid Token! '});
        }
    });

    router.get('/ranking/:id', (req, res) => {
        console.log('ranking id : '+ req.params.id);
        if (checkToken(req)) {
            db.connectDB().then(
                profile.get_ranking(req.params.id)
                    .then(result =>
                        res.status(200).json({top_ranking : result.top_ranking, my_ranking : result.my_ranking})
                    ).catch(err => {console.log('err : ' + err);
                    res.status(err.status).json({message: err.message});
                })
            );
        } else {
            res.status(401).json({message: 'Invalid Token! '});
        }
    });

    //========================================================================================================================


    function checkToken(req){
        const token = req.headers['x-access-token'];
        if(token){
            try{
                var decoded = jwt.verify(token, config.secret);
                if(decoded.message === req.params.id){
                    console.log("hoho");
                    return true;
                }else{
                    console.log("bobo");
                    return false;
                }

            }catch(err){
                return false;
            }
        }else{
            return false;
        }
    }


module.exports = router;


