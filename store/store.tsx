import { create } from 'zustand';

type StateType = {
  sidebarOpen: boolean;
  setSidebarOpen: () => void;
};

const useStore = create<StateType>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: () =>
    set((state: StateType) => ({ sidebarOpen: !state.sidebarOpen }))
}));
export default useStore;
