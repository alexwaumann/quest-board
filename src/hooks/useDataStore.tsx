import create from 'zustand';
import { getLocalStorage, setLocalStorage } from '../utils/localstorage';

interface Goal {
  uid: string
  title: string
  startDate: number
  endDate: number
  milestones: Milestone[]
};

interface Milestone {
  uid: string
  title: string
  completed: boolean
  date: number
};

interface Objective {
  uid: string
  title: string
  action: string
  unit: string
  targetUnits: number
  active: boolean
  startDate: number
  endDate: number
  dailies: Daily[]
  goalUid: string
};

interface Daily {
  date: number
  units: number
};

interface DataStore {
  displayName: string
  goals: Goal[]
  objectives: Objective[]

  setDisplayName: (newDisplayName: string) => void

  addGoal: (goal: Goal) => void
  addMilestone: (goalUid: string, milestone: Milestone) => void
  addObjective: (objective: Objective) => void

  completeMilestone: (goalUid: string, milestoneUid: string) => void
  completeDaily: (objectiveUid: string, daily: Daily) => void

  completeGoal: (goalUid: string) => void
  completeObjective: (objectiveUid: string) => void
};

export const useDataStore = create<DataStore>((set, get) => ({
  displayName: getLocalStorage('displayName', 'Adventurer'),
  goals: getLocalStorage('goals', []),
  objectives: getLocalStorage('objectives', []),

  setDisplayName: (newDisplayName) => {
    set({ displayName: newDisplayName });
    setLocalStorage('displayName', newDisplayName);
  },

  addGoal: (goal) => {
    const newGoals = [...get().goals, goal];

    set({ goals: newGoals });
    setLocalStorage('goals', newGoals);
  },

  addMilestone: (goalUid, milestone) => {
    const newGoals = get().goals.map((goal) => {
      if(goal.uid === goalUid) {
        goal.milestones.push(milestone);
      }

      return goal;
    });

    set({ goals: newGoals })
    setLocalStorage('goals', newGoals);
  },

  addObjective: (objective) => {
    const newObjectives = [...get().objectives, objective];

    set({ objectives: newObjectives });
    setLocalStorage('objectives', newObjectives);
  },

  completeMilestone: (goalUid, milestoneUid) => {
    const newGoals = get().goals.map((goal) => {
      if(goal.uid === goalUid) {
        goal.milestones = goal.milestones.map((milestone) => {
          if(milestone.uid === milestoneUid) {
            milestone.completed = true;
            milestone.date = TODAY();
          }

          return milestone;
        });
      }

      return goal;
    });

    set({ goals: newGoals });
    setLocalStorage('goals', newGoals);
  },

  completeDaily: (objectiveUid, daily) => {
    const newObjectives = get().objectives.map((objective) => {
      const isSelectedObjective = objective.uid === objectiveUid;
      const isToday = daily.date === TODAY();
      const isNew = objective.dailies.find((daily) => daily.date === TODAY()) === undefined;
      if(isSelectedObjective && isToday && isNew) {
        objective.dailies.push(daily);
      }

      return objective;
    });

    set({ objectives: newObjectives });
    setLocalStorage('objectives', newObjectives);
  },

  completeGoal: (goalUid: string) => {
    console.log('TODO: implement DataStore.completeGoal');
  },

  completeObjective: (objectiveUid) => {
    console.log('TODO: implement DataStore.completeObjective');
  },

}));

export const TODAY = (): number => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
};
