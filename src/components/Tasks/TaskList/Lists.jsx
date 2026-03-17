import React, { useContext } from 'react';
import ListsContext from '../../../context/lists-context';
import DayList from './DayList';
import { todayLocalDate, weekLocalDate } from '../../../utils/dateUtils';
import { groupTasksByCategory } from '../../../utils/taskUtils';
import {
  LIST_OPTION_ALL,
  LIST_OPTION_COMPLETED,
  LIST_OPTION_TODAY,
  LIST_OPTION_WEEK,
} from '../../../utils/constants';

const Lists = (props) => {
  const {
    tasks,
    authUserIdMain,
    onViewDetailMain,
    onDeleteTaskMain,
    onEditTaskMain,
    onCompleteTaskMain,
  } = props;

  const listsContext = useContext(ListsContext);

  // Group tasks by category
  const groups = groupTasksByCategory(tasks);

  // Define lists for each view
  const groupKeys = Object.keys(groups);

  const filterAndSortGroups = () => {
    switch (listsContext.listsOption) {
      case LIST_OPTION_TODAY:
        return groupKeys
          .filter((key) => key === todayLocalDate || key === 'Overdue' || key === 'null')
          .sort()
          .map((key) => ({ date: key, tasks: groups[key] }));

      case LIST_OPTION_WEEK:
        return groupKeys
          .filter((key) => key <= weekLocalDate || key === 'Overdue' || key === 'null')
          .sort((a, b) => {
            if (a === 'Overdue' || a === 'null') return -1;
            if (b === 'Overdue' || b === 'null') return 1;
            return new Date(a).getTime() - new Date(b).getTime();
          })
          .map((key) => ({ date: key, tasks: groups[key] }));

      case LIST_OPTION_COMPLETED:
        return groups['Complete'] ? [{ date: 'Complete', tasks: groups['Complete'] }] : [];

      case LIST_OPTION_ALL:
      default:
        return groupKeys
          .sort((a, b) => {
            if (a === 'Overdue' || a === 'null') return -1;
            if (b === 'Overdue' || b === 'null') return 1;
            if (a === 'Complete') return 1;
            if (b === 'Complete') return -1;
            return new Date(a).getTime() - new Date(b).getTime();
          })
          .map((key) => ({ date: key, tasks: groups[key] }));
    }
  };

  const filteredGroups = filterAndSortGroups();

  return (
    <div>
      {filteredGroups.map((group) => (
        <DayList
          key={group.date}
          date={group.date}
          tasks={group.tasks}
          authUserId={authUserIdMain}
          onViewDetail={onViewDetailMain}
          onDeleteTask={onDeleteTaskMain}
          onEditTask={onEditTaskMain}
          onCompleteTask={onCompleteTaskMain}
        />
      ))}
    </div>
  );
};

export default Lists;
