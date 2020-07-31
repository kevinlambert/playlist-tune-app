import {
  CONST_PERSONAL_MESSAGE__NONE,
  CONST_PERSONAL_MESSAGE__THINKING_OF_YOU,
  CONST_PERSONAL_MESSAGE__I_MISS_YOU,
  CONST_PERSONAL_MESSAGE__I_LOVE_YOU,
  CONST_PERSONAL_MESSAGE__FIST_BUMP,
} from "../../services/constants";
import styles from "./selector.module.scss";

export default ({ onChange }) => (
  <div className={styles.container}>
    <label>
      <input
        onChange={onChange}
        type="radio"
        name="personalNote"
        value={CONST_PERSONAL_MESSAGE__NONE}
      />
      <img src="/notes/no-message.png" />
    </label>
    <label>
      <input
        onChange={onChange}
        type="radio"
        name="personalNote"
        value={CONST_PERSONAL_MESSAGE__FIST_BUMP}
      />
      <img src="/notes/fist-bump.png" />
    </label>
    <label>
      <input
        onChange={onChange}
        type="radio"
        name="personalNote"
        value={CONST_PERSONAL_MESSAGE__THINKING_OF_YOU}
      />
      <img src="/notes/thinking-of-you.png" />
    </label>
    <label>
      <input
        onChange={onChange}
        type="radio"
        name="personalNote"
        value={CONST_PERSONAL_MESSAGE__I_MISS_YOU}
      />
      <img src="/notes/i-miss-you.png" />
    </label>
    <label>
      <input
        onChange={onChange}
        type="radio"
        name="personalNote"
        value={CONST_PERSONAL_MESSAGE__I_LOVE_YOU}
      />
      <img src="/notes/i-love-you.png" />
    </label>
  </div>
);
