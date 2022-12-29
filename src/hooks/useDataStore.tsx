import create from 'zustand';

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
  goals: Goal[]
  objectives: Objective[]

  addGoal: (goal: Goal) => void
  addMilestone: (goalUid: string, milestone: Milestone) => void
  addObjective: (objective: Objective) => void

  completeGoal: (goalUid: string) => void
  completeMilestone: (goalUid: string, milestoneUid: string) => void
  completeObjective: (objectiveUid: string) => void
  completeDaily: (objectiveUid: string) => void
};

const useDataStore = create((set, get) => {
});
