const FaceBook = () => (
  <div>
    <div id="fb-root"></div>
    <script
      async
      defer
      crossOrigin="anonymous"
      src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v7.0"
      nonce="n3zy20lb"
    ></script>
    <div
      class="fb-share-button"
      data-href="https://playlisttune.com/"
      data-layout="button"
      data-size="small"
    >
      <a
        target="_blank"
        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
        class="fb-xfbml-parse-ignore"
      >
        Share
      </a>
    </div>
  </div>
);

const Twitter = () => (
  <div>
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      class="twitter-share-button"
      data-show-count="false"
    >
      Tweet
    </a>
    <script
      async
      src="https://platform.twitter.com/widgets.js"
      charset="utf-8"
    ></script>
  </div>
);

export default () => {
  return <div></div>;
};
