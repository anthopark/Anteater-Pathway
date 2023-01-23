import { IAppUser } from '@entities/app-user';
import { useTransition, animated } from '@react-spring/web';
import AcademicYear from './AcademicYear/AcademicYear';

interface Props {
  appUser: IAppUser;
}

function AcademicYearList(props: Props) {
  const transitions = useTransition(props.appUser.years, {
    from: { opacity: 1, maxHeight: 0, marginBottom: '0rem' },
    enter: { opacity: 1, maxHeight: 5000, marginBottom: '2rem' },
    leave: { opacity: 0, maxHeight: 0, marginBottom: '0rem' },
  });

  return (
    <>
      {transitions((style, year) => (
        <animated.div style={style}>
          <AcademicYear appUser={props.appUser} year={year} />
        </animated.div>
      ))}
    </>
  );
}

export default AcademicYearList;
