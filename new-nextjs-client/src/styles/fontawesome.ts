import { library, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, far, fas);

const plus = findIconDefinition({ prefix: 'fas', iconName: 'plus' });
const coffee = findIconDefinition({ prefix: 'fas', iconName: 'mug-hot' });
const envelope = findIconDefinition({ prefix: 'fas', iconName: 'envelope' });
const github = findIconDefinition({ prefix: 'fab', iconName: 'github-alt' });
const search = findIconDefinition({
  prefix: 'fas',
  iconName: 'magnifying-glass',
});
const sun = findIconDefinition({ prefix: 'fas', iconName: 'sun' });
const moon = findIconDefinition({ prefix: 'fas', iconName: 'moon' });
const signOut = findIconDefinition({
  prefix: 'fas',
  iconName: 'right-from-bracket',
});

export { plus, coffee, envelope, github, signOut, search, sun, moon };
