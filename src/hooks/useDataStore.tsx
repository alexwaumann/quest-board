import create from 'zustand';
import { getLocalStorage, setLocalStorage } from '../utils/localstorage';

export interface Challenge {
  uid: string
  title: string
  startDate: number
  endDate?: number
  milestones: Milestone[]
};

interface Milestone {
  uid: string
  title: string
  completed: boolean
  date: number
};

export interface Objective {
  uid: string
  title: string
  action: string
  unit: string
  targetUnits: number
  active: boolean
  startDate: number
  endDate?: number
  dailies: Daily[]
  challengeUid: string
};

export interface Daily {
  date: number
  units: number
};

interface DataStore {
  displayName: string
  challenges: Challenge[]
  objectives: Objective[]

  setDisplayName: (newDisplayName: string) => void

  addChallenge: (challenge: Challenge) => void
  addMilestone: (challengeUid: string, milestone: Milestone) => void
  addObjective: (objective: Objective) => void

  completeMilestone: (challengeUid: string, milestoneUid: string) => void
  completeDaily: (objectiveUid: string, daily: Daily) => void

  completeChallenge: (challengeUid: string) => void
  completeObjective: (objectiveUid: string) => void
};

export const useDataStore = create<DataStore>((set, get) => ({
  displayName: getLocalStorage('displayName', 'Adventurer'),
  challenges: getLocalStorage('challenges', []),
  objectives: getLocalStorage('objectives', []),

  setDisplayName: (newDisplayName) => {
    set({ displayName: newDisplayName });
    setLocalStorage('displayName', newDisplayName);
  },

  addChallenge: (challenge) => {
    const newChallenges = [...get().challenges, challenge];

    set({ challenges: newChallenges });
    setLocalStorage('challenges', newChallenges);
  },

  addMilestone: (challengeUid, milestone) => {
    const newChallenges = get().challenges.map((challenge) => {
      if(challenge.uid === challengeUid) {
        challenge.milestones.push(milestone);
      }

      return challenge;
    });

    set({ challenges: newChallenges })
    setLocalStorage('challenges', newChallenges);
  },

  addObjective: (objective) => {
    const newObjectives = [...get().objectives, objective];

    set({ objectives: newObjectives });
    setLocalStorage('objectives', newObjectives);
  },

  completeMilestone: (challengeUid, milestoneUid) => {
    const newChallenges = get().challenges.map((challenge) => {
      if(challenge.uid === challengeUid) {
        challenge.milestones = challenge.milestones.map((milestone) => {
          if(milestone.uid === milestoneUid) {
            milestone.completed = true;
            milestone.date = TODAY();
          }

          return milestone;
        });
      }

      return challenge;
    });

    set({ challenges: newChallenges });
    setLocalStorage('challenges', newChallenges);
  },

  completeDaily: (objectiveUid, daily) => {
    const newObjectives = get().objectives.map((objective) => {
      const index = objective.dailies.findIndex((_daily) => _daily.date === daily.date);
      const isSelectedObjective = objective.uid === objectiveUid;
      const isNew = index === -1;
      if(isSelectedObjective && isNew && daily.units > 0) {
        // create new entry
        objective.dailies.push(daily);
      } else if (isSelectedObjective && !isNew) {
        // overwrite existing entry
        daily.units > 0 ? objective.dailies.splice(index, 1, daily) : objective.dailies.splice(index, 1);
      }

      objective.dailies.sort((a, b) => a.date - b.date);

      return objective;
    });

    set({ objectives: newObjectives });
    setLocalStorage('objectives', newObjectives);
  },

  completeChallenge: (challengeUid: string) => {
    console.log('TODO: implement DataStore.completeChallenge');
  },

  completeObjective: (objectiveUid) => {
    console.log('TODO: implement DataStore.completeObjective');
  },

}));

export const TODAY = (): number => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
};

