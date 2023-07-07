<template>
  <div class="container">
    <div class="title">
      <h4>아이디 찾기</h4>
      <div class="underline"></div>
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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 150px;
}

.title {
  margin-bottom: 20px;
  position: relative;
  height: fit-content;
}

h4 {
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

.ids-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.ids-list li {
  text-align: left;
}

.options {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.option-item {
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
