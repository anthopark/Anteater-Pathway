import * as functions from 'firebase-functions/v2';
import { repository, CourseAttributeDocument } from '../firestore.service';

export const updateCourseAttributes = async () => {
  const attributes = [
    { name: 'Prerequisite', value: 'prerequisite', ordinal: 0 },
    { name: 'Corequisite', value: 'corequisite', ordinal: 1 },
    { name: 'Prerequisite or corequisite', value: 'prereqOrCoreq', ordinal: 2 },
    { name: 'Same as', value: 'sameAs', ordinal: 3 },
    { name: 'Concurrent with', value: 'concurrentWith', ordinal: 4 },
    { name: 'Overlaps with', value: 'overlapsWith', ordinal: 5 },
    { name: 'Grading option', value: 'gradingOption', ordinal: 6 },
    { name: 'Repeatability', value: 'repeatability', ordinal: 7 },
    { name: 'Restriction', value: 'restriction', ordinal: 8 },
  ];

  functions.logger.info(`Updating ${attributes.length} course attributes`);
  let updateCount = 0;
  for (const attr of attributes) {
    const courseAttr = await repository.courseAttributes
      ?.whereEqualTo('value', attr.value)
      .findOne();
    if (!courseAttr) {
      const newAttr = new CourseAttributeDocument();
      newAttr.name = attr.name;
      newAttr.value = attr.value;
      newAttr.ordinal = attr.ordinal;
      await repository.courseAttributes?.create(newAttr);
      updateCount++;
    }
  }

  functions.logger.info(
    `Finished Updating course attributes, updated count: ${updateCount}`
  );
};
