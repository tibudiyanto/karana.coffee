import React, { Component } from "react";
import { withSiteData } from "react-static";
import request from "superagent";
import { Formik } from "formik";
import { hot } from "react-hot-loader";

import "./tachyons.min.css";
import "./app.css";

const Screen = props => {
  const { children, half, className = "" } = props;
  return <div className={className}>{children}</div>;
};

const Hero = props => {
  return (
    <div className="ph4 pb4 ">
      <h1 className="ttu mv0 pv4 tracked-mega">
        <p className="f1 mv0">Karana</p>
        <p className="f4 mv0">Coffee</p>
      </h1>
      <p className="f5 f4-l mt0 lh-copy">
        Better than your
        <span className="f4 f3-l b"> $4 </span> cup <br />
        for less than <span className="f4 f3-l b">$1 </span> <br />
      </p>
      <p className="f5 f4-l lh-copy">
        Order our special introductory 5-cup package for
        <span className="f4 f3-l b"> IDR 50k</span> <br />
        Oh and the shipping cost is on us!
      </p>
      <p className="tr">
        <a
          href="#order"
          className="f5 db link dim br-pill ph3 pv2 mb2 dib karana-light bg-karana"
        >
          Order Here
        </a>
      </p>
    </div>
  );
};

const About = props => {
  return (
    <div className="ph4 pb4 near-white">
      <h1 className="ttu mv0 pv4 dark-gray tracked-mega">
        <p className="f1 mv0">NAMA</p>
        <p className="f4 mv0">BLEND</p>
      </h1>
      <p className="f3 mt0 lh-copy measure">Introducing our first blend,</p>
      <p className="f6 f4-l lh-copy">
        We source our coffee from a local coffee farm in West Java. It has this
        taste notes 1, 2 and 3.
      </p>
    </div>
  );
};

const Order = ({ formUrl }) => {
  return (
    <div className="ph4 tr pb4 near-white">
      <a name="order" />
      <h1 className="ttu mv0 pv4 tracked-mega">
        <p className="f1 mv0">Order</p>
        <p className="f4 mv0">Here:</p>
      </h1>
      <p className="f4 f3-l mt0 lh-copy measure">
        Leave us your email to order our IDR 50k introductory package.
      </p>
      <p className="f6 f4-l lh-copy">
        You will get a confirmation order in your email for 5 servings of
        amazing coffee. We promise, no shitty marketing crap!
      </p>
      <div className="tr">
        <Formik
          initialValues={{ email: "" }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={async ({ email }) => {
            try {
              const payload = await request.post(formUrl).send({
                email
              });
              console.log(payload);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                name="email"
                onChange={handleChange}
                value={values.email}
                className="f4 input-reset br-pill ph2 ba b--karana w-50"
                onBlur={handleBlur}
                placeholder="your@coffee.com"
              />
              <p className="red">
                {errors.email && touched.email && errors.email}
              </p>
              <button
                type="submit"
                className="button-reset ba f5 link dim br-pill ph3 pv2 mb2 dib black bg-karana-light"
              >
                Send
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

class App extends Component {
  componentDidMount() {
    // Check that service workers are registered
    if ("serviceWorker" in navigator) {
      // Use the window load event to keep the page load performant
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js");
      });
    }
  }
  render() {
    const { formUrl } = this.props;
    return (
      <div className="helvetica dark-gray">
        <Screen half className="bg-karana-light">
          <Hero />
        </Screen>
        <Screen half className="bg-gradient">
          <About />
        </Screen>
        <Screen half className="bg-karana">
          <Order formUrl={formUrl} />
        </Screen>
      </div>
    );
  }
}

export default hot(module)(withSiteData(App));
