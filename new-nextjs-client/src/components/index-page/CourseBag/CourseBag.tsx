import styles from './CourseBag.module.scss';

interface Props {}

function CourseBag(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Course Bag</div>
    </div>
  );
}

export default CourseBag;
