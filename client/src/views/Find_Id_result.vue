<template>
  <div class="container-idresult">
    <div class="title-idresult">
      <h4 class="h4-idresult">아이디 찾기</h4>
      <div class="underline-idresult"></div>
    </div>
    <div class="description-idresult">
      <p class="p-idresult">회원님의 아이디 목록입니다.</p>
    </div>
    <div class="form-container-idresult">
      <form>
        <div class="found-ids-idresult">
          <div class="box-idresult">
            <ul class="ids-list-idresult">
              <li>
                <strong>
                  <label>아이디 : </label>
                  <div class="description-idresult">
                    <p class="p-idresult" v-if="id !== ''">{{ id }}</p>
                    <p class="p-idresult" v-else>가입된 아이디가 없습니다.</p>
                  </div>
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
  data() {
    return {
      id: "", // id 값을 저장할 변수
    };
  },
  created() {
    // 라우터 파라미터에서 id 값을 받아와 변수에 할당
    this.id = this.$route.params.id;
    console.log('받은 id:', this.$route.params.id);
  },
};
</script>
