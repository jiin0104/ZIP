<template>
  <div class="container">
    <div class="title">
      <h2>비밀번호 찾기</h2>
      <div class="underline"></div>
    </div>
    <div class="description">
      <p>고객님 아이디의 비밀번호입니다.</p>
    </div>
    <div class="form-container">
      <form>
        <div class="found-password">
          <div class="box">
            <ul class="password-list">
              <li>
                <strong>
                  <label>(찾은 비밀번호 표시)</label>
                </strong>
              </li>
            </ul>
          </div>
        </div>
        <div class="btn-area">
          <li class="btn-item">
            <RouterLink to="/Login">로그인</RouterLink>
          </li>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@import 'Find_Pw_Result.css';
</style>

<script>
export default {
  name: "find_pw_result",
  data() {
    return {};
  },
};
</script>
