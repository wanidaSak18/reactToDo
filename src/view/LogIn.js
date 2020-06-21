import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login.css'

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  onSubmitLogin = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", this.state.username.value);
    urlencoded.append("password", this.state.password.value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };


    fetch("https://candidate.neversitup.com/todo/users/auth", requestOptions)
      .then((response) => response.text())
      .then(function (result) {
        result = JSON.parse(result);
        if (result.token != undefined) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("refreshtoken", urlencoded);
          return (window.location.href = "/");
        } else {
          alert(result.error_description);
        }
      })
      .catch((error) => console.log("error", error));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: {
        value: event.target.value,
      },
    });
  };

  render() {
    return (
      <div className="login-box">
        <div>
          <a href="/">
            <b>Log In</b>
          </a>
        </div>
        {/* /.login-logo */}
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form onSubmit={this.onSubmitLogin}>
            <div className="form-group has-feedback">
              <input
                className="form-control"
                name="username"
                placeholder="Your username"
                value={this.state.username.value || ''}
                onChange={this.handleChange}
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                name="password"
                type="password"
                placeholder="Your password"
                value={this.state.password.value || ''}
                onChange={this.handleChange}
                className="form-control"
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  <label>
                    <div
                      className="icheckbox_square-blue"
                      aria-checked="false"
                      aria-disabled="false"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="checkbox"
                        style={{
                          position: "absolute",
                          top: "-20%",
                          left: "-20%",
                          display: "block",
                          width: "140%",
                          height: "140%",
                          margin: 0,
                          padding: 0,
                          background: "rgb(255, 255, 255)",
                          border: 0,
                          opacity: 0,
                        }}
                      />
                      <ins
                        className="iCheck-helper"
                        style={{
                          position: "absolute",
                          top: "-20%",
                          left: "-20%",
                          display: "block",
                          width: "140%",
                          height: "140%",
                          margin: 0,
                          padding: 0,
                          background: "rgb(255, 255, 255)",
                          border: 0,
                          opacity: 0,
                        }}
                      />
                    </div>{" "}
                    {/* Remember Me */}
                  </label>
                </div>
              </div>
              {/* /.col */}
              <div className="col-xs-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Sign In
                </button>
              </div>
              {/* /.col */}
            </div>
          </form>
        </div>
        {/* /.login-box-body */}
      </div>
    );
  }
}
export default LogIn;