var express = require('express');
const router = express.Router();
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('../functions/register');
const login = require('../functions/login');
const user_quest_bool = require('../functions/user_quest_bool');
const elder_user_quest_accept_list= require('../functions/elder_user_quest_accept_list');
const profile = require('../functions/profile');
const quest_complete_flow = require('../functions/quest_complete_flow');
const quest_info = require('../functions/quest_info');
const password = require('../functions/password');
const db = require('../util/db');
const config = require('../config/config');


    router.get('/', (req, res) => res.end('I choose you! (Server)\nMade by ssu.software.17.Wonjun Jang'));

    router.post('/complete_quest_init/:id/:junior_id/:quest_id', (req, res) => {
        if (checkToken(req)) {
            db.connectDB().then(
                quest_complete_flow.complete_quest_init(req.params.junior_id, req.params.id, req.params.quest_id)
                    .then(result =>{
                        res.status(result.status).json({message: result.message, link : result.link});
                    })
                    .catch(err => {
                        res.status(err.status).json({message: err.message});
                    })
            );
        } else {
            res.status(401).json({message: 'Invalid Token! '});
        }
    });

    router.get('/complete/:id/:older_id/:quest_id/:random_string', (req, res) => {
        // if (checkToken(req)) {
        console.log('ho?');
            db.connectDB().then(
                quest_complete_flow.complete_quest_finish(req.params.id, req.params.older_id, req.params.quest_id, req.params.random_string)

                    .then(result => {
                        profile.add_score(req.params.id, 1000)
                    })
                    .then(result => {
                        console.log('ho?');
                        quest_info.people_num_change(req.params.quest_id, -1);
                    })
                    .then(result => {
                        elder_user_quest_accept_list.delete_one_quest_list_by_index(req.params.older_id, req.params.id, req.params.quest_id);
                    })
                    .then(result => {
                        profile.add_score(req.params.older_id, -1)
                    })
                    .then(result =>{
                        return user_quest_bool.set_one_quest_bool_finish(req.params.id, req.params.quest_id)
                    })
                    .then(result =>{
                        res.status(result.status).json({message: result.message, user_quest_table : result.user_quest_table});
                    })
                    .catch(err => {
                        var __dirname = '../public/complete.html'
                        res.sendFile(__dirname);
                    })
            );
        // } else {
        //     res.status(401).json({message: 'Invalid Token! '});
        // }
    });

    router.get('/:id', (req, res) => {
        if (checkToken(req)) {
            console.log('id : ' + req.params.id);
            db.connectDB().then(
                elder_user_quest_accept_list.get_one_quest_list(req.params.id)
                    .then(result =>{
                        console.log(result);
                        res.status(result.status).json({message: result.message, result : result.result});
                    })
                    .catch(err => {
                        res.status(err.status).json({message: err.message});
                    })
            );
        } else {
            res.status(401).json({message: 'Invalid Token! '});
        }
    });






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


