<template>
  <div class="container-idresult">
    <div class="title-idresult">
      <h4 class="h4-idresult">아이디 찾기</h4>
      <div class="underline-idresult"></div>
    </div>
    <div class="description-idresult">
      <p class="p-idresult">고객님의 정보와 일치하는 아이디 목록입니다.</p>
    </div>
    <div class="form-container-idresult">
      <form>
        <div class="found-ids-idresult">
          <div class="box-idresult">
            <ul class="ids-list-idresult">
              <li>
                <strong>
                  <label>아이디 : </label>
                  <span>{{id}}</span>
                </strong>
              </li>
            </ul>
          </div>
        </div>

        <div class="options-idresult">
          <li class="option-item-idresult">
            <RouterLink to="/Login">로그인</RouterLink>
          </li>
          <li class="option-item-idresult">
            <RouterLink to="/find_idpw">비밀번호 찾기</RouterLink>
          </li>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@import "Find_Id_Result.css";
</style>

<script>
export default {
  name: "find_id_result",
  data() {
    return {};
  },
};
</script>
