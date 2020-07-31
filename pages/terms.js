import Head from "next/head";

export default function About() {
  return (
    <div className="container">
      <Head>
        <title>Terms and Conditions - PlaylistTune.com</title>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>

      <main>
        <p>
          <strong>TERMS AND CONDITIONS</strong>
        </p>
        <p>
          <strong>Last updated July 31, 2020</strong>
        </p>
        <p>
          By using this website you agree to:
          <ul>
            <li>use this website at your own risk.</li>
            <li>idemnify us should the website be down or discontinued.</li>
            <li>idemnify us if any errors occur.</li>
            <li>
              idemnify us in the event that the wrong personal message gets
              shown to someone.
            </li>
            <li>idemnify us if you select the wrong personal message.</li>
            <li>
              that the song "Playlist Tune" by "Kevin Lambert" will be inserted
              into one of your playlists.
            </li>
          </ul>
        </p>
      </main>
    </div>
  );
}
