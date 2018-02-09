
/**
 * @api {post} /quest/create 퀘스트 생성
 * @apiName 퀘스트 생성
 * @apiGroup Quest
 *
 * @apiParam {Number} quest_id 퀘스트 아이디. post 의 body 로 넣어주세요!!!!!!
 * @apiParam {Number} request_person_id 퀘스트 생성한 사람(선배). post 의 body 로 넣어주세요!!!!!!
 * @apiParam {String} title 퀘스트 제목. post 의 body 로 넣어주세요!!!!!!
 * @apiParam {String} context 퀘스트 상세. post 의 body 로 넣어주세요!!!!!!
 * @apiParam {String} purpose 퀘스트 목적. post 의 body 로 넣어주세요!!!!!!
 * @apiParam {String} location 퀘스트 수행 장소. post 의 body 로 넣어주세요!!!!!!
 * @apiParam {Number} difficulty 퀘스트 난이도 1은 쉬움 2은 어려움. Number형임!!. post 의 body 로 넣어주세요!!!!!!
 * @apiParam {String} reward 퀘스트 보상. post 의 body 로 넣어주세요!!!!!!
 *
 *
 * @apiSuccess {String} message 반환 메세지.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "message": "Sucessfully register quest"
 *     }
 *
 * @apiError 409 이미 존재하는 퀘스트 아이디.
 * @apiError 501 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Not Found
 *     {
 *       "error": "User Already Registered !"
 *     }
 */

/**
 * @api {get} /quest/:id/:quest_id 퀘스트 하나 상세 정보 출력
 * @apiName 퀘스트 하나 상세 정보 출력
 * @apiGroup Quest
 *
 * @apiParam {String} id 후배 아이디.
 * @apiParam {Number} quest_id 퀘스트 아이디.
 *
 *
 * @apiSuccess {Number} quest_status 해당 유저의 해당 퀘스트 진행 상태
 * @apiSuccess {JSON} quest_info 퀘스트 정보
 * @apiSuccess {JSON} request_person_info 퀘스트 출제한 선배 정보
 * @apiParam {TOKEN} x-access-token http header 에 x-access-token 이란 이름으로 사용자 token 주어야함.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *       "quest_status": -1,
 *       "quest_info": {
 *           "_id": "5a7c0268321c2a4e9d53b41a",
 *           "quest_id": 11,
 *           "request_person_id": 20170323,
 *           "title": "TEST11",
 *           "context": "contextTEST",
 *           "purpose": "목적 TEST",
 *           "location": "장소 TEST",
 *           "difficulty": 0,
 *           "reward": "보상 TEST",
 *           "__v": 0
 *       },
 *       "request_person_info": {
 *           "_id": "5a7bff5be5acc44e8a508012",
 *           "name": "장원준선배",
 *           "auth_id": "20170323",
 *           "hashed_password": "$2a$10$vEEavCNxnkML0ChA0wF.e.rEufdtZwA1WvBBqnj6W/aiywF2ThCFO",
 *           "phone_number": 1041001407,
 *           "score": 0,
 *           "is_elder": true,
 *           "quest_id": 1,
 *           "first_connection": -1,
 *           "first_login": false,
 *           "created_at": "Thu Feb 08 2018 16:42:19 GMT+0900 (KST)",
 *           "__v": 0
 *       }
 *    }
 *
 * @apiError 401 토큰과 파라미터에 있는 id 값이 불일치함.
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Not Found
 *     {
 *       "message": "Internal Server Error !"
 *     }
 */
/**
 * @api {get} /quest/start/:id/:quest_id 퀘스트 시작하기
 * @apiName 퀘스트 시작하기
 * @apiGroup Quest
 *
 * @apiParam {String} id 후배 아이디.
 * @apiParam {Number} quest_id 퀘스트 아이디.
 * @apiParam {TOKEN} x-access-token http header 에 x-access-token 이란 이름으로 사용자 token 주어야함.
 *
 *
 * @apiSuccess {Number} message 싱태 메세지
 * @apiSuccess {JSON} user_quest_table 해당 유저의 퀘스트 진행 상태 모든 정보
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "정상적으로 진행중으로 변경되었습니다.",
 *        "user_quest_table": {
 *            "_id": "5a7c0047e5acc44e8a50801d",
 *            "auth_id": "20180323",
 *            "quest_size": 10,
 *            "__v": 0,
 *            "quest_bool": [
 *                -1,
 *                -1,
 *                0,
 *                -1,
 *                -1,
 *                -1,
 *                -1,
 *                -1,
 *                -1,
 *                -1
 *            ]
 *        }
 *
 *
 * @apiError 401 토큰과 파라미터에 있는 id 값이 불일치함.
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Not Found
 *     {
 *       "message": "Internal Server Error !"
 *     }
 */

/**
 * @api {post} /quest/push/:id/:older_id/:difficulty 선배쪽 퀘스트 수락한 후배 추가
 * @apiName 선배퀘스트 수락한 후배 추가
 * @apiGroup Quest_push_delete
 *
 * @apiParam {String} id 후배 아이디.
 * @apiParam {Number} older_id 선배 아이디.
 * @apiParam {Number} difficulty 난이도 1 : 쉬움 2 : 어려움
 *
 *
 * @apiSuccess {Number} message 싱태 메세지
 * @apiSuccess {Array} result 후배 정보 list
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "정상적으로 진행중으로 변경되었습니다.",
 *        "result": {
 *            "_id": "5a7bff5ce5acc44e8a508013",
 *            "auth_id": "20170323",
 *            "__v": 2,
 *            "accept_user_list": [
 *                {
 *                    "difficulty": "0",
 *                    "phone_number": 1041001407,
 *                    "name": "장원준후배"
 *                }
 *            ]
 *        }
 *     }
 *
 *
 * @apiError 401 토큰과 파라미터에 있는 id 값이 불일치함.
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Not Found
 *     {
 *       "message": "Internal Server Error !"
 *     }
 */

/**
 * @api {post} /quest/delete/:id/:index 선배쪽 퀘스트 수락한 후배 삭제
 * @apiName 선배쪽 퀘스트 수락한 후배 삭제
 * @apiGroup Quest_push_delete
 *
 * @apiParam {String} id 선배 아이디.
 * @apiParam {Number} index 삭제할 데이터의 list 속의 index.
 *
 *
 * @apiSuccess {Number} message 싱태 메세지
 *
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "message": "정상적으로 완료로 변경되었습니다."
 *     }
 *
 *
 *
 *
 * @apiError 401 토큰과 파라미터에 있는 id 값이 불일치함.
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Not Found
 *     {
 *       "message": "Internal Server Error !"
 *     }
 */



/**
 * @api {post} /senior/complete_quest_init/:id/:junior_id/:quest_id 퀘스트 완료 링크 만들기
 * @apiName 퀘스트 완료 링크 만들기
 * @apiGroup Senior_Quest
 *
 * @apiParam {String} id 선배 아이디
 * @apiParam {String} junior_id 후배 아이디
 * @apiParam {Number} quest_id 퀘스트 id
 * @apiParam {TOKEN} x-access-token http header 에 x-access-token 이란 이름으로 사용자 token 주어야함.
 *
 *
 *
 * @apiSuccess {String} message 상태 메세지
 * @apiSuccess {String} link 후배가 누르면 퀘스트 완료되는 링크.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "click link to finish quest",
 *         "link": "http://localhost:3000/api/v1g1/senior/complete/20180323/20170323/11/WDI4HNkQ"
 *     }
 *
 *
 * @apiError 401 토큰과 파라미터에 있는 id 값이 불일치함.
 * @apiError 404 후배 id와 일치하는 유저가 가 존재하지 않음.
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "Invalid Request !"
 *     }
 */
/**
 * @api {get} /senior/complete/:id/:older_id/:quest_id/:random_string 퀘스트 완료 하기(링크 눌렀을때)
 * @apiName 퀘스트 완료 하기(링크 눌렀을때)
 * @apiGroup Senior_Quest
 *
 * @apiParam {String} id 후배 아이디
 * @apiParam {String} older_id 선배 아이디
 * @apiParam {Number} quest_id 퀘스트 id
 * @apiParam {String} random_string 퀘스트 인증키
 * @apiParam {TOKEN} x-access-token http header 에 x-access-token 이란 이름으로 사용자 token 주어야함.
 *
 *
 *
 * @apiSuccess {String} message 상태 메세지
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "정상적으로 완료로 변경되었습니다."
 *     }
 *
 *
 * @apiError 401 시간 초과. 선배쪽에서 링크를 만들었을때부터 2분 이내에 클릭해야함.
 * @apiError 401 토큰과 파라미터에 있는 id 값이 불일치함.
 * @apiError 401 퀘스트 인증키가 일치하지 않음.
 * @apiError 404 후배 id와 일치하는 유저가 가 존재하지 않음.
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "message": "Invalid Token! "
 *     }
 */
/**
 * @api {get} /senior/:id 선배쪽 퀘스트 수락한 후배 목록
 * @apiName 선배쪽 퀘스트 수락한 후배 목록
 * @apiGroup Senior_Quest
 *
 * @apiParam {String} id 선배 아이디
 * @apiParam {TOKEN} x-access-token http header 에 x-access-token 이란 이름으로 사용자 token 주어야함.
 *
 *
 *
 * @apiSuccess {String} message 상태 메세지
 * @apiSuccess {JSON} result 선배쪽 퀘스트 수락한 후배 목록
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Sucessfully register user quest bool table",
 *         "result": {
 *             "_id": "5a7bff5ce5acc44e8a508013",
 *             "auth_id": "20170323",
 *             "__v": 2,
 *             "accept_user_list": [
 *                 {
 *                     "difficulty": "0",
 *                     "phone_number": 1041001407,
 *                     "name": "장원준후배"
 *                 }
 *             ]
 *         }
 *     }
 *
 *
 * @apiError 401 시간 초과. 선배쪽에서 링크를 만들었을때부터 2분 이내에 클릭해야함.
 * @apiError 401 토큰과 파라미터에 있는 id 값이 불일치함.
 * @apiError 401 퀘스트 인증키가 일치하지 않음.
 * @apiError 404 후배 id와 일치하는 유저가 가 존재하지 않음.
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "message": "Invalid Token! "
 *     }
 */

/**
 * @api {post} /user/authenticate 로그인
 * @apiName 로그인
 * @apiGroup Login
 *
 * @apiParam {String} id 유저 아이디. [post 의 body 로 넣어주세요!!!!!!]
 * @apiParam {String} password 삭제할 데이터의 list 속의 index. [post 의 body 로 넣어주세요!!!!!!]
 *
 *
 * @apiSuccess {Number} id 유저 아이디
 * @apiSuccess {String} token 토큰. [쿠키에 계속 저장해 주세요. token 이 필요한 요청에서 x-access-token 값으로 넘겨주어야합니다.(http header)]
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 20180323,
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOjIwMCwibWVzc2FnZSI6IjIwMTgwMzIzIiwiaWF0IjoxNTE4MTQ5MTczLCJleHAiOjE1MTgxNTA2MTN9.P1WDdrfHY1m4luEtysGRPM-ad98GBewhW9mOv4b-nTs"
 *     }
 *
 *
 *
 * @apiError 400 id 와 password 값이 null이거나 undefined 혹은 유효하지 않음.
 * @apiError 401 id 혹은 password 불일치.    Invalid Credentials !
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "message": "Invalid Credentials !"
 *     }
 */
/**
 * @api {post} /user/register 후배 회원가입
 * @apiName 후배_회원가입
 * @apiGroup Register
 *
 * @apiParam {String} name 유저 본명. [post 의 body 로 넣어주세요!!!!!!]
 * @apiParam {String} id 유저 아이디. [post 의 body 로 넣어주세요!!!!!!]
 * @apiParam {String} password 삭제할 데이터의 list 속의 index. [post 의 body 로 넣어주세요!!!!!!]
 * @apiParam {Number} phone_number 전화 번호.(숫자만 써주세요) [post 의 body 로 넣어주세요!!!!!!]
 * @apiParam {Number} quest_size 퀘스트 수.(선배 회원수 * 2 만큼 넣어주면됨.) [post 의 body 로 넣어주세요!!!!!!]
 *
 *
 * @apiSuccess {String} message 상태 메세지.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Sucessfully register user quest bool table"
 *     }
 *
 *
 *
 *
 * @apiError 400 id 와 password 값이 null이거나 undefined 혹은 유효하지 않음.
 * @apiError 401 id 혹은 password 불일치.    Invalid Credentials !
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "Invalid Request !"
 *     }
 */
/**
 * @api {post} /user/older_register 선배회원가입
 * @apiName 선배회원가입
 * @apiGroup Register
 *
 * @apiParam {String} name 유저 본명. [post 의 body 로 넣어주세요!!!!!!]
 * @apiParam {String} id 유저 아이디. [post 의 body 로 넣어주세요!!!!!!]
 * @apiParam {String} password 삭제할 데이터의 list 속의 index. [post 의 body 로 넣어주세요!!!!!!]
 * @apiParam {Number} phone_number 전화 번호.(숫자만 써주세요) [post 의 body 로 넣어주세요!!!!!!]
 * @apiParam {Number} quest_id 선배의 고유 quest_id. [post 의 body 로 넣어주세요!!!!!!]
 *
 *
 * @apiSuccess {String} message 상태 메세지.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Sucessfully register user quest bool table"
 *     }
 *
 *
 *
 *
 * @apiError 400 id 와 password 값이 null이거나 undefined 혹은 유효하지 않음.
 * @apiError 401 id 혹은 password 불일치.    Invalid Credentials !
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "Invalid Request !"
 *     }
 */
/**
 * @api {post} /user/changepassword/:id 비밀번호 변경
 * @apiName 비밀번호 변경
 * @apiGroup User
 *
 * @apiParam {Number} id 아이디
 * @apiParam {String} password 변경 전 비밀번호. [post 의 body 로 넣어주세요!!!!!!]
 * @apiParam {String} new_password 새로운 비밀번호. [post 의 body 로 넣어주세요!!!!!!]
 * @apiParam {TOKEN} x-access-token http header 에 x-access-token 이란 이름으로 사용자 token 주어야함.
 *
 *
 * @apiSuccess {String} message 상태 메세지.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Password Updated Sucessfully !"
 *     }
 *
 *
 *
 *
 * @apiError 400 id 와 password 값이 null이거나 undefined 혹은 유효하지 않음.
 * @apiError 401 토큰과 파라미터에 있는 id 값이 불일치함.
 * @apiError 401 id 혹은 password 불일치.    Invalid Credentials !
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "Invalid Request !"
 *     }
 */
/**
 * @api {get} /user/questtable/:id 퀘스트 진행상황 table
 * @apiName 퀘스트 진행상황 table
 * @apiGroup User
 *
 * @apiParam {String} id 아이디
 * @apiParam {TOKEN} x-access-token http header 에 x-access-token 이란 이름으로 사용자 token 주어야함.
 *
 *
 * @apiSuccess {JSON} result 결과.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "result": {
 *             "_id": "5a7c0047e5acc44e8a50801d",
 *             "auth_id": "20180323",
 *             "quest_size": 10,
 *             "__v": 0,
 *             "quest_bool": [
 *                 -1,
 *                 -1,
 *                 -1,
 *                 -1,
 *                 -1,
 *                 -1,
 *                 -1,
 *                 -1,
 *                 -1,
 *                 -1
 *             ]
 *     }
 *
 *
 *
 *
 * @apiError 400 id 와 password 값이 null이거나 undefined 혹은 유효하지 않음.
 * @apiError 401 토큰과 파라미터에 있는 id 값이 불일치함.
 * @apiError 401 id 혹은 password 불일치.    Invalid Credentials !
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "Invalid Request !"
 *     }
 */
/**
 * @api {post} /user/first_connection/:id/:older_id 첫 선배와의 연결
 * @apiName 첫 선배와의 연결
 * @apiGroup User
 *
 * @apiParam {String} id 후배 아이디
 * @apiParam {String} older_id 선배 아이디
 * @apiParam {TOKEN} x-access-token http header 에 x-access-token 이란 이름으로 사용자 token 주어야함.
 *
 *
 * @apiSuccess {String} message 상태 메세지.
 * @apiSuccess {JSON} user 후배 유저 정보.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Password Updated Sucessfully !",
 *         "user": {
 *             "first_connection": 20170323,
 *             "_id": "5a7c0047e5acc44e8a50801c",
 *             "name": "장원준후배",
 *             "auth_id": "20180323",
 *             "hashed_password": "$2a$10$BmicLrBHmrOJzgm.fiS2JOPWk85XURGkvWGaFLp//o18hbBuSOAmS",
 *             "phone_number": 1041001407,
 *             "score": 2000,
 *             "is_elder": false,
 *             "quest_id": -1,
 *             "first_login": false,
 *             "created_at": "Thu Feb 08 2018 16:46:15 GMT+0900 (KST)",
 *             "__v": 0
 *         }
 *     }
 *
 *
 *
 * @apiError 400 id 와 older_id 값이 null이거나 undefined 혹은 유효하지 않음.
 * @apiError 401 토큰과 파라미터에 있는 id 값이 불일치함.
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "Invalid Request !"
 *     }
 */
/**
 * @api {get} /user/ranking/:id/ 랭킹 보기
 * @apiName 랭킹 보기
 * @apiGroup User
 *
 * @apiParam {String} id 후배 아이디
 * @apiParam {TOKEN} x-access-token http header 에 x-access-token 이란 이름으로 사용자 token 주어야함.
 *
 *
 *
 * @apiSuccess {Array} top_ranking 1,2,3등의 유저 정보. 각각 0,1,2번 인덱스에 저장되어있음.
 * @apiSuccess {Number} my_ranking 자신의 등수.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "top_ranking": [
 *             {
 *                 "_id": "5a7c0047e5acc44e8a50801c",
 *                 "name": "장원준후배",
 *                 "auth_id": "20180323",
 *                 "hashed_password": "$2a$10$BmicLrBHmrOJzgm.fiS2JOPWk85XURGkvWGaFLp//o18hbBuSOAmS",
 *                 "phone_number": 1041001407,
 *                 "score": 2000,
 *                 "is_elder": false,
 *                 "quest_id": -1,
 *                 "first_login": false,
 *                 "created_at": "Thu Feb 08 2018 16:46:15 GMT+0900 (KST)",
 *                 "__v": 0
 *             },
 *             {
 *                 "_id": "5a7bffa6e5acc44e8a50801a",
 *                 "name": "장원준5선배",
 *                 "auth_id": "20170327",
 *                 "hashed_password": "$2a$10$DlzS.OJwMzmZwGxpONESF.imosZEWfGNwQopAF2vMciw9k41lXrtC",
 *                 "phone_number": 1041001407,
 *                 "score": 0,
 *                 "is_elder": true,
 *                 "quest_id": 5,
 *                 "first_connection": -1,
 *                 "first_login": false,
 *                 "created_at": "Thu Feb 08 2018 16:43:34 GMT+0900 (KST)",
 *                 "__v": 0
 *             },
 *             {
 *                 "_id": "5a7bff86e5acc44e8a508014",
 *                 "name": "장원준2선배",
 *                 "auth_id": "20170324",
 *                 "hashed_password": "$2a$10$j6XmZm9G4Wgp2VTcNHPtMubeDeKRz0eniEU4gMJ5uBNm2wGSBLJg.",
 *                 "phone_number": 1041001407,
 *                 "score": 0,
 *                 "is_elder": true,
 *                 "quest_id": 2,
 *                 "first_connection": -1,
 *                 "first_login": false,
 *                 "created_at": "Thu Feb 08 2018 16:43:02 GMT+0900 (KST)",
 *                 "__v": 0
 *             }
 *         ],
 *         "my_ranking": 1
 *     }
 *
 *
 *
 * @apiError 401 토큰과 파라미터에 있는 id 값이 불일치함.
 * @apiError 500 서버 에러.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "Invalid Request !"
 *     }
 */