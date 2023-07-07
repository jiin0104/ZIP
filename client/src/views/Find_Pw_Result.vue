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
                  <label>(찾은 비밀번호 표시)</label>
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
  name: "find_pw_result",
  data() {
    return {};
  },
};
</script>
