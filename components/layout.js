import Head from "next/head";
import styles from "./layout.module.scss";
import Link from "next/link";
import CookieBanner from "./cookie-banner";
import GoogleAnalytics from "./googleAnalytics";
import SocialShare from "./socialShare";
import Hotjar from "./hotjar";
import Meta from "./meta";

export const siteTitle = "Playlist Tune";

const Layout = ({ children, router }) => {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="Touch someone today. Slip a song into their playlist."
        />
        <meta name="og:title" content={siteTitle} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32"></link>
        <link rel="icon" href="/favicon-192x192.png" sizes="192x192"></link>
        <link rel="apple-touch-icon" href="/favicon-180x180.png"></link>
      </Head>
      <Meta />
      <GoogleAnalytics />
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.stealthLink}>
            <h1 className={styles.title}>Playlist Tune</h1>

            <p className={styles.callToAction}>
              <span className={styles.callToActionFirstLine}>
                Touch someone today
              </span>
              <br />
              <span className={styles.callToActionSecondLine}>
                Slip a song into their playlist
              </span>
            </p>
          </a>
        </Link>
        <SocialShare />
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          {" | "}
          <Link href="/about">
            <a>About</a>
          </Link>
          {" | "}
          <a href="https://kevinlambertmusic.com#contact" target="_blank">
            Contact
          </a>
          {" | "}
          <Link href="/privacy-policy">
            <a>Privacy</a>
          </Link>
          {" | "}
          <Link href="/terms">
            <a>Terms</a>
          </Link>
        </nav>
        <br />
        <p>
          PlaylistTune allows a song to be slipped into someone's playlist.
          <br />
          It's a way of sending them a song message.
        </p>
        <p>
          You have total control over what playlist the song is added to
          <br />
          and you can remove it at any time through your music player.
        </p>
        <p style={{ fontSize: "14px", color: "grey" }}>
          Created by Singer-Songwriter{" "}
          <a href="https://kevinlambertmusic.com" target="_blank">
            Kevin Lambert
          </a>
        </p>
      </footer>
      <CookieBanner />
      <Hotjar />
    </div>
  );
};

export default Layout;
