

/**
 * @api {post} /quest/delete/:id/:index 선배쪽 퀘스트 수락한 후배 삭제
 * @apiName 선배쪽 퀘스트 수락한 후배 삭제
 * @apiGroup Quest
 *
 * @apiParam {String} id 선배 아이디.
 * @apiParam {Number} index 삭제할 데이터의 list 속의 index.
 *
 *
 * @apiSuccess {Number} message 싱태 메세지
 * @apiSuccess {Array} result 후배 정보 list
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "정상적으로 완료로 변경되었습니다."
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