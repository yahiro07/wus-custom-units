import {
  CHANGE_PRESET,
  CHANGE_THEME,
  SHOW_SIDENAV,
  TOGGLE_SIDENAV,
} from './actions';

const initialPresetState = {
  name: 'init',
};

const initialSideNavState = {
  isSideNavOpen: false,
};

const initialThemeState = {
  name: 'verdant',
};

export function sideNavReducer(state = initialSideNavState, action) {
  const { type, isSidenavShown } = action;
  switch (type) {
    case TOGGLE_SIDENAV:
      return {
        ...state,
        isSideNavOpen: !state.isSideNavOpen,
      };
    case SHOW_SIDENAV:
      return {
        ...state,
        isSideNavOpen: isSidenavShown,
      };
    default:
      return state;
  }
}

export function presetReducer(state = initialPresetState, action) {
  const { type, presetName } = action;
  switch (type) {
    case CHANGE_PRESET:
      return {
        ...state,
        name: presetName,
      };
    default:
      return state;
  }
}

export function themeReducer(state = initialThemeState, action) {
  const { type, themeName } = action;
  switch (type) {
    case CHANGE_THEME:
      return {
        ...state,
        name: themeName,
      };
    default:
      return state;
  }
}
