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
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  padding-top: 150px;
}

.title {
  margin-bottom: 20px;
  position: relative;
  height: fit-content;
}

h2 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.underline {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #333;
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

.found-password {
  text-align: center;
}

.box {
  border: 1px solid #ccc;
  padding: 10px;
  width: 200%;
  max-width: 700px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -50%;
}

.password-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.password-list li {
  text-align: left;
}

.btn-area {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.btn-item {
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
  name: "find_pw_result",
  data() {
    return {};
  },
};
</script>
