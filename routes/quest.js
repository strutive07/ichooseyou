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


    router.get('/', (req, res) => res.end('I choose you! (Server)\nMade by ssu.software.17.Wonjun Jang\nquest routes'));


router.post('/create', (req, res) => {
        var quest_id = req.body.quest_id;
        var request_person_id = req.body.request_person_id;
        var title = req.body.title;
        var context = req.body.context;
        var purpose = req.body.purpose;
        var location = req.body.location;
        var difficulty = req.body.difficulty;
        var reward = req.body.reward;

            db.connectDB().then(
                quest_info.create_quest(quest_id, request_person_id, title, context, purpose, location, difficulty, reward)
                    .then(result => {
                        res.status(result.status).json({message: result.message});
                    })
                    .catch(err => {console.log('err : ' + err);
                        res.status(err.status).json({message: err.message});
                    })
            );
    });


    router.get('/:id/:quest_id', (req, res) => {
        if (checkToken(req)) {
            var quest_status = -1;
            var tmp_quest_info;
            db.connectDB().then(
                user_quest_bool.get_one_quest_bool(req.params.id)
                    .then(result => {
                        console.log('result : ' + result);
                        var quest_num = Math.floor(req.params.quest_id/10) * 2 + req.params.quest_id % 10 - 1;
                        console.log(quest_num + ' : ' + req.params.quest_id);
                        quest_status = result.quest_bool[quest_num];
                        return quest_info.get_one_quest(req.params.quest_id);
                    }).then(result => {
                        console.log('result hoho : ' + result);
                        tmp_quest_info = result;
                        console.log('tmp_quest_info : ' + tmp_quest_info);
                        return profile.GetProfile(tmp_quest_info.request_person_id)
                    }).then(result => {
                        res.status(200).json({quest_status: quest_status, quest_info : tmp_quest_info, request_person_info : result});
                    })
                    .catch(err => {console.log('err : ' + err);
                        res.status(err.status).json({message: err.message});
                    })
            );
        } else {
            res.status(401).json({message: 'Invalid Token! '});
        }
    });


    router.post('/start/:id/:quest_id', (req, res) => {
        if (checkToken(req)) {
            db.connectDB().then(
                quest_info.get_one_quest(req.params.quest_id)
                    .then(result => {
                        if(result.people_num >= 6){
                            res.status(501).json({message: '인원 초과', result : -1});
                        }else{
                            return quest_info.people_num_change(req.params.quest_id, 1);
                        }
                    })
                    .then(result => {
                        if(result.message === 1){
                            return user_quest_bool.set_one_quest_bool_in_progress(req.params.id, req.params.quest_id);
                        }else{
                            res.status(401).json({message: 'Invalid Token! '});
                        }
                    })
                    .then(result => {
                        res.status(result.status).json({message: result.message, user_quest_table : result.user_quest_table});
                    })
                    .catch(err => {console.log('err : ' + err);
                        res.status(err.status).json({message: err.message});
                    })
            );
        } else {
            res.status(401).json({message: 'Invalid Token! '});
        }
    });


    router.post('/push/:id/:older_id/:quest_id', (req, res) => {
        if (checkToken(req)) {
            var junior_json;
            db.connectDB().then(profile.GetProfile(req.params.id)
                .then(result =>{
                    junior_json = {name : result.name, phone_number : result.phone_number, difficulty : (req.params.quest_id)%10, quest_id : req.params.quest_id ,id : req.params.id};
                    return elder_user_quest_accept_list.push_one_quest_list_in_progress(req.params.older_id, junior_json)
                })
                .then( result =>
                    res.status(result.status).json({message: result.message, result : result.elder_user_accept_list})
                )
                .catch(err => {
                    res.status(err.status).json({message: err.message});
                })
            );
        } else {
            res.status(401).json({message: 'Invalid Token! '});
        }
    });

    // router.post('/delete/:id/:index', (req, res) => {
    //     if (checkToken(req)) {
    //         db.connectDB().then(elder_user_quest_accept_list.delete_one_quest_list_by_index(req.params.id, req.params.index)
    //             .then( result =>
    //                 res.status(result.status).json({message: result.message, result : result.elder_user_accept_list})
    //             )
    //             .catch(err => {
    //                 res.status(err.status).json({message: err.message});
    //             })
    //         );
    //     } else {
    //         res.status(401).json({message: 'Invalid Token! '});
    //     }
    // });







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


