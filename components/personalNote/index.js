import styles from "./personalNote.module.scss";
import {
  CONST_PERSONAL_MESSAGE__NONE,
  CONST_PERSONAL_MESSAGE__THINKING_OF_YOU,
  CONST_PERSONAL_MESSAGE__I_MISS_YOU,
  CONST_PERSONAL_MESSAGE__I_LOVE_YOU,
  CONST_PERSONAL_MESSAGE__FIST_BUMP,
} from "../../services/constants";

const FistBumpMessage = () => (
  <div>
    <div>Fist Bump</div>
    <div className={styles.emoticon}>👊</div>
  </div>
);

const ILoveYouMessage = () => (
  <div>
    <div>I Love You</div>
    <div className={styles.emoticon}>❤️</div>
  </div>
);

const ThinkingOfYouMessage = () => (
  <div>
    <div>Thinking of You</div>
    <div className={styles.emoticon}>😊</div>
  </div>
);

const IMissYouMessage = () => (
  <div>
    <div>I Miss You</div>
    <div className={styles.emoticon}>🤗</div>
  </div>
);

const Message = ({ msg }) => {
  switch (parseInt(msg)) {
    case CONST_PERSONAL_MESSAGE__I_LOVE_YOU:
      return <ILoveYouMessage />;
    case CONST_PERSONAL_MESSAGE__FIST_BUMP:
      return <FistBumpMessage />;
    case CONST_PERSONAL_MESSAGE__THINKING_OF_YOU:
      return <ThinkingOfYouMessage />;
    case CONST_PERSONAL_MESSAGE__I_MISS_YOU:
      return <IMissYouMessage />;
    default:
      return null;
  }
};

export default ({ msg = CONST_PERSONAL_MESSAGE__NONE }) =>
  parseInt(msg) !== CONST_PERSONAL_MESSAGE__NONE ? (
    <div className={styles.container}>
      <div className={styles.postit}>
        <Message msg={msg} />
      </div>
    </div>
  ) : null;
