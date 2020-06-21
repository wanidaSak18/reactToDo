import axios from "axios";

export const connect = async (head, targetUrl, dataPost) => {
  try {
      debugger;
    //Config
    const config = {
      method: head,
      url: "https://candidate.neversitup.com/todo/"+targetUrl,
      data: dataPost,
      headers: { Authorization: localStorage.getItem("token") },
    };
    //Call Api
    let data = await axios(config);
    return data.data;
  } catch (error) {
    //Session Expired refresh token
    if (error.response.status === 401) {
      if (window.confirm("Do you want to continue this session ?")) {
        //await RefreshToken();
        let result = await connect(
          "post",
          "/users/auth=" + localStorage.getItem("refreshtoken")
        );
        if (result === "") {
          //clear session
          localStorage.clear();
          return (window.location.href = "/");
        }
        
        localStorage.setItem("token", result.token);
        localStorage.setItem("refreshtoken", result.refresh_token);

        //reconnect
        connect(head, targetUrl, dataPost);
      } else {
        //clear session
        localStorage.clear();
        return (window.location.href = "/");
      }
    } else {
      alert("Something went wrong, Please contact support.");
    }
  }
};
