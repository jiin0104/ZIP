<template>
  <div class="container-pwresult">
    <div class="title-pwresult">
      <h2 class="h2-pwresult">비밀번호 찾기</h2>
      <div class="underline-pwresult"></div>
    </div>
    <div class="description-pwresult">
      <p class="p-pwresult">고객님 아이디의 비밀번호입니다.</p>
    </div>
    <div class="form-container-pwresult">
      <form>
        <div class="found-password-pwresult">
          <div class="box-pwresult">
            <ul class="password-list-pwresult">
              <li>
                <strong>
                  <label>비밀번호: {{ pw }}</label>
                </strong>
              </li>
            </ul>
          </div>
        </div>
        <div class="btn-area-pwresult">
          <li class="btn-item-pwresult">
            <RouterLink to="/Login">로그인</RouterLink>
          </li>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@import "Find_Pw_Result.css";
</style>

<script>
export default {
  data() {
    return {
      pw: "", // 비밀번호를 저장할 변수
    };
  },
  mounted() {
    // 컴포넌트가 마운트되었을 때, 라우트 params로 받은 비밀번호를 변수에 저장
    this.pw = this.$route.params.pw;
  },
};
</script>
