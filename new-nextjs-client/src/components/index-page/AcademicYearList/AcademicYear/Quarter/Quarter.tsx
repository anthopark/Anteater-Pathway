import React from 'react';
import { IQuarter } from '@entities/academic-year';
import styles from './Quarter.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const termMap = {
  fa: 'Fall',
  wi: 'Winter',
  sp: 'Spring',
  su: 'Summer',
};

interface Props {
  quarter: IQuarter;
}

const headerText = (quarter: IQuarter) => {
  return `${termMap[quarter.term]} ${
    quarter.term === 'fa' ? quarter.year : quarter.year + 1
  }`;
};

function Quarter(props: Props) {
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>{headerText(props.quarter)}</div>
    </div>
  );
}

export default Quarter;
