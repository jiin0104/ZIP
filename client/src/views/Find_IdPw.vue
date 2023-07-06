<template>
  <body>
    <div class="find-wrap">
      <div class="findid-html">
        <input id="tab-1" type="radio" name="tab" class="findid" checked /><label for="tab-1" class="tab">아이디 찾기</label>
        <input id="tab-2" type="radio" name="tab" class="findpw" /><label for="tab-2" class="tab">비밀번호 찾기</label>
        <div class="findid-form">
          <div class="findid-htm">
            <div class="group">
              <br />
              <label for="user" class="label">전화번호</label>
              <input id="user" type="text" class="input" />
            </div>
            <div class="group">
              <input type="submit" class="button" value="아이디 찾기" href="#" onclick="alert('전화번호를 확인해주세요')" />
            </div>
            <div class="hr"></div>
            <div class="foot-lnk">
              <a href="signUp.html">아직 회원이 아니세요?</a>
            </div>
          </div>
          <div class="findpw-htm">
            <div class="group">
              <br />
              <label for="user" class="label">아이디(이메일)</label>
              <input id="user" type="text" class="input" />
            </div>
            <div class="group">
              <label for="pass" class="label">인증번호</label>
              <input id="pass" type="password" class="input" data-type="password" />
            </div>
            <div class="group">
              <input type="submit" class="button" value="비밀번호 찾기" href="#" onclick="alert('아이디와 인증번호를 확인해주세요')" />
            </div>
            <div class="hr"></div>
            <div class="foot-lnk">
              <RouterLink to="/Signup"><a>아직 회원이 아니세요?</a></RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style src="./Find_IdPw.css"></style>

<script>
export default {
  name: 'find_idpw',
  data () {
    return {

    }
  }
}
</script>