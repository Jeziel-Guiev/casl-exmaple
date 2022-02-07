import ability from './ability'

export const canNavigate = to => to.matched.some(to => ability.can(to.meta.action || 'read', to.meta.resource))

export const _ = undefined
