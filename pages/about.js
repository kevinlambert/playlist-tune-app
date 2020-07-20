import Head from "next/head";

export default function About() {
  return (
    <div className="container">
      <Head>
        <title>About PlaylistTune.com</title>
      </Head>

      <main>
        <p>
          PlaylistTune.com is run by Kevin Lambert. A singer-songerwriter. You
          can find more about him and his music at{" "}
          <a href="https://kevinlambertmusic.com" target="_blank">
            kevinlambertmusic.com
          </a>
        </p>
      </main>
    </div>
  );
}
