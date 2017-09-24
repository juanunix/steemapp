export const createActionSet = actionName => ({
  REQUESTED: `${actionName}_REQUESTED`,
  SUCCESS: `${actionName}_SUCCESS`,
  ERROR: `${actionName}_ERROR`
})
