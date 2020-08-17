import "../styles/global.scss";
import App from "next/app";
import DefaultLayout from "../components/layout";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.Layout || DefaultLayout;

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
