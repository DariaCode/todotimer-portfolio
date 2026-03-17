import React, { useContext } from 'react';
import ListsContext from '@/context/lists-context';
import DayList from './DayList';
import { todayLocalDate, weekLocalDate } from '@/utils/dateUtils';
import { type Task, groupTasksByCategory } from '@/utils/taskUtils';
import {
  LIST_OPTION_ALL,
  LIST_OPTION_COMPLETED,
  LIST_OPTION_TODAY,
  LIST_OPTION_WEEK,
  TASK_CATEGORY_COMPLETE,
  TASK_CATEGORY_NULL,
  TASK_CATEGORY_OVERDUE,
} from '@/utils/constants';

interface ListsProps {
  tasks: Task[];
  authUserIdMain: string;
  onViewDetailMain: (id: string) => void;
  onDeleteTaskMain: (id: string) => void;
  onEditTaskMain: (id: string) => void;
  onCompleteTaskMain: (id: string) => void;
}

/**
 * Renders a categorized list of tasks based on the current navigation selection.
 * Categorizes tasks by date, completed status, or overdue status.
 */
const Lists: React.FC<ListsProps> = (props) => {
  const {
    tasks,
    authUserIdMain,
    onViewDetailMain,
    onDeleteTaskMain,
    onEditTaskMain,
    onCompleteTaskMain,
  } = props;

  const { listsOption } = useContext(ListsContext);

  // Group tasks by category
  const groups = groupTasksByCategory(tasks);
  const groupKeys = Object.keys(groups);

  /**
   * Filters and sorts task groups based on the selected list option.
   * @returns {Array<{date: string, tasks: Task[]}>} Categorized task groups
   */
  const filterAndSortGroups = (): Array<{ date: string; tasks: Task[] }> => {
    switch (listsOption) {
      case LIST_OPTION_TODAY:
        return groupKeys
          .filter(
            (key) =>
              key === todayLocalDate || key === TASK_CATEGORY_OVERDUE || key === TASK_CATEGORY_NULL
          )
          .sort()
          .map((key) => ({ date: key, tasks: groups[key] }));

      case LIST_OPTION_WEEK:
        return groupKeys
          .filter(
            (key) =>
              key <= weekLocalDate || key === TASK_CATEGORY_OVERDUE || key === TASK_CATEGORY_NULL
          )
          .sort((a, b) => {
            if (a === TASK_CATEGORY_OVERDUE || a === TASK_CATEGORY_NULL) return -1;
            if (b === TASK_CATEGORY_OVERDUE || b === TASK_CATEGORY_NULL) return 1;
            return new Date(a).getTime() - new Date(b).getTime();
          })
          .map((key) => ({ date: key, tasks: groups[key] }));

      case LIST_OPTION_COMPLETED:
        return groups[TASK_CATEGORY_COMPLETE]
          ? [{ date: TASK_CATEGORY_COMPLETE, tasks: groups[TASK_CATEGORY_COMPLETE] }]
          : [];

      case LIST_OPTION_ALL:
      default:
        return groupKeys
          .sort((a, b) => {
            if (a === TASK_CATEGORY_OVERDUE || a === TASK_CATEGORY_NULL) return -1;
            if (b === TASK_CATEGORY_OVERDUE || b === TASK_CATEGORY_NULL) return 1;
            if (a === TASK_CATEGORY_COMPLETE) return 1;
            if (b === TASK_CATEGORY_COMPLETE) return -1;
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
