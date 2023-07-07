//여러 군데, 여러번 쓰이는 함수,모듈 저장소.

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000"; //프록시 서버
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

//서버와의 데이터 통신을 위한 메소드
export default {
  methods: {
    async $api(url, data) {
      return (
        await axios({
          method: "post",
          url,
          data,
        }).catch((e) => {
          console.log(e);
        })
      ).data;
    },

    //숙소 이미지등을 서버로 업로드하기 위해서 이미지파일을 base64 string으로 변환 하는 메소드
    $base64(file) {
      return new Promise((resolve) => {
        var a = new FileReader();
        a.onload = (e) => resolve(e.target.result);
        a.readAsDataURL(file);
      });
    },

    //숙소 가격 표시를 위한 메소드
    $currencyFormat(value, format = "#,###") {
      if (value == 0 || value == null) return 0;

      var currency = format.substring(0, 1);
      if (currency === "$" || currency === "₩") {
        format = format.substring(1, format.length);
      } else {
        currency = "";
      }

      var groupingSeparator = ",";
      var maxFractionDigits = 0;
      var decimalSeparator = ".";
      if (format.indexOf(".") == -1) {
        groupingSeparator = ",";
      } else {
        if (format.indexOf(",") < format.indexOf(".")) {
          groupingSeparator = ",";
          decimalSeparator = ".";
          maxFractionDigits = format.length - format.indexOf(".") - 1;
        } else {
          groupingSeparator = ".";
          decimalSeparator = ",";
          maxFractionDigits = format.length - format.indexOf(",") - 1;
        }
      }

      var prefix = "";
      var d = "";
      // v = String(parseFloat(value).toFixed(maxFractionDigits));

      var dec = 1;
      for (var i = 0; i < maxFractionDigits; i++) {
        dec = dec * 10;
      }

      var v = String(Math.round(parseFloat(value) * dec) / dec);

      if (v.indexOf("-") > -1) {
        prefix = "-";
        v = v.substring(1);
      }

      if (
        maxFractionDigits > 0 &&
        format.substring(format.length - 1, format.length) == "0"
      ) {
        v = String(parseFloat(v).toFixed(maxFractionDigits));
      }

      if (maxFractionDigits > 0 && v.indexOf(".") > -1) {
        d = v.substring(v.indexOf("."));
        d = d.replace(".", decimalSeparator);
        v = v.substring(0, v.indexOf("."));
      }
      var regExp = /\D/g;
      v = v.replace(regExp, "");
      var r = /(\d+)(\d{3})/;
      while (r.test(v)) {
        v = v.replace(r, "$1" + groupingSeparator + "$2");
      }

      return prefix + currency + String(v) + String(d);
    },
  },
};
