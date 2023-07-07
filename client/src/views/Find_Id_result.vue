<template>
  <div class="container">
    <div class="title">
      <h4>아이디 찾기</h4>
    </div>
    <div class="description">
      <p>고객님의 정보와 일치하는 아이디 목록입니다.</p>
    </div>
    <div class="form-container">
      <form>
        <div class="found-ids">
          <div class="box">
            <ul class="ids-list">
              <li>
                <strong>
                  <label>아이디 : </label>
                  <span>(찾은 아이디 표시, 로직구현 필요)</span>
                </strong>
              </li>
            </ul>
          </div>
        </div>

        <div class="options">
          <li class="option-item">
            <RouterLink to="/Login">로그인</RouterLink>
          </li>
          <li class="option-item">
            <RouterLink to="/find_idpw">비밀번호 찾기</RouterLink>
          </li>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@import 'Find_Id_Result.css';
</style>

<script>
export default {
  name: "find_id_result",
  data() {
    return {};
  },
};
</script>