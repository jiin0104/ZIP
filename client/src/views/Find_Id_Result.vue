<template>
  <div class="container">
    <div class="title">
      <h2>아이디 찾기</h2>
    </div>
    <div class="description">
      <p>고객님의 정보와 일치하는 아이디 목록입니다.</p>
    </div>
    <form>
      <div class="form-container">
        <div class="found-ids">
          <ul>
            <li>
              <strong>
                <label>(찾은 아이디 표시 로직구현 필요)</label>
              </strong>
            </li>
          </ul>
        </div>

        <div class="options">
          <li>
            <RouterLink to="/Login">로그인</RouterLink>
          </li>
          <li>
            <RouterLink to="/find_idpw">비밀번호 찾기</RouterLink>
          </li>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.description {
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.form-container {
  width: 300px;
}

.found-ids {
  text-align: left;
}

ul {
  list-style-type: none;
}

.options {
  margin-top: 20px;
}

.options li {
  display: inline-block;
  margin-right: 10px;
}

a {
  text-decoration: none;
  color: #007bff;
}

a:hover {
  color: #0056b3;
}
</style>

<script>
export default {
  name: "find_id_result",
  data() {
    return {};
  },
};
</script>
