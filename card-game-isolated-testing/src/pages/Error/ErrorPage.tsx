import styles from "./errorPage.module.css";

const catImgUrl =
  "src/assets/imgs_new_convention/error/error-catBreakError.webp";

const ErrorPage = () => {
  return (
    <div className={styles.errorPageContainer}>
      <div className={styles.aaa}>
        <h3 className={styles.errorText}>
          It seems something went wrong! <br /> My cat started breaking
          everything again...
        </h3>
        <img
          className={styles.catImg}
          src={catImgUrl}
          alt="The Cat Smasher"
          loading="lazy"
        />
        <h3 className={styles.errorText}>
          If you have the time, <br /> Please notify me of this problem.
        </h3>
        <h3 className={styles.errorText}>My email: mscres-72@uniwa.gr</h3>
      </div>
    </div>
  );
};

export default ErrorPage;
