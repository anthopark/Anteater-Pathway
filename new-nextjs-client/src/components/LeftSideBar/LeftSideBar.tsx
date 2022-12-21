import style from './LeftSideBar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';

const coffee = findIconDefinition({ prefix: 'fas', iconName: 'coffee' });
const envelope = findIconDefinition({ prefix: 'fas', iconName: 'envelope' });
const github = findIconDefinition({ prefix: 'fab', iconName: 'github-alt' });
export interface ILeftSideBarProps {}

export default function LeftSideBar(props: ILeftSideBarProps) {
  return (
    <div className={style.container}>
      <div className="menu-container">
        <a>
          <FontAwesomeIcon icon={coffee} color="white" />
        </a>
        <a>
          <FontAwesomeIcon icon={envelope} color="white" />
        </a>
        <a>
          <FontAwesomeIcon icon={github} color="white" />
        </a>
      </div>
    </div>
  );
}
