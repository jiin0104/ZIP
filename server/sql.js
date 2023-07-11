module.exports = {
  SignUp: {
    query: `INSERT INTO USERS SET ?`,
  },
  SignOut: {
    query: `DELETE from USERS where USER_ID =(USER_ID) and USER_PASSWORD=(USER_PASSWORD)`,
  },
  AccoResister: {
    query: `INSERT INTO ACCOMMODATIONS SET ?`,
  },
  AccoDelete: {
    query: `DELETE from ACCOMMODATIONS where ACCO_ID= ?`,
  },
  RoomsResister: {
    query: `INSERT INTO ACCO_ROOMS SET ?`,
  },
  RoomsDelete: {
    query: `DELETE FROM ACCO_ROOMS WHERE ROOM_NO=?`,
  },
  RFResister: {
    query: `INSERT INTO ROOM_FACILITIES SET ?`,
  },
  RFDelete: {
    query: `DELETE FROM ROOM_FACILITIES WHERE RO_FACILITY_ID=?`,
  },
  ARFResister: {
    query: `INSERT INTO ACCO_ROOM_FACILITIES SET ?`,
  },
  ARFDelete: {
    query: `DELETE ACCO_ROOM_FACILITIES WHERE ROOM_NO = ?`,
  },
  Like: {
    query: `INSERT INTO USER_ACCOMMODATION_LIKES SET ?`,
  },
  Dislike: {
    query: `DELETE FROM USER_ACCOMMODATION_LIKES WHERE USER_ID=?`,
  },
  ADIResister: {
    query: `INSERT INTO ACCO_DETAIL_IMAGES SET ?`,
  },
  ADIDelete: {
    query: `DELETE FROM ACCO_DETAIL_IMAGES WHERE ACCO_ID=?`,
  },
  ARDIResister: {
    query: `INSERT INTO ACCO_ROOM_DETAIL_IMAGES SET ?`,
  },
  ARDIDelete: {
    query: `DELETE FROM ACCO_ROOM_DETAIL_IMAGES WHRER ROOM_NO=?`,
  },
  CitesResister: {
    query: `INSERT INTO CITIES SET ?`,
  },
  CitesDelete: {
    query: `DELETE from CITIES where CITY_ID = ?`,
  },
  Reservation: {
    query: `INSERT INTO RESERVATION SET ?`,
  },
  ReservationDelete: {
    query: `DELETE from RESERVATION where RESERVATION_ID= ?`,
  },
  NoticeResister: {
    query: `INSERT INTO NOTICE SET ?`,
  },
  NoticeDelete: {
    query: `DELETE from NOTICE where NOTICE_NUM = ?`,
  },
  ReviewResister: {
    query: `INSERT INTO REVIEW SET ?`,
  },
  ReviewDelete: {
    query: `DELETE from REVIEW where REVIEW_NO = ?`,
  },
  PaymentResister: {
    query: `INSERT  INTO PAYMENT SET ?`,
  },
  PaymentDelete: {
    query: `DELETE from PAYMENT where PAYMENT_ID=?`,
  },
  QAResister: {
    query: `INSERT INTO QA SET ?`,
  },
  QADelete: {
    query: `DELETE from QA where QA_NO= ?`,
  },
  ANSResister: {
    query: `INSERT INTO QA_ANS SET ?`,
  },
  ANSDelete: {
    query: `DELETE from QA_ANS where QA_ANS_NO= ?`,
  },
  FAQResister: {
    query: `INSERT INTO FAQ SET ?`,
  },
  FAQDelete: {
    query: `DELETE from FAQ where FAQ_NO = ?`,
  },
  GetUserInfo: {
    query: `SELECT * FROM USERS where USER_ID=#{USER_ID}`,
  },
  UpdateUser: {
    query: `UPDATE USERS SET USER_ID=?, USER_PASSWORD=?,USER_NICKNAME=?,USER_ADDRESS1=?, USER_ADDRESS2=?, USER_TEL=?`,
  },
  GetReservation: {
    query: `SELECT * FROM RESERVATION where USER_NO = 1`,
  },
  FindId: {
    query: `SELECT USER_ID FROM USERS where USER_TEL=?`,
  },
  FindPw: {
    query: `SELECT USER_PASSWORD FROM USERS where USER_ID = ? and USER_TEL=?`,
  },
  GetLikeList: {
    query: `SELECT *  FROM USER_ACCOMMODATION_LIKES WHERE  USERS  INNER JOIN ACCOMMODATIONS USER_NO = ? and  ACCO_ID = ?`,
  },
  UpdateAcco: {
    query: `UPDATE ACCOMMODATIONS SET ? = ? WHERE ACCO_ID = ?`,
  },
  UpdateRooms: {
    query: `UPDATE ACCO_ROOMS SET ? = ? WHERE ROOM_NO = ?`,
  },
  AdminUpdateU: {
    query: `UPDATE USERS SET ? = ? WHERE USER_NO = ?`,
  },
  GetAllUserInfo: {
    query: `selet * from USERS`,
  },
  UpdateRF: {
    query: `UPDATE ROOM_FACILITIES SET ? = ? WHERE RO_FACILITY_ID = ?`,
  },
  UpdateARF: {
    query: `UPDATE ACCO_ROOM_FACILITIES SET ? = ? WHERE RO_FACILITY_ID = ?`,
  },
  UpdateNotice: {
    query: `UPDATE NOTICE SET ? = ? WHERE NOTICE_NUM = ?`,
  },
  UpdateANS: {
    query: `UPDATE QA_ANS SET ? = ? WHERE QA_ANS_NO = ?`,
  },
  SearchAcco: {
    query: `SELECT *
FROM ACCOMMODATIONS`,
  },
  CheckId: {
    query: `selet user_id from users where user_no=?`,
  },
  CountRooms: {
    query: `SELECT A.ROOM_NUMBERS - COUNT(R.ROOM_NO) FROM ACCO_ROOMS as A INNNER JOIN RESERVATION as R on A.ROOM_NO=R.ROOM_NO`,
  },
  GetNotoce: {
    query: `SELECT * FROM NOTICE`,
  },
  GetQAList: {
    query: `SELECT QA_NO, QA_TITLE, QA_CONTENT, QA_CREATED_DATE, QA_ANSWER_STATUS FROM QA WHERE QA  INNER JOIN USERS ON USER_NO=?`,
  },
  CheckInAcco: {
    query: `SELECT RESERVATION_CHECK_IN, RESERVATION_CHECK_OUT FROM RESERVATION WHERE RESERVATION_CHECK_IN > now() and RESERVATION_CHECK_OUT > RESERTVATION_CHECK_IN`,
  },

};
